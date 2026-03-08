import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, FadeUp, RevealLine, MagneticWrap } from "./ScrollAnimations";

const ImpactSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section id="impacto" ref={ref} className="relative py-40 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-50" />

      {/* Large rotating circle decoration */}
      <motion.div
        style={{ rotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full border border-primary/5 pointer-events-none"
      />

      <div className="relative z-10 px-8 max-w-5xl mx-auto text-center">
        <FadeUp>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 glow-line" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-light">
              Impacto
            </span>
            <div className="h-px w-12 glow-line" />
          </div>
        </FadeUp>

        <h2 className="text-[clamp(2rem,5vw,4rem)] leading-[1.1] font-thin tracking-[-0.02em] mb-10">
          <TextReveal>Transformar a educação técnica em Angola criando um ecossistema onde professores alunos e pais trabalham juntos potencializados por inteligência artificial</TextReveal>
        </h2>

        <FadeUp delay={0.3}>
          <p className="text-base font-light text-muted-foreground leading-[1.8] max-w-2xl mx-auto mb-16">
            Disciplinas ilimitadas. Qualquer professor pode contribuir com o seu material. A IA transforma tudo em experiências personalizadas. E cada interveniente do sistema educativo tem acesso à informação que precisa, quando precisa.
          </p>
        </FadeUp>

        <RevealLine className="max-w-md mx-auto mb-16" />

        {/* Alert system — interactive */}
        <FadeUp delay={0.4}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            {[
              { color: "bg-green-500", glow: "shadow-green-500/30", label: "Bom progresso", sub: "O aluno está no caminho certo" },
              { color: "bg-yellow-500", glow: "shadow-yellow-500/30", label: "Atenção", sub: "Sinais de dificuldade detectados" },
              { color: "bg-red-500", glow: "shadow-red-500/30", label: "Risco", sub: "Intervenção urgente necessária" },
            ].map((alert, i) => (
              <motion.div
                key={alert.label}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-glass cursor-none"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className={`w-4 h-4 rounded-full ${alert.color} shadow-lg ${alert.glow}`}
                />
                <span className="text-xs tracking-[0.15em] uppercase font-light text-foreground">
                  {alert.label}
                </span>
                <span className="text-[10px] font-light text-muted-foreground text-center max-w-[140px]">
                  {alert.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default ImpactSection;
