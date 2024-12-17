import React from 'react';
import styles from "./products.module.scss";
import dynamic from 'next/dynamic';

const Product = dynamic(
    ()=> import("../../components/products/Product"),
    {ssr: false}
);
// Updated SEO metadata with additional categories and keywords
// export const metadata = {
//     title: "NewMax Repair - High-Quality Mobile and Computer Accessories",
//     description: "Discover top-notch mobile and computer accessories at NewMax Repair. Browse our wide selection of products designed for performance and durability.",
//     keywords: [
//       "mobile accessories",
//       "computer accessories",
//       "tech accessories",
//       "gadgets",
//       "performance accessories",
//       "durable mobile accessories",
//       "computer tech products",
//       "PDA accessories",
//       "scanner accessories",
//       "barcode printer accessories",
//       "card printer accessories",
//       "mobile computers",
//     ],
//     robots: "index, follow",
//     openGraph: {
//       title: "NewMax Repair - Quality Mobile and Computer Accessories",
//       description: "Shop premium mobile and computer accessories from NewMax Repair. Find the best products for your devices at affordable prices.",
//       url: "https://www.newmaxrepair.com/products",
//       siteName: "NewMax Repair",
//       images: [
//         {
//           url: "https://www.newmaxrepair.com/assets/og-image.jpg",
//           width: 1200,
//           height: 630,
//           alt: "NewMax Repair - Quality Mobile and Computer Accessories",
//         },
//       ],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "NewMax Repair - Fast and Affordable Mobile & Computer Repairs",
//       description: "Fast, reliable mobile and computer repair services with NewMax Repair. Your one-stop solution for all tech repairs.",
//       images: ["https://www.newmaxrepair.com/assets/repair-cover.jpg"],
//     },
//   };

const Products = () => {
    return (
        <main className={styles.page}>
            {/* Structured Data (JSON-LD) for Products */}
            <script type="application/ld+json">
            {`
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Products | NewMax Repair",
                "description": "Discover the best mobile and computer accessories at NewMax Repair. Shop high-quality products for your devices.",
                "url": "https://newmaxrepair.com/products",
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
                <Product/>
            </section>
        </main>
    );
};

export default Products;