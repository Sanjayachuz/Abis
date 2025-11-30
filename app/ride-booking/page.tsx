"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Users, ChevronRight, ArrowUpDown, LogOut, Settings } from "lucide-react"

export default function RideBookingPage() {
  const router = useRouter()
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [selectedRideType, setSelectedRideType] = useState<"economy" | "comfort" | "premium">("economy")
  const [showRideOptions, setShowRideOptions] = useState(false)
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null)
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (!role || role !== "rider") {
      router.push("/login")
    }
  }, [router])

  const rideTypes = [
    {
      id: "economy",
      name: "Economy",
      description: "Affordable rides",
      icon: "🚗",
      priceMultiplier: 1,
      capacity: 4,
    },
    {
      id: "comfort",
      name: "Comfort",
      description: "Premium comfort",
      icon: "🚕",
      priceMultiplier: 1.5,
      capacity: 4,
    },
    {
      id: "premium",
      name: "Premium",
      description: "Luxury experience",
      icon: "🚙",
      priceMultiplier: 2,
      capacity: 4,
    },
  ]

  const handleCalculateFare = () => {
    if (pickupLocation && dropoffLocation) {
      // Simulate fare calculation
      const baseDistance = 5 // km
      const basePrice = 4.5
      const rideTypeObj = rideTypes.find((rt) => rt.id === selectedRideType)
      const multiplier = rideTypeObj?.priceMultiplier || 1

      const fare = (basePrice * multiplier * (1 + Math.random() * 0.3)).toFixed(2)
      const time = Math.floor(10 + Math.random() * 15) // 10-25 minutes

      setEstimatedFare(Number.parseFloat(fare))
      setEstimatedTime(time)
      setShowRideOptions(true)
    }
  }

  const handleSwapLocations = () => {
    const temp = pickupLocation
    setPickupLocation(dropoffLocation)
    setDropoffLocation(temp)
  }

  const handleBookRide = () => {
    router.push("/ride-confirmation")
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard/rider" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="font-bold text-lg">Abis</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <Settings size={20} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="md:col-span-2">
            <Card className="p-6 space-y-6">
              <h1 className="text-2xl font-bold text-foreground">Book Your Ride</h1>

              {/* Location Inputs */}
              <div className="space-y-4">
                {/* Pickup Location */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={20} />
                    <Input
                      type="text"
                      placeholder="Enter pickup location"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="pl-10 bg-input border-border"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleSwapLocations}
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition"
                  >
                    <ArrowUpDown className="text-primary" size={20} />
                  </button>
                </div>

                {/* Dropoff Location */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Dropoff Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                    <Input
                      type="text"
                      placeholder="Enter dropoff location"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="pl-10 bg-input border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Ride Type Selection */}
              <div className="space-y-4">
                <h2 className="font-semibold text-foreground">Choose Your Ride</h2>
                <div className="grid grid-cols-3 gap-3">
                  {rideTypes.map((ride) => (
                    <button
                      key={ride.id}
                      onClick={() => {
                        setSelectedRideType(ride.id as any)
                        setShowRideOptions(false)
                        setEstimatedFare(null)
                      }}
                      className={`p-4 rounded-lg border-2 transition €{
                        selectedRideType === ride.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{ride.icon}</div>
                      <p className="font-semibold text-foreground text-sm">{ride.name}</p>
                      <p className="text-xs text-muted-foreground">{ride.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <Button
                className="w-full h-12 text-base"
                onClick={handleCalculateFare}
                disabled={!pickupLocation || !dropoffLocation}
              >
                See Estimated Fare
              </Button>
            </Card>
          </div>

          {/* Estimated Fare Card */}
          {showRideOptions && estimatedFare !== null && (
            <div className="md:col-span-1 h-fit sticky top-24">
              <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-4">Trip Summary</h3>

                  {/* Route */}
                  <div className="space-y-3 mb-6">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground text-xs font-bold">P</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Pickup</p>
                        <p className="font-semibold text-foreground text-sm line-clamp-2">{pickupLocation}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 ml-2 pl-1 border-l-2 border-primary/30">
                      <div className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1"></div>
                      <div>
                        <p className="text-xs text-muted-foreground">Dropoff</p>
                        <p className="font-semibold text-foreground text-sm line-clamp-2">{dropoffLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 py-4 border-y border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">Ride Type:</span>
                      <span className="font-semibold text-foreground">
                        {rideTypes.find((rt) => rt.id === selectedRideType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock size={16} />
                        Estimated Time
                      </div>
                      <span className="font-semibold text-foreground">{estimatedTime} min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Users size={16} />
                        Capacity
                      </div>
                      <span className="font-semibold text-foreground">
                        {rideTypes.find((rt) => rt.id === selectedRideType)?.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Fare */}
                  <div className="pt-4 space-y-2">
                    <p className="text-muted-foreground text-sm">Estimated Fare</p>
                    <p className="text-4xl font-bold text-primary">€{estimatedFare}</p>
                    <p className="text-xs text-muted-foreground">Prices may vary based on demand</p>
                  </div>
                </div>

                <Button className="w-full h-12 text-base" onClick={handleBookRide}>
                  Book Ride
                  <ChevronRight size={20} className="ml-2" />
                </Button>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
