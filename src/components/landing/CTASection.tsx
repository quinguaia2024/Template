import { motion } from "framer-motion";
import { TextReveal, FadeUp, MagneticWrap, RevealLine } from "./ScrollAnimations";

const CTASection = () => {
  return (
    <section id="cta" className="relative py-40 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-secondary/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] font-thin tracking-[-0.04em] mb-8">
          <TextReveal>Pronto para mudar o jogo?</TextReveal>
        </h2>

        <FadeUp delay={0.3}>
          <p className="text-sm font-light text-muted-foreground max-w-md mx-auto mb-12">
            Registe-se para acesso antecipado. É gratuito.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <MagneticWrap>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-xs tracking-[0.15em] uppercase font-normal text-primary-foreground overflow-hidden"
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10">Acesso antecipado</span>
                <motion.span
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </MagneticWrap>

            <MagneticWrap>
              <a
                href="#"
                className="text-xs tracking-[0.15em] uppercase font-light text-muted-foreground hover:text-foreground transition-colors duration-500"
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
