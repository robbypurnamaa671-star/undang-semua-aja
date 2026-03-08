import { Link } from "react-router-dom";

interface TableOfContentsProps {
  items: { id: string; text: string; level: number }[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
      <h2 className="font-serif text-lg font-semibold mb-4">Daftar Isi</h2>
      <ol className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className={item.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-primary transition-colors text-sm leading-relaxed"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface RelatedPostsProps {
  posts: {
    title: string;
    slug: string;
    excerpt?: string | null;
    featured_image?: string | null;
    published_at?: string | null;
  }[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="font-serif text-2xl font-bold mb-6">Artikel Terkait</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="card-interactive block overflow-hidden rounded-xl"
          >
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{post.title}</h3>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface InternalLinksProps {
  links?: { url: string; text: string }[];
}

export function InternalLinks({ links }: InternalLinksProps) {
  const defaultLinks = [
    { url: "/", text: "Buat Undangan Digital Gratis" },
    { url: "/register", text: "Daftar & Mulai Buat Undangan" },
    { url: "/blog", text: "Tips & Inspirasi Undangan Digital" },
  ];

  const allLinks = links && links.length > 0 ? links : defaultLinks;

  return (
    <nav className="bg-primary/5 border border-primary/10 rounded-xl p-6 mt-8">
      <h3 className="font-semibold text-foreground mb-3">Tautan Terkait</h3>
      <ul className="space-y-2">
        {allLinks.map((link, i) => (
          <li key={i}>
            <Link
              to={link.url}
              className="text-primary hover:underline text-sm"
            >
              → {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface BlogCardProps {
  post: {
    title: string;
    slug: string;
    excerpt?: string | null;
    featured_image?: string | null;
    author: string;
    published_at?: string | null;
    tags: string[];
  };
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="card-interactive block overflow-hidden rounded-xl bg-card"
    >
      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.excerpt}</p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.author}</span>
          {post.published_at && (
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </div>
    </Link>
  );
}
