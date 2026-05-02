import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  jsonLd?: object | object[];
}

const BASE_URL = "https://www.undanganlink.com";
const DEFAULT_OG_IMAGE = "https://www.undanganlink.com/favicon.png?v=4";

export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  jsonLd,
}: SEOProps) {
  const fullTitle = title.includes("Undanganlink") ? title : `${title} – Undanganlink`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Favicon — re-injected on every route to keep all pages consistent */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=4" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico?v=4" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=4" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png?v=4" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=4" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="id_ID" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
