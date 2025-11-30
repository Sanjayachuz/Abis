"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search, MessageCircle, Phone, Mail } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
  category: "riders" | "drivers" | "safety" | "payments"
}

const faqs: FAQItem[] = [
  {
    category: "riders",
    question: "How do I book a ride?",
    answer:
      "Open the Abis app, enter your pickup and dropoff locations, select your ride type, and confirm the booking. A nearby driver will be matched with you within seconds.",
  },
  {
    category: "riders",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, digital wallets, and cash on selected rides. You can also add a payment method in your profile settings.",
  },
  {
    category: "riders",
    question: "Can I cancel my ride?",
    answer:
      "You can cancel for free up to 2 minutes after booking. After that, a cancellation fee of €3-5 may apply. In-progress rides cannot be cancelled.",
  },
  {
    category: "drivers",
    question: "How do I sign up as a driver?",
    answer:
      "Visit our driver signup page, provide your information, upload required documents (license, passport, insurance), and complete the background check. You'll be verified within 1-2 business days.",
  },
  {
    category: "drivers",
    question: "How and when do I get paid?",
    answer:
      "Earnings are automatically deposited to your bank account every week on Monday. You can check your balance and transaction history in your dashboard anytime.",
  },
  {
    category: "drivers",
    question: "What are the vehicle requirements?",
    answer:
      "Your vehicle must be 2010 or newer, pass a safety inspection, have valid registration and insurance. No commercial vehicles or salvage titles allowed.",
  },
  {
    category: "safety",
    question: "How safe is Abis?",
    answer:
      "All drivers are background-checked and verified. Riders can share their trip with friends, and both riders and drivers can rate each other. We have 24/7 customer support for any issues.",
  },
  {
    category: "safety",
    question: "What should I do if I feel unsafe?",
    answer:
      "Press the emergency button in the app or call 911 directly. You can also contact our support team immediately via in-app chat. Report any concerns to help keep our community safe.",
  },
  {
    category: "payments",
    question: "Why was I charged a fee?",
    answer:
      "Fees may include: ride fare, surge pricing during high demand, cancellation fees, or tolls. All charges are itemized in your receipt.",
  },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"all" | "riders" | "drivers" | "safety" | "payments">("all")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Support Center</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions and get help from our support team
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <MessageCircle className="text-primary" size={24} />
            </div>
            <h3 className="font-bold text-foreground">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Chat with our support team in real-time</p>
            <Button variant="outline" className="w-full bg-transparent">
              Start Chat
            </Button>
          </Card>

          <Card className="p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto">
              <Phone className="text-secondary" size={24} />
            </div>
            <h3 className="font-bold text-foreground">Call Us</h3>
            <p className="text-sm text-muted-foreground">Available 24/7 at +1 (555) 123-ABIS</p>
            <Button variant="outline" className="w-full bg-transparent">
              <Phone size={18} className="mr-2" />
              Call
            </Button>
          </Card>

          <Card className="p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
              <Mail className="text-accent" size={24} />
            </div>
            <h3 className="font-bold text-foreground">Email</h3>
            <p className="text-sm text-muted-foreground">Response within 24 hours</p>
            <Button variant="outline" className="w-full bg-transparent">
              <Mail size={18} className="mr-2" />
              Email
            </Button>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>

            {/* Search and Filter */}
            <div className="space-y-4 mb-8">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {["all", "riders", "drivers", "safety", "payments"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as any)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition €{
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full text-left p-4 border border-border rounded-lg hover:border-primary/50 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-semibold text-foreground text-balance">{faq.question}</p>
                      <ChevronDown
                        size={20}
                        className={`flex-shrink-0 text-primary transition transform €{
                          expandedFAQ === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {expandedFAQ === index && (
                      <p className="text-muted-foreground text-sm mt-4 pt-4 border-t border-border">{faq.answer}</p>
                    )}
                  </button>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No results found. Try a different search.</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="p-8 mt-12 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Didn't find what you need?</h2>
            <p className="text-muted-foreground">Get in touch with our support team</p>
          </div>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Name</label>
                <Input placeholder="Your name" className="bg-input border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <Input type="email" placeholder="your@email.com" className="bg-input border-border" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Issue Category</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground">
                <option>Select a category</option>
                <option>Rider Issue</option>
                <option>Driver Issue</option>
                <option>Safety Concern</option>
                <option>Payment Issue</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Message</label>
              <textarea
                placeholder="Describe your issue..."
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground resize-none"
              ></textarea>
            </div>

            <Button className="w-full">Send Message</Button>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
