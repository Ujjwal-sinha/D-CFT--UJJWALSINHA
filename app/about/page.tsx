import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Leaf, Zap, DollarSign, Brain, Users, Globe } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About D-CFT</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering individuals and businesses to track, reduce, and offset their carbon footprint through cutting-edge
          technology.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            D-CFT (Decentralized Carbon Footprint Tracker) is committed to empowering individuals and businesses to
            understand, track, and reduce their carbon footprint. By leveraging cutting-edge technologies such as AI,
            blockchain, and IoT, we aim to create a more sustainable future for our planet.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Leaf className="h-8 w-8 text-green-500" />}
          title="Eco-Friendly"
          description="Promoting sustainable practices and reducing carbon emissions through informed decision-making."
        />
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-yellow-500" />}
          title="AI-Powered"
          description="Utilizing advanced artificial intelligence for accurate carbon footprint analysis and personalized recommendations."
        />
        <FeatureCard
          icon={<DollarSign className="h-8 w-8 text-blue-500" />}
          title="Token Rewards"
          description="Incentivizing sustainable choices through a blockchain-based token reward system."
        />
        <FeatureCard
          icon={<Brain className="h-8 w-8 text-purple-500" />}
          title="Smart Integration"
          description="Seamlessly integrating with IoT devices for real-time energy consumption tracking and optimization."
        />
        <FeatureCard
          icon={<Users className="h-8 w-8 text-indigo-500" />}
          title="Community-Driven"
          description="Fostering a global community of environmentally conscious individuals and organizations."
        />
        <FeatureCard
          icon={<Globe className="h-8 w-8 text-teal-500" />}
          title="Global Impact"
          description="Making a significant impact in the fight against climate change through collective action."
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-4 text-lg">
            <li>
              <strong>AI-powered analysis:</strong> Our advanced algorithms analyze your daily activities and
              consumption patterns to calculate your carbon footprint accurately.
            </li>
            <li>
              <strong>Blockchain technology:</strong> We use blockchain to ensure transparency and immutability of
              carbon footprint data, building trust in our platform.
            </li>
            <li>
              <strong>IoT integration:</strong> Connect your smart devices for real-time monitoring of energy usage and
              emissions, providing you with up-to-date insights.
            </li>
            <li>
              <strong>Token reward system:</strong> Earn green tokens for making sustainable choices and contributing to
              carbon offset projects, incentivizing positive environmental impact.
            </li>
            <li>
              <strong>Personalized recommendations:</strong> Receive tailored suggestions to reduce your carbon
              footprint based on your unique lifestyle and habits.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Team</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            D-CFT was founded by a diverse team of experts passionate about combating climate change:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Environmental scientists with years of experience in carbon footprint assessment</li>
            <li>Blockchain developers ensuring secure and transparent data management</li>
            <li>AI researchers specializing in predictive analytics and machine learning</li>
            <li>IoT experts integrating smart device data for real-time monitoring</li>
            <li>UX designers creating intuitive and engaging user experiences</li>
            <li>Sustainability consultants providing industry-specific insights</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Join the Movement</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg mb-6">
            By using D-CFT, you're not just tracking your carbon footprint – you're joining a global community of
            environmentally conscious individuals and organizations. Together, we can make a significant impact in the
            fight against climate change.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold mb-4">Recognized for Excellence</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="text-lg py-1 px-3">
            🏆 Green Tech Innovator 2023
          </Badge>
          <Badge variant="secondary" className="text-lg py-1 px-3">
            🌿 Sustainable Solution Award
          </Badge>
          <Badge variant="secondary" className="text-lg py-1 px-3">
            💡 AI for Good Champion
          </Badge>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-primary/10 mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

