import { RevealLine } from "./ScrollAnimations";
import { MagneticWrap } from "./ScrollAnimations";

const Footer = () => {
  return (
    <footer className="relative py-16 px-8">
      <RevealLine className="mb-12" />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Logo */}
          <div>
            <span className="text-sm tracking-[0.2em] uppercase font-light text-foreground">
              Mentor <span className="text-primary">IA</span>
            </span>
            <p className="mt-4 text-xs font-light text-muted-foreground leading-[1.8] max-w-xs">
              Plataforma de aprendizagem personalizada movida a inteligência artificial, desenhada para transformar a educação técnica em Angola.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 font-light block mb-4">
                Plataforma
              </span>
              {["Alunos", "Professores", "Encarregados", "Escolas"].map((link) => (
                <MagneticWrap key={link}>
                  <a href="#" className="block text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-500 mb-2.5">
                    {link}
                  </a>
                </MagneticWrap>
              ))}
            </div>
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 font-light block mb-4">
                Empresa
              </span>
              {["Sobre nós", "Contacto", "Privacidade", "Termos"].map((link) => (
                <MagneticWrap key={link}>
                  <a href="#" className="block text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-500 mb-2.5">
                    {link}
                  </a>
                </MagneticWrap>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="md:text-right">
            <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50 font-light block mb-4">
              Made in Angola
            </span>
            <p className="text-xs font-light text-muted-foreground">
              © 2026 Mentor IA
            </p>
            <p className="text-[10px] font-light text-muted-foreground/40 mt-2">
              Transformando a educação, um aluno de cada vez.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
