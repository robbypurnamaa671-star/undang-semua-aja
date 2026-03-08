import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ── Data sets ──────────────────────────────────────────────────────────
const eventTypes = [
  {
    id: "wedding",
    name: "Pernikahan",
    nameAdj: "Pernikahan",
    keywords: ["undangan pernikahan digital", "undangan nikah online", "website undangan nikah"],
    cta: "undangan pernikahan",
    icon: "💍",
  },
  {
    id: "khitanan",
    name: "Khitanan",
    nameAdj: "Khitanan",
    keywords: ["undangan khitanan digital", "undangan sunatan online"],
    cta: "undangan khitanan",
    icon: "🎉",
  },
  {
    id: "aqiqah",
    name: "Aqiqah",
    nameAdj: "Aqiqah",
    keywords: ["undangan aqiqah digital", "undangan aqiqah online"],
    cta: "undangan aqiqah",
    icon: "🐑",
  },
  {
    id: "birthday",
    name: "Ulang Tahun",
    nameAdj: "Ulang Tahun",
    keywords: ["undangan ulang tahun digital", "undangan birthday online"],
    cta: "undangan ulang tahun",
    icon: "🎂",
  },
];

const styles = [
  {
    id: "minimalist",
    name: "Minimalis",
    desc: "desain bersih, elegan dan simpel dengan warna-warna netral",
    keywords: ["minimalis", "simpel", "clean"],
  },
  {
    id: "elegant",
    name: "Elegan",
    desc: "tampilan mewah dan sophisticated dengan aksen emas dan tipografi serif",
    keywords: ["elegan", "mewah", "luxury"],
  },
  {
    id: "modern",
    name: "Modern",
    desc: "gaya kontemporer dengan layout dinamis dan tipografi bold",
    keywords: ["modern", "kontemporer", "trendy"],
  },
  {
    id: "islami",
    name: "Islami",
    desc: "ornamen islami dengan kaligrafi arab, motif geometris, dan warna-warna khas",
    keywords: ["islami", "islamic", "kaligrafi"],
  },
];

const cities = [
  { id: "jakarta", name: "Jakarta", province: "DKI Jakarta" },
  { id: "surabaya", name: "Surabaya", province: "Jawa Timur" },
  { id: "bandung", name: "Bandung", province: "Jawa Barat" },
  { id: "medan", name: "Medan", province: "Sumatera Utara" },
  { id: "semarang", name: "Semarang", province: "Jawa Tengah" },
  { id: "makassar", name: "Makassar", province: "Sulawesi Selatan" },
  { id: "palembang", name: "Palembang", province: "Sumatera Selatan" },
  { id: "tangerang", name: "Tangerang", province: "Banten" },
  { id: "depok", name: "Depok", province: "Jawa Barat" },
  { id: "bekasi", name: "Bekasi", province: "Jawa Barat" },
  { id: "yogyakarta", name: "Yogyakarta", province: "DI Yogyakarta" },
  { id: "bogor", name: "Bogor", province: "Jawa Barat" },
  { id: "malang", name: "Malang", province: "Jawa Timur" },
  { id: "solo", name: "Solo", province: "Jawa Tengah" },
  { id: "denpasar", name: "Denpasar", province: "Bali" },
  { id: "balikpapan", name: "Balikpapan", province: "Kalimantan Timur" },
  { id: "manado", name: "Manado", province: "Sulawesi Utara" },
  { id: "pontianak", name: "Pontianak", province: "Kalimantan Barat" },
  { id: "banjarmasin", name: "Banjarmasin", province: "Kalimantan Selatan" },
  { id: "padang", name: "Padang", province: "Sumatera Barat" },
  { id: "pekanbaru", name: "Pekanbaru", province: "Riau" },
  { id: "lampung", name: "Bandar Lampung", province: "Lampung" },
  { id: "cirebon", name: "Cirebon", province: "Jawa Barat" },
  { id: "batam", name: "Batam", province: "Kepulauan Riau" },
  { id: "samarinda", name: "Samarinda", province: "Kalimantan Timur" },
  { id: "tasikmalaya", name: "Tasikmalaya", province: "Jawa Barat" },
  { id: "purwokerto", name: "Purwokerto", province: "Jawa Tengah" },
  { id: "serang", name: "Serang", province: "Banten" },
  { id: "mataram", name: "Mataram", province: "NTB" },
  { id: "jambi", name: "Jambi", province: "Jambi" },
];

// ── Content generators ─────────────────────────────────────────────────

