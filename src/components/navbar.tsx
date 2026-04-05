"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Home, LayoutDashboard, Bookmark } from "lucide-react";

function NavLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "bg-gold text-background"
          : "text-textSecondary hover:text-white hover:bg-card"
      }`}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
              <Film size={18} className="text-background" />
            </div>
            <span className="text-xl font-bold text-white">MovieQuest</span>
          </Link>

          <div className="flex items-center gap-2">
            <NavLink href="/" icon={Home} label="Home" />
            <NavLink href="/movies" icon={Film} label="Movies" />
            <NavLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavLink href="/watchlist" icon={Bookmark} label="Watchlist" />
          </div>
        </div>
      </div>
    </nav>
  );
}
