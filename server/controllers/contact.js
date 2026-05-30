import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Contact from "../models/contact.js";
import {
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  CONTACT_RECEIVER_EMAIL,
} from "../utils/config.js";
import logger from "../utils/logger.js";

const MAIL_TIMEOUT_MS = 20000;
const DB_TIMEOUT_MS = 8000;

const mailTransporter =
  GMAIL_USER && GMAIL_APP_PASSWORD
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD,
        },
        connectionTimeout: MAIL_TIMEOUT_MS,
        greetingTimeout: MAIL_TIMEOUT_MS,
        socketTimeout: MAIL_TIMEOUT_MS,
      })
    : null;

const emailReady = Boolean(mailTransporter && CONTACT_RECEIVER_EMAIL);

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
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

const healthCheck = (_req, res) => {
  res.json({
    ok: true,
    service: "my-folio-backend",
    mongo: mongoose.connection.readyState === 1,
    email: emailReady,
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

  try {
    const mongoReady = mongoose.connection.readyState === 1;
    let deliveredByEmail = false;

    if (emailReady) {
      const result = await withTimeout(
        mailTransporter.sendMail({
          from: `My Folio Contact <${GMAIL_USER}>`,
          to: CONTACT_RECEIVER_EMAIL,
          replyTo: email,
          subject: `New portfolio message from ${name}`,
          text: `You received a new contact message from your portfolio.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h2>New Portfolio Contact Message</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
          `,
        }),
        MAIL_TIMEOUT_MS,
        "Email provider timeout. Please try again in a moment."
      );

      logger.info("Contact email delivered successfully:", result.messageId);
      deliveredByEmail = true;
    }

    if (!emailReady) {
      logger.warn(
        "Email delivery skipped: Gmail notifier is not fully configured."
      );
    }

    if (deliveredByEmail) {
      if (mongoReady) {
        void (async () => {
          try {
            await withTimeout(
              Contact.create({ name, email, message }),
              DB_TIMEOUT_MS,
              "Database write timeout."
            );
          } catch (dbError) {
            logger.warn("MongoDB write failed after email delivery attempt.", dbError);
          }
        })();
      } else {
        logger.warn(
          "MongoDB is unavailable. Skipping database save while preserving email delivery."
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
