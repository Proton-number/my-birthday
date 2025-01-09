"use client";

import { usePathname } from "next/navigation";

export default function PathCheck({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }
  return null;
}
