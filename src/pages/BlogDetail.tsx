import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { TableOfContents, RelatedPosts, InternalLinks } from "@/components/content/ContentComponents";
import { fetchBlogPost, fetchRelatedPosts, parseTableOfContents, addHeadingIds } from "@/lib/content-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchBlogPost(slug)
      .then((data) => {
        setPost(data);
        if (data?.tags?.length > 0) {
          return fetchRelatedPosts(slug, data.tags);
        }
        return [];
      })
      .then((relatedPosts) => setRelated(relatedPosts || []))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 container px-4 max-w-3xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 flex flex-col items-center justify-center text-center px-4">
          <span className="text-6xl mb-4">📭</span>
          <h1 className="font-serif text-2xl font-bold mb-2">Artikel Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-6">Artikel yang Anda cari tidak tersedia.</p>
          <Button asChild>
            <Link to="/blog">Kembali ke Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const processedContent = addHeadingIds(post.content);
  const toc = parseTableOfContents(processedContent);
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Undanganlink",
      logo: { "@type": "ImageObject", url: "https://undanganku.app/favicon.png" },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: `https://undanganku.app/blog/${post.slug}`,
    ...(post.featured_image ? { image: post.featured_image } : {}),
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={post.meta_title || `${post.title} | Blog Undangan Digital`}
        description={post.meta_description || post.excerpt || ""}
        canonical={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.featured_image}
        jsonLd={articleSchema}
      />
      <Navbar />

      <main className="pt-24 pb-16">
        <article className="container px-4 max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Blog
            </Link>
          </nav>

          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              {publishedDate && (
                <time dateTime={post.published_at} className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {publishedDate}
                </time>
              )}
            </div>
          </motion.header>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full rounded-xl mb-8 object-cover max-h-96"
              loading="lazy"
            />
          )}

          {toc.length >= 3 && <TableOfContents items={toc} />}

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

          <InternalLinks />
          <RelatedPosts posts={related} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
