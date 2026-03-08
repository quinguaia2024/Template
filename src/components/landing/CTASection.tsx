import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div ref={ref} className="relative z-10 container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6"
        >
          Pronto para
          <br />
          <span className="text-gradient-primary">mudar o jogo?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-md mx-auto mb-10"
        >
          Junte-se à revolução da educação técnica em Angola. Comece agora — é gratuito.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#"
            className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground transition-all hover:scale-105 glow-cyan"
          >
            <span>Criar conta gratuita</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border-glow px-10 py-4 text-lg font-semibold text-foreground transition-all hover:bg-muted/40"
          >
            Falar connosco
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
