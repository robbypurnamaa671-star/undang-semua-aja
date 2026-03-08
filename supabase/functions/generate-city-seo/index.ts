import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const cities = [
  { id: "jakarta", name: "Jakarta", prov: "DKI Jakarta" },
  { id: "surabaya", name: "Surabaya", prov: "Jawa Timur" },
  { id: "bandung", name: "Bandung", prov: "Jawa Barat" },
  { id: "medan", name: "Medan", prov: "Sumatera Utara" },
  { id: "semarang", name: "Semarang", prov: "Jawa Tengah" },
  { id: "makassar", name: "Makassar", prov: "Sulawesi Selatan" },
  { id: "palembang", name: "Palembang", prov: "Sumatera Selatan" },
  { id: "tangerang", name: "Tangerang", prov: "Banten" },
  { id: "depok", name: "Depok", prov: "Jawa Barat" },
  { id: "bekasi", name: "Bekasi", prov: "Jawa Barat" },
  { id: "yogyakarta", name: "Yogyakarta", prov: "DI Yogyakarta" },
  { id: "bogor", name: "Bogor", prov: "Jawa Barat" },
  { id: "malang", name: "Malang", prov: "Jawa Timur" },
  { id: "solo", name: "Solo", prov: "Jawa Tengah" },
  { id: "denpasar", name: "Denpasar", prov: "Bali" },
  { id: "balikpapan", name: "Balikpapan", prov: "Kalimantan Timur" },
  { id: "manado", name: "Manado", prov: "Sulawesi Utara" },
  { id: "pontianak", name: "Pontianak", prov: "Kalimantan Barat" },
  { id: "banjarmasin", name: "Banjarmasin", prov: "Kalimantan Selatan" },
  { id: "padang", name: "Padang", prov: "Sumatera Barat" },
  { id: "pekanbaru", name: "Pekanbaru", prov: "Riau" },
  { id: "lampung", name: "Bandar Lampung", prov: "Lampung" },
  { id: "cirebon", name: "Cirebon", prov: "Jawa Barat" },
  { id: "batam", name: "Batam", prov: "Kepulauan Riau" },
  { id: "samarinda", name: "Samarinda", prov: "Kalimantan Timur" },
];

// Pattern 1: undangan-nikah-online-{city} (25 pages)
function genNikahOnline(c: typeof cities[0]) {
  const slug = `undangan-nikah-online-${c.id}`;
  return {
    slug,
    title: `Undangan Nikah Online ${c.name}`,
    h1: `Undangan Nikah Online di ${c.name} – Buat Gratis & Kirim via WhatsApp`,
    meta_title: `Undangan Nikah Online ${c.name} | Buat Gratis – Undanganlink`,
    meta_description: `Buat undangan nikah online untuk acara pernikahan di ${c.name}, ${c.prov}. Template elegan, RSVP online, buku tamu digital. Gratis dan mudah!`,
    content: buildContent("nikah", "pernikahan", c),
    faq: buildFaq("nikah", "pernikahan", c),
    internal_links: buildLinks("Pernikahan", c),
    keywords: [`undangan nikah online ${c.name.toLowerCase()}`, `undangan pernikahan online ${c.name.toLowerCase()}`, `undangan nikah digital ${c.name.toLowerCase()}`],
    page_type: "city-keyword",
    status: "published",
    updated_at: new Date().toISOString(),
  };
}

