import { motion } from "framer-motion";
import { eventTypes } from "@/lib/event-types";
import { Link } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function EventTypesSection() {
  return (
    <section id="fitur" className="py-12 bg-background">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Untuk Setiap <span className="text-gradient">Momen Spesial</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pilih jenis acara Anda dan temukan template yang sempurna
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-4"
        >
          {eventTypes.map((eventType) => (
            <motion.div key={eventType.id} variants={item}>
              <Link 
                to={`/register?event=${eventType.id}`}
                className={`card-interactive block p-3 md:p-4 text-center border-2 event-${eventType.id}`}
              >
                <img
                  src={eventType.icon}
                  alt={eventType.nameIndonesian}
                  loading="lazy"
                  className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-1 md:mb-2 object-contain"
                />
                <h3 className="font-semibold text-foreground text-xs md:text-sm mb-0.5">{eventType.nameIndonesian}</h3>
                <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-1 hidden sm:block">{eventType.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
