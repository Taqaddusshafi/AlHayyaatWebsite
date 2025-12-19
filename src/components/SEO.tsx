import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'Al Hayat Medical Complex - Your Trusted Healthcare Partner',
  description = 'Experience comprehensive healthcare services with board-certified physicians, state-of-the-art facilities, and 24/7 emergency care. Serving our community for over 15 years.',
  keywords = 'medical center, healthcare, doctors, hospital, emergency care, medical services, health clinic, specialists, cardiology, orthopedics, laboratory',
  image = 'https://your-domain.com/og-image.jpg',
  url = 'https://your-domain.com',
  type = 'website'
}: SEOProps) {
  const siteName = 'Al Hayat Medical Complex';
  const fullTitle = title.includes('Al Hayat') ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Al Hayat Medical Complex" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
