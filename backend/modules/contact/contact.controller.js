const createTransporter = require("../../config/mailer");

const validateContact = (data) => {
  const errors = [];
  const { name, email, message } = data;

  if (!name || name.trim().length < 2) errors.push("Nom invalide (min 2 chars).");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email invalide.");
  if (!message || message.trim().length < 10) errors.push("Message trop court (min 10 chars).");
  if (message && message.trim().length > 1000) errors.push("Message trop long (max 1000 chars).");

  return errors;
};

exports.sendContact = async (req, res) => {
  const { name, email, message } = req.body;

  const errors = validateContact({ name, email, message });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    if (!process.env.EMAIL_USER || process.env.NODE_ENV === "development") {
      console.log("\n📧 Message reçu (mode dev) :");
      console.log(`  De : ${name} <${email}>`);
      console.log(`  Message : ${message}\n`);
      return res.status(200).json({ success: true, message: "Message reçu (mode dev) !" });
    }

    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `[Portfolio] Nouveau message de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #7f6aff;">Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <hr />
          <p><strong>Message :</strong></p>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 4px;">${message.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Message envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur email:", error);
    res.status(500).json({ error: "Erreur lors de l'envoi. Réessaie plus tard." });
  }
};