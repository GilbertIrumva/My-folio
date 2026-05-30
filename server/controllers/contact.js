import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Contact from "../models/contact.js";
import {
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  CONTACT_RECEIVER_EMAIL,
} from "../utils/config.js";
import logger from "../utils/logger.js";

const mailTransporter =
  GMAIL_USER && GMAIL_APP_PASSWORD
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_USER,
          pass: GMAIL_APP_PASSWORD,
        },
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
    let savedToDb = false;
    let deliveredByEmail = false;

    if (mongoReady) {
      try {
        await Contact.create({ name, email, message });
        savedToDb = true;
      } catch (dbError) {
        logger.warn("MongoDB write failed. Proceeding with email delivery attempt.", dbError);
      }
    } else {
      logger.warn(
        "MongoDB is unavailable. Skipping database save and attempting email delivery."
      );
    }

    if (emailReady) {
      const result = await mailTransporter.sendMail({
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
      });

      logger.info("Contact email delivered successfully:", result.messageId);
      deliveredByEmail = true;
    }

    if (!emailReady) {
      logger.warn(
        "Email delivery skipped: Gmail notifier is not fully configured."
      );
    }

    if (savedToDb && deliveredByEmail) {
      return res.status(200).json({
        message: "Thank you for reaching out. Your message was saved and sent successfully.",
      });
    }

    if (savedToDb && !deliveredByEmail) {
      return res.status(200).json({
        message: "Thanks for your message. It was saved successfully.",
      });
    }

    if (!savedToDb && deliveredByEmail) {
      return res.status(200).json({
        message:
          "Thanks for reaching out. Your message was emailed successfully, but database storage is temporarily unavailable.",
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
