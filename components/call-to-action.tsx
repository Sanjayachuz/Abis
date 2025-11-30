import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CallToAction() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-accent">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">Ready to Get Started?</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of satisfied riders and drivers on Abis today
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/ride-booking">Book Your First Ride</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            asChild
          >
            <Link href="/driver-signup">Become a Driver</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
