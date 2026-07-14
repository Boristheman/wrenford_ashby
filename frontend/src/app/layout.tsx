import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wrenford Ashby | Estate Agents in South Essex",
    template: "%s | Wrenford Ashby",
  },
  description:
    "Independent estate agents for Wickford and the surrounding South Essex area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
