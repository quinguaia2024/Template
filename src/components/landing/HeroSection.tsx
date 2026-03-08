import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal, MagneticWrap, Parallax } from "./ScrollAnimations";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div className="absolute inset-0" style={{ scale: imgScale, opacity: imgOpacity }}>
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity }}
        />

        {/* Floating decorative elements */}
        <Parallax speed={-0.3} className="absolute top-[15%] left-[8%]">
          <div className="w-px h-32 line-decoration" />
        </Parallax>
        <Parallax speed={0.4} className="absolute bottom-[20%] right-[12%]">
          <div className="w-1 h-1 rounded-full bg-primary/60 glow-dot" />
        </Parallax>
        <Parallax speed={-0.2} className="absolute top-[30%] right-[20%]">
          <div className="w-24 h-px glow-line" />
        </Parallax>
        <Parallax speed={0.6} className="absolute bottom-[35%] left-[15%]">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary/40" />
        </Parallax>

        {/* Content */}
        <motion.div className="relative z-10 w-full px-8" style={{ y: textY }}>
          {/* Top label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="h-px w-16 glow-line" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-light">
              Plataforma educacional com inteligência artificial
            </span>
          </motion.div>

          {/* Main headline — huge, light weight */}
          <div className="max-w-6xl">
            <h1 className="text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] font-thin tracking-[-0.03em] text-foreground">
              <TextReveal>O futuro da</TextReveal>
              <br />
              <span className="text-gradient-primary">
                <TextReveal>educação</TextReveal>
              </span>
              <br />
              <TextReveal>começa aqui</TextReveal>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="mt-10 max-w-lg text-base font-light text-muted-foreground leading-relaxed"
          >
            Mentor IA é uma plataforma de aprendizagem personalizada que transforma a educação técnica em Angola — adaptando-se ao ritmo de cada aluno, conectando professores e informando pais.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-12 flex items-center gap-8"
          >
            <MagneticWrap>
              <a
                href="#cta"
                className="group inline-flex items-center gap-4 text-sm tracking-[0.1em] uppercase font-light text-primary"
              >
                <span className="relative">
                  Explorar
                  <span className="absolute bottom-0 left-0 w-full h-px bg-primary/40 group-hover:bg-primary transition-colors duration-500" />
                </span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </a>
            </MagneticWrap>

            <span className="text-muted-foreground/30 text-xs">|</span>

            <MagneticWrap>
              <a
                href="#problema"
                className="text-sm tracking-[0.1em] uppercase font-light text-muted-foreground hover:text-foreground transition-colors duration-500"
              >
                Descobrir mais
              </a>
            </MagneticWrap>
          </motion.div>

          {/* Scroll indicator — bottom right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-12 right-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground/40 font-light [writing-mode:vertical-lr]">
                scroll
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
