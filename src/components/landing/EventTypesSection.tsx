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
    <section id="fitur" className="py-20 bg-background">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {eventTypes.map((eventType) => (
            <motion.div key={eventType.id} variants={item}>
              <Link 
                to={`/register?event=${eventType.id}`}
                className={`card-interactive block p-6 text-center border-2 event-${eventType.id}`}
              >
                <span className="text-4xl mb-3 block">{eventType.icon}</span>
                <h3 className="font-semibold text-foreground mb-1">{eventType.nameIndonesian}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{eventType.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
