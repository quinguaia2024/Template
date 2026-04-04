import { useEffect, useRef, useCallback } from "react";

const CursorFollower = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  const animate = useCallback(() => {
    // Dot follows with very light smoothing for fluid feel
    dot.current.x += (mouse.current.x - dot.current.x) * 0.35;
    dot.current.y += (mouse.current.y - dot.current.y) * 0.35;

    // Ring follows with more lag for elastic feel
    ring.current.x += (mouse.current.x - ring.current.x) * 0.08;
    ring.current.y += (mouse.current.y - ring.current.y) * 0.08;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${dot.current.x - 5}px, ${dot.current.y - 5}px, 0)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${ring.current.x - 22}px, ${ring.current.y - 22}px, 0)`;
    }

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
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

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-2.5 w-2.5 rounded-full bg-primary will-change-transform"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 h-11 w-11 rounded-full border border-primary/50 transition-[opacity] duration-200 will-change-transform"
      />
    </div>
  );
};

export default CursorFollower;
