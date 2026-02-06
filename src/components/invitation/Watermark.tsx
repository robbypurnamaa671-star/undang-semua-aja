import { motion } from "framer-motion";

interface WatermarkProps {
  templateColors?: {
    primary: string;
    background: string;
  };
}

export function Watermark({ templateColors }: WatermarkProps) {
  return (
    <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
      {/* Diagonal repeating watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative w-[200%] h-[200%] -rotate-45"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(8, 1fr)",
            gap: "2rem",
          }}
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center opacity-[0.08]"
              style={{ color: templateColors?.primary || "hsl(var(--primary))" }}
            >
              <span className="text-xl sm:text-2xl font-bold whitespace-nowrap tracking-wider">
                PREVIEW
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom banner */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 py-3 px-4 text-center pointer-events-auto"
        style={{ 
          backgroundColor: templateColors?.primary || "hsl(var(--primary))",
          color: templateColors?.background || "hsl(var(--background))",
        }}
      >
        <p className="text-sm font-medium">
          🔒 Ini adalah preview. Bayar untuk menghapus watermark.
        </p>
      </motion.div>
    </div>
  );
}
