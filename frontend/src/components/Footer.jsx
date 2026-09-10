export default function Footer() {
  return (
    <footer className="border-t border-ghost-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted tracking-widest">
          // PORTFOLIO — {new Date().getFullYear()}
        </span>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/toi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-cream transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/toi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-cream transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="razafimahatradraibeeritauleina@gmail.com"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            razafimahatradraibeeritauleina@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
