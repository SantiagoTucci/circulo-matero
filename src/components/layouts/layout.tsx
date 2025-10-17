import "@fontsource/inter/variable.css";
import "../../index.css"; 

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-white text-foreground">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
