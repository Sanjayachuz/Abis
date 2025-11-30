"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, DollarSign, Clock, Star, Settings, LogOut, MapPinIcon, TrendingUp } from "lucide-react"

interface RideRequest {
  id: string
  passengerName: string
  pickupLocation: string
  dropoffLocation: string
  distance: string
  estimatedFare: string
  pickupTime: string
  passengers: number
  rating?: number
}

export default function DriverDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [isOnline, setIsOnline] = useState(false)
  const [currentRide, setCurrentRide] = useState<RideRequest | null>(null)
  const [availableRides, setAvailableRides] = useState<RideRequest[]>([
    {
      id: "1",
      passengerName: "Emma Johnson",
      pickupLocation: "123 Main Street, Downtown",
      dropoffLocation: "456 Park Avenue, Uptown",
      distance: "4.2 km",
      estimatedFare: "€8.50",
      pickupTime: "In 2 minutes",
      passengers: 1,
      rating: 4.8,
    },
    {
      id: "2",
      passengerName: "Michael Chen",
      pickupLocation: "Central Station",
      dropoffLocation: "Airport Terminal B",
      distance: "18 km",
      estimatedFare: "€28.90",
      pickupTime: "In 5 minutes",
      passengers: 2,
    },
  ])

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const role = localStorage.getItem("userRole")

    if (!role || role !== "driver") {
      router.push("/login")
      return
    }

    setUserName(name || "Driver")
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const handleAcceptRide = (ride: RideRequest) => {
    setCurrentRide(ride)
    setAvailableRides(availableRides.filter((r) => r.id !== ride.id))
  }

  const handleCompleteRide = () => {
    setCurrentRide(null)
  }

  const handleToggleOnline = () => {
    setIsOnline(!isOnline)
  }

  const stats = [
    { label: "Today Earnings", value: "€156.80", icon: DollarSign, color: "text-secondary" },
    { label: "Rides Today", value: "12", icon: MapPin, color: "text-primary" },
    { label: "Rating", value: "4.9★", icon: Star, color: "text-accent" },
    { label: "Acceptance Rate", value: "98%", icon: TrendingUp, color: "text-primary" },
  ]

  const completedRides = [
    { id: 1, passenger: "Sarah Williams", distance: "5.2 km", fare: "€10.40", rating: 5, time: "2:30 PM" },
    { id: 2, passenger: "David Brown", distance: "3.8 km", fare: "€7.60", rating: 4.8, time: "1:15 PM" },
    { id: 3, passenger: "Lisa Martinez", distance: "12 km", fare: "€22.50", rating: 5, time: "10:45 AM" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">A</span>
                </div>
              </Link>
              <div>
                <h1 className="font-bold text-foreground">Welcome, {userName}!</h1>
                <p className="text-xs text-muted-foreground">Driver Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                <div className={`w-3 h-3 rounded-full €{isOnline ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-sm font-semibold text-foreground">{isOnline ? "Online" : "Offline"}</span>
              </div>
              <Button
                onClick={handleToggleOnline}
                variant={isOnline ? "destructive" : "default"}
                className="hidden sm:flex"
              >
                {isOnline ? "Go Offline" : "Go Online"}
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/driver-profile">
                  <Settings size={20} />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Online Toggle Mobile */}
        <div className="sm:hidden mb-6">
          <Button onClick={handleToggleOnline} variant={isOnline ? "destructive" : "default"} className="w-full">
            {isOnline ? "Go Offline" : "Go Online"}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-muted rounded-lg flex items-center justify-center €{stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Current Ride or Available Rides */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            {currentRide ? (
              // Current Ride Details
              <Card className="p-6 space-y-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-foreground">Current Ride</h2>
                  <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                    In Progress
                  </div>
                </div>

                {/* Passenger Info */}
                <div className="bg-card rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">👤</div>
                    <div>
                      <p className="font-bold text-foreground text-lg">{currentRide.passengerName}</p>
                      {currentRide.rating && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Star size={14} className="fill-accent text-accent" />
                          {currentRide.rating} rating
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Route */}
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-xs font-bold">P</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Pickup</p>
                      <p className="font-semibold text-foreground">{currentRide.pickupLocation}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 ml-2 pl-1 border-l-2 border-primary/30">
                    <div className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1"></div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Dropoff</p>
                      <p className="font-semibold text-foreground">{currentRide.dropoffLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-1">Distance</p>
                    <p className="font-bold text-foreground">{currentRide.distance}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-1">Passengers</p>
                    <p className="font-bold text-foreground">{currentRide.passengers}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-1">Fare</p>
                    <p className="font-bold text-foreground">{currentRide.estimatedFare}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-transparent" variant="outline">
                    <MapPinIcon size={18} className="mr-2" />
                    Navigate
                  </Button>
                  <Button className="flex-1 bg-transparent" variant="outline">
                    📱 Call Passenger
                  </Button>
                </div>

                <Button className="w-full" size="lg" onClick={handleCompleteRide}>
                  Complete Ride
                </Button>
              </Card>
            ) : (
              // Available Rides
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Available Rides</h2>
                {availableRides.length > 0 ? (
                  availableRides.map((ride) => (
                    <Card key={ride.id} className="p-6 hover:border-primary/50 transition">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-bold text-lg text-foreground">{ride.passengerName}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock size={14} />
                            {ride.pickupTime}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-secondary">{ride.estimatedFare}</p>
                          <p className="text-xs text-muted-foreground">{ride.distance}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 py-4 border-y border-border">
                        <div className="flex gap-2">
                          <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">From</p>
                            <p className="text-sm font-semibold text-foreground line-clamp-1">{ride.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <MapPin size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-muted-foreground">To</p>
                            <p className="text-sm font-semibold text-foreground line-clamp-1">{ride.dropoffLocation}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-transparent" variant="outline">
                          Decline
                        </Button>
                        <Button className="flex-1" onClick={() => handleAcceptRide(ride)}>
                          Accept Ride
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <p className="text-2xl mb-2">🔍</p>
                    <p className="text-foreground font-semibold mb-2">No Available Rides</p>
                    <p className="text-muted-foreground text-sm">
                      When riders request a ride, it will appear here. Make sure you're online!
                    </p>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Today's Summary */}
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-lg text-foreground">Today's Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Online Time</span>
                  <span className="font-semibold text-foreground">4h 32m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed Rides</span>
                  <span className="font-semibold text-foreground">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Distance</span>
                  <span className="font-semibold text-foreground">87.4 km</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="text-foreground font-semibold">Today Earnings</span>
                  <span className="font-bold text-secondary text-lg">€156.80</span>
                </div>
              </div>
            </Card>

            {/* Recent Completed */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-lg text-foreground">Completed Rides</h3>
              <div className="space-y-3">
                {completedRides.map((ride) => (
                  <div
                    key={ride.id}
                    className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{ride.passenger}</p>
                      <p className="text-xs text-muted-foreground">{ride.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{ride.fare}</p>
                      <p className="text-xs text-accent flex items-center gap-0.5 justify-end">
                        <Star size={12} className="fill-accent" />
                        {ride.rating}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
