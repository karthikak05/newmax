import React from 'react';
import styles from "./procurement.module.scss"
import ImageSection from '@/components/custom-procurement/Image/ImageSection';
import Form from '@/components/custom-procurement/Form/Form';
import FAQ from '@/components/Categories/FAQ/FAQ';
import RcProducts from '@/components/Cart/Recommended/RcProducts';

// export const metadata = {
//     title: "Custom Procurement Services - NewMax Repair",
//     description: "Get custom procurement services for mobile, computer, and tech accessories at NewMax Repair. Request products tailored to your needs and budget.",
//     keywords: [
//       "custom procurement", 
//       "tech accessories procurement", 
//       "mobile accessories", 
//       "computer parts", 
//       "mobile repair services", 
//       "custom orders", 
//       "NewMax Repair"
//     ],
//     robots: "index, follow",
//     openGraph: {
//       title: "Custom Procurement Services - NewMax Repair",
//       description: "Custom procurement services at NewMax Repair. We offer tailored solutions for mobile and computer accessories. Request your custom orders now!",
//       url: "https://newmaxrepair.com/procurement",
//       siteName: "NewMax Repair",
//       images: [
//         {
//           url: "https://newmaxrepair.com/assets/procurement-image.jpg",
//           width: 1200,
//           height: 630,
//           alt: "Custom Procurement Services at NewMax Repair",
//         },
//       ],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Custom Procurement Services - NewMax Repair",
//       description: "Looking for custom procurement services? Get the best mobile and computer accessories at NewMax Repair. Tailored to your needs!",
//       images: ["https://newmaxrepair.com/assets/procurement-image.jpg"],
//     },
//   };
const Procuerment = () => {
    return (
        <div className={styles.page}>
            <ImageSection/>

            <section>
                <Form/>
            </section>

            <section>
                <div>
                    <RcProducts/>
                </div>
                <FAQ/>
            </section>
        </div>
    );
};

export default Procuerment;