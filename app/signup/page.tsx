"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"rider" | "driver" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (!userType) {
      setError("Please select account type")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (formData.name && formData.email && formData.phone && formData.password) {
        localStorage.setItem("userEmail", formData.email)
        localStorage.setItem("userName", formData.name)
        localStorage.setItem("userRole", userType)

        if (userType === "driver") {
          router.push("/driver-onboarding")
        } else {
          router.push("/dashboard/rider")
        }
      } else {
        setError("Please fill in all fields")
        setIsLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground">Join Abis today</p>
          </div>

          {/* Account Type Selection */}
          {!userType && (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">I want to:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUserType("rider")}
                  className="p-4 border-2 border-border rounded-lg hover:border-primary transition text-center space-y-2"
                >
                  <div className="text-2xl">🚗</div>
                  <p className="font-semibold text-foreground text-sm">Book Rides</p>
                </button>
                <button
                  onClick={() => setUserType("driver")}
                  className="p-4 border-2 border-border rounded-lg hover:border-secondary transition text-center space-y-2"
                >
                  <div className="text-2xl">🚕</div>
                  <p className="font-semibold text-foreground text-sm">Drive & Earn</p>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          {userType && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => setUserType(null)}
                className="text-sm text-primary hover:text-primary/80 transition mb-4"
              >
                ← Change account type
              </button>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  {error}
                </div>
              )}

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

              {/* Password */}
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

              {/* Confirm Password */}
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

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer">
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
                </span>
              </label>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          )}

          {/* Footer */}
          {userType && (
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition">
                Sign in
              </Link>
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
