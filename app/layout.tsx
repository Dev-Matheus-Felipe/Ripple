import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Suspense } from "react";
import { PostViewContext } from "@/components/contexts/viewPost";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute={"class"} enableSystem={false} defaultTheme="dark">
          <PostViewContext>
          <Toaster />
            <Suspense fallback={<p>CU</p>}>
              {children}
            </Suspense>
          </PostViewContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
