"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Utensils,
  Store,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Providers } from "../providers";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Providers>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        {/* Navbar mobile */}
        <div className="flex items-center justify-between md:hidden bg-primary text-white px-4 py-3 shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <Link href="/">
            <img src="/img/logo_white.png" alt="Logo" className="h-10" />
          </Link>
          <div />
        </div>

        {/* Sidebar */}
        <div
          className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-primary text-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:block`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Overlay (mobile only) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">{children}</main>
      </div>
    </Providers>
  );
}

function Sidebar({ onClose }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Mon Profil", href: "/admin/profile", icon: User },
    { name: "Kidzo", href: "/admin/kidzo", icon: Store },
    { name: "Souk", href: "/admin/souk", icon: ShoppingBag },
    { name: "Restaurants", href: "/admin/restaurant", icon: Utensils },
    { name: "Shopping", href: "/admin/shopping", icon: ShoppingBag },
  ];

  return (
    <nav className="w-64 min-h-screen py-8 flex flex-col justify-between">
      {/* Mobile close button */}
      <div className="flex md:hidden justify-end px-4 mb-2">
        <button onClick={onClose} className="text-white">
          <X size={24} />
        </button>
      </div>

      <div>
        <div className="hidden md:flex justify-center mb-10">
          <Link href="/">
            <img src="/img/logo_white.png" alt="Logo" className="h-16" />
          </Link>
        </div>

        <ul className="space-y-2 px-6">
          {links.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <li key={href} className="relative">
                <hr className="my-2 border-white/30" />
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition w-full ${
                    isActive
                      ? "bg-white text-primary font-semibold"
                      : "hover:bg-white hover:text-primary"
                  }`}
                >
                  <Icon size={20} />
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="px-6 mt-10">
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="w-full flex items-center justify-center gap-2 bg-white text-primary hover:bg-primary hover:text-white hover:border hover:border-white px-4 py-2 rounded-md transition"

        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </nav>
  );
}
