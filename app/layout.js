import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/home/Navbar/Navbar";
import Footer from "@/components/home/Footer/Footer";

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
  title: "NewMax",
  description: "Your one stop destination for mobile and computer accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${nunitoSemiBold.variable}`}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
