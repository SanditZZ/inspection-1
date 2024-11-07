import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Kanit } from "next/font/google";
import Link from "next/link";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "inspection-1",
  description: "inspection-1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${kanit.className} antialiased`}>
        <ReactQueryProvider>
          <main className="flex flex-col mx-auto max-w-screen-xl gap-5 px-6 py-8 pb-12 md:py-8 md:px-10">
            <Link href="/">
              <h1 className="text-3xl font-bold underline select-none">inspection-1</h1>
            </Link>
            {children}
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