function generateEventStylePage(
  event: (typeof eventTypes)[0],
  style: (typeof styles)[0]
) {
  const slug = `undangan-${event.id}-${style.id}`;
  const title = `Undangan ${event.name} ${style.name} Digital`;
  const h1 = `Undangan Digital ${event.name} ${style.name} – Buat Online Gratis`;
  const metaTitle = `Undangan ${event.name} ${style.name} Digital | Buat Gratis – Undanganlink`;
  const metaDesc = `Buat undangan ${event.name.toLowerCase()} digital ${style.name.toLowerCase()} hanya 5 menit. Template ${style.desc}. Gratis, mudah, dan bisa langsung dibagikan lewat WhatsApp.`;

  const content = `
<p>Mencari <strong>undangan ${event.name.toLowerCase()} digital</strong> dengan desain <strong>${style.name.toLowerCase()}</strong>? Undanganlink menyediakan berbagai template undangan digital ${event.name.toLowerCase()} bergaya ${style.name.toLowerCase()} yang siap pakai dan bisa dikustomisasi sesuai keinginan Anda.</p>

<h2>Mengapa Memilih Undangan Digital ${event.name} ${style.name}?</h2>

<p>Di era digital saat ini, undangan cetak mulai ditinggalkan dan digantikan oleh undangan digital yang lebih praktis, hemat biaya, dan ramah lingkungan. Undangan digital ${event.name.toLowerCase()} dengan gaya ${style.name.toLowerCase()} menawarkan kesan yang ${style.desc}. Dengan Undanganlink, Anda bisa membuat undangan yang tidak hanya indah tetapi juga fungsional.</p>

<p>Berikut adalah beberapa alasan mengapa undangan digital ${style.name.toLowerCase()} menjadi pilihan populer:</p>
<ul>
<li><strong>Hemat biaya</strong> – Tidak perlu biaya cetak dan kirim. Semua proses dilakukan secara digital, sehingga Anda bisa menghemat anggaran acara.</li>
<li><strong>Ramah lingkungan</strong> – Mengurangi penggunaan kertas dan sampah. Pilihan yang tepat untuk Anda yang peduli lingkungan.</li>
<li><strong>Mudah dibagikan</strong> – Cukup kirim link via WhatsApp, Instagram, atau media sosial lainnya. Tamu bisa membuka undangan kapan saja dan di mana saja.</li>
<li><strong>Desain ${style.name.toLowerCase()}</strong> – ${style.desc.charAt(0).toUpperCase() + style.desc.slice(1)} yang sesuai dengan selera modern dan memberi kesan profesional.</li>
<li><strong>Fitur lengkap</strong> – RSVP online, buku tamu digital, galeri foto, countdown timer, dan amplop digital untuk transfer.</li>
</ul>

<h2>Fitur Undangan Digital ${event.name} ${style.name} di Undanganlink</h2>

<p>Undanganlink menyediakan berbagai fitur unggulan yang dirancang khusus untuk acara ${event.name.toLowerCase()} Anda:</p>

<h3>1. Template ${style.name} yang Beragam</h3>
<p>Kami menyediakan koleksi template ${style.name.toLowerCase()} yang dirancang secara profesional. Setiap template sudah dioptimalkan untuk tampilan yang sempurna di berbagai perangkat, mulai dari smartphone hingga desktop. Anda tinggal pilih template yang paling sesuai dengan tema acara ${event.name.toLowerCase()} Anda.</p>

<h3>2. RSVP Online Otomatis</h3>
<p>Kelola konfirmasi kehadiran tamu secara otomatis dengan fitur RSVP online. Tamu cukup klik tombol konfirmasi di undangan digital, dan Anda bisa memantau jumlah tamu yang akan hadir secara real-time melalui dashboard.</p>

<h3>3. Buku Tamu Digital</h3>
<p>Berikan ruang bagi tamu untuk menyampaikan ucapan dan doa melalui buku tamu digital. Semua ucapan tersimpan dengan rapi dan bisa Anda baca kapan saja sebagai kenangan indah dari acara ${event.name.toLowerCase()} Anda.</p>

<h3>4. Galeri Foto dan Video</h3>
<p>Tampilkan momen-momen spesial Anda dalam galeri foto yang terintegrasi langsung di undangan digital. Anda bisa mengunggah foto prewedding, foto keluarga, atau video pendek yang akan membuat undangan semakin personal dan berkesan.</p>

<h3>5. Countdown Timer</h3>
<p>Bangun antusiasme tamu dengan countdown timer yang menghitung mundur menuju hari spesial ${event.name.toLowerCase()} Anda. Fitur ini memberikan kesan eksklusif dan membuat tamu semakin menantikan acara.</p>

<h3>6. Amplop Digital</h3>
<p>Untuk tamu yang tidak bisa hadir secara langsung, fitur amplop digital memungkinkan mereka memberikan hadiah atau sumbangan melalui transfer bank. Nomor rekening ditampilkan dengan rapi di undangan.</p>

<h3>7. Musik Latar</h3>
<p>Tambahkan musik latar yang indah pada undangan digital Anda. Pilih dari koleksi musik yang tersedia atau gunakan URL YouTube favorit Anda untuk memberikan suasana yang sempurna.</p>

<h2>Cara Membuat Undangan ${event.name} ${style.name} Digital</h2>

<p>Membuat undangan digital di Undanganlink sangat mudah dan cepat. Ikuti langkah-langkah berikut:</p>

<ol>
<li><strong>Daftar akun gratis</strong> – Kunjungi Undanganlink dan buat akun dalam hitungan detik. Tidak perlu kartu kredit atau pembayaran di muka.</li>
<li><strong>Pilih jenis acara</strong> – Pilih "${event.name}" sebagai jenis acara Anda untuk mendapatkan template dan fitur yang sesuai.</li>
<li><strong>Pilih template ${style.name.toLowerCase()}</strong> – Browse koleksi template ${style.name.toLowerCase()} kami dan pilih yang paling sesuai dengan selera Anda.</li>
<li><strong>Isi detail acara</strong> – Masukkan informasi seperti nama, tanggal, waktu, lokasi, dan pesan undangan.</li>
<li><strong>Kustomisasi</strong> – Sesuaikan warna, font, foto, dan konten sesuai keinginan Anda.</li>
<li><strong>Publikasikan</strong> – Klik tombol publish dan undangan Anda siap dibagikan ke semua tamu melalui WhatsApp atau media sosial.</li>
</ol>

<h2>Keunggulan Undanganlink untuk Undangan ${event.name}</h2>

<p>Undanganlink bukan sekadar pembuat undangan digital biasa. Platform kami dirancang khusus untuk memenuhi kebutuhan acara di Indonesia dengan memperhatikan budaya dan kebiasaan lokal. Berikut keunggulan kami:</p>

<ul>
<li><strong>100% Bahasa Indonesia</strong> – Antarmuka dan template seluruhnya dalam Bahasa Indonesia, sehingga mudah digunakan oleh siapa saja.</li>
<li><strong>Desain budaya lokal</strong> – Template kami terinspirasi dari kekayaan budaya Indonesia, mulai dari motif batik hingga ornamen tradisional.</li>
<li><strong>Optimasi mobile</strong> – Karena sebagian besar orang Indonesia mengakses internet via smartphone, semua undangan kami dioptimalkan untuk tampilan mobile yang sempurna.</li>
<li><strong>Integrasi WhatsApp</strong> – Bagikan undangan langsung ke kontak WhatsApp dengan pesan yang sudah dipersonalisasi untuk setiap tamu.</li>
<li><strong>Gratis untuk fitur dasar</strong> – Mulai buat undangan tanpa biaya. Upgrade ke Premium hanya Rp12.000/bulan untuk fitur lengkap tanpa watermark.</li>
</ul>

<h2>Tips Memilih Desain ${style.name} untuk Undangan ${event.name}</h2>

<p>Memilih desain undangan yang tepat adalah langkah penting untuk memberikan kesan pertama yang baik kepada tamu. Berikut tips memilih desain ${style.name.toLowerCase()} yang sempurna:</p>

<ul>
<li><strong>Sesuaikan dengan tema acara</strong> – Pastikan desain undangan sejalan dengan konsep acara ${event.name.toLowerCase()} Anda secara keseluruhan.</li>
<li><strong>Perhatikan readability</strong> – Desain yang indah harus tetap mudah dibaca. Pastikan informasi penting seperti tanggal dan lokasi terlihat jelas.</li>
<li><strong>Gunakan foto berkualitas</strong> – Foto yang baik akan meningkatkan tampilan undangan secara signifikan. Gunakan foto dengan resolusi tinggi.</li>
<li><strong>Jangan berlebihan</strong> – Gaya ${style.name.toLowerCase()} mengutamakan ${style.id === "minimalist" ? "kesederhanaan" : style.id === "elegant" ? "kemewahan yang tertata" : style.id === "modern" ? "kekinian yang terstruktur" : "keindahan spiritual"}. Biarkan desain berbicara sendiri.</li>
</ul>
`.trim();

  const faq = [
    {
      question: `Berapa biaya membuat undangan ${event.name.toLowerCase()} digital ${style.name.toLowerCase()}?`,
      answer: `Anda bisa membuat undangan ${event.name.toLowerCase()} digital ${style.name.toLowerCase()} secara gratis di Undanganlink. Untuk fitur lengkap tanpa watermark, tersedia paket Premium mulai dari Rp12.000/bulan.`,
    },
    {
      question: `Apakah undangan digital ${event.name.toLowerCase()} ${style.name.toLowerCase()} bisa dibagikan via WhatsApp?`,
      answer: `Ya, setelah undangan dipublikasikan, Anda mendapat link unik yang bisa langsung dibagikan via WhatsApp, Telegram, Instagram, atau media sosial lainnya. Anda juga bisa mengirim dengan nama tamu yang dipersonalisasi.`,
    },
    {
      question: `Berapa lama waktu yang dibutuhkan untuk membuat undangan ${event.name.toLowerCase()} digital?`,
      answer: `Dengan Undanganlink, Anda bisa membuat undangan ${event.name.toLowerCase()} digital ${style.name.toLowerCase()} dalam waktu 5-10 menit saja. Cukup pilih template, isi detail acara, dan publikasikan.`,
    },
    {
      question: `Apakah ada template ${style.name.toLowerCase()} gratis untuk undangan ${event.name.toLowerCase()}?`,
      answer: `Ya, Undanganlink menyediakan beberapa template ${style.name.toLowerCase()} gratis yang bisa Anda gunakan. Untuk akses ke semua template premium, Anda bisa upgrade ke paket Premium.`,
    },
    {
      question: `Apakah tamu perlu download aplikasi untuk membuka undangan digital?`,
      answer: `Tidak, undangan digital dari Undanganlink berbasis website dan bisa diakses langsung melalui browser di smartphone, tablet, atau komputer tanpa perlu download aplikasi apapun.`,
    },
  ];

  const internalLinks = [
    { url: "/register", text: `Buat Undangan ${event.name} ${style.name} Gratis` },
    { url: "/templates", text: "Lihat Semua Template Undangan Digital" },
    { url: "/blog", text: "Tips & Inspirasi Undangan Digital" },
    { url: "/", text: "Undanganlink – Platform Undangan Digital Indonesia" },
  ];

  const keywords = [
    `undangan ${event.name.toLowerCase()} ${style.name.toLowerCase()}`,
    `undangan ${event.name.toLowerCase()} digital`,
    `undangan digital ${style.name.toLowerCase()}`,
    `template undangan ${event.name.toLowerCase()}`,
    ...event.keywords,
  ];

  return { slug, title, h1, metaTitle, metaDesc, content, faq, internalLinks, keywords, pageType: "event-style" };
}

