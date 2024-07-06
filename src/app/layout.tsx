import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WinSizeContextProvider } from "./contexts/winSizeContext";
import { AuthTargetContextProvider } from "./contexts/authTargetContext";
import { IsLoadingContextProvider } from "./contexts/isLoadingContext";
import { NotifyContextProvider } from "./contexts/notifyContext";
import { UserContextProvider } from "./contexts/userContext";
import WhatsApp from "./components/WhatsApp/page";
import { PromptContextProvider } from "./contexts/promptContext";
import { CurrencyContextProvider } from "./contexts/currencyContext";
import { ExchangeRateContextProvider } from "./contexts/exchangeRateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pryme Tourism - Unforgettable Tours & Expert Visa Services for Students & Business Travelers",
  description: "Unforgettable Adventure Tours & Hassle-Free Student & Business Visas. Explore the World with Pryme Tourism. Book Your Dream Trip Today",
  keywords: "travel, tours, vacation, adventure travel, cultural tours, luxury travel, budget travel, student visa, study abroad, international student, student exchange programs, business visa, work visa, travel for business, corporate travel"
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
                  <PromptContextProvider>
                    <ExchangeRateContextProvider>
                      <CurrencyContextProvider>
                        {children}
                      </CurrencyContextProvider>
                    </ExchangeRateContextProvider>
                  </PromptContextProvider>
                  <WhatsApp />
                </UserContextProvider>
              </NotifyContextProvider>
            </IsLoadingContextProvider>
          </AuthTargetContextProvider>
        </WinSizeContextProvider>
      </body>
    </html>
  );
}
