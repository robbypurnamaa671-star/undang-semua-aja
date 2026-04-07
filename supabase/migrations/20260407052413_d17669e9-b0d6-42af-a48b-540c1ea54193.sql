UPDATE blog_posts
SET content = regexp_replace(
  regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(content, '^```html\s*', '', 'i'),
        '```\s*$', '', 'i'
      ),
      '<!DOCTYPE[^>]*>\s*', '', 'gi'
    ),
    '<html[^>]*>\s*(<head>.*?</head>)?\s*<body>\s*', '', 'gis'
  ),
  '\s*</body>\s*</html>\s*$', '', 'gis'
)
WHERE content LIKE '%```html%' OR content LIKE '%<!DOCTYPE%';