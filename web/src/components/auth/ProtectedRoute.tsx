"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !admin && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [admin, isLoading, router, pathname]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
}
