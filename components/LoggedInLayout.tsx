"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "./admin/AdminSidebar";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user || null);
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <AdminSidebar />

      <main className="ml-64 flex-1">
        {children}
      </main>
    </div>
  );
}