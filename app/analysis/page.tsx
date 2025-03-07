"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  BarChart,
  PieChart,
  LineChart,
  ResponsiveContainer,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts"
import { AlertTriangle, ThumbsUp, Zap, Leaf, Loader2, TrendingUp, TrendingDown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const pieChartData = [
  { name: "Transport", value: 400, color: "#0088FE" },
  { name: "Energy", value: 300, color: "#00C49F" },
  { name: "Food", value: 300, color: "#FFBB28" },
  { name: "Shopping", value: 200, color: "#FF8042" },
]

const barChartData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 35 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 40 },
  { name: "Fri", value: 30 },
  { name: "Sat", value: 25 },
  { name: "Sun", value: 18 },
]

const lineChartData = [
  { name: "Jan", actual: 400, predicted: 380 },
  { name: "Feb", actual: 300, predicted: 320 },
  { name: "Mar", actual: 200, predicted: 250 },
  { name: "Apr", actual: 278, predicted: 260 },
  { name: "May", actual: 189, predicted: 220 },
  { name: "Jun", actual: 239, predicted: 230 },
]

export default function AIAnalysis() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [carbonIntensity, setCarbonIntensity] = useState(0)
  const [predictedFootprint, setPredictedFootprint] = useState<number | null>(null)
  const [isGeneratingPrediction, setIsGeneratingPrediction] = useState(false)
  const [customQuery, setCustomQuery] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false)
  const [sustainabilityScore, setSustainabilityScore] = useState(65)
  const [enableAIOptimization, setEnableAIOptimization] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulating real-time carbon intensity updates
    const interval = setInterval(() => {
      setCarbonIntensity(Math.floor(Math.random() * 500))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleGenerateInsights = async () => {
    setIsGeneratingInsights(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: "Generate insights on carbon footprint reduction based on recent user data and global trends.",
      })
      toast({
        title: "AI Insights Generated",
        description: text,
      })
    } catch (error) {
      console.error("Error generating insights:", error)
      // Provide fallback insights when API is unavailable
      const fallbackInsights = [
        "Consider using public transportation more frequently to reduce emissions from private vehicles.",
        "Your energy usage peaks during evening hours. Try to distribute usage throughout the day.",
        "Reducing meat consumption by 20% could significantly lower your food-related carbon footprint.",
      ].join("\n\n")

      toast({
        title: "AI Insights Generated (Demo)",
        description: "Using demo insights due to API limitations.",
      })

      // Display fallback insights in a separate toast
      setTimeout(() => {
        toast({
          title: "Suggested Actions",
          description: fallbackInsights,
        })
      }, 500)
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  const generatePrediction = async () => {
    setIsGeneratingPrediction(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: "Predict the user's carbon footprint for next month based on their current habits and global trends.",
      })
      const predictedValue = Number.parseFloat(text)
      if (!isNaN(predictedValue)) {
        setPredictedFootprint(predictedValue)
      } else {
        throw new Error("Invalid prediction value")
      }
    } catch (error) {
      console.error("Error generating prediction:", error)
      // Provide demo information when API is unavailable
      const demoFootprint = (Math.random() * (3.5 - 1.5) + 1.5).toFixed(2)
      setPredictedFootprint(Number.parseFloat(demoFootprint))
      toast({
        title: "Using Demo Data",
        description: "We're currently using demo data due to an API issue. Real predictions will be available soon.",
        variant: "warning",
      })
    } finally {
      setIsGeneratingPrediction(false)
    }
  }

  const handleCustomQuery = async () => {
    if (!customQuery.trim()) return
    setIsGeneratingResponse(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Answer the following question about carbon footprint and sustainability: ${customQuery}`,
      })
      setAiResponse(text)
    } catch (error) {
      console.error("Error generating response:", error)
      toast({
        title: "Error",
        description: "Failed to generate response. Please check your API key configuration.",
        variant: "destructive",
      })
      setAiResponse("Sorry, I couldn't generate a response at this time. Please try again later.")
    } finally {
      setIsGeneratingResponse(false)
    }
  }

  const handleAIOptimizationToggle = (checked: boolean) => {
    setEnableAIOptimization(checked)
    if (checked) {
      toast({
        title: "AI Optimization Enabled",
        description: "Our AI will now provide real-time suggestions to optimize your carbon footprint.",
      })
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI-Powered Carbon Footprint Analysis</h1>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Timeframe</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedTimeframe} defaultValue={selectedTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Carbon Intensity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carbonIntensity} gCO2/kWh</div>
            <Progress value={(carbonIntensity / 500) * 100} className="mt-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Current carbon intensity of the electricity grid. Lower values indicate cleaner energy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sustainability Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sustainabilityScore}/100</div>
            <Progress value={sustainabilityScore} className="mt-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Your overall sustainability score based on AI analysis of your habits and choices.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Carbon Footprint</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint Predictions</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#8884d8" />
                  <Line type="monotone" dataKey="predicted" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="ai-optimization"
                  checked={enableAIOptimization}
                  onCheckedChange={handleAIOptimizationToggle}
                />
                <Label htmlFor="ai-optimization">Enable AI Optimization</Label>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                When enabled, our AI will analyze your habits in real-time and provide suggestions to reduce your carbon
                footprint.
              </p>
              {enableAIOptimization && (
                <div className="mt-4 space-y-2">
                  <p className="font-semibold">Optimization Targets:</p>
                  <div className="space-y-4">
                    <div>
                      <Label>Energy Consumption</Label>
                      <Slider defaultValue={[30]} max={100} step={1} />
                    </div>
                    <div>
                      <Label>Transportation</Label>
                      <Slider defaultValue={[50]} max={100} step={1} />
                    </div>
                    <div>
                      <Label>Diet</Label>
                      <Slider defaultValue={[40]} max={100} step={1} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-2 text-green-600" />
              Consider carpooling or using public transport to reduce your transport emissions.
            </li>
            <li className="flex items-center">
              <Zap className="h-4 w-4 mr-2 text-yellow-600" />
              Switch to energy-efficient appliances to lower your energy consumption.
            </li>
            <li className="flex items-center">
              <Leaf className="h-4 w-4 mr-2 text-green-600" />
              Try incorporating more plant-based meals into your diet to reduce food-related emissions.
            </li>
            <li className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
              When shopping, look for products with eco-friendly packaging and sustainable materials.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom AI Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="custom-query">Ask AI about your carbon footprint</Label>
              <Input
                id="custom-query"
                placeholder="E.g., How can I reduce my transport emissions?"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleCustomQuery} disabled={isGeneratingResponse}>
              {isGeneratingResponse ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Response...
                </>
              ) : (
                "Get AI Response"
              )}
            </Button>
            {aiResponse && (
              <div className="mt-4 p-4 bg-secondary rounded-md">
                <p className="font-semibold">AI Response:</p>
                <p>{aiResponse}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Predictive Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {predictedFootprint !== null
              ? `Based on our ${
                  predictedFootprint > 5 ? "demo" : "AI"
                } analysis, your predicted carbon footprint for next month is ${predictedFootprint.toFixed(
                  2,
                )} tons CO2e.`
              : "Click the button below to get an AI-powered prediction of your future carbon footprint."}
          </p>
          <Button onClick={generatePrediction} disabled={isGeneratingPrediction}>
            {isGeneratingPrediction ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Prediction...
              </>
            ) : (
              "Predict Future Footprint"
            )}
          </Button>
          {predictedFootprint !== null && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                {predictedFootprint < 2.5 ? (
                  <TrendingDown className="text-green-500 mr-2" />
                ) : (
                  <TrendingUp className="text-red-500 mr-2" />
                )}
                <span>Your predicted footprint is {predictedFootprint < 2.5 ? "lower" : "higher"} than average.</span>
              </div>
              <Progress
                value={(predictedFootprint / 5) * 100}
                className="h-2"
                indicatorClassName={predictedFootprint < 2.5 ? "bg-green-500" : "bg-red-500"}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerateInsights} disabled={isGeneratingInsights}>
            {isGeneratingInsights ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Insights...
              </>
            ) : (
              "Generate New AI Insights"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

