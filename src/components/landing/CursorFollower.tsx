import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springX = useSpring(trailX, { damping: 25, stiffness: 200 });
  const springY = useSpring(trailY, { damping: 25, stiffness: 200 });

  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-magnetic]")) {
        ringRef.current?.classList.add("scale-[2.5]", "opacity-50");
        dotRef.current?.classList.add("scale-0");
      }
    };

    const handleOut = () => {
      ringRef.current?.classList.remove("scale-[2.5]", "opacity-50");
      dotRef.current?.classList.remove("scale-0");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-primary transition-transform duration-150"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 h-8 w-8 rounded-full border border-primary/50 transition-all duration-300"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
};

export default CursorFollower;
