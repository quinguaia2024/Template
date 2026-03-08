const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <div className="absolute inset-0 rounded-md bg-primary animate-morphing" />
              <div className="absolute inset-[2px] rounded-md bg-background flex items-center justify-center">
                <span className="font-display text-[8px] font-bold text-primary">M</span>
              </div>
            </div>
            <span className="font-display text-sm font-bold">
              Mentor <span className="text-primary">IA</span>
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 Mentor IA. Transformando a educação em Angola.
          </p>

          <div className="flex items-center gap-6">
            {["Privacidade", "Termos", "Contacto"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
