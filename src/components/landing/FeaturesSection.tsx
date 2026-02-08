import { motion } from "framer-motion";
import { Palette, Smartphone, Share2, Clock, Sparkles, Shield } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Template Cantik",
    description: "Pilihan template elegan yang sudah siap pakai, tinggal isi konten Anda",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Tampilan sempurna di semua perangkat, terutama smartphone",
  },
  {
    icon: Share2,
    title: "Mudah Dibagikan",
    description: "Bagikan undangan lewat WhatsApp dengan satu klik",
  },
  {
    icon: Clock,
    title: "Proses Cepat",
    description: "Buat undangan dalam waktu kurang dari 10 menit",
  },
  {
    icon: Sparkles,
    title: "Customizable",
    description: "Sesuaikan warna, foto, dan pesan sesuai keinginan Anda",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Data Anda aman tersimpan dengan enkripsi modern",
  },
];

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

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30 pattern-batik">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Kenapa <span className="text-gradient">Undanganlink</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk membuat undangan digital yang sempurna
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="card-elevated p-6 md:p-8 bg-card"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
