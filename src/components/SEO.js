import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, ogImage }) => {
  const defaultTitle = 'Arun Boddapati | Bioinformatics Scientist';
  const defaultDescription = 
    'Arun Boddapati is a Lead Scientist specializing in bioinformatics, genomics, and machine learning with expertise in developing computational pipelines for analyzing large-scale biological datasets.';
  const defaultKeywords = 'bioinformatics, genomics, metagenomics, immunology, machine learning, data analysis, computational biology';
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
