import Navbar from "@/component/Navbar";
import "./globals.css";
import { Albert_Sans, Montserrat_Alternates, Roboto } from "next/font/google";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${albertSans.className} ${montserrat.variable} flex flex-col h-full`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
