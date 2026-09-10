import techIcons from "../data/techIcons";

export default function SkillIcon({ name }) {
  const entry = techIcons[name];
  if (!entry) return null;

  const Icon = entry.icon;
  return (
    <div className="flex flex-col items-center gap-2 group w-20">
      <div className="w-16 h-16 flex items-center justify-center bg-[#14141c] border border-ghost-border rounded-md group-hover:border-accent transition-colors">
        <Icon size={28} color={entry.color} />
      </div>
      <span className="font-mono text-[11px] text-muted text-center group-hover:text-cream transition-colors">
        {name}
      </span>
    </div>
  );
}