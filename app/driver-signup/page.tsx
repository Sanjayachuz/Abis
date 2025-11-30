"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, CheckCircle } from "lucide-react"

const requirements = [
  { id: 1, text: "18+ years old", completed: false },
  { id: 2, text: "Valid driver license (minimum 2 years)", completed: false },
  { id: 3, text: "Vehicle registration", completed: false },
  { id: 4, text: "Valid passport/ID", completed: false },
  { id: 5, text: "Clean background check", completed: false },
  { id: 6, text: "Vehicle insurance", completed: false },
]

export default function DriverSignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    licenseExpiry: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (formData.name && formData.email && formData.phone && formData.password && formData.licenseNumber) {
        localStorage.setItem("userEmail", formData.email)
        localStorage.setItem("userName", formData.name)
        localStorage.setItem("userRole", "driver")
        router.push("/driver-onboarding")
      } else {
        setError("Please fill in all fields")
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Drive with Abis</h1>
          <p className="text-muted-foreground mt-2">Flexible earnings, professional support</p>
        </div>

        {/* Requirements */}
        <Card className="p-6 mb-6 bg-secondary/5 border-secondary/20">
          <h2 className="font-bold text-foreground mb-4">Driver Requirements</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {requirements.map((req) => (
              <div key={req.id} className="flex items-start gap-2">
                <CheckCircle size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{req.text}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Form */}
        <Card className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-bold text-foreground">Personal Information</h3>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (234) 567-890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>

            {/* License Information */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-bold text-foreground">Driver License Information</h3>

              {/* License Number */}
              <div className="space-y-2">
                <Label htmlFor="licenseNumber" className="text-foreground">
                  License Number
                </Label>
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  placeholder="DL1234567"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>

              {/* License Expiry */}
              <div className="space-y-2">
                <Label htmlFor="licenseExpiry" className="text-foreground">
                  License Expiry Date
                </Label>
                <Input
                  id="licenseExpiry"
                  name="licenseExpiry"
                  type="date"
                  value={formData.licenseExpiry}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-bold text-foreground">Create Password</h3>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-input border-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer pt-4 border-t border-border">
              <input type="checkbox" className="w-4 h-4 rounded border-border mt-1" required />
              <span className="text-xs text-muted-foreground">
                I agree to Abis{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                . I confirm that I meet all driver requirements.
              </span>
            </label>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Continue to Document Upload"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground border-t border-border pt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
