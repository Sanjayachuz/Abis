import { ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Open Abis",
      description: "Launch the app and allow location access",
    },
    {
      number: "02",
      title: "Set Destination",
      description: "Enter your pickup and drop-off locations",
    },
    {
      number: "03",
      title: "Book Your Ride",
      description: "Choose your ride type and confirm booking",
    },
    {
      number: "04",
      title: "Arrive Safely",
      description: "Enjoy your ride with a professional driver",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Getting a ride with Abis is quick and easy</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-primary/10 rounded-xl p-8 mb-4 h-40 flex items-center justify-center">
                <span className="text-5xl font-bold text-primary/30">{step.number}</span>
              </div>
              <h3 className="font-bold text-xl text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-4 top-16 text-primary text-3xl w-6 h-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
