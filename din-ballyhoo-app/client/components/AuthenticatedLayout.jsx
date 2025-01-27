"use client";

import { useUserContext } from "@/app/context/UserContext";
import Header from "./Header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthenticatedLayout({ children }) {
  const { user } = useUserContext();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="mainContent">{children}</main>
    </>
  );
}
