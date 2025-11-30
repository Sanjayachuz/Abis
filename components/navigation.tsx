"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-48 h-12">
              <Image src="/abis-logo.png" alt="Abis Logo" fill className="object-contain" priority />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#how-it-works" className="text-foreground hover:text-primary transition">
              How it works
            </Link>
            <Link href="#safety" className="text-foreground hover:text-primary transition">
              Safety
            </Link>
            <Link href="/support" className="text-foreground hover:text-primary transition">
              Support
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
            <Link href="#how-it-works" className="block text-foreground hover:text-primary">
              How it works
            </Link>
            <Link href="#safety" className="block text-foreground hover:text-primary">
              Safety
            </Link>
            <Link href="/support" className="block text-foreground hover:text-primary">
              Support
            </Link>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
