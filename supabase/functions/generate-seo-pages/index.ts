import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const eventTypes = [
  { id: "pernikahan", name: "Pernikahan", icon: "💍", keywords: ["undangan pernikahan digital", "undangan nikah online", "website undangan nikah"] },
  { id: "khitanan", name: "Khitanan", icon: "🎉", keywords: ["undangan khitanan digital", "undangan sunatan online"] },
  { id: "aqiqah", name: "Aqiqah", icon: "🐑", keywords: ["undangan aqiqah digital", "undangan aqiqah online"] },
  { id: "ulang-tahun", name: "Ulang Tahun", icon: "🎂", keywords: ["undangan ulang tahun digital", "undangan birthday online"] },
];

const styles = [
  { id: "minimalis", name: "Minimalis", desc: "desain bersih, elegan dan simpel dengan warna-warna netral" },
  { id: "elegan", name: "Elegan", desc: "tampilan mewah dan sophisticated dengan aksen emas dan tipografi serif" },
  { id: "modern", name: "Modern", desc: "gaya kontemporer dengan layout dinamis dan tipografi bold" },
  { id: "islami", name: "Islami", desc: "ornamen islami dengan kaligrafi arab, motif geometris, dan warna-warna khas" },
  { id: "rustic", name: "Rustic", desc: "nuansa alam dengan elemen kayu, bunga kering, dan warna earth tone" },
  { id: "vintage", name: "Vintage", desc: "gaya retro klasik dengan ornamen antik dan palet warna warm" },
  { id: "floral", name: "Floral", desc: "motif bunga yang indah dengan sentuhan romantis dan warna pastel" },
  { id: "aesthetic", name: "Aesthetic", desc: "desain kekinian dengan tone warna soft, layout clean, dan sentuhan artsy" },
];

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
  { id: "tasikmalaya", name: "Tasikmalaya", prov: "Jawa Barat" },
  { id: "purwokerto", name: "Purwokerto", prov: "Jawa Tengah" },
  { id: "serang", name: "Serang", prov: "Banten" },
  { id: "mataram", name: "Mataram", prov: "NTB" },
  { id: "jambi", name: "Jambi", prov: "Jambi" },
  { id: "bengkulu", name: "Bengkulu", prov: "Bengkulu" },
  { id: "ambon", name: "Ambon", prov: "Maluku" },
  { id: "jayapura", name: "Jayapura", prov: "Papua" },
  { id: "kupang", name: "Kupang", prov: "NTT" },
  { id: "kendari", name: "Kendari", prov: "Sulawesi Tenggara" },
  { id: "palu", name: "Palu", prov: "Sulawesi Tengah" },
  { id: "gorontalo", name: "Gorontalo", prov: "Gorontalo" },
  { id: "ternate", name: "Ternate", prov: "Maluku Utara" },
  { id: "pangkal-pinang", name: "Pangkal Pinang", prov: "Bangka Belitung" },
  { id: "tanjung-pinang", name: "Tanjung Pinang", prov: "Kepulauan Riau" },
  { id: "cilegon", name: "Cilegon", prov: "Banten" },
  { id: "sukabumi", name: "Sukabumi", prov: "Jawa Barat" },
  { id: "kediri", name: "Kediri", prov: "Jawa Timur" },
  { id: "jember", name: "Jember", prov: "Jawa Timur" },
  { id: "madiun", name: "Madiun", prov: "Jawa Timur" },
  { id: "tegal", name: "Tegal", prov: "Jawa Tengah" },
  { id: "pekalongan", name: "Pekalongan", prov: "Jawa Tengah" },
  { id: "karawang", name: "Karawang", prov: "Jawa Barat" },
  { id: "sidoarjo", name: "Sidoarjo", prov: "Jawa Timur" },
  { id: "garut", name: "Garut", prov: "Jawa Barat" },
];

