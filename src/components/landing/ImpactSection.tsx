import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impacto" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-70" />

      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Impacto
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8"
          >
            Transformar a educação técnica em Angola,{" "}
            <span className="text-gradient-primary">criando um ecossistema</span>{" "}
            onde todos evoluem juntos
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16"
          >
            Professores, alunos e pais trabalham conectados, potencializados por inteligência artificial — sem limites de disciplinas.
          </motion.p>

          {/* Alert system visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center gap-4 rounded-2xl bg-glass p-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-alert-green animate-pulse" />
              <span className="text-sm text-foreground/70">Bom progresso</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-alert-yellow animate-pulse" style={{ animationDelay: "0.5s" }} />
              <span className="text-sm text-foreground/70">Atenção necessária</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-alert-red animate-pulse" style={{ animationDelay: "1s" }} />
              <span className="text-sm text-foreground/70">Risco elevado</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
