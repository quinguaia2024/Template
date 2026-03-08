import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-3 h-3 rounded-full bg-primary/40 animate-float" />
        <div className="absolute top-1/3 right-[15%] w-2 h-2 rounded-full bg-secondary/50 animate-float-delayed" />
        <div className="absolute bottom-1/3 left-[20%] w-4 h-4 rounded-full bg-primary/20 animate-pulse-glow" />
        <div className="absolute top-[20%] right-[30%] w-20 h-20 border border-primary/10 rounded-full animate-rotate-slow" />
        <div className="absolute bottom-[25%] right-[10%] w-32 h-32 border border-secondary/10 rounded-full animate-rotate-slow" style={{ animationDirection: "reverse" }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border-glow bg-muted/40 px-5 py-2 text-xs font-medium tracking-widest uppercase text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Plataforma de Aprendizagem com IA
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="text-gradient-primary">O futuro</span>
            <br />
            <span className="text-foreground">da educação</span>
            <br />
            <span className="text-foreground">em Angola</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10"
        >
          Um mentor inteligente que se adapta a cada aluno, conecta professores e mantém pais informados — tudo potencializado por IA.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:scale-105 glow-cyan"
          >
            <span>Explorar a plataforma</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#como-funciona"
            className="inline-flex items-center gap-2 rounded-full border-glow px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted/40"
          >
            <span>Como funciona</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