// Pattern 2: website-undangan-pernikahan-{city} (25 pages)
function genWebsiteUndangan(c: typeof cities[0]) {
  const slug = `website-undangan-pernikahan-${c.id}`;
  return {
    slug,
    title: `Website Undangan Pernikahan ${c.name}`,
    h1: `Website Undangan Pernikahan di ${c.name} – Buat Online Gratis`,
    meta_title: `Website Undangan Pernikahan ${c.name} | Gratis – Undanganlink`,
    meta_description: `Buat website undangan pernikahan untuk acara di ${c.name}. Desain elegan, fitur RSVP, buku tamu, dan galeri foto. Langsung kirim via WhatsApp!`,
    content: buildContent("website undangan", "pernikahan", c),
    faq: buildFaq("website undangan", "pernikahan", c),
    internal_links: buildLinks("Pernikahan", c),
    keywords: [`website undangan pernikahan ${c.name.toLowerCase()}`, `website undangan nikah ${c.name.toLowerCase()}`, `buat website undangan ${c.name.toLowerCase()}`],
    page_type: "city-keyword",
    status: "published",
    updated_at: new Date().toISOString(),
  };
}

// Pattern 3: jasa-undangan-digital-{city} (25 pages)
function genJasaUndangan(c: typeof cities[0]) {
  const slug = `jasa-undangan-digital-${c.id}`;
  return {
    slug,
    title: `Jasa Undangan Digital ${c.name}`,
    h1: `Jasa Undangan Digital di ${c.name} – Buat Sendiri Online, Gratis!`,
    meta_title: `Jasa Undangan Digital ${c.name} | Buat Gratis Online – Undanganlink`,
    meta_description: `Cari jasa undangan digital di ${c.name}? Buat sendiri di Undanganlink! Template profesional, RSVP online, kirim via WhatsApp. Gratis & mudah!`,
    content: buildJasaContent(c),
    faq: buildJasaFaq(c),
    internal_links: [
      { url: "/register", text: `Buat Undangan Digital di ${c.name} Gratis` },
      { url: "/templates", text: "Lihat Semua Template Undangan" },
      { url: "/blog", text: "Tips Undangan Digital" },
      { url: "/", text: "Undanganlink – Platform Undangan Digital Indonesia" },
    ],
    keywords: [`jasa undangan digital ${c.name.toLowerCase()}`, `jasa undangan online ${c.name.toLowerCase()}`, `vendor undangan digital ${c.name.toLowerCase()}`],
    page_type: "city-keyword",
    status: "published",
    updated_at: new Date().toISOString(),
  };
}

