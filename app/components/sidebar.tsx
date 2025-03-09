"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Leaf,
  Settings,
  FileText,
  ShoppingCart,
  Users,
  Bell,
  BookOpen,
  Cpu,
  Landmark,
  Wallet,
  Sparkles,
  Heart,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Analysis", path: "/analysis", icon: <Leaf className="h-5 w-5" /> },
    { name: "Blockchain", path: "/blockchain", icon: <Wallet className="h-5 w-5" /> },
    { name: "IoT Devices", path: "/iot", icon: <Cpu className="h-5 w-5" /> },
    { name: "Marketplace", path: "/marketplace", icon: <ShoppingCart className="h-5 w-5" /> },
    { name: "Reports", path: "/reports", icon: <FileText className="h-5 w-5" /> },
    { name: "Education", path: "/education", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Rewards", path: "/rewards", icon: <Sparkles className="h-5 w-5" /> },
    { name: "Community", path: "/community", icon: <Users className="h-5 w-5" /> },
    { name: "Government", path: "/government", icon: <Landmark className="h-5 w-5" /> },
    { name: "Notifications", path: "/notifications", icon: <Bell className="h-5 w-5" /> },
    { name: "Premium Plans", path: "/premium-plans", icon: <Sparkles className="h-5 w-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
    { name: "Statistics", path: "/Statistics", icon: <Sparkles className="h-5 w-5" /> },
    { name: "NGO Initiatives", path: "/ngo", icon: <Heart className="h-5 w-5" /> },
   
  ]

  return (
    <div
      className={`border-r bg-background h-full transition-all duration-300 ${
        expanded ? "w-64" : "w-[70px]"
      } flex flex-col`}
    >
      <div className="p-4 flex justify-between items-center">
        {expanded && <h2 className="font-semibold text-lg">Navigation</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="h-8 w-8"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                  isActive(item.path)
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.icon}
                {expanded && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

