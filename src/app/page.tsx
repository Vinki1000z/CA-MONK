"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to another page, for example: "/dashboard"
    router.push("/dashboard");
  }, [router]);

  return null; // Or a loading spinner if you want
}
