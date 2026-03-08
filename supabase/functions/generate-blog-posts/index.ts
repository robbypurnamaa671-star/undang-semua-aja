import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ── Keyword clusters ──────────────────────────────────────────────
const clusters: { name: string; keywords: string[] }[] = [
  {
    name: "Wedding Invitation Ideas",
    keywords: [
      "inspirasi desain undangan digital pernikahan",
      "contoh undangan pernikahan modern",
      "tema undangan pernikahan minimalis",
      "template undangan nikah elegan",
      "desain undangan pernikahan aesthetic",
      "undangan pernikahan digital mewah",
      "ide undangan pernikahan unik",
      "undangan pernikahan simple dan elegan",
      "inspirasi undangan nikah online",
      "desain undangan pernikahan floral",
      "undangan pernikahan tema rustic",
      "undangan digital pernikahan vintage",
      "undangan pernikahan tema garden party",
      "desain undangan pernikahan islami modern",
      "undangan pernikahan tema alam",
      "undangan pernikahan warna pastel",
      "undangan pernikahan tema gold",
      "undangan pernikahan tema bunga sakura",
      "inspirasi undangan pernikahan outdoor",
      "undangan pernikahan tema bohemian",
      "desain undangan pernikahan watercolor",
      "undangan digital pernikahan premium",
      "undangan pernikahan tema rose gold",
      "undangan pernikahan foto prewedding",
      "desain undangan nikah digital kekinian",
      "undangan pernikahan tema navy blue",
      "undangan pernikahan tema greenery",
      "undangan pernikahan warna sage green",
      "undangan pernikahan tema tropical",
      "desain undangan pernikahan marble",
      "undangan pernikahan tema dusty pink",
      "undangan pernikahan modern 2025",
      "undangan pernikahan tema bunga mawar",
      "inspirasi undangan digital pernikahan terbaru",
      "undangan nikah digital keren",
      "undangan pernikahan tema classic",
      "desain undangan pernikahan simpel",
      "undangan pernikahan tema eucalyptus",
      "undangan digital pernikahan gratis",
      "undangan pernikahan tema cherry blossom",
      "inspirasi undangan pernikahan tradisional",
      "undangan pernikahan tema senja",
      "desain undangan pernikahan calligraphy",
      "undangan pernikahan tema natural",
      "undangan pernikahan tema lavender",
      "undangan pernikahan tema hitam putih",
      "undangan pernikahan tema peach",
      "undangan pernikahan tema bunga tulip",
      "undangan pernikahan tema minimalist luxury",
      "desain undangan pernikahan nusantara",
    ],
  },
  {
    name: "Invitation Wording",
    keywords: [
      "kata kata undangan pernikahan",
      "kata kata undangan nikah whatsapp",
      "contoh teks undangan pernikahan",
      "kata kata undangan pernikahan islami",
      "kata kata undangan nikah bahasa indonesia",
      "contoh kata kata undangan pernikahan singkat",
      "kata kata undangan pernikahan adat jawa",
      "ucapan undangan pernikahan formal",
      "kata kata undangan pernikahan kristen",
      "contoh undangan pernikahan bahasa inggris",
      "kata kata undangan pernikahan adat sunda",
      "kata kata undangan nikah bahasa arab",
      "contoh undangan pernikahan resmi",
      "kata kata undangan pernikahan sopan",
      "kata kata undangan pernikahan romantis",
      "ucapan undangan pernikahan simple",
      "kata kata undangan pernikahan batak",
      "contoh undangan pernikahan katolik",
      "kata kata undangan pernikahan hindu bali",
      "contoh teks undangan walimatul ursy",
      "kata kata undangan pernikahan minang",
      "kata kata undangan pernikahan bugis",
      "kata kata undangan nikah muda",
      "contoh undangan pernikahan militer",
      "kata kata undangan pernikahan campuran",
      "kata kata undangan resepsi pernikahan",
      "contoh undangan akad nikah",
      "kata kata undangan pernikahan adat betawi",
      "ucapan undangan pernikahan puitis",
      "kata kata undangan pernikahan lucu",
      "contoh undangan pernikahan outdoor",
      "kata kata undangan pernikahan adat bali",
      "contoh undangan pernikahan intimate wedding",
      "kata kata undangan syukuran pernikahan",
      "contoh undangan pernikahan garden party",
      "kata kata undangan pernikahan bahasa jawa",
      "contoh undangan pernikahan adat melayu",
      "kata kata undangan nikah virtual",
      "contoh undangan pernikahan musim hujan",
      "kata kata undangan pernikahan adat dayak",
      "contoh undangan pernikahan di hotel",
      "kata kata undangan pernikahan sederhana",
      "ucapan undangan pernikahan modern",
      "contoh undangan pernikahan double date",
      "kata kata undangan pernikahan adat madura",
      "contoh undangan pernikahan di rumah",
      "kata kata undangan pernikahan adat manado",
      "contoh undangan pernikahan di gedung",
      "kata kata undangan pernikahan adat aceh",
      "contoh undangan pernikahan di masjid",
    ],
  },
  {
    name: "How-To Guides",
    keywords: [
      "cara membuat undangan digital",
      "cara membuat undangan pernikahan online",
      "cara membuat website undangan",
      "cara membuat undangan digital gratis",
      "cara buat undangan online sendiri",
      "cara desain undangan pernikahan",
      "cara membuat undangan digital di hp",
      "cara kirim undangan digital via whatsapp",
      "cara membuat undangan pernikahan di canva",
      "cara membuat qr code undangan",
      "cara membuat rsvp online",
      "cara membuat undangan digital dengan musik",
      "tutorial membuat undangan pernikahan digital",
      "cara membuat undangan pernikahan pdf",
      "panduan lengkap undangan digital",
      "cara membuat undangan digital islami",
      "cara membuat undangan pernikahan video",
      "langkah membuat undangan online",
      "cara membuat undangan digital animasi",
      "cara membuat undangan pernikahan interaktif",
      "cara membuat undangan dengan galeri foto",
      "cara membuat undangan digital countdown timer",
      "cara share undangan digital ke tamu",
      "cara membuat undangan digital multi bahasa",
      "cara membuat undangan pernikahan website gratis",
      "cara edit template undangan digital",
      "cara membuat undangan digital dengan peta lokasi",
      "cara membuat undangan digital amplop digital",
      "cara tracking tamu undangan digital",
      "cara membuat undangan digital responsive",
      "cara membuat undangan pernikahan tanpa ribet",
      "cara membuat undangan digital 5 menit",
      "tips membuat undangan digital yang menarik",
      "cara membuat undangan digital profesional",
      "cara membuat undangan digital murah",
      "cara membuat undangan digital premium",
      "cara membuat undangan pernikahan elegant",
      "cara membuat buku tamu digital",
      "cara membuat undangan digital dengan fitur lengkap",
      "cara pilih template undangan yang tepat",
      "panduan pemula undangan digital",
      "cara membuat undangan pernikahan modern",
      "cara menggunakan platform undangan digital",
      "cara membuat undangan online tanpa coding",
      "cara membuat undangan digital dengan domain sendiri",
      "cara bikin undangan digital kekinian",
      "cara membuat undangan pernikahan minimalis",
      "cara membuat undangan digital yang viral",
      "cara membuat undangan digital murah meriah",
      "cara membuat undangan digital berkualitas",
    ],
  },
  {
    name: "Templates and Examples",
    keywords: [
      "contoh undangan digital",
      "template undangan pernikahan modern",
      "contoh website undangan pernikahan",
      "template undangan digital minimalis",
      "contoh undangan nikah digital",
      "template undangan pernikahan gratis",
      "contoh undangan online pernikahan",
      "template undangan pernikahan islami",
      "contoh undangan digital elegan",
      "template undangan nikah modern",
      "contoh undangan digital mewah",
      "template undangan pernikahan adat",
      "contoh undangan digital aesthetic",
      "template undangan pernikahan vintage",
      "contoh undangan digital floral",
      "template undangan pernikahan rustic",
      "contoh undangan website pernikahan terbaik",
      "template undangan digital pernikahan premium",
      "contoh undangan digital pernikahan 2025",
      "template undangan nikah whatsapp",
      "contoh undangan digital dengan rsvp",
      "template undangan pernikahan dengan countdown",
      "contoh undangan digital interaktif",
      "template undangan pernikahan foto",
      "contoh undangan digital dengan musik",
      "template undangan pernikahan calligraphy",
      "contoh undangan digital pernikahan simpel",
      "template undangan nikah online gratis",
      "contoh undangan digital pernikahan outdoor",
      "template undangan pernikahan garden",
      "contoh undangan digital pernikahan kristen",
      "template undangan pernikahan katolik",
      "contoh undangan digital walimatul ursy",
      "template undangan pernikahan sunda",
      "contoh undangan digital pernikahan jawa",
      "template undangan pernikahan batak",
      "contoh undangan digital pernikahan bali",
      "template undangan pernikahan minang",
      "contoh undangan digital pernikahan bugis",
      "template undangan pernikahan melayu",
      "contoh undangan digital resepsi",
      "template undangan akad nikah",
      "contoh undangan digital pengajian nikah",
      "template undangan pernikahan di rumah",
      "contoh undangan digital intimate wedding",
      "template undangan pernikahan di gedung",
      "contoh undangan digital pernikahan hotel",
      "template undangan pernikahan di masjid",
      "contoh undangan digital pernikahan beach",
      "template undangan pernikahan rose gold",
    ],
  },
  {
    name: "Event Invitations",
    keywords: [
      "undangan khitanan digital",
      "undangan aqiqah online",
      "undangan ulang tahun digital",
      "undangan reuni online",
      "undangan syukuran digital",
      "undangan tahlilan online",
      "undangan wisuda digital",
      "undangan lamaran digital",
      "undangan tunangan online",
      "undangan selapanan digital",
      "undangan tasyakuran online",
      "undangan mitoni digital",
      "undangan tedak siten online",
      "undangan sunatan digital",
      "undangan aqiqah modern",
      "undangan khitanan islami online",
      "undangan ulang tahun anak digital",
      "undangan ulang tahun dewasa online",
      "undangan sweet seventeen digital",
      "undangan reuni sekolah online",
      "undangan reuni alumni digital",
      "undangan gathering online",
      "undangan arisan digital",
      "undangan pengajian online",
      "undangan walimatul khitan digital",
      "undangan cukur rambut bayi online",
      "undangan maulid nabi digital",
      "undangan isra miraj online",
      "undangan buka puasa digital",
      "undangan halal bihalal online",
      "undangan santunan anak yatim digital",
      "undangan peresmian rumah online",
      "undangan pembukaan usaha digital",
      "undangan seminar online",
      "undangan workshop digital",
      "undangan family gathering online",
      "undangan reuni keluarga digital",
      "undangan silaturahmi online",
      "undangan piknik digital",
      "undangan camping online",
      "undangan baby shower digital",
      "undangan gender reveal online",
      "undangan bridal shower digital",
      "undangan bachelor party online",
      "undangan farewell party digital",
      "undangan welcome party online",
      "undangan housewarming digital",
      "undangan anniversary pernikahan online",
      "undangan anniversary kantor digital",
      "undangan launching produk online",
    ],
  },
  {
    name: "Wedding Planning Topics",
    keywords: [
      "tips persiapan pernikahan",
      "checklist persiapan pernikahan",
      "ide konsep pernikahan modern",
      "dekorasi pernikahan minimalis",
      "budget pernikahan hemat",
      "persiapan pernikahan 3 bulan",
      "persiapan pernikahan 6 bulan",
      "tips memilih vendor pernikahan",
      "tips memilih catering pernikahan",
      "tips memilih fotografer pernikahan",
      "tips memilih gedung pernikahan",
      "ide souvenir pernikahan unik",
      "ide seserahan pernikahan modern",
      "tips memilih gaun pengantin",
      "tips makeup pengantin natural",
      "dekorasi pelaminan modern",
      "ide tema pernikahan unik",
      "tips pernikahan outdoor",
      "tips pernikahan intimate wedding",
      "ide pernikahan garden party",
      "tips pernikahan di rumah",
      "tips pernikahan di pantai",
      "ide pernikahan rustic",
      "tips pernikahan adat jawa modern",
      "tips pernikahan adat sunda modern",
      "ide pernikahan adat bali modern",
      "tips pernikahan adat batak modern",
      "tips pernikahan adat minang modern",
      "rundown acara pernikahan",
      "susunan acara resepsi pernikahan",
      "tips mc pernikahan",
      "ide entertainment pernikahan",
      "tips foto prewedding",
      "lokasi prewedding keren",
      "tips memilih cincin pernikahan",
      "tips pernikahan hemat budget",
      "tren pernikahan 2025",
      "ide pernikahan di villa",
      "tips honeymoon hemat",
      "destinasi honeymoon indonesia",
      "tips memilih wedding organizer",
      "perbedaan wo dan wedding planner",
      "tips pernikahan beda agama",
      "tips pernikahan beda budaya",
      "tips pernikahan jarak jauh",
      "persiapan mental sebelum menikah",
      "tips keuangan pasangan baru menikah",
      "ide hadiah pernikahan berkesan",
      "etika menghadiri pernikahan",
      "tips menjadi tamu pernikahan yang baik",
    ],
  },
];

