import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import ServiceWorker from "@/components/ServiceWorker";

export const metadata = {
  title: "Only You Shopping",
  description: "Premium Shopping Experience",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ServiceWorker />

        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}