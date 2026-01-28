import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Pilih Jenis Acara",
    description: "Pilih jenis acara yang ingin Anda buat undangannya",
  },
  {
    number: "2",
    title: "Pilih Template",
    description: "Pilih desain template yang sesuai dengan selera Anda",
  },
  {
    number: "3",
    title: "Isi Detail Acara",
    description: "Masukkan informasi acara seperti nama, tanggal, dan lokasi",
  },
  {
    number: "4",
    title: "Bagikan",
    description: "Publikasikan dan bagikan undangan lewat WhatsApp",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Cara <span className="text-gradient">Membuat</span> Undangan
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hanya 4 langkah mudah untuk membuat undangan digital yang cantik
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
            
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex items-center gap-6 md:gap-12 mb-8 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number Circle */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-2xl font-bold shadow-gold z-10">
                  {step.number}
                </div>
                
                {/* Content Card */}
                <div className={`ml-28 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="card-elevated p-6 bg-card">
                    <h3 className="font-serif text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