// ── Content generation helpers ─────────────────────────────────────
function capitalize(s: string): string {
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function slugify(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const internalLinks = [
  { url: "/", text: "Undanganlink" },
  { url: "/templates", text: "template undangan digital" },
  { url: "/p/undangan-pernikahan-digital", text: "undangan pernikahan digital" },
  { url: "/register", text: "buat undangan digital sekarang" },
];

function pickLinks(keyword: string, idx: number): string {
  const links = [...internalLinks];
  const blogLinks = [
    { url: "/blog/cara-membuat-undangan-digital", text: "cara membuat undangan digital" },
    { url: "/blog/contoh-undangan-pernikahan-modern", text: "contoh undangan pernikahan modern" },
    { url: "/blog/kata-kata-undangan-pernikahan", text: "kata-kata undangan pernikahan" },
    { url: "/blog/tips-persiapan-pernikahan", text: "tips persiapan pernikahan" },
    { url: "/blog/undangan-khitanan-digital", text: "undangan khitanan digital" },
    { url: "/blog/template-undangan-pernikahan-modern", text: "template undangan pernikahan modern" },
  ];
  // pick 2 blog links based on index rotation
  links.push(blogLinks[idx % blogLinks.length]);
  links.push(blogLinks[(idx + 3) % blogLinks.length]);
  return links
    .map((l) => `<a href="${l.url}">${l.text}</a>`)
    .join(", ");
}

function generateFAQ(keyword: string, clusterName: string): { question: string; answer: string }[] {
  const kw = keyword.toLowerCase();
  const faqs: { question: string; answer: string }[] = [];

  if (clusterName === "Wedding Invitation Ideas") {
    faqs.push(
      { question: `Apa itu ${kw}?`, answer: `${capitalize(kw)} adalah konsep desain undangan digital yang menggabungkan estetika modern dengan kemudahan teknologi. Dengan ${kw}, Anda bisa membuat undangan yang cantik dan profesional tanpa perlu mencetak fisik. Platform seperti Undanganlink menyediakan berbagai template yang bisa disesuaikan dengan tema ${kw} pilihan Anda.` },
      { question: `Bagaimana cara membuat ${kw}?`, answer: `Untuk membuat ${kw}, Anda bisa menggunakan platform Undanganlink yang menyediakan template siap pakai. Cukup pilih template, masukkan detail acara, upload foto, dan undangan Anda siap dibagikan via WhatsApp dalam hitungan menit. Tidak perlu keahlian desain khusus.` },
      { question: `Berapa biaya ${kw}?`, answer: `Biaya untuk membuat ${kw} di Undanganlink sangat terjangkau, mulai dari gratis untuk fitur dasar. Paket premium dengan fitur lengkap seperti RSVP online, buku tamu digital, galeri foto, dan musik latar tersedia dengan harga yang jauh lebih hemat dibanding undangan cetak konvensional.` },
      { question: `Apakah ${kw} bisa dibagikan via WhatsApp?`, answer: `Ya, tentu saja! Salah satu keunggulan utama ${kw} adalah kemudahan berbagi via WhatsApp, SMS, email, dan media sosial lainnya. Setiap undangan memiliki link unik yang bisa langsung dikirim ke seluruh tamu undangan tanpa batas jumlah.` },
    );
  } else if (clusterName === "Invitation Wording") {
    faqs.push(
      { question: `Bagaimana contoh ${kw} yang baik?`, answer: `Contoh ${kw} yang baik harus mencakup nama pengantin, tanggal dan waktu acara, lokasi, serta doa atau harapan. Gunakan bahasa yang sopan dan sesuai dengan budaya serta agama. Di Undanganlink, Anda bisa menemukan berbagai contoh ${kw} yang sudah teruji dan tinggal disesuaikan.` },
      { question: `Apa yang harus ditulis dalam ${kw}?`, answer: `Dalam ${kw}, pastikan mencantumkan: 1) Bismillah atau pembuka sesuai keyakinan, 2) Nama kedua mempelai beserta orang tua, 3) Hari, tanggal, dan waktu acara, 4) Alamat lengkap lokasi, 5) Ucapan penutup dan doa. Template di Undanganlink sudah menyediakan format lengkap yang tinggal diisi.` },
      { question: `Apakah ${kw} harus formal?`, answer: `Tidak selalu! ${capitalize(kw)} bisa disesuaikan dengan karakter Anda. Bisa formal untuk acara resmi, semi-formal untuk nuansa hangat, atau kasual untuk intimate wedding. Yang terpenting adalah informasi acara tersampaikan dengan jelas dan sopan kepada tamu undangan.` },
      { question: `Di mana mencari inspirasi ${kw}?`, answer: `Anda bisa mencari inspirasi ${kw} di platform Undanganlink yang menyediakan ratusan contoh kata-kata undangan untuk berbagai jenis acara dan budaya. Selain itu, blog Undanganlink juga menyajikan artikel lengkap seputar inspirasi kata-kata undangan yang bisa Anda adaptasi.` },
    );
  } else if (clusterName === "How-To Guides") {
    faqs.push(
      { question: `Apakah sulit ${kw}?`, answer: `Tidak sama sekali! Dengan platform Undanganlink, proses ${kw} menjadi sangat mudah bahkan untuk pemula. Cukup pilih template, isi informasi acara, dan undangan digital Anda siap dalam 5 menit. Tidak perlu keahlian coding atau desain grafis.` },
      { question: `Berapa lama waktu yang dibutuhkan untuk ${kw}?`, answer: `Dengan Undanganlink, Anda hanya butuh 5-10 menit untuk ${kw}. Platform kami menyediakan template siap pakai yang tinggal diisi dengan detail acara Anda. Proses editing juga sangat intuitif dengan preview real-time.` },
      { question: `Apakah ${kw} membutuhkan keahlian khusus?`, answer: `Tidak! ${capitalize(kw)} di Undanganlink dirancang untuk siapa saja. Interface yang user-friendly memungkinkan Anda membuat undangan digital profesional tanpa perlu kemampuan desain grafis, coding, atau pengalaman teknis apapun.` },
      { question: `Apa saja yang dibutuhkan untuk ${kw}?`, answer: `Untuk ${kw}, Anda hanya perlu: 1) Akun Undanganlink (gratis), 2) Detail acara (tanggal, waktu, lokasi), 3) Foto untuk undangan (opsional), 4) Smartphone atau laptop. Semua fitur sudah tersedia di platform tanpa perlu install aplikasi tambahan.` },
    );
  } else if (clusterName === "Templates and Examples") {
    faqs.push(
      { question: `Di mana menemukan ${kw} terbaik?`, answer: `${capitalize(kw)} terbaik bisa Anda temukan di Undanganlink. Platform ini menyediakan koleksi template yang dirancang profesional dengan berbagai tema mulai dari minimalis, elegan, islami, rustic, hingga vintage. Semua template responsif dan bisa dibagikan via WhatsApp.` },
      { question: `Apakah ${kw} bisa di-custom?`, answer: `Ya! Semua ${kw} di Undanganlink bisa dikustomisasi sepenuhnya. Anda bisa mengubah warna, font, foto, teks, musik latar, dan layout sesuai selera. Fitur preview real-time memungkinkan Anda melihat hasilnya sebelum dipublikasikan.` },
      { question: `Apakah ${kw} gratis?`, answer: `Undanganlink menyediakan ${kw} dengan opsi gratis dan premium. Versi gratis sudah mencakup fitur dasar yang cukup lengkap. Untuk fitur tambahan seperti RSVP online, buku tamu, galeri foto, dan custom domain, tersedia paket premium dengan harga sangat terjangkau.` },
      { question: `Bagaimana memilih ${kw} yang tepat?`, answer: `Untuk memilih ${kw} yang tepat, pertimbangkan: 1) Tema dan konsep acara Anda, 2) Nuansa yang ingin ditampilkan (formal/kasual), 3) Warna favorit, 4) Fitur yang dibutuhkan (RSVP, buku tamu, dll). Preview template di Undanganlink sebelum memutuskan pilihan terbaik.` },
    );
  } else if (clusterName === "Event Invitations") {
    faqs.push(
      { question: `Apa keuntungan menggunakan ${kw}?`, answer: `Keuntungan ${kw} antara lain: hemat biaya dibanding cetak, mudah dibagikan via WhatsApp, bisa menampilkan foto dan video, fitur RSVP online untuk tracking kehadiran, buku tamu digital, dan ramah lingkungan. Undanganlink menyediakan template khusus untuk berbagai jenis acara.` },
      { question: `Bagaimana cara membuat ${kw}?`, answer: `Cara membuat ${kw} sangat mudah di Undanganlink: 1) Daftar akun gratis, 2) Pilih jenis acara dan template, 3) Isi detail acara dan upload foto, 4) Preview dan publish, 5) Bagikan link undangan ke tamu via WhatsApp. Prosesnya hanya butuh 5 menit!` },
      { question: `Apakah ${kw} bisa dikirim ke banyak tamu?`, answer: `Ya! ${capitalize(kw)} dari Undanganlink bisa dibagikan ke tamu tanpa batas jumlah. Setiap undangan memiliki link unik yang bisa dikirim via WhatsApp, SMS, email, atau media sosial. Anda juga bisa membuat link personal untuk setiap tamu.` },
      { question: `Fitur apa saja yang ada di ${kw}?`, answer: `Fitur ${kw} di Undanganlink meliputi: template cantik yang bisa dikustomisasi, RSVP online, buku tamu digital, galeri foto, musik latar, countdown timer, peta lokasi, amplop digital, dan berbagi mudah via WhatsApp. Semua dalam satu platform.` },
    );
  } else {
    faqs.push(
      { question: `Mengapa ${kw} penting?`, answer: `${capitalize(kw)} sangat penting untuk memastikan hari spesial Anda berjalan lancar. Perencanaan yang matang membantu menghemat budget, mengurangi stress, dan memastikan setiap detail terurus dengan baik. Salah satu langkah penting adalah memilih undangan digital yang tepat melalui platform seperti Undanganlink.` },
      { question: `Kapan sebaiknya mulai ${kw}?`, answer: `Idealnya, ${kw} dimulai 6-12 bulan sebelum hari H. Untuk undangan, sebaiknya mulai disiapkan 2-3 bulan sebelumnya. Dengan Undanganlink, pembuatan undangan digital hanya butuh beberapa menit sehingga tidak perlu khawatir soal waktu persiapan undangan.` },
      { question: `Bagaimana ${kw} dengan budget terbatas?`, answer: `${capitalize(kw)} dengan budget terbatas sangat mungkin dilakukan. Salah satu cara terbesar menghemat adalah beralih ke undangan digital daripada cetak. Undanganlink menawarkan solusi undangan digital berkualitas dengan harga sangat terjangkau, bahkan ada opsi gratis.` },
      { question: `Apa saja yang perlu diperhatikan dalam ${kw}?`, answer: `Hal yang perlu diperhatikan dalam ${kw}: 1) Tentukan budget realistis, 2) Buat timeline dan checklist, 3) Pilih vendor terpercaya, 4) Siapkan undangan digital lebih awal, 5) Koordinasi dengan keluarga. Platform Undanganlink bisa membantu mempermudah proses undangan digital Anda.` },
    );
  }

  return faqs;
}

function generateContent(
  keyword: string,
  clusterName: string,
  idx: number
): string {
  const kw = keyword.toLowerCase();
  const kwCap = capitalize(kw);
  const links = pickLinks(kw, idx);
  const year = "2025";

  // Build long-form content (~1200-1500 words)
  let content = "";

  // H1
  content += `<h1>${kwCap}: Panduan Lengkap ${year}</h1>\n\n`;

  // Introduction
  content += `<p>Mencari informasi tentang <strong>${kw}</strong>? Anda berada di tempat yang tepat. Di era digital saat ini, ${kw} menjadi semakin populer di kalangan masyarakat Indonesia. Dengan kemajuan teknologi dan perubahan gaya hidup, semakin banyak orang yang beralih ke solusi digital untuk berbagai kebutuhan, termasuk undangan acara spesial.</p>\n\n`;
  content += `<p>Artikel ini akan membahas secara lengkap dan mendalam tentang ${kw}, mulai dari pengertian, manfaat, cara implementasi, hingga tips praktis yang bisa Anda terapkan. Kami juga akan memberikan rekomendasi terbaik untuk membantu Anda mendapatkan hasil optimal. Pastikan Anda membaca sampai akhir untuk mendapatkan insight berharga seputar ${kw}.</p>\n\n`;

  // H2: Pengertian dan Penjelasan
  content += `<h2>Apa Itu ${kwCap}?</h2>\n\n`;
  content += `<p>${kwCap} merupakan salah satu tren yang sedang berkembang pesat di Indonesia. Konsep ini menggabungkan kreativitas dengan teknologi modern untuk menghasilkan pengalaman yang berkesan bagi semua pihak yang terlibat. Dalam konteks undangan digital, ${kw} memungkinkan Anda untuk menyampaikan informasi acara dengan cara yang lebih menarik, interaktif, dan efisien.</p>\n\n`;
  content += `<p>Platform ${links} menyediakan berbagai solusi untuk ${kw} yang dapat disesuaikan dengan kebutuhan dan preferensi Anda. Dengan menggunakan teknologi terkini, proses pembuatan menjadi sangat mudah bahkan untuk pemula sekalipun. Anda tidak perlu memiliki keahlian desain grafis atau pemrograman untuk menghasilkan ${kw} yang profesional dan memukau.</p>\n\n`;
  content += `<p>Keunggulan utama dari ${kw} antara lain: hemat biaya dibandingkan metode konvensional, proses pembuatan yang cepat dan praktis, jangkauan distribusi yang lebih luas, serta fitur interaktif yang membuat pengalaman lebih berkesan. Selain itu, pendekatan digital ini juga lebih ramah lingkungan karena mengurangi penggunaan kertas.</p>\n\n`;

  // H2: Manfaat dan Keunggulan
  content += `<h2>Manfaat dan Keunggulan ${kwCap}</h2>\n\n`;
  content += `<p>Ada banyak manfaat yang bisa Anda dapatkan dari ${kw}. Berikut adalah beberapa keunggulan utama yang membuat semakin banyak orang memilih pendekatan ini:</p>\n\n`;
  content += `<h3>1. Efisiensi Biaya</h3>\n`;
  content += `<p>Salah satu keunggulan terbesar dari ${kw} adalah efisiensi biaya. Dibandingkan dengan metode tradisional yang memerlukan biaya cetak, amplop, dan pengiriman, solusi digital menawarkan penghematan yang signifikan. Budget yang tersisa bisa dialokasikan untuk keperluan acara lainnya yang lebih penting. Dengan Undanganlink, Anda bahkan bisa memulai secara gratis.</p>\n\n`;
  content += `<h3>2. Kemudahan Distribusi</h3>\n`;
  content += `<p>Dengan ${kw}, distribusi menjadi sangat mudah. Anda bisa mengirimkan undangan ke ratusan bahkan ribuan tamu hanya dalam hitungan menit melalui WhatsApp, email, atau media sosial. Tidak perlu lagi repot mengirim satu per satu atau khawatir undangan hilang di perjalanan.</p>\n\n`;
  content += `<h3>3. Fitur Interaktif</h3>\n`;
  content += `<p>Keunggulan lain dari ${kw} adalah berbagai fitur interaktif yang tersedia. Mulai dari RSVP online untuk memudahkan tracking kehadiran tamu, buku tamu digital untuk mengumpulkan ucapan selamat, galeri foto dan video, musik latar yang menambah suasana, hingga countdown timer menuju hari H.</p>\n\n`;
  content += `<h3>4. Ramah Lingkungan</h3>\n`;
  content += `<p>${kwCap} merupakan pilihan yang ramah lingkungan. Dengan mengurangi penggunaan kertas, Anda turut berkontribusi dalam pelestarian lingkungan. Langkah kecil ini memiliki dampak besar jika dilakukan oleh banyak orang secara bersama-sama.</p>\n\n`;

  // H2: Contoh dan Inspirasi
  content += `<h2>Contoh dan Inspirasi ${kwCap}</h2>\n\n`;
  content += `<p>Berikut adalah beberapa contoh dan inspirasi ${kw} yang bisa menjadi referensi Anda. Setiap contoh memiliki keunikan dan daya tarik tersendiri yang bisa disesuaikan dengan karakter dan kebutuhan acara Anda.</p>\n\n`;
  content += `<h3>Gaya Minimalis</h3>\n`;
  content += `<p>Untuk Anda yang menyukai kesederhanaan, gaya minimalis bisa menjadi pilihan tepat. Desain clean dengan penggunaan warna-warna netral, tipografi elegan, dan layout yang rapi menciptakan kesan sophisticated tanpa berlebihan. Template minimalis di Undanganlink sangat populer karena kesan profesional dan timeless-nya.</p>\n\n`;
  content += `<h3>Gaya Elegan</h3>\n`;
  content += `<p>Bagi yang menginginkan kesan mewah dan berkelas, gaya elegan dengan sentuhan gold, ornamen detail, dan typography calligraphy bisa menjadi pilihan. Kombinasi warna seperti navy-gold, burgundy-gold, atau black-gold menciptakan nuansa glamor yang memukau. Tersedia berbagai pilihan template elegan di halaman <a href="/templates">template undangan digital</a>.</p>\n\n`;
  content += `<h3>Gaya Islami</h3>\n`;
  content += `<p>Untuk acara dengan nuansa Islami, tersedia desain khusus dengan ornamen geometris khas Islam, kaligrafi Arab, dan palet warna yang harmonis. Bismillah, ayat Al-Quran, dan doa-doa bisa diintegrasikan dengan cantik ke dalam desain undangan digital Anda.</p>\n\n`;

  // H2: Tips Praktis
  content += `<h2>Tips Praktis ${kwCap}</h2>\n\n`;
  content += `<p>Agar mendapatkan hasil optimal dari ${kw}, berikut beberapa tips praktis yang bisa Anda terapkan:</p>\n\n`;
  content += `<h3>Pilih Platform yang Tepat</h3>\n`;
  content += `<p>Langkah pertama yang paling penting adalah memilih platform yang tepat. Pastikan platform yang Anda gunakan menyediakan template berkualitas, fitur lengkap, kemudahan penggunaan, dan dukungan pelanggan yang responsif. <a href="/">Undanganlink</a> menjadi salah satu rekomendasi terbaik karena menawarkan semua fitur tersebut dengan harga terjangkau.</p>\n\n`;
  content += `<h3>Persiapkan Konten dengan Matang</h3>\n`;
  content += `<p>Sebelum mulai membuat, pastikan Anda sudah menyiapkan semua informasi yang diperlukan: detail acara (tanggal, waktu, lokasi), foto-foto berkualitas, teks undangan, dan daftar tamu. Persiapan yang matang akan mempercepat proses pembuatan dan menghasilkan undangan yang lebih profesional.</p>\n\n`;
  content += `<h3>Sesuaikan dengan Tema Acara</h3>\n`;
  content += `<p>Pastikan desain ${kw} sesuai dengan tema dan konsep acara Anda. Konsistensi antara undangan dengan dekorasi dan dress code akan menciptakan pengalaman yang kohesif dan berkesan bagi tamu undangan.</p>\n\n`;
  content += `<h3>Test Sebelum Distribusi</h3>\n`;
  content += `<p>Sebelum membagikan ke semua tamu, lakukan testing terlebih dahulu. Cek semua informasi, pastikan link berfungsi, test di berbagai device (smartphone, tablet, laptop), dan minta feedback dari keluarga atau teman dekat. Preview di Undanganlink memudahkan Anda mengecek tampilan di berbagai ukuran layar.</p>\n\n`;

  // H2: Rekomendasi Platform
  content += `<h2>Rekomendasi Platform Terbaik untuk ${kwCap}</h2>\n\n`;
  content += `<p>Dari berbagai platform yang tersedia di Indonesia, <a href="/">Undanganlink</a> menjadi pilihan utama untuk ${kw}. Berikut alasannya:</p>\n\n`;
  content += `<ul>\n`;
  content += `<li><strong>Template Premium</strong> - Koleksi template yang dirancang oleh desainer profesional dengan berbagai tema dan gaya</li>\n`;
  content += `<li><strong>Fitur Lengkap</strong> - RSVP online, buku tamu digital, galeri foto, musik latar, countdown timer, peta lokasi, dan amplop digital</li>\n`;
  content += `<li><strong>Mudah Digunakan</strong> - Interface intuitif yang memungkinkan pembuatan undangan dalam 5 menit tanpa keahlian teknis</li>\n`;
  content += `<li><strong>Optimasi WhatsApp</strong> - Berbagi mudah via WhatsApp dengan preview yang menarik</li>\n`;
  content += `<li><strong>Harga Terjangkau</strong> - Mulai dari gratis dengan opsi premium yang sangat affordable</li>\n`;
  content += `<li><strong>Support Indonesia</strong> - Tim support yang siap membantu dalam Bahasa Indonesia</li>\n`;
  content += `</ul>\n\n`;
  content += `<p>Kunjungi halaman <a href="/templates">template</a> untuk melihat koleksi lengkap desain yang tersedia, atau baca panduan <a href="/p/undangan-pernikahan-digital">undangan pernikahan digital</a> untuk informasi lebih detail.</p>\n\n`;

  // H2: Tren terkini
  content += `<h2>Tren ${kwCap} di Tahun ${year}</h2>\n\n`;
  content += `<p>Tahun ${year} membawa beberapa tren menarik dalam ${kw}. Beberapa tren yang patut Anda perhatikan antara lain:</p>\n\n`;
  content += `<p><strong>Personalisasi Mendalam</strong> - Tamu semakin mengharapkan pengalaman yang personal. Undangan dengan nama tamu yang ter-personalisasi, pesan khusus, dan interaksi yang disesuaikan menjadi standar baru.</p>\n\n`;
  content += `<p><strong>Interaktivitas</strong> - Fitur interaktif seperti RSVP real-time, buku tamu dengan foto, dan live countdown menjadi elemen yang sangat diminati. Platform modern seperti Undanganlink terus mengembangkan fitur-fitur ini untuk memberikan pengalaman terbaik.</p>\n\n`;
  content += `<p><strong>Sustainability</strong> - Kesadaran lingkungan yang semakin tinggi membuat undangan digital menjadi pilihan utama. Selain ramah lingkungan, undangan digital juga lebih praktis dan ekonomis.</p>\n\n`;
  content += `<p><strong>Integrasi Media Sosial</strong> - Kemampuan untuk berbagi momen acara langsung ke media sosial dan integrasi dengan platform populer menjadi nilai tambah yang dicari oleh generasi milenial dan Gen Z.</p>\n\n`;

  // FAQ section
  const faqs = generateFAQ(keyword, clusterName);
  content += `<h2>FAQ - Pertanyaan Umum Seputar ${kwCap}</h2>\n\n`;
  for (const faq of faqs) {
    content += `<h3>${faq.question}</h3>\n`;
    content += `<p>${faq.answer}</p>\n\n`;
  }

  // CTA
  content += `<h2>Mulai Buat ${kwCap} Sekarang</h2>\n\n`;
  content += `<p>Jangan tunda lagi! Buat ${kw} Anda sekarang di <a href="/">Undanganlink</a>. Dengan ribuan template premium, fitur lengkap, dan kemudahan penggunaan, Anda bisa membuat undangan digital yang memukau dalam hitungan menit.</p>\n\n`;
  content += `<p><strong><a href="/register">Daftar gratis sekarang</a></strong> dan mulai buat undangan digital impian Anda. Bergabung dengan ribuan pengguna Undanganlink yang sudah merasakan kemudahan dan keindahan undangan digital Indonesia.</p>\n\n`;
  content += `<p>Butuh inspirasi lebih? Kunjungi halaman <a href="/templates">template undangan digital</a> kami atau baca artikel lainnya di <a href="/blog">blog Undanganlink</a> untuk tips dan panduan lengkap seputar undangan digital dan persiapan acara spesial Anda.</p>\n`;

  return content;
}

function generateExcerpt(keyword: string): string {
  const kw = keyword.toLowerCase();
  return `Panduan lengkap ${kw}. Temukan tips, inspirasi, contoh, dan rekomendasi terbaik untuk membuat ${kw} yang berkesan. Baca selengkapnya di Undanganlink.`;
}

function generateMetaTitle(keyword: string): string {
  const cap = capitalize(keyword);
  return `${cap} - Panduan Lengkap 2025 | Undanganlink`.slice(0, 60);
}

function generateMetaDescription(keyword: string): string {
  const kw = keyword.toLowerCase();
  return `Panduan lengkap ${kw} 2025. Tips, inspirasi, contoh & template terbaik. Buat undangan digital cantik di Undanganlink dalam 5 menit!`.slice(0, 160);
}

const featuredImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
  "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
  "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80",
  "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=800&q=80",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
];

// ── Main handler ───────────────────────────────────────────────────
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Collect all 300 keywords (50 per cluster)
    const allPosts: any[] = [];
    let globalIdx = 0;

    for (const cluster of clusters) {
      for (const keyword of cluster.keywords) {
        const slug = slugify(keyword);
        const now = new Date().toISOString();
        const publishedAt = new Date(
          Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)
        ).toISOString();

        allPosts.push({
          title: capitalize(keyword),
          slug,
          excerpt: generateExcerpt(keyword),
          content: generateContent(keyword, cluster.name, globalIdx),
          meta_title: generateMetaTitle(keyword),
          meta_description: generateMetaDescription(keyword),
          featured_image: featuredImages[globalIdx % featuredImages.length],
          author: "Undanganlink",
          status: "published",
          tags: [
            cluster.name.toLowerCase().replace(/\s+/g, "-"),
            "undangan-digital",
            keyword.split(" ").slice(0, 2).join("-"),
          ],
          published_at: publishedAt,
          created_at: now,
          updated_at: now,
        });

        globalIdx++;
      }
    }

    console.log(`Total posts generated: ${allPosts.length}`);

    // Insert in batches of 25
    const batchSize = 25;
    let inserted = 0;
    let errors: string[] = [];

    for (let i = 0; i < allPosts.length; i += batchSize) {
      const batch = allPosts.slice(i, i + batchSize);
      const { error } = await supabase
        .from("blog_posts")
        .upsert(batch, { onConflict: "slug" });

      if (error) {
        errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
        console.error(`Batch error:`, error.message);
      } else {
        inserted += batch.length;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        total_generated: allPosts.length,
        total_inserted: inserted,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
