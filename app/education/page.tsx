"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Factory,
  Car,
  Lightbulb,
  TreePine,
  Building2,
  Wind,
  Sun,
  Leaf,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const emissionsData = [
  { year: 2018, emissions: 2.6 },
  { year: 2019, emissions: 2.8 },
  { year: 2020, emissions: 2.4 },
  { year: 2021, emissions: 2.7 },
  { year: 2022, emissions: 2.9 },
  { year: 2023, emissions: 3.1 },
]

const sectorData = [
  { name: "Energy", value: 44, color: "#ff6b6b" },
  { name: "Industry", value: 22, color: "#4ecdc4" },
  { name: "Transport", value: 13, color: "#45b7d1" },
  { name: "Agriculture", value: 11, color: "#96ceb4" },
  { name: "Buildings", value: 10, color: "#ffeead" },
]

const successMetrics = [
  {
    metric: "Carbon Reduction",
    current: 25000,
    target: 50000,
    unit: "tons",
    progress: 50,
  },
  {
    metric: "Green Energy Adoption",
    current: 35,
    target: 100,
    unit: "%",
    progress: 35,
  },
  {
    metric: "Users Engaged",
    current: 75000,
    target: 100000,
    unit: "users",
    progress: 75,
  },
  {
    metric: "Trees Planted",
    current: 15000,
    target: 20000,
    unit: "trees",
    progress: 75,
  },
]

const caseStudies = [
  {
    title: "Mumbai Industrial Complex",
    reduction: "45%",
    timeframe: "12 months",
    description: "Implemented IoT monitoring and AI-driven optimization",
    icon: Factory,
  },
  {
    title: "Bangalore Tech Park",
    reduction: "35%",
    timeframe: "8 months",
    description: "Integrated renewable energy and smart building systems",
    icon: Building2,
  },
  {
    title: "Delhi Transport Network",
    reduction: "30%",
    timeframe: "6 months",
    description: "Optimized fleet management and route planning",
    icon: Car,
  },
  {
    title: "Chennai Green Initiative",
    reduction: "40%",
    timeframe: "10 months",
    description: "Comprehensive sustainability program with community engagement",
    icon: Leaf,
  },
]

const keyFeatures = [
  {
    title: "Real-time Monitoring",
    description: "Track carbon emissions instantly across all connected devices and facilities",
    icon: TrendingDown,
    impact: "25% average reduction in daily emissions",
  },
  {
    title: "AI-Powered Optimization",
    description: "Smart algorithms suggest and implement energy-saving measures",
    icon: Lightbulb,
    impact: "30% improvement in energy efficiency",
  },
  {
    title: "Renewable Integration",
    description: "Seamless integration with solar, wind, and other renewable sources",
    icon: Sun,
    impact: "40% increase in renewable energy usage",
  },
  {
    title: "Green Initiatives",
    description: "Track and manage environmental projects and carbon offset programs",
    icon: TreePine,
    impact: "50,000+ trees planted through offset programs",
  },
]

export default function Education() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Carbon Footprint Education Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Understanding and reducing India's carbon footprint through technology and awareness
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Did you know?</AlertTitle>
        <AlertDescription>
          India is the world's third-largest emitter of greenhouse gases, but its per capita emissions are still well
          below the global average.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>India's Carbon Emissions Trend</CardTitle>
            <CardDescription>Annual CO2 emissions per capita (metric tons)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="emissions" stroke="#8884d8" name="CO2 Emissions" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emissions by Sector</CardTitle>
            <CardDescription>Distribution of carbon emissions across sectors</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How D-CFT Helps Reduce Carbon Footprint</CardTitle>
          <CardDescription>Key features and their impact on carbon footprint reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {keyFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <feature.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                    <Badge variant="secondary">{feature.impact}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success Metrics</CardTitle>
          <CardDescription>Measuring our impact on carbon footprint reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {successMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{metric.metric}</h3>
                      <Badge variant="outline">
                        {metric.current.toLocaleString()} / {metric.target.toLocaleString()} {metric.unit}
                      </Badge>
                    </div>
                    <Progress value={metric.progress} />
                    <p className="text-sm text-muted-foreground text-right">{metric.progress}% Complete</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>India's Carbon Footprint Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                India, with its rapidly growing economy and population, faces unique challenges in managing its carbon
                footprint. As the world's third-largest emitter of greenhouse gases, India's actions in reducing
                emissions are crucial for global climate goals.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Population Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    1.4 billion people contributing to carbon emissions through daily activities
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Economic Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Rapid industrialization leading to increased energy demand and emissions
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Energy Mix</h3>
                  <p className="text-sm text-muted-foreground">
                    Heavy reliance on coal for power generation, with growing renewable energy adoption
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges">
          <Card>
            <CardHeader>
              <CardTitle>Key Challenges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Industrial Growth vs. Emissions</AlertTitle>
                  <AlertDescription>Balancing economic development with environmental sustainability</AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Energy Access</AlertTitle>
                  <AlertDescription>Providing clean and affordable energy to a growing population</AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Infrastructure Limitations</AlertTitle>
                  <AlertDescription>Developing green infrastructure and renewable energy capacity</AlertDescription>
                </Alert>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Technology Adoption</AlertTitle>
                  <AlertDescription>Implementing and scaling clean technologies across sectors</AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solutions">
          <Card>
            <CardHeader>
              <CardTitle>D-CFT Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Wind className="h-8 w-8 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">Renewable Energy Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Smart monitoring and optimization of renewable energy sources
                      </p>
                      <Badge className="mt-4">40% Efficiency Increase</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Building2 className="h-8 w-8 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">Smart Buildings</h3>
                      <p className="text-sm text-muted-foreground">
                        IoT-enabled building management and energy optimization
                      </p>
                      <Badge className="mt-4">30% Energy Savings</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Factory className="h-8 w-8 mx-auto mb-4 text-primary" />
                      <h3 className="font-semibold mb-2">Industrial Optimization</h3>
                      <p className="text-sm text-muted-foreground">
                        AI-driven process optimization and emissions reduction
                      </p>
                      <Badge className="mt-4">35% Emissions Reduction</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="case-studies">
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <study.icon className="h-5 w-5" />
                      {study.title}
                    </CardTitle>
                    <Badge variant="secondary">{study.reduction} Reduction</Badge>
                  </div>
                  <CardDescription>Timeframe: {study.timeframe}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{study.description}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Successfully Implemented</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Take Action</CardTitle>
          <CardDescription>Start reducing your carbon footprint today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Button className="w-full">
              <Leaf className="mr-2 h-4 w-4" />
              Start Tracking
            </Button>
            <Button variant="outline" className="w-full">
              <TreePine className="mr-2 h-4 w-4" />
              Join Green Initiative
            </Button>
            <Button variant="secondary" className="w-full">
              <Info className="mr-2 h-4 w-4" />
              Learn More
            </Button>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Get Started</AlertTitle>
            <AlertDescription>
              Join thousands of organizations and individuals already using D-CFT to reduce their carbon footprint and
              contribute to a sustainable future.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

