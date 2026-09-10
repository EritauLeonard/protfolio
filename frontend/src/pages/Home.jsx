import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePortfolioStore from "../store/portfolioStore";
import ProjectCard from "../components/ProjectCard";
import SkillIcon from "../components/SkillIcon";
import maPhoto from "../assets/cool.jpg";

function TypewriterSignature() {
  const [displayName, setDisplayName] = useState("");
  const [displayTitle, setDisplayTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState("typing-name");

  const name = "Bonjour, je m'appelle Eritau Leonard";
  const title = "je suis un Développeur Fullstack";

  useEffect(() => {
    let timeout;

    if (phase === "typing-name") {
      if (displayName.length < name.length) {
        timeout = setTimeout(() => {
          setDisplayName(name.slice(0, displayName.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => setPhase("deleting-name"), 1800);
      }
    } else if (phase === "deleting-name") {
      if (displayName.length > 0) {
        timeout = setTimeout(() => {
          setDisplayName(name.slice(0, displayName.length - 1));
        }, 35);
      } else {
        timeout = setTimeout(() => setPhase("typing-title"), 400);
      }
    } else if (phase === "typing-title") {
      if (displayTitle.length < title.length) {
        timeout = setTimeout(() => {
          setDisplayTitle(title.slice(0, displayTitle.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => setPhase("deleting-title"), 1800);
      }
    } else if (phase === "deleting-title") {
      if (displayTitle.length > 0) {
        timeout = setTimeout(() => {
          setDisplayTitle(title.slice(0, displayTitle.length - 1));
        }, 35);
      } else {
        timeout = setTimeout(() => setPhase("typing-name"), 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, displayName, displayTitle]);

  const currentText =
    phase === "typing-name" || phase === "deleting-name"
      ? displayName
      : displayTitle;

  return (
    <div style={{ width: "350px", maxWidth: "100%" }}>
      {/* ← largeur fixe, texte aligné à GAUCHE → curseur suit naturellement */}
      <p
        className="font-syne font-bold text-xl text-cream tracking-wide"
        style={{ minHeight: "2em", textAlign: "left", whiteSpace: "nowrap" }}
      >
        {currentText}
        <span className="cursor-blink">|</span>
      </p>
    </div>
  );
}

export default function Home() {
  const { projects, skills, isLoading, fetchProjects, fetchSkills } =
    usePortfolioStore();

  useEffect(() => {
    fetchProjects(true);
    fetchSkills();
  }, []);

  return (
    <div className="pt-16">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Côté Gauche : text */}
          <div className="flex-1">
            <h1 className="hero-title text-4xl mb-8 animate-fade-up">
              Je construis des <br />
              <span className="text-accent italic">expériences</span> <br />
              web modernes.
            </h1>

            <p
              className="font-mono text-[13px] text-muted leading-relaxed max-w-sm mb-8 animate-fade-up opacity-0-init"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Développeur Fullstack expert en React & Node.js. <br />
              Je crée des solutions digitales performantes et esthétiques.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-up opacity-0-init"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              <Link
                to="/projects"
                className=" btn-text bg-accent text-white font-syne font-bold text-sm px-6 py-3 rounded-sm hover:opacity-90 transition-all"
              >
                Voir mes projets
              </Link>
              <Link
                to="/contact"
                className=" btn-text border-2 border-white text-white font-syne fond-bold text-sm px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-all"
              >
                Me contacter
              </Link>
            </div>
          </div>

          {/* CÔTÉ DROIT : PHOTO + NOM */}
          <div
            className="flex-1 flex flex-col items-center md:items-end animate-fade-up opacity-0-init"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-[400px] mb-6">
              <div className="absolute inset-0 border-2 border-accent translate-x-4 translate-y-4 rounded-sm" />
              <img
                src={maPhoto}
                alt="Eritau Leonard"
                className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-sm shadow-xl"
              />
            </div>

            <TypewriterSignature />
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-20 flex items-center gap-3 animate-fade-up opacity-0-init"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          <div className="w-px h-12 bg-ghost-border" />
          <span className="font-mono text-xs text-muted tracking-widest">
            SCROLL
          </span>
        </div>
      </section>

      <div className="border-t border-ghost-border" />

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <span className="font-mono text-xs text-muted tracking-widest mb-10 block">
          // COMPETENCES
        </span>
        {isLoading && skills.length === 0 ? (
          <p className="font-mono text-xs text-muted text-center">
            Chargement...
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-12">
            {skills.map((category) => (
              <div key={category.category} className="flex flex-col items-center">
                <h3 className="font-syne font-bold text-sm text-accent mb-6 tracking-widest text-center">
                  {category.category.toUpperCase()}
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {category.items.map((skill) => (
                    <SkillIcon key={skill.name} name={skill.name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="border-t border-ghost-border" />

      {/* ── FEATURED PROJECTS ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <span className="font-mono text-xs text-muted tracking-widest">
            // PROJETS RÉCENTS
          </span>
          <Link
            to="/projects"
            className="font-mono text-xs text-accent hover:text-cream transition-colors"
          >
            Voir tous →
          </Link>
        </div>

        {isLoading && projects.length === 0 ? (
          <p className="font-mono text-xs text-muted">Chargement...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA CONTACT ───────────────────────────────────────────────────── */}
      <section className="border-t border-ghost-border">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="btn-text font-extrabold text-4xl md:text-5xl mb-6">
            On travaille ensemble ?
          </h2>
          <p className="font-mono text-sm text-muted mb-8">
            Disponible pour des missions freelance et opportunités.
          </p>
          <Link
            to="/contact"
            className="btn-text inline-block bg-accent text-white font-syne font-bold text-sm px-8 py-4 rounded-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
          >
            Envoyer un message →
          </Link>
        </div>
      </section>
    </div>
  );
}