function generateEventCityPage(
  event: (typeof eventTypes)[0],
  city: (typeof cities)[0]
) {
  const slug = `undangan-${event.id}-digital-${city.id}`;
  const title = `Undangan ${event.name} Digital ${city.name}`;
  const h1 = `Undangan Digital ${event.name} di ${city.name} – Buat Online Gratis`;
  const metaTitle = `Undangan ${event.name} Digital ${city.name} | Buat Gratis Online – Undanganlink`;
  const metaDesc = `Buat undangan ${event.name.toLowerCase()} digital untuk acara di ${city.name}, ${city.province}. Template elegan, RSVP online, dan bisa dibagikan via WhatsApp. Gratis!`;

  const content = `
<p>Sedang merencanakan acara <strong>${event.name.toLowerCase()}</strong> di <strong>${city.name}</strong>? Undanganlink hadir sebagai solusi undangan digital terbaik untuk warga ${city.name} dan sekitarnya. Buat undangan ${event.name.toLowerCase()} digital yang cantik dan fungsional dalam hitungan menit, tanpa biaya cetak dan tanpa ribet.</p>

<h2>Undangan Digital ${event.name} untuk Warga ${city.name}</h2>

<p>Sebagai salah satu kota terbesar di ${city.province}, ${city.name} memiliki kebutuhan yang tinggi akan undangan digital yang modern dan praktis. Dengan semakin banyaknya masyarakat ${city.name} yang aktif di dunia digital, undangan online menjadi pilihan yang semakin populer untuk berbagai acara ${event.name.toLowerCase()}.</p>

<p>Undanganlink memahami kebutuhan masyarakat ${city.name} akan undangan digital yang tidak hanya cantik tetapi juga mudah digunakan. Platform kami menyediakan berbagai template undangan ${event.name.toLowerCase()} yang bisa disesuaikan dengan budaya dan tradisi lokal ${city.name}.</p>

<h2>Mengapa Undangan Digital Populer di ${city.name}?</h2>

<p>Ada beberapa alasan mengapa undangan digital semakin banyak digunakan di ${city.name}:</p>

<ul>
<li><strong>Mobilitas tinggi</strong> – Warga ${city.name} yang aktif dan mobile membutuhkan solusi undangan yang praktis dan bisa diakses dari mana saja.</li>
<li><strong>Konektivitas internet</strong> – Dengan infrastruktur internet yang baik di ${city.name}, undangan digital bisa diakses dengan mudah oleh semua tamu.</li>
<li><strong>Efisiensi biaya</strong> – Di tengah tingginya biaya hidup di ${city.name}, undangan digital menjadi alternatif yang sangat hemat dibanding undangan cetak.</li>
<li><strong>Jangkauan luas</strong> – Untuk tamu yang berada di luar ${city.name} atau bahkan di luar negeri, undangan digital memastikan semua orang bisa menerima undangan.</li>
<li><strong>Tren modern</strong> – Masyarakat ${city.name} yang mengikuti tren teknologi terkini semakin banyak beralih ke undangan digital.</li>
</ul>

<h2>Fitur Undangan Digital ${event.name} di Undanganlink</h2>

<p>Undanganlink menawarkan berbagai fitur premium untuk undangan ${event.name.toLowerCase()} digital Anda:</p>

<h3>RSVP Online Real-time</h3>
<p>Kelola konfirmasi kehadiran tamu acara ${event.name.toLowerCase()} di ${city.name} secara otomatis. Dashboard real-time memungkinkan Anda memantau jumlah tamu yang akan hadir kapan saja. Ini sangat membantu untuk perencanaan venue dan catering di ${city.name}.</p>

<h3>Buku Tamu Digital</h3>
<p>Kumpulkan ucapan dan doa dari para tamu melalui buku tamu digital. Semua pesan tersimpan rapi dan bisa dibaca kapan saja sebagai kenangan indah dari acara ${event.name.toLowerCase()} Anda di ${city.name}.</p>

<h3>Galeri Foto</h3>
<p>Tampilkan momen-momen spesial Anda dalam galeri foto yang terintegrasi di undangan. Foto-foto yang diambil di spot-spot ikonik ${city.name} akan membuat undangan semakin personal dan berkesan.</p>

<h3>Amplop Digital</h3>
<p>Untuk tamu dari luar ${city.name} yang tidak bisa hadir langsung, fitur amplop digital memudahkan mereka memberikan hadiah melalui transfer bank langsung dari undangan.</p>

<h3>Peta Lokasi Interaktif</h3>
<p>Integrasikan peta lokasi venue acara di ${city.name} langsung di undangan. Tamu bisa langsung mendapatkan petunjuk arah ke lokasi acara ${event.name.toLowerCase()} Anda dengan satu klik.</p>

<h2>Cara Membuat Undangan ${event.name} Digital di ${city.name}</h2>

<p>Prosesnya sangat mudah dan cepat:</p>

<ol>
<li><strong>Daftar gratis</strong> – Buat akun Undanganlink dalam hitungan detik tanpa biaya apapun.</li>
<li><strong>Pilih template</strong> – Browse koleksi template undangan ${event.name.toLowerCase()} yang beragam dan pilih favorit Anda.</li>
<li><strong>Isi detail acara</strong> – Masukkan informasi acara ${event.name.toLowerCase()} Anda: nama, tanggal, waktu, dan lokasi di ${city.name}.</li>
<li><strong>Kustomisasi</strong> – Tambahkan foto, musik latar, dan sesuaikan desain sesuai selera.</li>
<li><strong>Publikasikan & bagikan</strong> – Kirim langsung ke tamu via WhatsApp atau media sosial.</li>
</ol>

<h2>Template Undangan ${event.name} untuk Acara di ${city.name}</h2>

<p>Undanganlink menawarkan berbagai pilihan template yang cocok untuk acara ${event.name.toLowerCase()} di ${city.name}:</p>

<ul>
<li><strong>Template Elegan</strong> – Desain mewah dengan aksen emas, cocok untuk acara formal di hotel-hotel premium ${city.name}.</li>
<li><strong>Template Modern</strong> – Gaya kontemporer yang sesuai dengan karakter urban ${city.name}.</li>
<li><strong>Template Minimalis</strong> – Desain simpel dan clean yang tetap memukau.</li>
<li><strong>Template Islami</strong> – Ornamen islami yang indah untuk acara ${event.name.toLowerCase()} bernuansa religius.</li>
</ul>

<h2>Harga Undangan Digital ${event.name} di Undanganlink</h2>

<p>Undanganlink menawarkan harga yang sangat terjangkau untuk warga ${city.name}:</p>

<ul>
<li><strong>Gratis</strong> – Template dasar dengan fitur standar. Cocok untuk yang ingin mencoba terlebih dahulu.</li>
<li><strong>Premium (Rp12.000/bulan)</strong> – Akses semua template, tanpa watermark, tamu unlimited, dan semua fitur premium.</li>
</ul>

<p>Dengan harga yang lebih murah dari secangkir kopi di ${city.name}, Anda sudah bisa memiliki undangan digital ${event.name.toLowerCase()} yang profesional dan berkesan.</p>
`.trim();

  const faq = [
    {
      question: `Apakah ada jasa undangan digital ${event.name.toLowerCase()} di ${city.name}?`,
      answer: `Ya, Undanganlink melayani pembuatan undangan digital ${event.name.toLowerCase()} untuk seluruh wilayah ${city.name} dan ${city.province}. Anda bisa membuat sendiri secara online kapan saja, tanpa harus bertemu langsung.`,
    },
    {
      question: `Berapa harga undangan digital ${event.name.toLowerCase()} di ${city.name}?`,
      answer: `Di Undanganlink, Anda bisa membuat undangan digital ${event.name.toLowerCase()} secara gratis. Untuk fitur premium tanpa watermark, biayanya hanya Rp12.000/bulan – jauh lebih hemat dibanding undangan cetak di ${city.name}.`,
    },
    {
      question: `Bisa tambahkan peta lokasi venue di ${city.name}?`,
      answer: `Tentu! Anda bisa menambahkan link Google Maps ke venue acara ${event.name.toLowerCase()} di ${city.name}. Tamu bisa langsung mendapatkan petunjuk arah dengan satu klik.`,
    },
    {
      question: `Apakah undangan digital bisa diakses tamu di luar ${city.name}?`,
      answer: `Ya, undangan digital dari Undanganlink bisa diakses dari mana saja di seluruh dunia. Cocok untuk tamu yang berada di luar ${city.name} atau bahkan di luar negeri.`,
    },
    {
      question: `Berapa lama proses pembuatan undangan digital ${event.name.toLowerCase()}?`,
      answer: `Hanya 5-10 menit! Pilih template, isi data acara ${event.name.toLowerCase()} Anda di ${city.name}, dan langsung publish. Undangan siap dibagikan via WhatsApp.`,
    },
  ];

  const internalLinks = [
    { url: "/register", text: `Buat Undangan ${event.name} Digital di ${city.name}` },
    { url: "/templates", text: "Lihat Semua Template Undangan Digital" },
    { url: `/p/undangan-${event.id}-digital`, text: `Undangan ${event.name} Digital Indonesia` },
    { url: "/", text: "Undanganlink – Platform Undangan Digital Terbaik" },
  ];

  const keywords = [
    `undangan ${event.name.toLowerCase()} digital ${city.name.toLowerCase()}`,
    `undangan digital ${city.name.toLowerCase()}`,
    `undangan ${event.name.toLowerCase()} ${city.name.toLowerCase()}`,
    `jasa undangan digital ${city.name.toLowerCase()}`,
  ];

  return { slug, title, h1, metaTitle, metaDesc, content, faq, internalLinks, keywords, pageType: "event-city" };
}

