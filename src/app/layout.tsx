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
  title: "Pryme Tourism",
  description: "Unleash your wanderlust! Explore the world with our unforgettable tours and seamless visa services for students and business travelers",
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
