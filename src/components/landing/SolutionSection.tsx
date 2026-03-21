import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FadeUp, RevealLine } from "./ScrollAnimations";
import studentImg from "@/assets/student-visual.jpg";
import parentImg from "@/assets/parent-visual.jpg";
import teacherImg from "@/assets/teacher-visual.jpg";

const pillars = [
  {
    tag: "Alunos",
    title: "Aprende com o EDU",
    desc: "O teu educador digital que se adapta ao teu ritmo.",
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
    title: "O EDU aprende consigo",
    desc: "Envie materiais. O EDU personaliza o percurso.",
    img: teacherImg,
  },
];

/* Mobile 3D parallax card with gyroscope + scroll */
const Mobile3DCard = ({ pillar, index }: { pillar: typeof pillars[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll-driven 3D rotations
  const rawRotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [12, 4, 0, -4, -12]);
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.88, 1, 1, 0.88]);
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 120, damping: 20 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20 });

  // Touch/gyro tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 15 });
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const x = Math.max(-15, Math.min(15, (e.gamma || 0) * 0.4));
      const yVal = Math.max(-10, Math.min(10, ((e.beta || 0) - 40) * 0.3));
      tiltY.set(x);
      tiltX.set(-yVal);
    };
    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [tiltX, tiltY]);

  // Touch drag tilt
  const handleTouch = (e: React.TouchEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 20;
    const yVal = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * 15;
    tiltY.set(x);
    tiltX.set(-yVal);
  };

  const handleTouchEnd = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale,
        rotateX,
        perspective: 800,
      }}
      className="flex-shrink-0 w-[82vw] snap-center"
    >
      <motion.div
        style={{
          rotateX: springTiltX,
          rotateY: springTiltY,
          transformStyle: "preserve-3d",
        }}
        onTouchMove={handleTouch}
        onTouchEnd={handleTouchEnd}
        className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl"
      >
        {/* Parallax image layer */}
        <motion.img
          src={pillar.img}
          alt={pillar.tag}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            scale: 1.15,
            translateZ: -30,
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Shine/reflection effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0"
          style={{
            opacity: useTransform(springTiltY, [-15, 0, 15], [0.3, 0, 0.3]),
          }}
        />

        {/* Content - elevated Z layer */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5"
          style={{ translateZ: 40, transformStyle: "preserve-3d" }}
        >
          <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-xl border border-border/50 rounded-full px-3 py-1.5 mb-3">
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            <span className="text-[10px] tracking-[0.2em] uppercase font-light text-card-foreground">
              {pillar.tag}
            </span>
          </div>
          <h3 className="text-xl font-thin text-foreground leading-tight mb-1 drop-shadow-sm">
            {pillar.title}
          </h3>
          <p className="text-xs font-light text-muted-foreground">
            {pillar.desc}
          </p>
        </motion.div>

        {/* Card number - floating */}
        <motion.span
          className="absolute top-4 right-4 text-4xl font-thin text-foreground/10"
          style={{ translateZ: 60, transformStyle: "preserve-3d" }}
        >
          0{index + 1}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

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

        {/* Mobile: 3D parallax cards */}
        <div className="md:hidden" style={{ perspective: 1000 }}>
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-5 px-5 scrollbar-hide">
            {pillars.map((pillar, i) => (
              <Mobile3DCard key={pillar.tag} pillar={pillar} index={i} />
            ))}
          </div>
          {/* Scroll indicators */}
          <div className="flex justify-center mt-3 gap-2">
            {pillars.map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-0.5 rounded-full bg-foreground/20"
                whileInView={{ backgroundColor: "hsl(var(--primary))" }}
                viewport={{ margin: "-50%" }}
              />
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
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent rounded-2xl" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute bottom-6 left-6 inline-flex items-center gap-2 bg-card/90 backdrop-blur-xl border border-border/50 rounded-full px-4 py-2"
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            <span className="text-[10px] tracking-[0.2em] uppercase font-light text-card-foreground">
              {pillar.tag}
            </span>
          </motion.div>
        </motion.div>

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
