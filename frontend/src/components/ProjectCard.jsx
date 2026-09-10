import TechIcon from "./TechIcon";

export default function ProjectCard({ project, index }) {
  return (
    <article
      className="group border border-ghost-border rounded-sm p-6 bg-ghost hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 animate-fade-up opacity-0-init"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="font-mono text-xs text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex gap-3">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted hover:text-cream transition-colors">
              GitHub ↗
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-accent hover:text-cream transition-colors">
              Live ↗
            </a>
          )}
        </div>
      </div>

      {/* Titre agrandi : text-lg → text-2xl */}
      <h3 className="font-syne font-bold text-2xl text-cream mb-3 group-hover:text-accent transition-colors">
        {project.title}
      </h3>

      <p className="font-mono text-xs text-muted leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Tech stack : icônes au lieu du texte */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <TechIcon key={t} name={t} />
        ))}
      </div>
    </article>
  );
}