function buildContent(keyword: string, eventName: string, c: typeof cities[0]) {
  return `
<p>Sedang mencari <strong>${keyword} ${eventName}</strong> untuk acara di <strong>${c.name}</strong>? Undanganlink adalah platform ${keyword} ${eventName} terbaik yang melayani seluruh wilayah ${c.name}, ${c.prov}. Buat undangan digital yang cantik dan profesional dalam hitungan menit, tanpa perlu keahlian desain.</p>

<h2>Mengapa ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} ${eventName.charAt(0).toUpperCase() + eventName.slice(1)} Populer di ${c.name}?</h2>

<p>Masyarakat ${c.name} yang modern dan tech-savvy semakin banyak beralih ke undangan digital untuk berbagai acara ${eventName}. Ada beberapa alasan mengapa tren ini berkembang pesat di ${c.name}:</p>

<ul>
<li><strong>Efisiensi biaya</strong> – Di tengah biaya hidup di ${c.name} yang tinggi, undangan digital menjadi solusi hemat. Tidak perlu biaya cetak, desain grafis profesional, atau pengiriman ke seluruh penjuru ${c.name}.</li>
<li><strong>Jangkauan luas</strong> – Untuk tamu yang tersebar di seluruh ${c.prov} atau bahkan di luar pulau, undangan digital memastikan semua orang menerima undangan tepat waktu.</li>
<li><strong>Praktis dan cepat</strong> – Warga ${c.name} yang sibuk bisa membuat undangan dalam 5-10 menit dari smartphone, kapan saja dan di mana saja.</li>
<li><strong>Fitur interaktif</strong> – RSVP online, buku tamu digital, galeri foto, peta lokasi, dan amplop digital memberikan pengalaman yang lebih baik bagi tamu.</li>
<li><strong>Ramah lingkungan</strong> – Tidak menggunakan kertas atau plastik, sejalan dengan kesadaran lingkungan masyarakat ${c.name} modern.</li>
</ul>

<h2>Fitur ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} ${eventName.charAt(0).toUpperCase() + eventName.slice(1)} di Undanganlink</h2>

<h3>Template Profesional</h3>
<p>Undanganlink menyediakan puluhan template ${eventName} dengan berbagai gaya: minimalis, elegan, modern, islami, rustic, vintage, floral, dan aesthetic. Setiap template sudah dioptimalkan untuk tampilan sempurna di semua perangkat yang digunakan masyarakat ${c.name}.</p>

<h3>RSVP Online Real-time</h3>
<p>Kelola konfirmasi kehadiran tamu secara otomatis. Dashboard real-time memudahkan Anda memantau jumlah tamu yang akan hadir di acara ${eventName} di ${c.name}. Fitur ini sangat membantu untuk perencanaan venue dan catering.</p>

<h3>Buku Tamu Digital</h3>
<p>Kumpulkan ucapan dan doa dari para tamu melalui buku tamu digital yang elegan. Semua pesan tersimpan rapi sebagai kenangan indah dari acara ${eventName} Anda di ${c.name}.</p>

<h3>Galeri Foto & Video</h3>
<p>Tampilkan momen-momen terbaik dalam galeri foto terintegrasi. Foto-foto yang diambil di lokasi ikonik ${c.name} akan membuat undangan semakin personal dan berkesan.</p>

<h3>Peta Lokasi Interaktif</h3>
<p>Integrasikan peta Google Maps ke venue acara di ${c.name}. Tamu bisa langsung mendapatkan navigasi ke lokasi dengan satu klik – sangat berguna untuk tamu dari luar ${c.name}.</p>

<h3>Amplop Digital</h3>
<p>Untuk tamu yang tidak bisa hadir di ${c.name}, fitur amplop digital memungkinkan mereka memberikan hadiah melalui transfer bank langsung dari undangan.</p>

<h3>Musik Latar & Countdown</h3>
<p>Tambahkan musik latar yang indah dan countdown timer untuk membangun antusiasme menuju hari spesial ${eventName} Anda di ${c.name}.</p>

<h2>Cara Membuat ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} ${eventName.charAt(0).toUpperCase() + eventName.slice(1)} di ${c.name}</h2>

<ol>
<li><strong>Daftar akun gratis</strong> – Buat akun Undanganlink dalam hitungan detik tanpa biaya.</li>
<li><strong>Pilih template</strong> – Browse koleksi template ${eventName} dan pilih yang paling sesuai selera Anda.</li>
<li><strong>Isi detail acara</strong> – Masukkan nama, tanggal, waktu, dan lokasi acara di ${c.name}.</li>
<li><strong>Kustomisasi</strong> – Tambahkan foto, musik, dan sesuaikan desain sesuai keinginan.</li>
<li><strong>Publish & bagikan</strong> – Kirim langsung ke tamu via WhatsApp atau media sosial.</li>
</ol>

<h2>Harga ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} ${eventName.charAt(0).toUpperCase() + eventName.slice(1)} di ${c.name}</h2>

<ul>
<li><strong>Gratis</strong> – Template dasar dengan fitur standar. Cocok untuk mencoba.</li>
<li><strong>Premium (Rp12.000/bulan)</strong> – Akses semua template, tanpa watermark, tamu unlimited, dan fitur premium lengkap.</li>
</ul>

<p>Dengan biaya yang jauh lebih hemat dibanding undangan cetak di ${c.name}, Anda sudah bisa memiliki ${keyword} ${eventName} yang profesional dan berkesan!</p>
`.trim();
}

