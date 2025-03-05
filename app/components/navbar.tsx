"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProfileModal } from "./profile-modal"
import { CompanyModal } from "./company-modal"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const router = useRouter()
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)

  const handleSignOut = () => {
    // Implement sign out logic here
    router.push("/signin")
  }

  return (
    <nav className="bg-background border-b h-16 flex items-center justify-between px-8">
      <Link href="/" className="text-2xl font-bold">
        D-CFT
      </Link>
      <div className="space-x-4 flex items-center">
        <Link href="/about" className="hover:text-primary">
          About
        </Link>
        <Link href="/contact" className="hover:text-primary">
          Contact
        </Link>
        <Button variant="ghost" className="hover:text-primary" onClick={() => setIsProfileModalOpen(true)}>
          Profile
        </Button>
        <Button variant="ghost" className="hover:text-primary" onClick={() => setIsCompanyModalOpen(true)}>
          Company
        </Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsProfileModalOpen(true)}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsCompanyModalOpen(true)}>Company</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <CompanyModal isOpen={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)} />
    </nav>
  )
}

