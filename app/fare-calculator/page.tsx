"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, TrendingUp, Clock, Users, DollarSign } from "lucide-react"

export default function FareCalculatorPage() {
  const [distance, setDistance] = useState("")
  const [rideType, setRideType] = useState<"economy" | "comfort" | "premium">("economy")
  const [timeOfDay, setTimeOfDay] = useState<"normal" | "peak">("normal")
  const [fare, setFare] = useState<{ base: number; surge?: number; total: number } | null>(null)

  const rideTypes = [
    { id: "economy", name: "Economy", multiplier: 1, description: "Affordable rides" },
    { id: "comfort", name: "Comfort", multiplier: 1.5, description: "Premium vehicles" },
    { id: "premium", name: "Premium", multiplier: 2, description: "Luxury experience" },
  ]

  const calculateFare = () => {
    if (!distance || isNaN(Number.parseFloat(distance))) return

    const dist = Number.parseFloat(distance)
    const baseRate = 2.5 // per km
    const minimumFare = 4.5
    const rideMultiplier = rideTypes.find((rt) => rt.id === rideType)?.multiplier || 1
    const surgeMultiplier = timeOfDay === "peak" ? 1.5 : 1

    const baseFare = Math.max(dist * baseRate * rideMultiplier, minimumFare)
    const surgeFare = baseFare * (surgeMultiplier - 1)
    const totalFare = baseFare + surgeFare

    setFare({
      base: Number.parseFloat(baseFare.toFixed(2)),
      surge: surgeFare > 0 ? Number.parseFloat(surgeFare.toFixed(2)) : undefined,
      total: Number.parseFloat(totalFare.toFixed(2)),
    })
  }

  const handleBookRide = () => {
    window.location.href = "/ride-booking"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Fare Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get an estimate of your ride fare before you book. Our transparent pricing means no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Calculator Card */}
          <Card className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Calculate Your Fare</h2>

            {/* Distance Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Distance (km)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <Input
                  type="number"
                  placeholder="Enter distance in km"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="pl-10 bg-input border-border"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            {/* Ride Type */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Ride Type</label>
              <div className="grid grid-cols-3 gap-3">
                {rideTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setRideType(type.id as any)}
                    className={`p-3 rounded-lg border-2 transition text-center €{
                      rideType === type.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold text-foreground text-sm">{type.name}</p>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Time of Day */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Time of Day</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "normal", name: "Normal Hours", icon: "🌤️" },
                  { id: "peak", name: "Peak Hours", icon: "🚗" },
                ].map((time) => (
                  <button
                    key={time.id}
                    onClick={() => setTimeOfDay(time.id as any)}
                    className={`p-3 rounded-lg border-2 transition text-center ${
                      timeOfDay === time.id
                        ? "border-secondary bg-secondary/5"
                        : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <p className="text-lg mb-1">{time.icon}</p>
                    <p className="font-semibold text-foreground text-sm">{time.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <Button className="w-full" size="lg" onClick={calculateFare}>
              Calculate Fare
            </Button>
          </Card>

          {/* Fare Breakdown */}
          <div className="space-y-6">
            {fare ? (
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <h2 className="text-2xl font-bold text-foreground mb-6">Fare Breakdown</h2>

                <div className="space-y-4">
                  {/* Base Fare */}
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Base Fare</span>
                    <span className="font-semibold text-foreground">€{fare.base.toFixed(2)}</span>
                  </div>

                  {/* Ride Type Multiplier */}
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">
                      {rideTypes.find((rt) => rt.id === rideType)?.name} Multiplier
                    </span>
                    <span className="font-semibold text-foreground">
                      {rideTypes.find((rt) => rt.id === rideType)?.multiplier || 1}x
                    </span>
                  </div>

                  {/* Surge Pricing */}
                  {fare.surge && fare.surge > 0 && (
                    <div className="flex justify-between items-center pb-4 border-b border-border">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-secondary" />
                        <span className="text-muted-foreground">Surge Pricing</span>
                      </div>
                      <span className="font-semibold text-secondary">€{fare.surge.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4">
                    <span className="font-bold text-lg text-foreground">Estimated Total</span>
                    <span className="text-3xl font-bold text-primary">€{fare.total.toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-muted-foreground pt-4 border-t border-border">
                    This is an estimate and may vary based on actual route, traffic, and current demand.
                  </p>
                </div>

                <Button className="w-full mt-6" onClick={handleBookRide}>
                  Book This Ride
                </Button>
              </Card>
            ) : (
              <Card className="p-8 text-center space-y-4">
                <DollarSign size={40} className="text-muted-foreground mx-auto opacity-50" />
                <p className="text-foreground font-semibold">Enter distance to see fare estimate</p>
              </Card>
            )}

            {/* Price Info Card */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-foreground">How We Calculate Fares</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Distance-based</p>
                    <p className="text-muted-foreground">$2.50 per km base rate</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={18} className="text-secondary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Time-based surges</p>
                    <p className="text-muted-foreground">50% increase during peak hours</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users size={18} className="text-accent flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Ride type multiplier</p>
                    <p className="text-muted-foreground">Economy: 1x, Comfort: 1.5x, Premium: 2x</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
