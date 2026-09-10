import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/projects", label: "Projets" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-ghost-border bg-void/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="font-syne font-bold text-sm text-cream tracking-tight hover:text-accent transition-colors"
        >
          Eritau<span className="text-accent">.</span>Leonard
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-mono text-xs tracking-widest transition-colors ${
                pathname === to ? "text-accent" : "text-muted hover:text-cream"
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/toi"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-ghost-border text-xs font-mono px-4 py-2 rounded-sm text-muted hover:text-cream hover:border-accent/50 transition-all"
          >
            GitHub ↗
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-5 h-px bg-cream transition-all ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-cream transition-all ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-cream transition-all ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-ghost-border bg-void px-6 py-4 flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`font-mono text-sm tracking-widest ${
                pathname === to ? "text-accent" : "text-muted"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
