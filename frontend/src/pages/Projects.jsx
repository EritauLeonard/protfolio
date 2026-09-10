import { useEffect } from "react";
import usePortfolioStore from "../store/portfolioStore";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { projects, isLoading, error, fetchProjects } = usePortfolioStore();

  useEffect(() => {
    fetchProjects(false); // tous les projets
  }, []);

  return (
    <div className="pt-16">
      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <span className="font-mono text-xs text-accent tracking-widest mb-4 block">
          // PROJETS
        </span>
        <h1 className="font-normal font-serif text-5xl md:text-8xl leading-[0.9] tracking-tighter mb-6 animate-fade-up">
          Mes <br />
          <span className="text-accent italic">réalisations</span>
        </h1>
        <p
          className="text-gray-400 text-lg max-w-xl mb-12 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Une sélection de projets personnels et professionnels — du frontend au
          backend complet.
        </p>

        {/* State management */}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-muted">
              Chargement des projets...
            </span>
          </div>
        )}

        {error && (
          <div className="border border-red-500/30 bg-red-500/10 rounded-sm px-4 py-3 font-mono text-xs text-red-400">
            {error}
          </div>
        )}

        {/* Grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
