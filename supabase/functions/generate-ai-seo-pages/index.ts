import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const events = [
  { id: "pernikahan", name: "Pernikahan", desc: "undangan pernikahan digital", kw: ["undangan nikah online", "undangan pernikahan digital", "wedding invitation digital"] },
  { id: "khitanan", name: "Khitanan", desc: "undangan khitanan digital", kw: ["undangan sunatan online", "undangan khitanan digital"] },
  { id: "aqiqah", name: "Aqiqah", desc: "undangan aqiqah digital", kw: ["undangan aqiqah online", "undangan aqiqah digital"] },
  { id: "ulang-tahun", name: "Ulang Tahun", desc: "undangan ulang tahun digital", kw: ["undangan birthday online", "undangan ultah digital"] },
  { id: "syukuran", name: "Syukuran", desc: "undangan syukuran digital", kw: ["undangan syukuran online", "undangan tasyakuran digital"] },
];

const styles = [
  { id: "minimalis", name: "Minimalis", desc: "desain bersih dan simpel dengan warna netral, tipografi modern, dan layout yang clean" },
  { id: "elegan", name: "Elegan", desc: "tampilan mewah dengan aksen emas, tipografi serif klasik, dan ornamen refined" },
  { id: "modern", name: "Modern", desc: "gaya kontemporer dengan layout dinamis, tipografi bold, dan palet warna berani" },
  { id: "islami", name: "Islami", desc: "ornamen islami dengan kaligrafi arab, motif geometris, dan nuansa spiritual" },
  { id: "rustic", name: "Rustic", desc: "nuansa alam dengan elemen kayu, bunga kering, dan warna earth tone hangat" },
  { id: "aesthetic", name: "Aesthetic", desc: "desain kekinian dengan tone warna soft, layout Instagram-worthy, dan sentuhan artsy" },
];

const cities = [
  { id: "jakarta", name: "Jakarta", prov: "DKI Jakarta" },
  { id: "bandung", name: "Bandung", prov: "Jawa Barat" },
  { id: "surabaya", name: "Surabaya", prov: "Jawa Timur" },
  { id: "yogyakarta", name: "Yogyakarta", prov: "DI Yogyakarta" },
  { id: "semarang", name: "Semarang", prov: "Jawa Tengah" },
  { id: "medan", name: "Medan", prov: "Sumatera Utara" },
  { id: "makassar", name: "Makassar", prov: "Sulawesi Selatan" },
  { id: "bali", name: "Bali", prov: "Bali" },
  { id: "bogor", name: "Bogor", prov: "Jawa Barat" },
  { id: "bekasi", name: "Bekasi", prov: "Jawa Barat" },
  { id: "tangerang", name: "Tangerang", prov: "Banten" },
];

// Prefixes to generate extra variants beyond 300
const prefixes = [
  { id: "", label: "" },
  { id: "template-", label: "Template " },
];

// Extra combos to reach 500
const extraPrefixes = [
  { id: "contoh-", label: "Contoh " },
  { id: "desain-", label: "Desain " },
];

function buildIntro(prefix: string, e: typeof events[0], s: typeof styles[0], c: typeof cities[0]): string {
  const keyword = `${prefix}undangan digital ${e.name.toLowerCase()} ${s.name.toLowerCase()} ${c.name}`;
  return `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} adalah undangan berbasis website yang menggabungkan desain ${s.name.toLowerCase()} dengan kemudahan teknologi digital untuk acara ${e.name.toLowerCase()} di ${c.name}, ${c.prov}. Dengan Undanganlink, Anda bisa membuat undangan ${e.name.toLowerCase()} ${s.name.toLowerCase()} yang profesional, mudah dibagikan via WhatsApp, dan dilengkapi fitur RSVP online, buku tamu digital, galeri foto, serta amplop digital.`;
}

