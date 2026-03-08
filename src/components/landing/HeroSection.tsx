import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal, MagneticWrap, Parallax } from "./ScrollAnimations";
import heroBg from "@/assets/hero-bg.jpg";
import aiBrain from "@/assets/ai-brain.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.7], [0.35, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const brainY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const brainRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const brainScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background */}
        <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

        {/* Floating decorative particles */}
        {[...Array(6)].map((_, i) => (
          <Parallax
            key={i}
            speed={0.2 + i * 0.15}
            className="absolute pointer-events-none"
            style={{
              top: `${15 + i * 13}%`,
              left: `${5 + i * 16}%`,
            } as any}
          >
            <motion.div
              animate={{
                opacity: [0.15, 0.6, 0.15],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
              className={`rounded-full ${i % 2 === 0 ? 'bg-primary/30 w-1.5 h-1.5' : 'bg-secondary/20 w-1 h-1'}`}
            />
          </Parallax>
        ))}

        {/* Content grid */}
        <motion.div className="relative z-10 w-full px-8 grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto" style={{ y: textY }}>
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.div
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-px w-10 glow-line origin-left"
              />
              <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-light">
                Educação × Inteligência Artificial
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.8rem,7vw,7rem)] leading-[0.88] font-thin tracking-[-0.04em] text-foreground mb-8">
              <TextReveal>O futuro da</TextReveal>
              <br />
              <span className="text-gradient-primary">
                <TextReveal>educação</TextReveal>
              </span>
              <br />
              <TextReveal>começa aqui</TextReveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="max-w-sm text-sm font-light text-muted-foreground leading-relaxed mb-10"
            >
              Aprendizagem personalizada para cada aluno angolano, potencializada por IA.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="flex items-center gap-6"
            >
              <MagneticWrap>
                <a
                  href="#cta"
                  className="group inline-flex items-center gap-3 rounded-full border border-primary/40 px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-light text-primary transition-all duration-700 hover:bg-primary hover:text-primary-foreground"
                >
                  <span>Começar</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </a>
              </MagneticWrap>
              <MagneticWrap>
                <a href="#video" className="text-xs tracking-[0.15em] uppercase font-light text-muted-foreground hover:text-foreground transition-colors duration-500 flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-8 rounded-full border border-muted-foreground/30 flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  Ver vídeo
                </a>
              </MagneticWrap>
            </motion.div>
          </div>

          {/* Right — floating AI brain image */}
          <motion.div
            className="hidden lg:block relative"
            style={{ y: brainY, rotate: brainRotate, scale: brainScale }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img
                src={aiBrain}
                alt="Mentor IA Brain"
                className="w-full rounded-3xl opacity-90"
              />
              {/* Glow overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background via-transparent to-transparent" />
              {/* Orbiting dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-4 left-1/2 w-2 h-2 rounded-full bg-primary glow-dot" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-4 h-7 rounded-full border border-muted-foreground/20 flex justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-0.5 h-1.5 rounded-full bg-primary/60"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
