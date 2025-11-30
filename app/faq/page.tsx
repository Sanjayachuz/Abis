"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">FAQ</h1>
        <p className="text-muted-foreground mb-8">
          Visit our{" "}
          <Link href="/support" className="text-primary hover:underline">
            Support Center
          </Link>{" "}
          for comprehensive FAQs and customer support.
        </p>
        <Button asChild>
          <Link href="/support">Go to Support Center</Link>
        </Button>
      </main>

      <Footer />
    </div>
  )
}
