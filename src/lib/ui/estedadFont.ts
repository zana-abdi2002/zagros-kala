import localFont from "next/font/local";

const estedadFont = localFont({
  src: [
    {
      path: "../../../public/fonts/Estedad-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Estedad-SemiBold.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Estedad-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-estedad",
  display: "swap",
  adjustFontFallback: "Arial",
});

export default estedadFont;
