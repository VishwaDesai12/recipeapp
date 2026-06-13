import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";
import { CookingProvider } from "@/context/CookingContext";
import { Navbar } from "@/components/Navbar";
import { NavAuthButton } from "@/components/NavAuthButton";

const dmSans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const playfairDisplay = Playfair_Display({ variable: "--font-heading", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipeApp — Browse, Create & Manage Recipes",
  description: "A recipe management app with ingredient scaling, dietary filters, and a personal cookbook.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ReduxProvider>
          <CookingProvider>
            <Navbar authButton={<NavAuthButton />} />
            <main className="flex-1">{children}</main>
          </CookingProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