function buildContent(prefix: string, e: typeof events[0], s: typeof styles[0], c: typeof cities[0]): string {
  const kw = `${prefix}undangan digital ${e.name.toLowerCase()} ${s.name.toLowerCase()}`;
  const kwCity = `${kw} ${c.name.toLowerCase()}`;

  return `
<h2>Apa Itu ${kw.charAt(0).toUpperCase() + kw.slice(1)}?</h2>
<p><strong>${kw.charAt(0).toUpperCase() + kw.slice(1)}</strong> adalah undangan berbasis website dengan desain bergaya ${s.name.toLowerCase()} yang dirancang khusus untuk acara ${e.name.toLowerCase()}. Berbeda dengan undangan kertas konvensional, undangan digital ini bisa diakses melalui smartphone, tablet, atau komputer, dan dibagikan secara instan via WhatsApp, Instagram, atau media sosial lainnya.</p>
<p>Desain ${s.name.toLowerCase()} pada undangan digital memiliki ciri khas ${s.desc}. Kombinasi ini menciptakan kesan profesional dan berkesan bagi setiap tamu yang menerima undangan ${e.name.toLowerCase()} Anda di ${c.name}.</p>

<h2>Keunggulan Undangan Digital untuk ${e.name} di ${c.name}</h2>
<p>Beralih dari undangan cetak ke undangan digital memberikan banyak keuntungan, terutama untuk acara ${e.name.toLowerCase()} di ${c.name}, ${c.prov}:</p>
<ul>
<li><strong>Hemat biaya hingga 90%</strong> – Tidak perlu biaya cetak, amplop, dan pengiriman fisik ke seluruh tamu di ${c.name} dan sekitarnya.</li>
<li><strong>Distribusi instan</strong> – Kirim undangan ke ratusan tamu di ${c.name} dalam hitungan detik melalui WhatsApp.</li>
<li><strong>RSVP real-time</strong> – Pantau konfirmasi kehadiran tamu secara langsung melalui dashboard, memudahkan perencanaan catering dan venue di ${c.name}.</li>
<li><strong>Ramah lingkungan</strong> – Mengurangi penggunaan kertas dan limbah, pilihan bijak untuk masyarakat ${c.name} yang peduli lingkungan.</li>
<li><strong>Update mudah</strong> – Perubahan jadwal atau lokasi di ${c.name} bisa langsung diperbarui tanpa cetak ulang.</li>
<li><strong>Fitur interaktif</strong> – Countdown timer, musik latar, galeri foto, peta lokasi, dan amplop digital membuat undangan lebih menarik.</li>
</ul>

<h2>Contoh Desain ${s.name} untuk Undangan ${e.name}</h2>
<p>Desain ${s.name.toLowerCase()} pada undangan ${e.name.toLowerCase()} di Undanganlink menampilkan ${s.desc}. Setiap template dirancang agar responsif dan tampil sempurna di semua perangkat.</p>
<p>Elemen-elemen desain ${s.name.toLowerCase()} yang tersedia:</p>
<ul>
<li><strong>Layout khusus ${s.name.toLowerCase()}</strong> – Tata letak yang dirancang sesuai estetika ${s.name.toLowerCase()} untuk acara ${e.name.toLowerCase()}.</li>
<li><strong>Palet warna terkurasi</strong> – Kombinasi warna yang selaras dengan gaya ${s.name.toLowerCase()} dan cocok untuk suasana ${e.name.toLowerCase()}.</li>
<li><strong>Tipografi premium</strong> – Font pilihan yang memperkuat kesan ${s.name.toLowerCase()} pada undangan.</li>
<li><strong>Ornamen dan dekorasi</strong> – Elemen visual khas ${s.name.toLowerCase()} yang mempercantik tampilan undangan.</li>
<li><strong>Full Custom</strong> – Opsi upload background sendiri di setiap bagian undangan untuk kebebasan desain total.</li>
</ul>

<h2>Cara Membuat Undangan Digital ${e.name} ${s.name} di ${c.name}</h2>
<p>Membuat ${kwCity} di Undanganlink sangat mudah dan cepat:</p>
<ol>
<li><strong>Daftar akun gratis</strong> – Kunjungi Undanganlink dan buat akun dalam hitungan detik. Tidak perlu kartu kredit.</li>
<li><strong>Pilih jenis acara "${e.name}"</strong> – Sistem akan menampilkan template yang sesuai untuk ${e.name.toLowerCase()}.</li>
<li><strong>Pilih template ${s.name.toLowerCase()}</strong> – Browse koleksi template ${s.name.toLowerCase()} atau gunakan opsi Full Custom untuk desain sepenuhnya milik Anda.</li>
<li><strong>Isi detail acara</strong> – Masukkan nama, tanggal, waktu, dan lokasi venue di ${c.name}.</li>
<li><strong>Kustomisasi konten</strong> – Tambahkan foto, musik latar, pesan, informasi rekening, dan konten lainnya.</li>
<li><strong>Preview dan publikasikan</strong> – Cek tampilan undangan, lalu klik publish untuk mendapatkan link yang bisa dibagikan.</li>
<li><strong>Bagikan via WhatsApp</strong> – Kirim link undangan dengan pesan personal ke setiap tamu di ${c.name}.</li>
</ol>

<h2>Kenapa Menggunakan Undanganlink?</h2>
<p>Undanganlink adalah platform undangan digital #1 di Indonesia yang dipercaya ribuan pasangan dan keluarga di ${c.name} dan seluruh Indonesia:</p>
<ul>
<li><strong>100% Bahasa Indonesia</strong> – Seluruh antarmuka dan template dalam Bahasa Indonesia, mudah digunakan siapa saja.</li>
<li><strong>Template terlengkap</strong> – Puluhan template profesional untuk berbagai jenis acara termasuk ${e.name.toLowerCase()} bergaya ${s.name.toLowerCase()}.</li>
<li><strong>Full Custom mode</strong> – Upload gambar sendiri untuk setiap bagian undangan, berikan sentuhan personal yang unik.</li>
<li><strong>Fitur lengkap</strong> – RSVP online, buku tamu digital, galeri foto, countdown timer, peta lokasi, amplop digital, dan musik latar.</li>
<li><strong>Optimasi WhatsApp</strong> – Bagikan undangan dengan mudah ke semua kontak WhatsApp Anda di ${c.name}.</li>
<li><strong>Gratis untuk mulai</strong> – Buat undangan dasar tanpa biaya. Premium hanya Rp12.000/bulan untuk fitur lengkap tanpa watermark.</li>
<li><strong>Dukungan budaya lokal</strong> – Template terinspirasi kekayaan budaya Indonesia termasuk tradisi di ${c.prov}.</li>
</ul>

<h2>Harga Undangan Digital ${e.name} di ${c.name}</h2>
<p>Undanganlink menawarkan harga paling terjangkau untuk ${kwCity}:</p>
<ul>
<li><strong>Paket Gratis</strong> – Template dasar, fitur standar, watermark Undanganlink. Cocok untuk mencoba.</li>
<li><strong>Paket Premium (Rp12.000/bulan)</strong> – Semua template termasuk ${s.name.toLowerCase()}, Full Custom mode, tanpa watermark, tamu unlimited, semua fitur premium.</li>
</ul>
<p>Lebih hemat dari biaya cetak undangan kertas, dan jauh lebih praktis untuk mengundang tamu di seluruh ${c.name}, ${c.prov}, bahkan seluruh Indonesia.</p>
`.trim();
}

