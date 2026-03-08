import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CustomSectionProps {
  backgroundUrl?: string;
  children: ReactNode;
  className?: string;
  overlay?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.98,
    transition: { duration: 0.5 },
  },
};

const parallaxImage = {
  hidden: { scale: 1.15, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentReveal = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

export function CustomSection({
  backgroundUrl,
  children,
  className = "",
  overlay = "rgba(0,0,0,0.45)",
}: CustomSectionProps) {
  if (!backgroundUrl) {
    return (
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={`relative ${className}`}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Parallax Background Image */}
      <motion.div
        variants={parallaxImage}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={backgroundUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${overlay} 0%, rgba(0,0,0,0.55) 50%, ${overlay} 100%)` }}
        />
      </motion.div>

      {/* Content with blur reveal */}
      <motion.div
        variants={contentReveal}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

// Spectacular cover entrance for full-custom
export const customCoverVariants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -100,
    filter: "blur(12px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const customTextReveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: 0.3 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
