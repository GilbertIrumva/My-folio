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
    email: Boolean(mailTransporter && CONTACT_RECEIVER_EMAIL),
  });
};

const createContactMessage = async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailIsValid) {
    return res.status(400).json({ message: "Please provide a valid email address." });
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: "Contact service is temporarily unavailable. Please try again in a moment.",
    });
  }

  try {
    await Contact.create({ name, email, message });

    if (mailTransporter && CONTACT_RECEIVER_EMAIL) {
      await mailTransporter.sendMail({
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
    }

    return res.status(200).json({
      message: "Thanks! Your message was received and sent to my inbox.",
    });
  } catch (error) {
    logger.error("Failed to process contact submission:", error);

    return res.status(500).json({
      message: "Unable to send your message right now. Please try again later.",
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
