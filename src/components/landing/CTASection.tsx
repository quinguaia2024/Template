import { motion } from "framer-motion";
import { TextReveal, FadeUp, MagneticWrap, RevealLine } from "./ScrollAnimations";

const CTASection = () => {
  return (
    <section id="cta" className="relative py-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />

      <div className="relative z-10 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-thin tracking-[-0.03em] mb-8">
          <TextReveal>Pronto para mudar o jogo?</TextReveal>
        </h2>

        <FadeUp delay={0.3}>
          <p className="text-base font-light text-muted-foreground leading-[1.8] max-w-xl mx-auto mb-6">
            O Mentor IA está a construir o futuro da educação técnica em Angola. Um futuro onde cada aluno tem um caminho personalizado, cada professor é potencializado pela tecnologia, e cada família está informada e envolvida.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="text-sm font-light text-muted-foreground/60 max-w-lg mx-auto mb-14">
            Junte-se à revolução educacional. Registe-se para acesso antecipado — é completamente gratuito. Seja parte da mudança que Angola precisa.
          </p>
        </FadeUp>

        <FadeUp delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticWrap>
              <a
                href="#"
                className="group relative inline-flex items-center gap-4 rounded-full border border-primary/40 px-10 py-4 text-sm tracking-[0.1em] uppercase font-light text-primary transition-all duration-700 hover:bg-primary hover:text-primary-foreground overflow-hidden"
              >
                <span className="relative z-10">Acesso antecipado</span>
                <motion.svg
                  className="relative z-10 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </a>
            </MagneticWrap>

            <MagneticWrap>
              <a
                href="#"
                className="text-sm tracking-[0.1em] uppercase font-light text-muted-foreground hover:text-foreground transition-colors duration-500"
              >
                Contactar equipa
              </a>
            </MagneticWrap>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default CTASection;
