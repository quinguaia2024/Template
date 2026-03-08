import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    tag: "Para Alunos",
    title: "Mentor empático que se adapta a ti",
    desc: "A IA identifica o teu estilo de aprendizagem e cria um percurso único. Exercícios adaptativos, explicações personalizadas, e suporte 24/7.",
    features: ["Aprendizagem adaptativa", "Exercícios inteligentes", "Suporte contínuo"],
    gradient: "from-primary/20 to-primary/5",
    borderColor: "hover:border-primary/40",
    accentColor: "bg-primary",
    textColor: "text-primary",
  },
  {
    tag: "Para Pais",
    title: "Alertas de risco em tempo real",
    desc: "Sistema de semáforo (verde/amarelo/vermelho) que informa o estado do aluno antes que os problemas se agravem.",
    features: ["Dashboard intuitivo", "Alertas preventivos", "Relatórios semanais"],
    gradient: "from-secondary/20 to-secondary/5",
    borderColor: "hover:border-secondary/40",
    accentColor: "bg-secondary",
    textColor: "text-secondary",
  },
  {
    tag: "Para Professores",
    title: "A IA aprende com o teu material",
    desc: "Envie PDFs, vídeos e exercícios. A IA personaliza para cada aluno e dá-lhe visibilidade total do progresso.",
    features: ["Upload de conteúdos", "Analytics por aluno", "Disciplinas ilimitadas"],
    gradient: "from-glow-cyan/20 to-glow-amber/5",
    borderColor: "hover:border-glow-cyan/40",
    accentColor: "bg-glow-cyan",
    textColor: "text-glow-cyan",
  },
];

const SolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="solucao" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
            A Solução
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl mb-20"
        >
          Um ecossistema onde{" "}
          <span className="text-gradient-primary">todos evoluem juntos</span>
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.tag}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className={`group relative rounded-3xl bg-glass p-8 transition-all duration-500 ${pillar.borderColor}`}
            >
              {/* Top accent line */}
              <div className={`h-1 w-12 rounded-full ${pillar.accentColor} mb-6 transition-all duration-500 group-hover:w-20`} />

              <span className={`text-xs font-bold uppercase tracking-[0.2em] ${pillar.textColor}`}>
                {pillar.tag}
              </span>

              <h3 className="font-display text-xl font-bold text-foreground mt-3 mb-4 leading-snug">
                {pillar.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                {pillar.desc}
              </p>

              <div className="space-y-3">
                {pillar.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className={`h-1.5 w-1.5 rounded-full ${pillar.accentColor}`} />
                    <span className="text-sm text-foreground/80">{f}</span>
                  </div>
                ))}
              </div>

              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
