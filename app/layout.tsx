import type { Metadata } from "next";
import "./globals.css";
import { GameStoreProvider } from "./store/gameStoreProvider";
import Navbar from "./components/navbar/navbar";
import UserDataWrapper from "./userDataWrapper";

import { Macondo } from "next/font/google";

const macondo = Macondo({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Castle Age",
  description: "Castle Age is a turn based game about conquering castles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={macondo.className} suppressHydrationWarning={true}>
        <GameStoreProvider>
          <div className="h-screen flex flex-col container max-w-screen-2xl mx-auto px-2 text-base">
            <UserDataWrapper>
              {
                <>
                  <Navbar />
                  {children}
                </>
              }
            </UserDataWrapper>
          </div>
        </GameStoreProvider>
      </body>
    </html>
  );
}
