"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Determine if the current route is the login page
  const isLoginPage = pathname === "/login" || pathname === "/register";

  return !isLoginPage ? <Navbar /> : null;
}