function generateStyleCityPage(
  style: (typeof styles)[0],
  city: (typeof cities)[0]
) {
  const slug = `undangan-digital-${style.id}-${city.id}`;
  const title = `Undangan Digital ${style.name} ${city.name}`;
  const h1 = `Undangan Digital ${style.name} di ${city.name} – Buat Gratis Online`;
  const metaTitle = `Undangan Digital ${style.name} ${city.name} | Template Gratis – Undanganlink`;
  const metaDesc = `Buat undangan digital ${style.name.toLowerCase()} untuk acara di ${city.name}. Desain ${style.desc}. RSVP online, buku tamu, dan kirim via WhatsApp. Gratis!`;

  const content = `
<p>Ingin membuat <strong>undangan digital</strong> dengan desain <strong>${style.name.toLowerCase()}</strong> untuk acara di <strong>${city.name}</strong>? Undanganlink menyediakan koleksi template undangan digital bergaya ${style.name.toLowerCase()} yang sempurna untuk berbagai acara di ${city.name} dan sekitarnya.</p>

<h2>Template Undangan Digital ${style.name} untuk ${city.name}</h2>

<p>Setiap template ${style.name.toLowerCase()} di Undanganlink dirancang dengan memperhatikan tren desain terkini dan preferensi masyarakat ${city.name}. Desain ${style.desc} yang kami tawarkan cocok untuk berbagai jenis acara, mulai dari pernikahan, khitanan, aqiqah, hingga ulang tahun.</p>

<p>Masyarakat ${city.name} yang dikenal dengan selera tinggi terhadap estetika akan menemukan template kami sesuai dengan ekspektasi mereka. Setiap detail dirancang untuk memberikan kesan profesional dan berkesan bagi para tamu undangan.</p>

<h2>Jenis Acara yang Cocok dengan Desain ${style.name}</h2>

<p>Template ${style.name.toLowerCase()} kami sangat versatile dan bisa digunakan untuk berbagai acara di ${city.name}:</p>

<ul>
<li><strong>Pernikahan</strong> – Desain ${style.name.toLowerCase()} memberikan kesan ${style.id === "minimalist" ? "elegan dan tidak berlebihan" : style.id === "elegant" ? "mewah dan prestigious" : style.id === "modern" ? "fresh dan kekinian" : "sakral dan penuh berkah"} untuk hari spesial Anda.</li>
<li><strong>Khitanan</strong> – Template yang sesuai untuk merayakan momen penting si kecil dengan desain yang ${style.name.toLowerCase()}.</li>
<li><strong>Aqiqah</strong> – Undangan yang tepat untuk menyambut kelahiran buah hati dengan gaya ${style.name.toLowerCase()}.</li>
<li><strong>Ulang Tahun</strong> – Rayakan hari istimewa dengan undangan digital ${style.name.toLowerCase()} yang berkesan.</li>
</ul>

<h2>Fitur Lengkap untuk Acara di ${city.name}</h2>

<p>Setiap undangan digital ${style.name.toLowerCase()} dari Undanganlink dilengkapi dengan fitur-fitur premium:</p>

<h3>Personalisasi untuk Setiap Tamu</h3>
<p>Kirim undangan dengan nama tamu yang dipersonalisasi. Setiap tamu di ${city.name} akan merasa spesial saat menerima undangan yang ditujukan khusus untuk mereka.</p>

<h3>Integrasi Peta ${city.name}</h3>
<p>Tambahkan lokasi venue acara Anda di ${city.name} dengan peta interaktif. Tamu bisa langsung mendapatkan navigasi ke lokasi acara.</p>

<h3>RSVP dan Manajemen Tamu</h3>
<p>Pantau konfirmasi kehadiran tamu secara real-time. Fitur ini sangat membantu untuk perencanaan logistik acara di ${city.name}, dari catering hingga pengaturan tempat duduk.</p>

<h3>Buku Tamu dan Ucapan</h3>
<p>Kumpulkan ucapan dan doa dari para tamu. Fitur buku tamu digital memungkinkan tamu yang berhalangan hadir tetap bisa menyampaikan pesan mereka.</p>

<h2>Keunggulan Undanganlink di ${city.name}</h2>

<ul>
<li><strong>Proses cepat</strong> – Buat undangan digital ${style.name.toLowerCase()} dalam 5 menit saja.</li>
<li><strong>Harga terjangkau</strong> – Gratis untuk template dasar, Premium hanya Rp12.000/bulan.</li>
<li><strong>Mobile-friendly</strong> – Tampil sempurna di semua smartphone yang digunakan warga ${city.name}.</li>
<li><strong>Dukungan WhatsApp</strong> – Bagikan langsung ke kontak WhatsApp dengan satu klik.</li>
<li><strong>Tanpa download</strong> – Tamu tidak perlu install aplikasi apapun untuk membuka undangan.</li>
</ul>

<h2>Cara Mulai Membuat Undangan Digital ${style.name} di ${city.name}</h2>

<ol>
<li>Daftar akun gratis di Undanganlink</li>
<li>Pilih jenis acara yang akan diselenggarakan di ${city.name}</li>
<li>Pilih template dengan gaya ${style.name.toLowerCase()}</li>
<li>Isi detail acara dan lokasi di ${city.name}</li>
<li>Publikasikan dan bagikan ke semua tamu</li>
</ol>
`.trim();

  const faq = [
    {
      question: `Apakah ada undangan digital ${style.name.toLowerCase()} untuk acara di ${city.name}?`,
      answer: `Ya, Undanganlink menyediakan berbagai template undangan digital ${style.name.toLowerCase()} yang bisa digunakan untuk acara di ${city.name}. Anda bisa langsung membuatnya secara online.`,
    },
    {
      question: `Berapa harga undangan digital ${style.name.toLowerCase()} di ${city.name}?`,
      answer: `Gratis untuk template dasar. Untuk akses semua template ${style.name.toLowerCase()} premium tanpa watermark, biayanya hanya Rp12.000/bulan.`,
    },
    {
      question: `Bisa custom desain ${style.name.toLowerCase()} sesuai keinginan?`,
      answer: `Ya, Anda bisa mengkustomisasi warna, foto, teks, dan berbagai elemen lainnya pada template ${style.name.toLowerCase()} kami agar sesuai dengan tema acara Anda di ${city.name}.`,
    },
    {
      question: `Apakah undangan digital bisa digunakan untuk semua jenis acara?`,
      answer: `Ya, template ${style.name.toLowerCase()} kami tersedia untuk pernikahan, khitanan, aqiqah, ulang tahun, dan berbagai acara lainnya di ${city.name}.`,
    },
  ];

  const internalLinks = [
    { url: "/register", text: `Buat Undangan Digital ${style.name} di ${city.name}` },
    { url: "/templates", text: "Lihat Semua Template Undangan" },
    { url: "/blog", text: "Inspirasi Undangan Digital" },
    { url: "/", text: "Undanganlink – Buat Undangan Digital Gratis" },
  ];

  const keywords = [
    `undangan digital ${style.name.toLowerCase()} ${city.name.toLowerCase()}`,
    `template undangan ${style.name.toLowerCase()}`,
    `undangan digital ${city.name.toLowerCase()}`,
  ];

  return { slug, title, h1, metaTitle, metaDesc, content, faq, internalLinks, keywords, pageType: "style-city" };
}

