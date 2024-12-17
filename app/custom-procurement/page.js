'use client';
import React from 'react';
import styles from "./procurement.module.scss";
import dynamic from 'next/dynamic';
import Head from 'next/head';

const ImageSection = dynamic(
    () => import('@/components/custom-procurement/Image/ImageSection'),
    { ssr: false }
);
const Form = dynamic(
    () => import('@/components/custom-procurement/Form/Form'),
    { ssr: false }
);
const FAQ = dynamic(
    () => import('@/components/Categories/FAQ/FAQ'),
    { ssr: false }
);
const RcProducts = dynamic(
    () => import('@/components/Cart/Recommended/RcProducts'),
    { ssr: false }
);

// Updated SEO metadata for custom procurement services page
export const metadata = {
  title: "Custom Procurement Services - NewMax Repair",
  description: "Get tailored procurement solutions for mobile, computer, and tech accessories at NewMax Repair. Request the products you need, designed to fit your budget and specifications.",
  keywords: [
    "custom procurement",
    "tech accessories procurement",
    "mobile accessories",
    "computer parts",
    "custom orders",
    "PDA accessories",
    "scanner accessories",
    "barcode printer accessories",
    "card printer accessories",
    "mobile computers",
    "NewMax Repair"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Custom Procurement Services - NewMax Repair",
    description: "Get custom procurement services at NewMax Repair. We provide tailored solutions for mobile and computer accessories. Request your custom orders today!",
    url: "https://www.newmaxrepair.com/procurement",
    siteName: "NewMax Repair",
    images: [
      {
        url: "https://www.newmaxrepair.com/assets/procurement-image.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Procurement Services at NewMax Repair",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Procurement Services - NewMax Repair",
    description: "Looking for custom procurement services? Get the best mobile and computer accessories at NewMax Repair, tailored to your needs and budget.",
    images: ["https://www.newmaxrepair.com/assets/procurement-image.jpg"],
  },
};

const Procurement = () => {
  return (
    <main className={styles.page}>
      {/* Structured Data (JSON-LD) for Custom Procurement */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Custom Procurement Services | NewMax Repair",
          "description": "Custom procurement services for mobile, computer, and tech accessories tailored to your needs. Request your custom orders today.",
          "url": "https://newmaxrepair.com/procurement",
          "publisher": {
            "@type": "Organization",
            "name": "NewMax Repair",
            "logo": {
              "@type": "ImageObject",
              "url": "https://newmaxrepair.com/logo.png"
            }
          }
        }
        `}
      </script>

      <section>
        <ImageSection />
      </section>

      <section>
        <Form />
      </section>

      <section>
        <div>
          <RcProducts />
        </div>
        <FAQ />
      </section>
    </main>
  );
};

export default Procurement;