import { useState } from "react";
import usePortfolioStore from "../store/portfolioStore";

export default function Contact() {
  const { contactStatus, contactError, sendContact } = usePortfolioStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendContact(form);
    if (contactStatus !== "error")
      setForm({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full bg-ghost border border-ghost-border rounded-sm px-4 py-3 font-mono text-sm text-cream placeholder:text-muted/50 focus:outline-none focus:border-accent/60 transition-colors";

  return (
    <div className="pt-16">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <div>
            <span className="font-mono text-xs text-accent tracking-widest mb-4 block">
              // CONTACT
            </span>
            <h1 className="font-normal font-serif text-5xl md:text-8xl leading-[0.9] tracking-tighter mb-8 animate-fade-up">
              Parlons de <br />
              <span className="text-accent italic">votre projet.</span>
            </h1>
            <p
              className="text-gray-400 text-lg mb-10 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Disponible pour des missions freelance, collaborations, ou juste
              un café virtuel.
            </p>

            {/* Contact info */}
            <div
              className="space-y-4 animate-fade-up opacity-0-init"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              {[
                {
                  label: "EMAIL",
                  value: "razafimahatradraibeeritauleina@gmail.com",
                  href: "mailto:razafimahatradraibeeritauleina@gmail.com",
                },
                {
                  label: "LINKEDIN",
                  value: "Eritau Leonard",
                  href: "https://www.linkedin.com/in/eritau-leonard-19447b406/",
                },
                { label: "GITHUB", value: "Eritau Leonard", href: "https://github.com/EritauLeonard" },
              ].map(({ label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 border-b border-ghost-border pb-4"
                >
                  <span className="font-mono text-[10px] text-muted tracking-widest w-20">
                    {label}
                  </span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-cream hover:text-accent transition-colors"
                  >
                    {value} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div
            className="animate-fade-up opacity-0-init"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-muted tracking-widest block mb-2">
                  NOM
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted tracking-widest block mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="exemple@email.com"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="font-mono text-xs text-muted tracking-widest block mb-2">
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décris vos projet ou votre demande..."
                  required
                  rows={6}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Status messages */}
              {contactStatus === "success" && (
                <div className="border border-green-500/30 bg-green-500/10 rounded-sm px-4 py-3 font-mono text-xs text-green-400">
                  ✓ Message envoyé avec succès !
                </div>
              )}
              {contactStatus === "error" && contactError && (
                <div className="border border-red-500/30 bg-red-500/10 rounded-sm px-4 py-3 font-mono text-xs text-red-400">
                  {contactError}
                </div>
              )}

              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="w-full bg-accent text-white font-bold text-sm py-4 rounded-sm hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {contactStatus === "sending"
                  ? "Envoi en cours..."
                  : "Envoyer le message →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
