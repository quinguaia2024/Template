import { motion } from "framer-motion";
import { TextReveal, FadeUp, RevealLine, MagneticWrap } from "./ScrollAnimations";

const ImpactSection = () => {
  return (
    <section id="impacto" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-40" />

      {/* Large rotating rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full border border-primary/5"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full border border-secondary/5"
        />
      </div>

      <div className="relative z-10 px-8 max-w-4xl mx-auto text-center">
        <FadeUp>
          <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-light">
            Impacto
          </span>
        </FadeUp>

        <div className="my-8">
          <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.1] font-thin tracking-[-0.02em]">
            <TextReveal>Professores alunos e pais conectados por IA</TextReveal>
          </h2>
        </div>

        <RevealLine className="max-w-xs mx-auto mb-12" />

        {/* Visual alert system — interactive cards */}
        <FadeUp delay={0.3}>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-16">
            {[
              { color: "bg-green-500", shadow: "shadow-green-500/20", label: "Bom" },
              { color: "bg-yellow-500", shadow: "shadow-yellow-500/20", label: "Atenção" },
              { color: "bg-red-500", shadow: "shadow-red-500/20", label: "Risco" },
            ].map((a, i) => (
              <motion.div
                key={a.label}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex flex-col items-center gap-3 py-6 rounded-xl bg-glass"
              >
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className={`w-5 h-5 rounded-full ${a.color} shadow-lg ${a.shadow}`}
                />
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-foreground/70">
                  {a.label}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Key numbers */}
        <FadeUp delay={0.4}>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {[
              { label: "Disciplinas", value: "∞" },
              { label: "Disponível", value: "24/7" },
              { label: "Para todos", value: "100%" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <span className="text-3xl font-thin text-gradient-primary block">{item.value}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-muted-foreground mt-1 block">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default ImpactSection;
