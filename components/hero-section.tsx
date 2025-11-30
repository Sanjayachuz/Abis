"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Users, TrendingUp } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// Replace these with your real image paths (public folder or CDN)
const images = [
  "/images/car1.png",
  "/images/car2.png",
  "/images/driving.jpg",
  
]

function SlideCarousel({ intervalMs = 4000, heightClass = "h-96" }) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef(null)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [isPaused, intervalMs])

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)
  const goTo = (i) => setIndex(i)

  return (
    <div
      className="hidden md:block"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`relative ${heightClass} rounded-3xl overflow-hidden`}>
        {/* sliding track */}
        <div
          ref={trackRef}
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="w-full flex-shrink-0 relative">
              <img
                src={src}
                alt={`slide-${i}`}
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* Optional overlay & caption area (customize if you want text) */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/40 text-white rounded-full p-2 backdrop-blur-sm"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "scale-110 bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

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

          {/* Right Visual - replaced with sliding carousel */}
          <SlideCarousel intervalMs={4000} heightClass="h-96" />
        </div>
      </div>
    </section>
  )
}
