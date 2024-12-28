"use client"

import Link from 'next/link'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, User } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User avatar"} />
                  <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/client">Client Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/trainer">Trainer Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut(auth)}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <Link href="/" className="text-2xl font-bold text-primary pl-12 md:pl-0">GoFit</Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            <li><Link href="/trainers" className="hover:text-primary transition-colors">Find Trainers</Link></li>
            <li><Link href="/clients" className="hover:text-primary transition-colors">For Clients</Link></li>
            <li><Link href="/trainers/register" className="hover:text-primary transition-colors">For Trainers</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
            {user ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User avatar"} />
                      <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/client">Client Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/trainer">Trainer Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut(auth)}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <>
                <li><Button asChild variant="outline"><Link href="/login">Login</Link></Button></li>
                <li><Button asChild><Link href="/register">Sign Up</Link></Button></li>
              </>
            )}
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </li>
          </ul>
        </nav>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/trainers">Find Trainers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/clients">For Clients</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/trainers/register">For Trainers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              {user && (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/client">Client Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/trainer">Trainer Dashboard</Link>
                  </DropdownMenuItem>
                </>
              )}
              {user ? (
                <DropdownMenuItem onClick={() => signOut(auth)}>
                  Logout
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

