import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WinSizeContextProvider } from "./contexts/winSizeContext";
import { AuthTargetContextProvider } from "./contexts/authTargetContext";
import { IsLoadingContextProvider } from "./contexts/isLoadingContext";
import { NotifyContextProvider } from "./contexts/notifyContext";
import { UserContextProvider } from "./contexts/userContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pryme Tourism - Unforgettable Tours & Expert Visa Services for Students & Business Travelers",
  description: "Unforgettable Adventure Tours & Hassle-Free Student & Business Visas. Explore the World with Pryme Tourism. Book Your Dream Trip Today",
  keywords: "phones, mobile phones, smartphones, phones in ghana, affordable phones in ghana, budget friendly phones in Ghana, low budget phones in Ghana, best phones, best phones in Ghana, best online shop in ghana, best e-commerce in Ghana, best ecommerce in ghana, phone accessories, earbuds, phone covers, phone chargers, jerseys, men's fashion, women's fashion, online shopping, ecommerce, ghana, affordable, budget-friendly, clothing, apparel, shoes, bags, jewelry, electronics, gadgets, home decor, household items, ghana, ghanaian, accra, kumasi, online shopping ghana, e-commerce ghana, buy online in ghana, shop online ghana, cheap, discounts, deals, offers, sales, bargains, value for money, cost-effective, online shopping, e-commerce, internet shopping, fast delivery, reliable delivery, easy returns, hassle-free returns, secure payment, safe transactions, trusted, reputable, reliable, top brands, quality products, quality phones, customer reviews, testimonials, best prices, lowest prices, top-rated, high-rated, unique, exclusive, wide selection, diverse range, fashionable, trendy, stylish, convenient, time-saving, quality of life, lifestyle, happiness, satisfaction",
  icons : {
    icon : ['favicon.ico?v=4'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WinSizeContextProvider>
          <AuthTargetContextProvider>
            <IsLoadingContextProvider>
              <NotifyContextProvider>
                <UserContextProvider>
                  {children}
                </UserContextProvider>
              </NotifyContextProvider>
            </IsLoadingContextProvider>
          </AuthTargetContextProvider>
        </WinSizeContextProvider>
      </body>
    </html>
  );
}
