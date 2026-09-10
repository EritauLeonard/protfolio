import { useEffect, useRef, useState } from "react";

export default function SkillBar({ name, level, delay = 0 }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justifybetween items-center mb-2">
        <span className="font-mono text-sm text-cream tracking-wide">{name}</span>
        <span
          className="font-mono text-xs font-bols tracking-widest"
          style={{ color: "#7f6aff" }}
        >
          {level}%
        </span>
      </div>

      {/* Barre de fond */}
      <div
        className="relative overflow-hidden rounded-sm"
        style={{ height: "5px", backgroundColor: "rgba(127, 106, 255, 0.15)"}}  
      >

        {/* Barre de progression */}
        <div
          className="absolute top-0 left-0 h-full rounded-sm"
          style={{
            width: animated ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #7f6aff, #a78bfa)",
            transition: `width 900ms ease-out ${delay}ms`,
            boxShadow: "0 0 8px rgba(127,106,255,0.6)",
          }}  
        />
      </div>
    </div>
  );
}
