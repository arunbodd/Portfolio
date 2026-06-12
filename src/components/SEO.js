import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, ogImage }) => {
  const defaultTitle = 'Arun Boddapati | AI / ML Data Science Lead';
  const defaultDescription =
    'Arun Boddapati is an AI / ML Data Science Lead in translational bioinformatics — building LLM-RAG frameworks, agentic systems, and production-grade pipelines that accelerate target identification and biomarker discovery.';
  const defaultKeywords = 'AI, machine learning, LLM, agentic AI, RAG, bioinformatics, genomics, multi-omics, proteomics, biomarker discovery, computational biology';
  const defaultOgImage = `${process.env.PUBLIC_URL}/og-image.jpg`;

  const seoTitle = title ? `${title} | Arun Boddapati` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoOgImage = ogImage || defaultOgImage;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoOgImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoOgImage} />
    </Helmet>
  );
};

export default SEO;
