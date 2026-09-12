import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import eduBody from "@/assets/edu/edu-body.png";
import eduArm from "@/assets/edu/edu-arm.png";

export type EduMood = "idle" | "attentive" | "excited" | "sleeping" | "talking";

interface EduRigProps {
  mood: EduMood;
  className?: string;
}

// Posições medidas sobre edu-body.png (percentagens do contentor)
const EYE_L = { x: 35.4, y: 28.9 };
const EYE_R = { x: 59.6, y: 28.9 };
const EYE_R_W = 6.6; // raio do olho em % da largura
const MOUTH = { x: 47, y: 37.5, w: 12 };
const ARM = { left: 14, top: 46, width: 42, originX: 0.78, originY: 0.55 };

const EduRig = ({ mood, className }: EduRigProps) => {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const pupilLRef = useRef<SVGGElement>(null);
  const pupilRRef = useRef<SVGGElement>(null);
  const [blink, setBlink] = useState(false);
  const [waving, setWaving] = useState(false);
  const rafRef = useRef(0);
  const target = useRef({ x: 0, y: 0 });

  const sleeping = mood === "sleeping";
  const happy = mood === "excited";

  // Olhar que segue o ponteiro (um único listener, via rAF)
  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.29;
      target.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 1.6))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 0.9))),
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const dx = target.current.x * EYE_R_W * 0.32;
        const dy = target.current.y * EYE_R_W * 0.24;
        for (const ref of [pupilLRef, pupilRRef]) {
          ref.current?.setAttribute("transform", `translate(${dx} ${dy})`);
        }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  // Piscar irregular, com piscadela dupla ocasional
  useEffect(() => {
    if (reduceMotion || sleeping || happy) return;
    let t1: number, t2: number;
    const schedule = () => {
      t1 = window.setTimeout(() => {
        setBlink(true);
        t2 = window.setTimeout(() => {
          setBlink(false);
          if (Math.random() < 0.22) {
            t2 = window.setTimeout(() => {
              setBlink(true);
              t2 = window.setTimeout(() => setBlink(false), 130);
            }, 240);
          }
          schedule();
        }, 140);
      }, 2400 + Math.random() * 4200);
    };
    schedule();
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduceMotion, sleeping, happy]);

  // Aceno automático periódico
  useEffect(() => {
    if (reduceMotion) return;
    let id: number;
    const schedule = () => {
      id = window.setTimeout(() => {
        setWaving(true);
        window.setTimeout(() => setWaving(false), 1600);
        schedule();
      }, 9000 + Math.random() * 9000);
    };
    schedule();
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  // Acena sempre que fica animado
  useEffect(() => {
    if (mood === "excited") {
      setWaving(true);
      const id = window.setTimeout(() => setWaving(false), 1800);
      return () => window.clearTimeout(id);
    }
  }, [mood]);

  const eyeOpen = sleeping ? 0 : blink ? 0.08 : 1;

  const renderEye = (cx: number, key: string, pupilRef: React.RefObject<SVGGElement>) => {
    if (happy) {
      // Olhos felizes: arcos
      return (
        <path
          key={key}
          d={`M ${cx - EYE_R_W * 0.8} ${EYE_L.y + 1.2} Q ${cx} ${EYE_L.y - EYE_R_W * 0.9} ${cx + EYE_R_W * 0.8} ${EYE_L.y + 1.2}`}
          stroke="#7DF9FF"
          strokeWidth={1.6}
          strokeLinecap="round"
          fill="none"
        />
      );
    }
    return (
      <g key={key} style={{ transform: `scaleY(${eyeOpen})`, transformBox: "fill-box", transformOrigin: "center", transition: "transform 90ms ease" }}>
        <ellipse cx={cx} cy={EYE_L.y} rx={EYE_R_W * 0.82} ry={EYE_R_W * 1.05} fill="#F4FAFF" />
        <g ref={pupilRef}>
          <ellipse cx={cx} cy={EYE_L.y + 0.4} rx={EYE_R_W * 0.52} ry={EYE_R_W * 0.62} fill="#0A2540" />
          <ellipse cx={cx} cy={EYE_L.y + 0.55} rx={EYE_R_W * 0.4} ry={EYE_R_W * 0.46} fill="none" stroke="#18C8FF" strokeWidth={0.55} />
          <circle cx={cx - EYE_R_W * 0.18} cy={EYE_L.y - 0.35} r={EYE_R_W * 0.16} fill="#FFFFFF" />
        </g>
      </g>
    );
  };

  return (
    <div ref={rootRef} className={className} style={{ position: "relative" }}>
      <img src={eduBody} alt="EDU — Educador Digital do Mentor Digital" draggable={false} className="block h-auto w-full" />

      {/* Rosto vetorial: olhos + boca */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        {renderEye(EYE_L.x, "l", pupilLRef)}
        {renderEye(EYE_R.x, "r", pupilRRef)}
        {/* Boca */}
        {mood === "talking" ? (
          <ellipse cx={MOUTH.x} cy={MOUTH.y} rx={MOUTH.w * 0.28} ry={1.4} fill="#7A2E3A">
            <animate attributeName="ry" values="0.5;1.7;0.8;1.5;0.5" dur="0.9s" repeatCount="indefinite" />
          </ellipse>
        ) : sleeping ? (
          <path
            d={`M ${MOUTH.x - 2.4} ${MOUTH.y} Q ${MOUTH.x} ${MOUTH.y + 1.1} ${MOUTH.x + 2.4} ${MOUTH.y}`}
            stroke="#7A2E3A"
            strokeWidth={0.7}
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d={`M ${MOUTH.x - MOUTH.w * 0.32} ${MOUTH.y - 0.6} Q ${MOUTH.x} ${MOUTH.y + (happy ? 3.4 : 2.4)} ${MOUTH.x + MOUTH.w * 0.32} ${MOUTH.y - 0.6} Q ${MOUTH.x} ${MOUTH.y + (happy ? 1.6 : 0.9)} ${MOUTH.x - MOUTH.w * 0.32} ${MOUTH.y - 0.6} Z`}
            fill={happy ? "#8A3242" : "#7A2E3A"}
          />
        )}
        {sleeping && (
          <text x={EYE_R.x + 10} y={EYE_L.y - 6} fontSize={5} fill="#7DF9FF" opacity={0.8}>
            z
            <animate attributeName="y" values={`${EYE_L.y - 6};${EYE_L.y - 12}`} dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.85;0" dur="2.2s" repeatCount="indefinite" />
          </text>
        )}
      </svg>

      {/* Braço que acena */}
      <motion.img
        src={eduArm}
        alt=""
        aria-hidden
        draggable={false}
        initial={false}
        animate={
          waving
            ? { rotate: [0, -22, 8, -18, 6, 0] }
            : { rotate: 0 }
        }
        transition={waving ? { duration: 1.5, ease: "easeInOut" } : { duration: 0.35 }}
        style={{
          position: "absolute",
          left: `${ARM.left}%`,
          top: `${ARM.top}%`,
          width: `${ARM.width}%`,
          transformOrigin: `${ARM.originX * 100}% ${ARM.originY * 100}%`,
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default EduRig;
