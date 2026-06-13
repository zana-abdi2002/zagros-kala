import Navbar from "@/components/Navbar";
import estedadFont from "@/lib/ui/estedadFont";
import Providers from "@/providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zagros Kala",
    template: "%s | Zagros Kala",
  },
  description: "Find all camping gears",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`h-full antialiased ${estedadFont.variable}`}
    >
      <body className={`flex min-h-full flex-col ${estedadFont.className}`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
