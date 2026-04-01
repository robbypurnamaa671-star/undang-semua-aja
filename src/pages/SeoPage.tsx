import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import NotFound from "./NotFound";

const SeoPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: page, isLoading, error } = useQuery({
    queryKey: ["seo-page", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_pages")
        .select("*")
        .eq("slug", slug!)
        .eq("status", "published")
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !page) return <NotFound />;

  const faqItems = Array.isArray(page.faq) ? page.faq : [];
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item: any) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;

  return (
    <>
      <Helmet>
        <title>{page.meta_title || page.title}</title>
        <meta name="description" content={page.meta_description || ""} />
        <link rel="canonical" href={`https://undanganku.app/p/${page.slug}`} />
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="bg-primary/5 border-b border-primary/10">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <a href="/" className="text-primary font-semibold text-lg hover:underline">
              ← Undanganlink
            </a>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {page.h1 || page.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </article>
        </main>

        <footer className="border-t border-primary/10 py-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Undanganlink. Semua hak dilindungi.</p>
        </footer>
      </div>
    </>
  );
};

export default SeoPage;
