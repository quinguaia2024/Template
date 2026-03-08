import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "40%", label: "Taxa de reprovação no ensino técnico", color: "text-alert-red" },
  { value: "1:80", label: "Rácio professor-aluno em muitas escolas", color: "text-glow-amber" },
  { value: "72%", label: "Pais sem visibilidade do progresso", color: "text-alert-yellow" },
];

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problema" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient" />

      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-secondary">
            O Problema
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-16"
        >
          A educação técnica em Angola enfrenta desafios{" "}
          <span className="text-gradient-primary">que não podem esperar</span>
        </motion.h2>

        {/* Stats grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl bg-glass p-8 transition-all hover:border-glow"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className={`font-display text-5xl md:text-6xl font-extrabold ${stat.color}`}>
                {stat.value}
              </span>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pain points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid sm:grid-cols-3 gap-8 max-w-4xl"
        >
          {[
            { icon: "🎓", title: "Alunos", desc: "Sem personalização, aprendem todos ao mesmo ritmo — e muitos ficam para trás." },
            { icon: "👨‍👩‍👧", title: "Pais", desc: "Só descobrem os problemas quando já é tarde demais, sem alertas preventivos." },
            { icon: "👨‍🏫", title: "Professores", desc: "Sem ferramentas digitais para potencializar o ensino com tecnologia." },
          ].map((item, i) => (
            <div key={item.title} className="flex gap-4">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
