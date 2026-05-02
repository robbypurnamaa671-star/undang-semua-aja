const BASE_URL = "https://undanganku.app";

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Undanganlink",
  applicationCategory: "LifestyleApplication",
  applicationSubCategory: "Digital Invitation Maker",
  operatingSystem: "Web",
  description:
    "Platform undangan digital Indonesia untuk pernikahan, khitanan, ulang tahun & acara spesial. Buat undangan online gratis dengan RSVP, buku tamu, galeri foto & berbagi via WhatsApp.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
    description: "Paket Basic gratis selamanya",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
  },
  url: BASE_URL,
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Undanganlink Premium",
  description:
    "Undangan digital premium tanpa watermark dengan semua template eksklusif, RSVP, buku tamu digital, galeri foto, dan fitur lengkap lainnya.",
  offers: {
    "@type": "Offer",
    price: "12000",
    priceCurrency: "IDR",
    availability: "https://schema.org/InStock",
    url: `${BASE_URL}/#harga`,
  },
};

export const homepageFaqItems = [
  {
    question: "Apa itu undangan digital?",
    answer:
      "Undangan digital adalah undangan acara dalam bentuk website yang bisa dibagikan melalui WhatsApp, media sosial, atau email. Lebih praktis, hemat, dan ramah lingkungan dibanding undangan cetak.",
  },
  {
    question: "Apakah Undanganlink gratis?",
    answer:
      "Ya! Kami menyediakan paket Basic yang gratis selamanya. Anda bisa membuat undangan dengan template pilihan, RSVP, dan buku tamu digital. Upgrade ke Premium untuk menghilangkan watermark dan akses semua fitur.",
  },
  {
    question: "Berapa harga paket Premium?",
    answer:
      "Paket Premium hanya Rp 12.000 per bulan (langganan bulanan). Sudah termasuk semua template, undangan unlimited, tanpa watermark, RSVP lengkap, buku tamu digital, galeri foto, amplop digital, dan semua fitur premium lainnya.",
  },
  {
    question: "Bagaimana cara membagikan undangan?",
    answer:
      "Setelah selesai membuat undangan, Anda akan mendapatkan link unik yang bisa langsung dibagikan via WhatsApp, Instagram, Telegram, atau media sosial lainnya. Sangat mudah dan praktis!",
  },
  {
    question: "Apakah bisa menambahkan nama tamu di undangan?",
    answer:
      "Ya, Anda bisa menambahkan daftar tamu dan setiap tamu akan mendapat link personal dengan nama mereka tercetak di undangan. Fitur ini tersedia di semua paket.",
  },
  {
    question: "Jenis acara apa saja yang didukung?",
    answer:
      "Undanganlink mendukung berbagai jenis acara: pernikahan, khitanan/sunat, ulang tahun, aqiqah, tunangan, wisuda, dan acara spesial lainnya. Setiap jenis acara memiliki template yang dirancang khusus.",
  },
];

export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Undanganlink",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.png?v=4`,
  sameAs: [],
};
