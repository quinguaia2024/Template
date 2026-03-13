import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Variant = "wave" | "pulse" | "orbit" | "glitch";

const SectionDivider = ({ variant = "wave" }: { variant?: Variant }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const glow = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);

  if (variant === "wave") {
    return (
      <div ref={ref} className="md:hidden relative h-20 overflow-hidden">
        <svg
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <motion.path
            d="M0,40 C80,10 120,70 200,40 C280,10 320,70 400,40"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,50 C100,20 150,80 250,40 C350,0 380,60 400,50"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="0.3"
            strokeOpacity="0.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
          />
        </svg>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
          style={{ opacity: glow }}
          animate={{ scale: [1, 2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div ref={ref} className="md:hidden relative h-16 flex items-center justify-center">
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          style={{ scaleX: lineScale, width: "80%" }}
        />
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-primary/50 mx-3"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "orbit") {
    return (
      <div ref={ref} className="md:hidden relative h-20 flex items-center justify-center">
        <motion.div
          className="absolute w-12 h-12 rounded-full border border-primary/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-secondary/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-secondary/60"
          />
        </motion.div>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
      </div>
    );
  }

  // glitch
  return (
    <div ref={ref} className="md:hidden relative h-14 flex items-center justify-center overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-primary/20"
          style={{
            width: `${20 + Math.random() * 40}%`,
            left: `${10 + Math.random() * 30}%`,
            top: `${20 + i * 15}%`,
          }}
          animate={{
            scaleX: [0, 1, 0],
            x: ["-10%", "10%", "-10%"],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
      <motion.div
        className="w-8 h-px bg-secondary/30"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
  );
};

export default SectionDivider;
