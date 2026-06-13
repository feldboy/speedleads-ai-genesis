import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.speedleads-ai.com';
const DEFAULT_IMAGE = `${SITE_URL}/speedleads-logo.png`;

interface SeoProps {
  /** Page title — rendered as-is into <title> and og/twitter title. */
  title: string;
  /** Meta description (~150–160 chars). */
  description: string;
  /** Route path beginning with "/", used to build the canonical + og:url. */
  path: string;
  /** When true, emit a noindex robots tag (404, admin, etc.). */
  noindex?: boolean;
  /** Optional JSON-LD object injected into the head for this page. */
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-route head metadata. The static homepage tags in index.html act as the
 * pre-render fallback; this component overrides them so every route gets its
 * own title, description, canonical, and Open Graph / Twitter URLs.
 */
const Seo: React.FC<SeoProps> = ({ title, description, path, noindex, jsonLd }) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
