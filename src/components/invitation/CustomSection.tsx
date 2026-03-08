import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CustomSectionProps {
  backgroundUrl?: string;
  children: ReactNode;
  className?: string;
  overlay?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function CustomSection({
  backgroundUrl,
  children,
  className = "",
  overlay = "rgba(0,0,0,0.45)",
}: CustomSectionProps) {
  if (!backgroundUrl) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative ${className}`}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Parallax Background Image */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={backgroundUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${overlay} 0%, rgba(0,0,0,0.55) 50%, ${overlay} 100%)` }}
        />
      </motion.div>

      {/* Content with blur reveal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
