const BASE_URL = "https://undanganku.app";

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Undanganlink",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  url: BASE_URL,
  description:
    "Platform undangan digital Indonesia untuk pernikahan, khitanan, ulang tahun, dan acara spesial lainnya. Buat dan bagikan lewat WhatsApp.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
    description: "Gratis untuk template dasar",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
  },
};

export const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Undanganlink Premium",
  description:
    "Undangan digital premium tanpa watermark dengan akses semua template, tamu unlimited, dan fitur lengkap.",
  brand: { "@type": "Brand", name: "Undanganlink" },
  offers: {
    "@type": "Offer",
    price: "12000",
    priceCurrency: "IDR",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/InStock",
    url: `${BASE_URL}/#harga`,
  },
};

export const homepageFaqItems = [
  {
    question: "Apa itu undangan digital?",
    answer:
      "Undangan digital adalah undangan berbasis website yang bisa dibagikan melalui WhatsApp, media sosial, atau link. Berbeda dengan undangan cetak, undangan digital lebih hemat, ramah lingkungan, dan bisa diakses kapan saja dari smartphone.",
  },
  {
    question: "Bagaimana cara membuat undangan pernikahan digital di Undanganlink?",
    answer:
      "Cukup daftar akun gratis, pilih jenis acara (pernikahan, khitanan, ulang tahun, dll), pilih template yang Anda suka, isi detail acara, lalu publikasikan. Undangan Anda siap dibagikan lewat WhatsApp dalam hitungan menit.",
  },
  {
    question: "Apakah Undanganlink gratis?",
    answer:
      "Ya, Anda bisa membuat undangan digital secara gratis dengan template dasar. Untuk fitur premium seperti semua template, tanpa watermark, dan tamu unlimited, tersedia paket Premium seharga Rp12.000/bulan.",
  },
  {
    question: "Apakah undangan digital bisa diakses di semua perangkat?",
    answer:
      "Ya, undangan digital dari Undanganlink dioptimalkan untuk semua perangkat — smartphone, tablet, dan desktop. Tamu Anda bisa membuka undangan dari mana saja tanpa perlu download aplikasi.",
  },
  {
    question: "Fitur apa saja yang tersedia di Undanganlink?",
    answer:
      "Undanganlink menyediakan RSVP online, buku tamu digital, galeri foto, countdown timer, amplop digital untuk transfer, musik latar, dan berbagai template elegan untuk berbagai jenis acara.",
  },
  {
    question: "Bagaimana cara membagikan undangan digital?",
    answer:
      "Setelah undangan dipublikasikan, Anda mendapat link unik yang bisa dibagikan langsung melalui WhatsApp, Telegram, Instagram, atau media sosial lainnya. Anda juga bisa mengirim undangan dengan nama tamu yang dipersonalisasi.",
  },
];

export function buildFaqSchema(
  items: { question: string; answer: string }[]
) {
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
  logo: `${BASE_URL}/favicon.png`,
  description: "Platform undangan digital terbaik di Indonesia",
  sameAs: [],
};
