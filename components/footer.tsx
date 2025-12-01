import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="relative w-56 h-14">
              <Image src="/abis-logo.png" alt="Abis Logo" fill className="object-contain" />
            </div>
            <p className="text-sm text-background/80">
              Let's go together - Safe, reliable ride-hailing for everyone, everywhere.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-bold text-background">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ride-booking" className="text-background/80 hover:text-background transition">
                  Ride Booking
                </Link>
              </li>
              <li>
                <Link href="/fare-calculator" className="text-background/80 hover:text-background transition">
                  Fare Calculator
                </Link>
              </li>
              <li>
                <Link href="/driver-signup" className="text-background/80 hover:text-background transition">
                  Driver Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-bold text-background">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-background/80 hover:text-background transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-background/80 hover:text-background transition">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-background/80 hover:text-background transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-background">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-background/80">
                <Mail size={16} />
                <a href="mailto:abisservicesltd@gmail.com" className="hover:text-background transition">
                  abisservicesltd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Phone size={16} />
                <a href="tel:+35677964606" className="hover:text-background transition">
                  +356 7796 4606
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/80">
                <MapPin size={16} className="mt-0.5" />
                <span>Abi's Service Limited, 21 Hillview, FL 3 Triq il-Kejla, Swieqi, Malta</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/80">
            <p>&copy; 2025 Abi's Service Limited. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-background transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-background transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
