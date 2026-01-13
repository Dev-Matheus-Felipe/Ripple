import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute={"class"} enableSystem={false} defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
