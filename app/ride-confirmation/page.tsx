"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Clock, DollarSign, MessageCircle, X } from "lucide-react"

export default function RideConfirmationPage() {
  const router = useRouter()
  const [rideStatus, setRideStatus] = useState<"matching" | "matched" | "arrived" | "in-transit" | "completed">(
    "matching",
  )
  const [driver, setDriver] = useState<any>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (!role || role !== "rider") {
      router.push("/login")
      return
    }

    // Simulate finding a driver
    const timer1 = setTimeout(() => {
      setDriver({
        name: "Ahmed Hassan",
        rating: 4.9,
        rides: 1240,
        car: "Toyota Camry - Silver",
        plate: "ABC 123",
        photo: "👨‍💼",
        eta: "4 min away",
      })
      setRideStatus("matched")
    }, 2000)

    return () => clearTimeout(timer1)
  }, [router])

  const handleCancelRide = () => {
    if (confirm("Are you sure you want to cancel this ride?")) {
      router.push("/ride-booking")
    }
  }

  const handleContactDriver = () => {
    alert("Opening chat with driver...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="font-bold text-lg">Abis</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="md:col-span-2 rounded-xl overflow-hidden border border-border h-96 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-foreground font-semibold">Live Map</p>
              <p className="text-sm text-muted-foreground">Real-time driver tracking</p>
            </div>
          </div>

          {/* Driver Information */}
          <div className="md:col-span-1 space-y-4">
            {rideStatus === "matching" && (
              <Card className="p-6 text-center space-y-4">
                <div className="animate-pulse">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="font-semibold text-foreground">Finding Your Driver</p>
                  <p className="text-sm text-muted-foreground">Please wait while we find the best match...</p>
                </div>
              </Card>
            )}

            {driver && (
              <>
                {/* Driver Card */}
                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{driver.photo}</div>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-foreground">{driver.name}</p>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-accent text-accent" />
                        <span className="font-semibold text-foreground">{driver.rating}</span>
                        <span className="text-muted-foreground text-sm">({driver.rides} rides)</span>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-muted-foreground">Vehicle Information</p>
                    <p className="font-semibold text-foreground">{driver.car}</p>
                    <p className="text-sm font-mono bg-background px-3 py-2 rounded text-foreground border border-border">
                      {driver.plate}
                    </p>
                  </div>

                  {/* ETA */}
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <p className="text-muted-foreground text-sm mb-1">Arriving in</p>
                    <p className="text-2xl font-bold text-primary">{driver.eta}</p>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline" onClick={handleContactDriver}>
                    <MessageCircle size={18} className="mr-2" />
                    Contact Driver
                  </Button>
                  <Button
                    className="w-full bg-transparent"
                    variant="outline"
                    onClick={handleCancelRide}
                    className="border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    <X size={18} className="mr-2" />
                    Cancel Ride
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Trip Details */}
        <Card className="mt-6 p-6">
          <h2 className="font-bold text-lg text-foreground mb-4">Trip Details</h2>
          <div className="space-y-4">
            {/* From */}
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-foreground text-xs font-bold">P</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">From</p>
                <p className="font-semibold text-foreground">123 Main Street, Downtown</p>
              </div>
            </div>

            {/* To */}
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-secondary-foreground text-xs font-bold">D</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">To</p>
                <p className="font-semibold text-foreground">456 Oak Avenue, Uptown</p>
              </div>
            </div>

            {/* Summary */}
            <div className="flex justify-between pt-4 border-t border-border">
              <div className="text-center flex-1">
                <p className="text-sm text-muted-foreground">Estimated Time</p>
                <p className="font-bold text-foreground flex items-center justify-center gap-1 mt-1">
                  <Clock size={16} />
                  18 min
                </p>
              </div>
              <div className="w-px bg-border"></div>
              <div className="text-center flex-1">
                <p className="text-sm text-muted-foreground">Estimated Fare</p>
                <p className="font-bold text-foreground flex items-center justify-center gap-1 mt-1">
                  <DollarSign size={16} />
                  €12.45
                </p>
              </div>
              <div className="w-px bg-border"></div>
              <div className="text-center flex-1">
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="font-bold text-foreground mt-1">5.2 km</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
