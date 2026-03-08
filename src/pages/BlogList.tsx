import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { BlogCard } from "@/components/content/ContentComponents";
import { InternalLinks } from "@/components/content/ContentComponents";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { fetchBlogPosts } from "@/lib/content-api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const perPage = 12;

  useEffect(() => {
    setLoading(true);
    fetchBlogPosts(perPage, page * perPage)
      .then(({ posts, total }) => {
        setPosts(posts);
        setTotal(total);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog Undangan Digital | Tips, Inspirasi & Panduan"
        description="Baca artikel terbaru seputar undangan digital pernikahan, tips memilih template, inspirasi desain undangan online, dan panduan lengkap membuat undangan nikah digital."
        canonical="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog Undanganlink",
          description: "Tips, inspirasi, dan panduan seputar undangan digital Indonesia",
          url: "https://undanganku.app/blog",
          publisher: {
            "@type": "Organization",
            name: "Undanganlink",
          },
        }}
      />
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Blog <span className="text-gradient">Undangan Digital</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tips, inspirasi, dan panduan lengkap seputar undangan digital pernikahan dan acara spesial
            </p>
          </motion.div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-card">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">📝</span>
              <h2 className="font-serif text-2xl font-bold mb-2">Belum Ada Artikel</h2>
              <p className="text-muted-foreground mb-6">Artikel akan segera hadir. Kembali lagi nanti!</p>
              <Button asChild>
                <Link to="/">Kembali ke Beranda</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={page === i ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(i)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="max-w-xl mx-auto mt-12">
            <InternalLinks />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
