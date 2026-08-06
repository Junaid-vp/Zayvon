import React from "react";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zayvon.tech/#organization",
        "name": "ZAYVON",
        "url": "https://zayvon.tech",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zayvon.tech/icon.png"
        },
        "sameAs": [
          "https://www.instagram.com/zayvon.tech"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-773-635-5958",
          "contactType": "customer support",
          "email": "hello@zayvon.com",
          "availableLanguage": ["English", "Malayalam"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://zayvon.tech/#website",
        "url": "https://zayvon.tech",
        "name": "ZAYVON Digital Studio",
        "publisher": {
          "@id": "https://zayvon.tech/#organization"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://zayvon.tech/#localbusiness",
        "name": "ZAYVON Digital Studio",
        "url": "https://zayvon.tech",
        "image": "https://zayvon.tech/opengraph-image.png",
        "telephone": "+91-773-635-5958",
        "email": "hello@zayvon.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kerala",
          "addressCountry": "IN"
        },
        "priceRange": "$$$"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
