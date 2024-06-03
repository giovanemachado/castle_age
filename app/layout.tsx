import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GameStoreProvider } from "./store/gameStoreProvider";
import Navbar from "./components/navbar/navbar";
import UserDataWrapper from "./userDataWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Castle Game",
  description: "Castle Game is a turn based game about conquering castles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <GameStoreProvider>
          <div className="h-screen flex flex-col container mx-auto px-2">
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