function generateEventOnlyPage(event: (typeof eventTypes)[0]) {
  const slug = `undangan-${event.id}-digital`;
  const title = `Undangan ${event.name} Digital`;
  const h1 = `Undangan Digital ${event.name} – Buat Gratis & Kirim via WhatsApp`;
  const metaTitle = `Undangan ${event.name} Digital | Buat Online Gratis – Undanganlink`;
  const metaDesc = `Buat undangan ${event.name.toLowerCase()} digital gratis di Undanganlink. Template elegan, RSVP online, buku tamu digital, galeri foto, dan kirim langsung via WhatsApp.`;

  const content = `
<p><strong>Undangan ${event.name.toLowerCase()} digital</strong> semakin menjadi pilihan utama masyarakat Indonesia modern. Dengan Undanganlink, Anda bisa membuat undangan ${event.name.toLowerCase()} yang cantik, fungsional, dan siap dibagikan via WhatsApp dalam waktu kurang dari 10 menit.</p>

<h2>Apa Itu Undangan ${event.name} Digital?</h2>

<p>Undangan ${event.name.toLowerCase()} digital adalah undangan berbasis website yang bisa diakses melalui link. Tidak seperti undangan cetak tradisional, undangan digital bisa dibagikan dengan mudah melalui WhatsApp, media sosial, atau email. Setiap tamu mendapatkan link personal yang bisa dibuka langsung dari smartphone mereka.</p>

<h2>Keunggulan Undangan ${event.name} Digital</h2>

<ul>
<li><strong>Hemat biaya</strong> – Tidak ada biaya cetak, desain grafis, atau pengiriman. Anda bisa membuat undangan profesional secara gratis.</li>
<li><strong>Praktis</strong> – Buat dan bagikan undangan dari mana saja, kapan saja, hanya dengan smartphone.</li>
<li><strong>Ramah lingkungan</strong> – Tidak menggunakan kertas, tinta, atau plastik. Pilihan yang bertanggung jawab untuk planet.</li>
<li><strong>Interaktif</strong> – Tamu bisa langsung RSVP, menulis ucapan, melihat peta lokasi, dan bahkan memberikan hadiah digital.</li>
<li><strong>Trackable</strong> – Pantau siapa saja yang sudah membuka undangan dan konfirmasi kehadiran secara real-time.</li>
</ul>

<h2>Fitur Undanganlink untuk ${event.name}</h2>

<h3>Template Beragam</h3>
<p>Pilih dari puluhan template ${event.name.toLowerCase()} dengan berbagai gaya: minimalis, elegan, modern, dan islami. Setiap template dirancang secara profesional dan bisa dikustomisasi sesuai selera Anda.</p>

<h3>RSVP Online</h3>
<p>Tamu bisa mengkonfirmasi kehadiran langsung dari undangan. Anda bisa memantau jumlah tamu yang hadir melalui dashboard yang mudah digunakan.</p>

<h3>Buku Tamu Digital</h3>
<p>Terima ucapan dan doa dari para tamu. Semua pesan tersimpan sebagai kenangan yang bisa dibaca kembali kapan saja.</p>

<h3>Galeri Foto</h3>
<p>Tampilkan foto-foto terbaik Anda di galeri yang terintegrasi langsung di undangan digital.</p>

<h3>Countdown Timer</h3>
<p>Bangun antusiasme dengan hitung mundur menuju hari ${event.name.toLowerCase()} Anda.</p>

<h3>Amplop Digital</h3>
<p>Tamu yang tidak bisa hadir bisa memberikan hadiah melalui transfer bank langsung dari undangan.</p>

<h3>Musik Latar</h3>
<p>Tambahkan musik yang indah untuk memberikan suasana yang sempurna saat tamu membuka undangan.</p>

<h2>Cara Membuat Undangan ${event.name} Digital</h2>

<ol>
<li><strong>Daftar gratis</strong> di Undanganlink</li>
<li><strong>Pilih jenis acara</strong> "${event.name}"</li>
<li><strong>Pilih template</strong> yang Anda suka</li>
<li><strong>Isi detail</strong> acara ${event.name.toLowerCase()}</li>
<li><strong>Publikasikan</strong> dan bagikan via WhatsApp</li>
</ol>

<h2>Harga Undangan ${event.name} Digital</h2>

<p>Undanganlink menawarkan dua paket:</p>
<ul>
<li><strong>Gratis</strong> – Template dasar, fitur standar, cocok untuk mencoba.</li>
<li><strong>Premium Rp12.000/bulan</strong> – Semua template, tanpa watermark, tamu unlimited, fitur lengkap.</li>
</ul>
`.trim();

  const faq = [
    {
      question: `Apakah undangan ${event.name.toLowerCase()} digital gratis?`,
      answer: `Ya, Anda bisa membuat undangan ${event.name.toLowerCase()} digital secara gratis di Undanganlink dengan template dasar. Untuk fitur premium, biayanya hanya Rp12.000/bulan.`,
    },
    {
      question: `Bagaimana cara membagikan undangan ${event.name.toLowerCase()} digital?`,
      answer: `Setelah dipublikasikan, Anda mendapat link unik yang bisa langsung dibagikan via WhatsApp, Telegram, Instagram, atau media sosial lainnya.`,
    },
    {
      question: `Apakah tamu perlu install aplikasi?`,
      answer: `Tidak. Undangan digital dari Undanganlink berbasis website dan bisa dibuka langsung di browser smartphone tanpa perlu download aplikasi apapun.`,
    },
    {
      question: `Bisa tambah musik di undangan ${event.name.toLowerCase()} digital?`,
      answer: `Ya, Anda bisa menambahkan musik latar pada undangan digital Anda menggunakan URL YouTube atau pilihan musik yang tersedia.`,
    },
  ];

  const internalLinks = [
    { url: "/register", text: `Buat Undangan ${event.name} Digital Sekarang` },
    { url: "/templates", text: "Lihat Template Undangan Digital" },
    { url: "/blog", text: "Tips Membuat Undangan Digital" },
  ];

  const keywords = [...event.keywords, `undangan ${event.name.toLowerCase()} digital`, `buat undangan ${event.name.toLowerCase()} online`];

  return { slug, title, h1, metaTitle, metaDesc, content, faq, internalLinks, keywords, pageType: "event-main" };
}

