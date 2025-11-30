"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have questions? Visit our{" "}
          <Link href="/support" className="text-primary hover:underline">
            Support Center
          </Link>{" "}
          to get help or contact our team.
        </p>
        <Button asChild>
          <Link href="/support">Contact Support</Link>
        </Button>
      </main>

      <Footer />
    </div>
  )
}
