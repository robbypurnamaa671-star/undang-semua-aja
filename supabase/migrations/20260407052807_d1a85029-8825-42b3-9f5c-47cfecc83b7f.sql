UPDATE blog_posts
SET excerpt = regexp_replace(
  regexp_replace(
    regexp_replace(
      regexp_replace(
        regexp_replace(
          regexp_replace(excerpt, '```html\s*', '', 'gi'),
          '```\s*', '', 'gi'
        ),
        '<!DOCTYPE[^>]*>\s*', '', 'gi'
      ),
      '<html[^>]*>\s*', '', 'gi'
    ),
    '<head>.*?</head>\s*', '', 'gis'
  ),
  '</?(?:body|html)>\s*', '', 'gi'
)
WHERE excerpt LIKE '%```%' OR excerpt LIKE '%<!DOCTYPE%';