function buildFaq(keyword: string, eventName: string, c: typeof cities[0]) {
  return [
    { question: `Berapa harga ${keyword} ${eventName} di ${c.name}?`, answer: `Gratis untuk template dasar. Premium hanya Rp12.000/bulan untuk fitur lengkap tanpa watermark.` },
    { question: `Apakah ${keyword} ${eventName} bisa dikirim via WhatsApp?`, answer: `Ya! Setelah dipublikasikan, Anda mendapat link unik yang bisa langsung dikirim via WhatsApp ke semua tamu di ${c.name}.` },
    { question: `Berapa lama proses pembuatan ${keyword} ${eventName}?`, answer: `Hanya 5-10 menit. Pilih template, isi data acara, dan langsung publish!` },
    { question: `Apakah tamu di ${c.name} perlu download aplikasi?`, answer: `Tidak. Undangan digital dari Undanganlink berbasis website, bisa dibuka langsung di browser smartphone.` },
    { question: `Bisa tambahkan peta lokasi venue di ${c.name}?`, answer: `Tentu! Tambahkan link Google Maps dan tamu bisa langsung navigasi ke lokasi acara Anda.` },
  ];
}

function buildLinks(eventName: string, c: typeof cities[0]) {
  return [
    { url: "/register", text: `Buat Undangan ${eventName} di ${c.name} Gratis` },
    { url: "/templates", text: "Lihat Semua Template Undangan Digital" },
    { url: `/p/undangan-pernikahan-digital`, text: "Undangan Pernikahan Digital Indonesia" },
    { url: "/blog", text: "Tips & Inspirasi Undangan Digital" },
  ];
}

function buildJasaContent(c: typeof cities[0]) {
  return `
<p>Mencari <strong>jasa undangan digital di ${c.name}</strong>? Dengan Undanganlink, Anda tidak perlu lagi mencari vendor atau jasa desain undangan. Buat sendiri undangan digital yang profesional dalam hitungan menit, gratis dan tanpa perlu keahlian desain!</p>

<h2>Jasa Undangan Digital vs Buat Sendiri di ${c.name}</h2>

<p>Banyak warga ${c.name} yang masih mencari jasa undangan digital melalui vendor lokal. Namun tahukah Anda bahwa sekarang Anda bisa membuat undangan digital sendiri yang hasilnya sama profesionalnya? Berikut perbandingannya:</p>

<h3>Jasa Vendor Undangan Digital di ${c.name}</h3>
<ul>
<li>Biaya Rp50.000 – Rp500.000 per undangan</li>
<li>Proses revisi memakan waktu 1-3 hari</li>
<li>Terbatas pada desain yang ditawarkan vendor</li>
<li>Harus komunikasi bolak-balik dengan vendor</li>
</ul>

<h3>Buat Sendiri di Undanganlink</h3>
<ul>
<li><strong>Gratis</strong> atau Premium hanya Rp12.000/bulan</li>
<li>Selesai dalam <strong>5-10 menit</strong></li>
<li>Pilihan <strong>puluhan template</strong> profesional</li>
<li><strong>Edit kapan saja</strong> tanpa menunggu vendor</li>
<li>Fitur lengkap: RSVP, buku tamu, galeri, amplop digital</li>
</ul>

<h2>Fitur Undanganlink untuk Warga ${c.name}</h2>

<h3>Template Beragam untuk Setiap Acara</h3>
<p>Undanganlink menyediakan template untuk berbagai acara: pernikahan, khitanan, aqiqah, ulang tahun, wisuda, dan lainnya. Setiap template tersedia dalam gaya minimalis, elegan, modern, islami, rustic, vintage, floral, dan aesthetic.</p>

<h3>RSVP Online & Manajemen Tamu</h3>
<p>Kelola konfirmasi kehadiran tamu di ${c.name} secara otomatis. Pantau jumlah tamu real-time untuk perencanaan venue dan catering yang lebih akurat.</p>

<h3>Buku Tamu & Ucapan Digital</h3>
<p>Kumpulkan ucapan dari para tamu yang hadir maupun yang berhalangan. Semua pesan tersimpan sebagai kenangan yang bisa dibaca kembali.</p>

<h3>Peta Lokasi ${c.name}</h3>
<p>Integrasikan Google Maps untuk memudahkan tamu menemukan lokasi venue acara di ${c.name}. Sangat berguna untuk tamu dari luar kota.</p>

<h3>Amplop Digital & Musik Latar</h3>
<p>Tamu yang tidak bisa hadir di ${c.name} bisa tetap memberikan hadiah via transfer bank. Tambahkan juga musik latar untuk suasana yang lebih berkesan.</p>

<h2>Cara Buat Undangan Digital di ${c.name}</h2>

<ol>
<li><strong>Daftar gratis</strong> di Undanganlink – tanpa biaya, tanpa kartu kredit</li>
<li><strong>Pilih jenis acara</strong> – pernikahan, khitanan, aqiqah, ulang tahun, dll</li>
<li><strong>Pilih template</strong> – browse puluhan template profesional</li>
<li><strong>Isi detail acara</strong> – nama, tanggal, lokasi di ${c.name}</li>
<li><strong>Publikasikan</strong> – kirim langsung via WhatsApp ke semua tamu</li>
</ol>

<h2>Mengapa Warga ${c.name} Memilih Undanganlink?</h2>

<ul>
<li><strong>Hemat hingga 90%</strong> dibanding jasa vendor undangan digital di ${c.name}</li>
<li><strong>Proses 10x lebih cepat</strong> – selesai dalam menit, bukan hari</li>
<li><strong>Kontrol penuh</strong> – edit dan update kapan saja tanpa menunggu vendor</li>
<li><strong>Fitur lebih lengkap</strong> – RSVP, buku tamu, galeri, amplop digital dalam satu paket</li>
<li><strong>Support WhatsApp</strong> – integrasi langsung untuk kirim undangan ke tamu di ${c.name}</li>
</ul>

<h2>Harga Undangan Digital di ${c.name}</h2>

<ul>
<li><strong>Gratis</strong> – Template dasar, fitur standar</li>
<li><strong>Premium Rp12.000/bulan</strong> – Semua template, tanpa watermark, tamu unlimited</li>
</ul>

<p>Jauh lebih hemat dibanding jasa undangan digital di ${c.name} yang biasanya mulai dari Rp50.000!</p>
`.trim();
}

