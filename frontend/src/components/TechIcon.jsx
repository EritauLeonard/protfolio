import techIcons from "../data/techIcons";

export default function TechIcon({ name }) {
  const entry = techIcons[name];

  // Si l'icône n'existe pas encore dans techIcons.js, on affiche le nom en texte
  // au lieu de rien afficher — comme ça rien ne casse visuellement.
  if (!entry) {
    return (
      <span className="font-mono text-[10px] px-2 py-1 rounded-sm bg-accent-dim text-accent border border-accent/20">
        {name}
      </span>
    );
  }

  const Icon = entry.icon;
  return (
    <div
      title={name}
      className="w-8 h-8 flex items-center justify-center bg-[#14141c] border border-ghost-border rounded-sm hover:border-accent transition-colors"
    >
      <Icon size={16} color={entry.color} />
    </div>
  );
}