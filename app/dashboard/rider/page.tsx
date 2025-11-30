"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, DollarSign, Star, Settings, LogOut } from "lucide-react"

export default function RiderDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("userName")
    const role = localStorage.getItem("userRole")

    if (!role || role !== "rider") {
      router.push("/login")
      return
    }

    setUserName(name || "Rider")
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const recentRides = [
    { id: 1, destination: "Downtown Station", distance: "5.2 km", fare: "€8.50", time: "2 hours ago", rating: 4.8 },
    { id: 2, destination: "Airport Terminal", distance: "22 km", fare: "€34.20", time: "1 day ago", rating: 5 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="font-bold text-lg">Abis</span>
          </div>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground mt-1">Ready for your next ride?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <Button className="h-16 text-lg" asChild>
            <Link href="/ride-booking">Book a Ride Now</Link>
          </Button>
          
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Rides</p>
                <p className="text-3xl font-bold text-foreground">24</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="text-primary" size={24} />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-foreground">€287</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="text-secondary" size={24} />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Rating</p>
                <p className="text-3xl font-bold text-foreground">4.9★</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Star className="text-accent" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Rides */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Rides</h2>
          <div className="space-y-4">
            {recentRides.map((ride) => (
              <div
                key={ride.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border"
              >
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{ride.destination}</p>
                  <p className="text-sm text-muted-foreground">
                    {ride.distance} • {ride.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{ride.fare}</p>
                  <p className="text-sm text-accent flex items-center gap-1 justify-end">
                    <Star size={14} className="fill-accent" />
                    {ride.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
