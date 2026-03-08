import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeUp, RevealLine } from "./ScrollAnimations";
import studentImg from "@/assets/student-visual.jpg";
import parentImg from "@/assets/parent-visual.jpg";
import teacherImg from "@/assets/teacher-visual.jpg";

const pillars = [
  {
    tag: "Alunos",
    title: "Aprende ao teu ritmo",
    desc: "IA que se adapta ao teu estilo.",
    img: studentImg,
  },
  {
    tag: "Encarregados",
    title: "Alertas em tempo real",
    desc: "Saiba sempre como está o seu filho.",
    img: parentImg,
  },
  {
    tag: "Professores",
    title: "A IA aprende consigo",
    desc: "Envie materiais. Veja o progresso.",
    img: teacherImg,
  },
];

const SolutionSection = () => {
  return (
    <section id="solucao" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />

      <div className="relative z-10 px-5 md:px-8 max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-px w-10 bg-primary origin-left"
            />
            <span className="text-[10px] tracking-[0.4em] uppercase text-primary font-light">
              A solução
            </span>
          </div>
        </FadeUp>

        <h2 className="text-[clamp(1.5rem,6vw,3.5rem)] leading-[1.05] font-thin tracking-[-0.02em] max-w-3xl mb-12 md:mb-24">
          Um ecossistema onde todos evoluem juntos
        </h2>

        {/* Mobile: swipeable horizontal scroll. Desktop: stacked with parallax */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scrollbar-hide">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.tag}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-[80vw] snap-center"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <img src={pillar.img} alt={pillar.tag} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="inline-flex items-center gap-2 bg-glass rounded-full px-3 py-1.5 mb-3">
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                      />
                      <span className="text-[10px] tracking-[0.2em] uppercase font-light text-foreground">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-thin text-foreground leading-tight mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-light text-muted-foreground">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Scroll hint */}
          <div className="flex justify-center mt-4 gap-1.5">
            {pillars.map((_, i) => (
              <div key={i} className="w-6 h-0.5 rounded-full bg-foreground/15" />
            ))}
          </div>
        </div>

        {/* Desktop: full layout with parallax */}
        <div className="hidden md:block space-y-32">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.tag} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PillarCard = ({ pillar, index }: { pillar: typeof pillars[0]; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 1]);
  const reverse = index % 2 !== 0;

  return (
    <div ref={ref}>
      <RevealLine className="mb-12" />
      <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
        {/* Image side */}
        <motion.div
          className={`relative overflow-hidden rounded-2xl ${reverse ? 'lg:order-2' : ''}`}
          style={{ y: imgY }}
        >
          <motion.div style={{ scale: imgScale }}>
            <motion.img
              src={pillar.img}
              alt={pillar.tag}
              className="w-full aspect-[4/3] object-cover rounded-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent rounded-2xl" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-6 left-6 inline-flex items-center gap-2 bg-glass rounded-full px-4 py-2"
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            <span className="text-[10px] tracking-[0.2em] uppercase font-light text-foreground">
              {pillar.tag}
            </span>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <div className={`${reverse ? 'lg:order-1 lg:text-right' : ''}`}>
          <FadeUp>
            <span className="text-6xl font-thin text-primary/15 block mb-4">
              0{index + 1}
            </span>
            <h3 className="text-2xl md:text-4xl font-thin text-foreground leading-tight mb-4">
              {pillar.title}
            </h3>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-sm">
              {pillar.desc}
            </p>
          </FadeUp>
        </div>
      </div>
    </div>
  );
};

export default SolutionSection;
