import { RevealLine, MagneticWrap } from "./ScrollAnimations";

const Footer = () => {
  return (
    <footer className="relative py-12 md:py-16 px-5 md:px-8">
      <RevealLine className="mb-10 md:mb-12" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 items-start">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-sm tracking-[0.2em] uppercase font-light text-foreground">
              Mentor <span className="text-primary">Digital</span>
            </span>
            <p className="mt-3 text-base font-light text-foreground leading-[1.8] max-w-xs">
              Plataforma de aprendizagem personalizada para Angola. Aprende com EDU — o teu educador digital.
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-foreground font-light block mb-3">
              Plataforma
            </span>
            {["Alunos", "Professores", "Encarregados", "Escolas"].map((link) =>
            <MagneticWrap key={link}>
                <a href="#" className="block text-base font-light text-foreground hover:text-foreground active:text-foreground transition-colors duration-500 mb-2 py-0.5">
                  {link}
                </a>
              </MagneticWrap>
            )}
          </div>

          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-foreground font-light block mb-3">
              Empresa
            </span>
            {["Sobre nós", "Contacto", "Privacidade", "Termos"].map((link) =>
            <MagneticWrap key={link}>
                <a href="#" className="block text-base font-light text-foreground hover:text-foreground active:text-foreground transition-colors duration-500 mb-2 py-0.5">
                  {link}
                </a>
              </MagneticWrap>
            )}
          </div>
        </div>

        <div className="mt-10 md:mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p className="text-sm font-light text-foreground">
            © 2026 Mentor Digital
          </p>
          <p className="text-sm font-light text-foreground">
            Multiverse Development
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;