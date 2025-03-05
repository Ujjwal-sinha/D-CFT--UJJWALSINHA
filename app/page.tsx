"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Leaf, Zap, DollarSign, Brain, BotIcon as Robot, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ReactNode } from "react"

export default function LandingPage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLearnMore = () => {
    toast({
      title: "Loading About Page",
      description: "Redirecting you to learn more about our platform...",
    })
    router.push("/about")
  }

  const handleGetStarted = () => {
    toast({
      title: "Welcome!",
      description: "Let's begin your sustainability journey...",
    })
    router.push("/signup")
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center mb-16">
          <Badge className="mb-4 text-lg px-3 py-1" variant="secondary">
            AI-Powered
          </Badge>
          <h1 className="text-5xl font-bold mb-4 text-primary">Track Your Carbon Footprint with AI</h1>
          <p className="text-xl mb-8 max-w-2xl text-secondary">
            Experience the future of sustainability with D-CFT. Our AI-driven platform helps you understand, track, and
            reduce your carbon footprint like never before.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleGetStarted}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Brain size={40} />}
            title="AI-Based Analysis"
            description="Our advanced AI calculates your carbon footprint from various data sources, providing accurate and personalized insights."
          />
          <FeatureCard
            icon={<Leaf size={40} />}
            title="Blockchain Transparency"
            description="Immutable records ensure data integrity and trust, making your sustainability efforts verifiable and transparent."
          />
          <FeatureCard
            icon={<DollarSign size={40} />}
            title="Token Rewards"
            description="Earn green tokens for sustainable actions and choices, incentivizing eco-friendly behavior."
          />
          <FeatureCard
            icon={<Zap size={40} />}
            title="IoT Integration"
            description="Connect smart devices for real-time energy and waste tracking, optimizing your home's efficiency."
          />
          <FeatureCard
            icon={<Robot size={40} />}
            title="AI Recommendations"
            description="Receive personalized, AI-generated suggestions to reduce your carbon footprint and live more sustainably."
          />
          <FeatureCard
            icon={<Lightbulb size={40} />}
            title="Predictive Insights"
            description="Our AI predicts future trends in your carbon footprint, helping you plan for a greener tomorrow."
          />
        </div>

        <Card className="bg-accent">
          <CardHeader>
            <CardTitle className="text-2xl text-accent-foreground">How D-CFT's AI Works</CardTitle>
            <CardDescription className="text-accent-foreground/80">
              Leveraging cutting-edge technology for a sustainable future
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-accent-foreground">Data Collection</h3>
              <p className="text-accent-foreground/80">
                Our AI aggregates data from various sources, including IoT devices, user input, and external databases.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-accent-foreground">Machine Learning Models</h3>
              <p className="text-accent-foreground/80">
                Sophisticated ML models analyze your data to calculate accurate carbon footprint estimates.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-accent-foreground">Personalized Recommendations</h3>
              <p className="text-accent-foreground/80">
                Based on your unique profile, our AI generates tailored suggestions for reducing emissions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-accent-foreground">Predictive Analytics</h3>
              <p className="text-accent-foreground/80">
                Using historical data and trends, our AI forecasts future emissions and helps you set achievable goals.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Ready to Reduce Your Carbon Footprint?</h2>
          <p className="text-xl mb-8 text-secondary">Join thousands of users already making a difference with D-CFT.</p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleGetStarted}
          >
            Start Your Green Journey <ArrowRight className="ml-2" />
          </Button>
        </div>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-card text-card-foreground rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold text-center mb-2 text-primary">{title}</h3>
        <p className="text-center text-secondary">{description}</p>
      </CardContent>
    </Card>
  );
}

