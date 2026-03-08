import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticWrap } from "./ScrollAnimations";

const navItems = [
  { label: "Problema", href: "#problema" },
  { label: "Solução", href: "#solucao" },
  { label: "Processo", href: "#processo" },
  { label: "Impacto", href: "#impacto" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
    >
      <div className="flex items-center justify-between px-8 py-6">
        <a href="#" className="text-foreground text-sm tracking-[0.2em] uppercase font-light">
          Mentor <span className="text-primary mix-blend-normal">IA</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <MagneticWrap key={item.label}>
              <a
                href={item.href}
                className="text-foreground text-xs tracking-[0.15em] uppercase font-light opacity-60 hover:opacity-100 transition-opacity duration-500"
              >
                {item.label}
              </a>
            </MagneticWrap>
          ))}
        </div>

        <MagneticWrap>
          <a
            href="#cta"
            className="hidden md:inline-flex text-xs tracking-[0.15em] uppercase font-light text-primary border border-primary/30 rounded-full px-6 py-2.5 hover:bg-primary/10 transition-colors duration-500"
          >
            Começar
          </a>
        </MagneticWrap>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span animate={open ? { rotate: 45, y: 5 } : {}} className="block h-px w-6 bg-foreground" />
            <motion.span animate={open ? { opacity: 0 } : {}} className="block h-px w-6 bg-foreground" />
            <motion.span animate={open ? { rotate: -45, y: -5 } : {}} className="block h-px w-6 bg-foreground" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-0 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-3xl font-light tracking-wider text-foreground"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
