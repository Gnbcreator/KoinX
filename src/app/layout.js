
import { Inter } from "next/font/google"
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: "koinx",
  description: "Koinx is an innovative solution designed to simplify the complexities of cryptocurrency management for individuals, businesses, and investors. With cutting-edge technology and a user-friendly interface, Koinx empowers users to effortlessly manage, track, and optimize their cryptocurrency portfolios",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
