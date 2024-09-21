import localFont from "next/font/local";
import "./globals.css";

const nunito = localFont({
  src: "./fonts/NunitoSans-Regular.ttf", 
  variable: "--font-nunito-sans",
  weight: "normal",
});

export const metadata = {
  title: "NewMax",
  description: "Your one stop destination for mobile and computer accessories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable}`}>
        {children}
      </body>
    </html>
  );
}
