import { AlertCircle, Check, Eye, Phone } from "lucide-react"

const safetyFeatures = [
  {
    icon: AlertCircle,
    title: "Verified Drivers",
    description: "All drivers undergo background checks and vehicle inspections",
  },
  {
    icon: Eye,
    title: "Live Location Sharing",
    description: "Share your ride details with friends and family in real-time",
  },
  {
    icon: Phone,
    title: "In-app Calling",
    description: "Direct communication with your driver through the app",
  },
  {
    icon: Check,
    title: "Emergency SOS",
    description: "Quick access to emergency contacts and authorities",
  },
]

export function SafetySection() {
  return (
    <section id="safety" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Safety is Our Priority</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to protecting your safety at every step of your journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
