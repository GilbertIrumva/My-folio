import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Contact from "../models/contact.js";
import {
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  CONTACT_RECEIVER_EMAIL,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
} from "../utils/config.js";
import logger from "../utils/logger.js";

const MAIL_TIMEOUT_MS = 15000;
const DB_TIMEOUT_MS = 8000;

const hasGmailUser = Boolean(GMAIL_USER);
const hasGmailPassword = Boolean(GMAIL_APP_PASSWORD);
const hasReceiverEmail = Boolean(CONTACT_RECEIVER_EMAIL);
const hasResendKey = Boolean(RESEND_API_KEY);

const resendReady = hasResendKey && hasReceiverEmail;

const smtpTransporter =
  GMAIL_USER && GMAIL_APP_PASSWORD
    ? nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD,
        },
        connectionTimeout: MAIL_TIMEOUT_MS,
        greetingTimeout: MAIL_TIMEOUT_MS,
        socketTimeout: MAIL_TIMEOUT_MS,
      })
    : null;

const smtpReady = Boolean(smtpTransporter && hasReceiverEmail);
const emailReady = resendReady || smtpReady;

const getEmailConfigIssues = () => {
  const issues = [];

  if (!hasReceiverEmail) {
    issues.push("CONTACT_RECEIVER_EMAIL is missing");
  }

  if (!hasResendKey && !(hasGmailUser && hasGmailPassword)) {
    issues.push(
      "No email provider configured. Set RESEND_API_KEY (recommended) or GMAIL_USER + GMAIL_APP_PASSWORD."
    );
  }

  return issues;
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const withTimeout = async (promise, timeoutMs, timeoutMessage) => {
  let timeoutId;

  try {
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    });

    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
};

const buildEmailPayload = ({ name, email, message }) => {
  const subject = `New portfolio message from ${name}`;
  const text = `You received a new contact message from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const html = `
    <h2>New Portfolio Contact Message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
  `;

  return { subject, text, html };
};

const sendViaResend = async ({ name, email, message }) => {
  const { subject, text, html } = buildEmailPayload({ name, email, message });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `My Folio Contact <${RESEND_FROM_EMAIL}>`,
      to: [CONTACT_RECEIVER_EMAIL],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Resend API error (${response.status}): ${errorText || response.statusText}`
    );
  }

  return response.json().catch(() => ({}));
};

const sendViaSmtp = async ({ name, email, message }) => {
  const { subject, text, html } = buildEmailPayload({ name, email, message });

  return smtpTransporter.sendMail({
    from: `My Folio Contact <${GMAIL_USER}>`,
    to: CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    subject,
    text,
    html,
  });
};

const healthCheck = (_req, res) => {
  res.json({
    ok: true,
    service: "my-folio-backend",
    mongo: mongoose.connection.readyState === 1,
    email: emailReady,
    emailConfig: {
      resendApiKey: hasResendKey,
      resendFromEmail: RESEND_FROM_EMAIL,
      gmailUser: hasGmailUser,
      gmailAppPassword: hasGmailPassword,
      contactReceiverEmail: hasReceiverEmail,
      activeProvider: resendReady ? "resend" : smtpReady ? "gmail-smtp" : "none",
      issues: getEmailConfigIssues(),
    },
  });
};

const createContactMessage = async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Please fill in your name, email, and message before submitting.",
    });
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailIsValid) {
    return res.status(400).json({
      message: "Please enter a valid email address so I can reply to you.",
    });
  }

  if (!emailReady) {
    logger.warn("Email delivery skipped: no provider configured.");
    logger.warn("Email config issues:", getEmailConfigIssues().join(" | "));

    return res.status(503).json({
      message: "Contact service is temporarily unavailable. Please try again shortly.",
    });
  }

  try {
    const mongoReady = mongoose.connection.readyState === 1;
    let deliveredBy = null;

    if (resendReady) {
      try {
        const result = await withTimeout(
          sendViaResend({ name, email, message }),
          MAIL_TIMEOUT_MS,
          "Resend API timeout."
        );
        logger.info("Contact email delivered via Resend:", result?.id || "ok");
        deliveredBy = "resend";
      } catch (resendError) {
        logger.error("Resend delivery failed:", resendError);

        if (smtpReady) {
          logger.warn("Falling back to Gmail SMTP...");
          const result = await withTimeout(
            sendViaSmtp({ name, email, message }),
            MAIL_TIMEOUT_MS,
            "Gmail SMTP timeout."
          );
          logger.info("Contact email delivered via Gmail SMTP:", result.messageId);
          deliveredBy = "gmail-smtp";
        } else {
          throw resendError;
        }
      }
    } else if (smtpReady) {
      const result = await withTimeout(
        sendViaSmtp({ name, email, message }),
        MAIL_TIMEOUT_MS,
        "Gmail SMTP timeout."
      );
      logger.info("Contact email delivered via Gmail SMTP:", result.messageId);
      deliveredBy = "gmail-smtp";
    }

    if (deliveredBy) {
      if (mongoReady) {
        void (async () => {
          try {
            await withTimeout(
              Contact.create({ name, email, message }),
              DB_TIMEOUT_MS,
              "Database write timeout."
            );
          } catch (dbError) {
            logger.warn("MongoDB write failed after email delivery.", dbError);
          }
        })();
      } else {
        logger.warn(
          "MongoDB unavailable. Skipping database save while preserving email delivery."
        );
      }

      return res.status(200).json({
        message: "Thanks for reaching out. Your message was emailed successfully.",
      });
    }

    return res.status(503).json({
      message: "Contact service is temporarily unavailable. Please try again shortly.",
    });
  } catch (error) {
    logger.error("Failed to process contact submission:", error);

    return res.status(500).json({
      message:
        "Something went wrong while sending your message. Please try again in a few minutes.",
    });
  }
};

const getContacts = async (_req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
  res.json(contacts);
};

export default {
  healthCheck,
  createContactMessage,
  getContacts,
};
