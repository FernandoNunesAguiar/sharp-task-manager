import "./globals.css";
import { UserProvider } from "@/context/userContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
    </UserProvider>
  );
}
