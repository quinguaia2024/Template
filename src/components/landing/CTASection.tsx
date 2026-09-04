import { motion } from "framer-motion";
import { FadeUp, MagneticWrap } from "./ScrollAnimations";
import { AUTH_ROUTES } from "@/auth/constants";

const CTASection = () => {
  return (
    <section id="cta" className="relative py-28 md:py-40 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] aspect-square rounded-full bg-primary/3 blur-[100px] md:blur-[150px] pointer-events-none" />

      <div className="relative z-10 px-5 md:px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-[clamp(2rem,8vw,5.5rem)] leading-[0.92] font-thin tracking-[-0.04em] mb-6 md:mb-8">
          Pronto para mudar o jogo?
        </h2>

        <FadeUp delay={0.3}>
          <p className="text-xs md:text-sm font-light text-foreground max-w-md mx-auto mb-8 md:mb-12">
            Registe-se para acesso antecipado. É gratuito.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
            <MagneticWrap>
              <motion.a
                href={AUTH_ROUTES.alunoLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 md:px-10 py-3.5 md:py-4 text-[11px] md:text-xs tracking-[0.15em] uppercase font-normal text-primary-foreground overflow-hidden active:opacity-90"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <span className="relative z-10">Entrar como Aluno</span>
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
                href={AUTH_ROUTES.tutorLogin}
                className="text-xs tracking-[0.15em] uppercase font-light text-foreground border border-foreground/30 rounded-full px-8 py-3.5 hover:bg-foreground/10 transition-colors duration-500"
              >
                Entrar como Tutor
              </a>
            </MagneticWrap>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default CTASection;