function gen(
  e: (typeof eventTypes)[0],
  s: (typeof styles)[0],
  c: (typeof cities)[0]
) {
  const slug = `undangan-${e.id}-${s.id}-${c.id}`;
  const title = `Undangan ${e.name} ${s.name} ${c.name}`;
  const h1 = `Undangan Digital ${e.name} ${s.name} di ${c.name}`;
  const metaTitle = `Undangan ${e.name} ${s.name} Digital ${c.name} | Gratis – Undanganlink`;
  const metaDesc = `Buat undangan ${e.name.toLowerCase()} digital ${s.name.toLowerCase()} untuk acara di ${c.name}, ${c.prov}. Template ${s.desc}. RSVP online, buku tamu, kirim via WhatsApp. Gratis!`;

  const content = `
<p>Mencari <strong>undangan ${e.name.toLowerCase()} digital</strong> dengan desain <strong>${s.name.toLowerCase()}</strong> untuk acara di <strong>${c.name}</strong>? Undanganlink menyediakan template undangan digital ${e.name.toLowerCase()} bergaya ${s.name.toLowerCase()} yang siap pakai, mudah dikustomisasi, dan bisa langsung dibagikan via WhatsApp kepada tamu di ${c.name} dan sekitarnya.</p>

<h2>Mengapa Memilih Undangan ${e.name} ${s.name} Digital di ${c.name}?</h2>

<p>Di era modern ini, masyarakat ${c.name} semakin banyak beralih dari undangan cetak ke undangan digital. Undangan ${e.name.toLowerCase()} digital dengan gaya ${s.name.toLowerCase()} menawarkan ${s.desc} yang sangat cocok untuk acara di ${c.name}, ${c.prov}. Dengan Undanganlink, Anda bisa membuat undangan yang tidak hanya indah tetapi juga fungsional dan praktis.</p>

<p>Berikut alasan mengapa undangan digital ${s.name.toLowerCase()} menjadi pilihan populer di ${c.name}:</p>
<ul>
<li><strong>Hemat biaya</strong> – Tidak perlu biaya cetak dan kirim. Lebih hemat untuk anggaran acara ${e.name.toLowerCase()} Anda di ${c.name}.</li>
<li><strong>Ramah lingkungan</strong> – Mengurangi penggunaan kertas. Pilihan tepat untuk masyarakat ${c.name} yang peduli lingkungan.</li>
<li><strong>Mudah dibagikan</strong> – Kirim link via WhatsApp ke semua tamu di ${c.name} dan luar kota dalam hitungan detik.</li>
<li><strong>Desain ${s.name.toLowerCase()}</strong> – ${s.desc.charAt(0).toUpperCase() + s.desc.slice(1)} yang memberi kesan profesional dan berkesan.</li>
<li><strong>Fitur lengkap</strong> – RSVP online, buku tamu digital, galeri foto, countdown timer, amplop digital, dan musik latar.</li>
</ul>

<h2>Fitur Undangan Digital ${e.name} ${s.name} di Undanganlink</h2>

<h3>1. Template ${s.name} Profesional</h3>
<p>Koleksi template ${s.name.toLowerCase()} kami dirancang secara profesional dan dioptimalkan untuk semua perangkat. Setiap template cocok untuk berbagai venue acara ${e.name.toLowerCase()} di ${c.name}, mulai dari hotel, gedung pertemuan, hingga rumah.</p>

<h3>2. RSVP Online Otomatis</h3>
<p>Kelola konfirmasi kehadiran tamu acara ${e.name.toLowerCase()} di ${c.name} secara real-time. Dashboard RSVP memudahkan Anda memantau jumlah tamu yang akan hadir, sangat membantu untuk perencanaan catering dan venue di ${c.name}.</p>

<h3>3. Buku Tamu Digital</h3>
<p>Berikan ruang bagi tamu untuk menyampaikan ucapan dan doa. Semua ucapan tersimpan rapi sebagai kenangan indah dari acara ${e.name.toLowerCase()} Anda di ${c.name}.</p>

<h3>4. Galeri Foto dan Video</h3>
<p>Tampilkan momen-momen spesial dalam galeri foto terintegrasi. Foto-foto yang diambil di lokasi-lokasi indah ${c.name} akan membuat undangan semakin personal dan berkesan bagi para tamu.</p>

<h3>5. Peta Lokasi Interaktif</h3>
<p>Integrasikan peta lokasi venue acara di ${c.name} langsung di undangan. Tamu bisa mendapatkan petunjuk arah ke lokasi acara ${e.name.toLowerCase()} Anda dengan satu klik, sangat berguna terutama untuk tamu dari luar ${c.name}.</p>

<h3>6. Amplop Digital</h3>
<p>Untuk tamu yang tidak bisa hadir langsung di ${c.name}, fitur amplop digital memungkinkan mereka memberikan hadiah melalui transfer bank langsung dari undangan.</p>

<h3>7. Countdown Timer & Musik Latar</h3>
<p>Bangun antusiasme dengan countdown timer menuju hari spesial dan tambahkan musik latar yang indah untuk memberikan suasana sempurna saat tamu membuka undangan ${e.name.toLowerCase()} ${s.name.toLowerCase()} Anda.</p>

<h2>Cara Membuat Undangan ${e.name} ${s.name} di ${c.name}</h2>

<p>Membuat undangan digital di Undanganlink sangat mudah:</p>

<ol>
<li><strong>Daftar akun gratis</strong> – Buat akun dalam hitungan detik tanpa biaya apapun.</li>
<li><strong>Pilih jenis acara</strong> – Pilih "${e.name}" untuk mendapatkan template dan fitur yang sesuai.</li>
<li><strong>Pilih template ${s.name.toLowerCase()}</strong> – Browse koleksi template ${s.name.toLowerCase()} dan pilih favorit Anda.</li>
<li><strong>Isi detail acara</strong> – Masukkan informasi acara: nama, tanggal, waktu, dan lokasi di ${c.name}.</li>
<li><strong>Kustomisasi</strong> – Sesuaikan warna, foto, musik, dan konten sesuai keinginan.</li>
<li><strong>Publikasikan & bagikan</strong> – Klik publish dan kirim langsung via WhatsApp ke tamu di ${c.name}.</li>
</ol>

<h2>Keunggulan Undanganlink untuk Acara di ${c.name}</h2>

<ul>
<li><strong>100% Bahasa Indonesia</strong> – Antarmuka dan template seluruhnya dalam Bahasa Indonesia.</li>
<li><strong>Desain budaya lokal</strong> – Template terinspirasi kekayaan budaya Indonesia, cocok untuk acara di ${c.name}.</li>
<li><strong>Optimasi mobile</strong> – Tampilan sempurna di smartphone yang digunakan masyarakat ${c.name}.</li>
<li><strong>Integrasi WhatsApp</strong> – Bagikan undangan dengan pesan personal ke setiap tamu.</li>
<li><strong>Gratis</strong> – Mulai buat undangan tanpa biaya. Premium hanya Rp12.000/bulan.</li>
</ul>

<h2>Harga Undangan ${e.name} Digital di ${c.name}</h2>

<p>Undanganlink menawarkan harga terjangkau untuk warga ${c.name}:</p>
<ul>
<li><strong>Gratis</strong> – Template dasar dengan fitur standar.</li>
<li><strong>Premium (Rp12.000/bulan)</strong> – Semua template, tanpa watermark, tamu unlimited, fitur lengkap.</li>
</ul>
<p>Lebih murah dari secangkir kopi di ${c.name}, Anda sudah bisa memiliki undangan digital ${e.name.toLowerCase()} ${s.name.toLowerCase()} yang profesional!</p>

<h2>Tips Memilih Desain ${s.name} untuk ${e.name} di ${c.name}</h2>

<ul>
<li><strong>Sesuaikan dengan tema</strong> – Pastikan desain ${s.name.toLowerCase()} sejalan dengan konsep acara ${e.name.toLowerCase()} Anda.</li>
<li><strong>Perhatikan readability</strong> – Informasi penting seperti tanggal dan lokasi di ${c.name} harus terlihat jelas.</li>
<li><strong>Gunakan foto berkualitas</strong> – Foto beresolusi tinggi akan meningkatkan tampilan undangan.</li>
<li><strong>Sesuaikan budaya lokal</strong> – Pertimbangkan tradisi dan adat istiadat di ${c.name}, ${c.prov} saat memilih elemen desain.</li>
</ul>
`.trim();

  const faq = [
    {
      question: `Berapa biaya undangan ${e.name.toLowerCase()} ${s.name.toLowerCase()} digital di ${c.name}?`,
      answer: `Gratis untuk template dasar di Undanganlink. Untuk fitur lengkap tanpa watermark, tersedia paket Premium Rp12.000/bulan.`,
    },
    {
      question: `Apakah undangan digital ${e.name.toLowerCase()} ${s.name.toLowerCase()} bisa dibagikan via WhatsApp?`,
      answer: `Ya, setelah dipublikasikan Anda mendapat link unik yang bisa langsung dibagikan via WhatsApp ke semua tamu di ${c.name} dan luar kota.`,
    },
    {
      question: `Berapa lama membuat undangan ${e.name.toLowerCase()} digital ${s.name.toLowerCase()}?`,
      answer: `Hanya 5-10 menit! Pilih template, isi detail acara di ${c.name}, dan langsung publish.`,
    },
    {
      question: `Apakah tamu di ${c.name} perlu download aplikasi?`,
      answer: `Tidak. Undangan digital Undanganlink berbasis website, bisa dibuka langsung di browser smartphone tanpa download apapun.`,
    },
    {
      question: `Bisa tambahkan peta lokasi venue di ${c.name}?`,
      answer: `Tentu! Anda bisa menambahkan link Google Maps ke venue acara di ${c.name}. Tamu bisa langsung navigasi ke lokasi.`,
    },
  ];

  const internalLinks = [
    { url: "/register", text: `Buat Undangan ${e.name} ${s.name} Gratis` },
    { url: "/templates", text: "Lihat Semua Template Undangan Digital" },
    { url: `/p/undangan-${e.id}-digital`, text: `Undangan ${e.name} Digital Indonesia` },
    { url: "/blog", text: "Tips & Inspirasi Undangan Digital" },
  ];

  const keywords = [
    `undangan ${e.name.toLowerCase()} ${s.name.toLowerCase()} ${c.name.toLowerCase()}`,
    `undangan ${e.name.toLowerCase()} digital ${c.name.toLowerCase()}`,
    `undangan digital ${s.name.toLowerCase()} ${c.name.toLowerCase()}`,
    `undangan ${e.name.toLowerCase()} ${s.name.toLowerCase()}`,
    ...e.keywords,
  ];

  return {
    slug, title, h1,
    meta_title: metaTitle,
    meta_description: metaDesc,
    content, faq, internal_links: internalLinks,
    keywords, page_type: "event-style-city",
    status: "published",
    updated_at: new Date().toISOString(),
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate exactly 1000 pages from event×style×city combinations
    // 4 events × 8 styles × 50 cities = 1600; take first 1000
    const allPages: ReturnType<typeof gen>[] = [];
    for (const e of eventTypes) {
      for (const s of styles) {
        for (const c of cities) {
          allPages.push(gen(e, s, c));
          if (allPages.length >= 1000) break;
        }
        if (allPages.length >= 1000) break;
      }
      if (allPages.length >= 1000) break;
    }

    // Upsert in batches of 50
    let upserted = 0;
    const batchSize = 50;

    for (let i = 0; i < allPages.length; i += batchSize) {
      const batch = allPages.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from("seo_pages")
        .upsert(batch, { onConflict: "slug" })
        .select("id");

      if (error) {
        console.error("Batch error:", error);
        throw error;
      }
      upserted += data?.length || 0;
    }

    return new Response(
      JSON.stringify({
        success: true,
        total_generated: allPages.length,
        upserted,
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
