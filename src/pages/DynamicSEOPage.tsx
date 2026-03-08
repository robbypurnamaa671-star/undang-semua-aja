import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { InternalLinks } from "@/components/content/ContentComponents";
import { fetchSEOPage, parseTableOfContents, addHeadingIds } from "@/lib/content-api";
import { buildFaqSchema } from "@/lib/seo-schemas";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DynamicSEOPage() {
  const { seoSlug } = useParams<{ seoSlug: string }>();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!seoSlug) return;
    setLoading(true);
    fetchSEOPage(seoSlug)
      .then(setPage)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [seoSlug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 container px-4 max-w-4xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <Skeleton className="h-4 w-1/2 mb-10" />
          <div className="space-y-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (notFound || !page) return null; // App.tsx catch-all will handle 404

  const processedContent = addHeadingIds(page.content);
  const toc = parseTableOfContents(processedContent);
  const faqItems: { question: string; answer: string }[] = Array.isArray(page.faq) ? page.faq : [];
  const internalLinks: { url: string; text: string }[] = Array.isArray(page.internal_links) ? page.internal_links : [];

  const schemas: object[] = [];
  if (faqItems.length > 0) {
    schemas.push(buildFaqSchema(faqItems));
  }
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1 || page.title,
    name: page.meta_title || page.title,
    description: page.meta_description || "",
    url: `https://undanganlink.com/p/${page.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Undanganlink",
      url: "https://undanganlink.com",
    },
    dateModified: page.updated_at,
    inLanguage: "id-ID",
  });

  return (
    <div className="min-h-screen">
      <SEO
        title={page.meta_title || page.title}
        description={page.meta_description || ""}
        canonical={`/p/${page.slug}`}
        jsonLd={schemas}
      />
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {page.h1 || page.title}
            </h1>

            {toc.length >= 3 && (
              <nav className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
                <h2 className="font-serif text-lg font-semibold mb-4">Daftar Isi</h2>
                <ol className="space-y-2">
                  {toc.map((item, index) => (
                    <li key={index} className={item.level === 3 ? "ml-4" : ""}>
                      <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-li:text-muted-foreground
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* CTA */}
            <div className="my-12 bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
              <h2 className="font-serif text-2xl font-bold mb-3">Siap Buat Undangan Digital?</h2>
              <p className="text-muted-foreground mb-6">
                Buat undangan digital cantik dalam hitungan menit. Gratis dan mudah!
              </p>
              <Button asChild size="lg" className="btn-hero">
                <Link to="/register">
                  Buat Undangan Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* FAQ */}
            {faqItems.length > 0 && (
              <section className="mt-12">
                <h2 className="font-serif text-2xl font-bold mb-6">Pertanyaan Umum</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left font-semibold">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            <InternalLinks links={internalLinks} />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