function buildJasaFaq(c: typeof cities[0]) {
  return [
    { question: `Berapa harga jasa undangan digital di ${c.name}?`, answer: `Di Undanganlink, Anda bisa buat sendiri secara gratis! Premium hanya Rp12.000/bulan – jauh lebih hemat dari vendor di ${c.name}.` },
    { question: `Apakah hasilnya profesional seperti jasa desain?`, answer: `Ya! Template kami dirancang oleh desainer profesional. Hasilnya setara atau bahkan lebih baik dari jasa vendor undangan di ${c.name}.` },
    { question: `Bisa buat undangan untuk semua jenis acara?`, answer: `Ya, tersedia template untuk pernikahan, khitanan, aqiqah, ulang tahun, wisuda, dan berbagai acara lainnya.` },
    { question: `Apakah bisa edit setelah dipublikasikan?`, answer: `Ya, Anda bisa mengedit undangan kapan saja tanpa menunggu vendor. Perubahan langsung terlihat oleh tamu.` },
    { question: `Bagaimana cara kirim undangan ke tamu di ${c.name}?`, answer: `Setelah publish, Anda mendapat link yang bisa langsung dikirim via WhatsApp, Telegram, atau media sosial lainnya.` },
  ];
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const pages = [
      ...cities.map(genNikahOnline),
      ...cities.map(genWebsiteUndangan),
      ...cities.map(genJasaUndangan),
    ];

    let upserted = 0;
    for (let i = 0; i < pages.length; i += 50) {
      const batch = pages.slice(i, i + 50);
      const { data, error } = await supabase
        .from("seo_pages")
        .upsert(batch, { onConflict: "slug" })
        .select("id");
      if (error) throw error;
      upserted += data?.length || 0;
    }

    return new Response(JSON.stringify({ success: true, total: pages.length, upserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