// ── Main handler ───────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const pages: any[] = [];

    // 1) Event-only pages (4)
    for (const event of eventTypes) {
      pages.push(generateEventOnlyPage(event));
    }

    // 2) Event × Style (4×4 = 16)
    for (const event of eventTypes) {
      for (const style of styles) {
        pages.push(generateEventStylePage(event, style));
      }
    }

    // 3) Event × City (4×30 = 120)
    for (const event of eventTypes) {
      for (const city of cities) {
        pages.push(generateEventCityPage(event, city));
      }
    }

    // 4) Style × City (4×30 = 120)
    for (const style of styles) {
      for (const city of cities) {
        pages.push(generateStyleCityPage(style, city));
      }
    }

    // Upsert in batches of 50
    let inserted = 0;
    let updated = 0;
    const batchSize = 50;

    for (let i = 0; i < pages.length; i += batchSize) {
      const batch = pages.slice(i, i + batchSize).map((p) => ({
        slug: p.slug,
        title: p.title,
        h1: p.h1,
        meta_title: p.metaTitle,
        meta_description: p.metaDesc,
        content: p.content,
        faq: p.faq,
        internal_links: p.internalLinks,
        keywords: p.keywords,
        page_type: p.pageType,
        status: "published",
        updated_at: new Date().toISOString(),
      }));

      const { data, error } = await supabase
        .from("seo_pages")
        .upsert(batch, { onConflict: "slug" })
        .select("id");

      if (error) {
        console.error("Batch error:", error);
        throw error;
      }

      inserted += data?.length || 0;
    }

    return new Response(
      JSON.stringify({
        success: true,
        total_pages: pages.length,
        breakdown: {
          event_only: eventTypes.length,
          event_style: eventTypes.length * styles.length,
          event_city: eventTypes.length * cities.length,
          style_city: styles.length * cities.length,
        },
        inserted,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
