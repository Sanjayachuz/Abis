import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Users, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Welcome to Abis</p>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Your Ride,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {" "}
                  Your Safety
                </span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Experience safe, reliable, and affordable ride-hailing with Abis. Book your ride in seconds and arrive
              with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/ride-booking">Book a Ride</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/driver-signup">Drive with Abis</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  <span className="font-bold text-2xl text-foreground">50K+</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  <span className="font-bold text-2xl text-foreground">25+</span>
                </div>
                <p className="text-sm text-muted-foreground">Cities</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" />
                  <span className="font-bold text-2xl text-foreground">4.9★</span>
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:block">
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl absolute"></div>
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4">🚗</div>
                  <p className="text-foreground font-semibold">Reliable Rides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
