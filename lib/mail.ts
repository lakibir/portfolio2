import nodemailer from "nodemailer";

import type { ContactInput } from "@/lib/validations/contact";

function getTransporter() {
  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email credentials are missing.");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

export async function sendContactEmail(input: ContactInput) {
  const transporter = getTransporter();
  const senderEmail = process.env.EMAIL_USER;
  const recipientEmail = process.env.CONTACT_TO || "lakbrmulatu@gmail.com";

  await transporter.sendMail({
    from: senderEmail,
    to: recipientEmail,
    replyTo: input.email,
    subject: `Portfolio inquiry from ${input.name}`,
    text: `${input.name} <${input.email}>\n\n${input.message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin-bottom: 12px;">New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        <p><strong>Message:</strong></p>
        <p>${input.message.replace(/\n/g, "<br />")}</p>
      </div>
    `,
  });
}