function buildFaq(prefix: string, e: typeof events[0], s: typeof styles[0], c: typeof cities[0]) {
  const kw = `${prefix}undangan digital ${e.name.toLowerCase()} ${s.name.toLowerCase()}`;
  return [
    {
      question: `Apa itu ${kw}?`,
      answer: `${kw.charAt(0).toUpperCase() + kw.slice(1)} adalah undangan berbasis website dengan desain ${s.name.toLowerCase()} untuk acara ${e.name.toLowerCase()}. Bisa dibagikan via WhatsApp dan dilengkapi fitur RSVP, buku tamu, galeri foto, dan amplop digital.`,
    },
    {
      question: `Berapa harga ${kw} di ${c.name}?`,
      answer: `Gratis untuk template dasar di Undanganlink. Untuk fitur lengkap dan desain premium ${s.name.toLowerCase()}, tersedia paket Premium hanya Rp12.000/bulan.`,
    },
    {
      question: `Bagaimana cara membuat ${kw} di ${c.name}?`,
      answer: `Kunjungi Undanganlink, daftar gratis, pilih template ${s.name.toLowerCase()} untuk ${e.name.toLowerCase()}, isi detail acara di ${c.name}, dan publish. Proses hanya 5-10 menit.`,
    },
  ];
}

function buildPage(
  prefixObj: { id: string; label: string },
  e: typeof events[0],
  s: typeof styles[0],
  c: typeof cities[0]
) {
  const slugBase = `${prefixObj.id}undangan-digital-${e.id}-${s.id}-${c.id}`;
  const titleBase = `${prefixObj.label}Undangan Digital ${e.name} ${s.name} ${c.name}`;
  const h1 = `${prefixObj.label}Undangan Digital ${e.name} ${s.name} di ${c.name}`;
  const metaTitle = `${titleBase} | Gratis – Undanganlink`;
  const metaDesc = `Buat ${prefixObj.label.toLowerCase()}undangan digital ${e.name.toLowerCase()} ${s.name.toLowerCase()} untuk acara di ${c.name}, ${c.prov}. Template ${s.desc.substring(0, 80)}. RSVP online, buku tamu, kirim via WhatsApp. Gratis!`;

  const intro = buildIntro(prefixObj.label.toLowerCase(), e, s, c);
  const contentSections = buildContent(prefixObj.label.toLowerCase(), e, s, c);
  const fullContent = `<p>${intro}</p>\n\n${contentSections}`;

  const faq = buildFaq(prefixObj.label.toLowerCase(), e, s, c);

  const internalLinks = [
    { url: "/register", text: `Buat ${prefixObj.label}Undangan ${e.name} ${s.name} Gratis` },
    { url: "/templates", text: "Lihat Semua Template Undangan Digital" },
    { url: "/blog", text: "Tips & Inspirasi Undangan Digital" },
    { url: "/", text: "Undanganlink – Platform Undangan Digital Indonesia" },
  ];

  const keywords = [
    `${prefixObj.label.toLowerCase()}undangan digital ${e.name.toLowerCase()} ${s.name.toLowerCase()} ${c.name.toLowerCase()}`,
    `undangan ${e.name.toLowerCase()} digital ${c.name.toLowerCase()}`,
    `undangan digital ${s.name.toLowerCase()} ${c.name.toLowerCase()}`,
    `undangan ${e.name.toLowerCase()} ${s.name.toLowerCase()}`,
    ...e.kw,
  ];

  return {
    slug: slugBase,
    title: titleBase,
    h1,
    meta_title: metaTitle.substring(0, 60),
    meta_description: metaDesc.substring(0, 160),
    content: fullContent,
    faq,
    internal_links: internalLinks,
    keywords,
    page_type: "ai-citation",
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

    const allPages: ReturnType<typeof buildPage>[] = [];

    // Phase 1: base (no prefix) = 5×6×11 = 330
    for (const e of events) {
      for (const s of styles) {
        for (const c of cities) {
          allPages.push(buildPage(prefixes[0], e, s, c));
        }
      }
    }

    // Phase 2: "template-" prefix until 500
    for (const e of events) {
      for (const s of styles) {
        for (const c of cities) {
          if (allPages.length >= 500) break;
          allPages.push(buildPage(prefixes[1], e, s, c));
        }
        if (allPages.length >= 500) break;
      }
      if (allPages.length >= 500) break;
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
      JSON.stringify({ success: true, total_generated: allPages.length, upserted }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
