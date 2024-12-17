import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/home/Navbar/Navbar";
import Footer from "@/components/home/Footer/Footer";
import Head from "next/head";

const nunito = localFont({
  src: "./fonts/NunitoSans-Regular.ttf", 
  variable: "--font-nunito-sans",
  weight: "normal",
});
const nunitoSemiBold = localFont({
  src: "./fonts/NunitoSans-SemiBold.ttf", 
  variable: "--semibold",
});

export const metadata = {
  title: "NewMax Repair - Mobile & Computer Repairs",
  description: "Professional mobile and computer repair services. Fast, affordable, and reliable solutions for all your tech repair needs.",
  keywords: [
    "mobile repair",
    "computer repair",
    "laptop repair",
    "tablet repair",
    "screen replacement",
    "NewMax Repair",
    "affordable tech repairs",
    "fast gadget repairs",
    "hardware troubleshooting",
    "software solutions",
  ],
  author: "NewMax Repair Team",
  robots: "index, follow",
  openGraph: {
    title: "NewMax Repair - Professional Mobile and Computer Repairs",
    description:
      "Get your mobile phones, computers, and tablets repaired quickly with NewMax Repair. Affordable prices, quality service, and expert technicians.",
    url: "https://www.newmaxrepair.com",
    siteName: "NewMax Repair",
    images: [
      {
        url: "https://www.newmaxrepair.com/assets/repair-cover.jpg",
        width: 1200,
        height: 630,
        alt: "NewMax Repair - Professional Tech Repair Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewMax Repair - Fast and Affordable Mobile & Computer Repairs",
    description:
      "Fast, reliable mobile and computer repair services with NewMax Repair. Your one-stop solution for all tech repairs.",
    images: ["https://www.newmaxrepair.com/assets/repair-cover.jpg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta 
          name="google-site-verification" 
          content="ft7UO9Xmj7HPiDCKIzR7d1WdcviC78MxxdpqGy2hm2w" 
        />
      </Head>
      <body className={`${nunito.variable} ${nunitoSemiBold.variable}`}>
        <div className="navbar">
        <Navbar/>
        </div>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
