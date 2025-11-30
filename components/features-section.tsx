import { Smartphone, Zap, Shield, MapPin, DollarSign, HeadsetIcon } from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "Instant Booking",
    description: "Request a ride in seconds with our simple, intuitive app",
  },
  {
    icon: Zap,
    title: "Real-time Tracking",
    description: "Track your driver's location and estimated arrival in real-time",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Know your fare before you book - no hidden charges",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Verified drivers and comprehensive safety features",
  },
  {
    icon: MapPin,
    title: "Go Anywhere",
    description: "Available in 25+ cities with expanding coverage",
  },
  {
    icon: HeadsetIcon,
    title: "24/7 Support",
    description: "Dedicated customer support available anytime",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Why Choose Abis?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with features designed for your comfort and safety
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
