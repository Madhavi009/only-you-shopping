"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarFooter =
    pathname.startsWith("/admin") ||
    pathname === "/auth/login" ||
    pathname === "/auth/register";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      {children}

      {!hideNavbarFooter && <Footer />}
    </>
  );
}