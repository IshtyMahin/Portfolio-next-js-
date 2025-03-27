import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ishtiaq Uddin - Portfolio",
  description: "Portfolio of Ishtiaq Uddin, a dedicated software developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Roboto+Condensed&display=swap"
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
