"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Lightbulb,
  Car,
  Home,
  ShoppingBag,
  Utensils,
  RefreshCw,
  ThumbsUp,
  BookmarkPlus,
  Share2,
  Loader2,
} from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Tip {
  id: string
  category: string
  title: string
  description: string
  impact: "High" | "Medium" | "Low"
  difficulty: "Easy" | "Medium" | "Hard"
  saved: boolean
  likes: number
  liked?: boolean
}

const initialTips: Tip[] = [
  {
    id: "1",
    category: "Transport",
    title: "Switch to Public Transport",
    description:
      "Using public transport just twice a week can reduce your carbon footprint by up to 1,500 pounds of CO2 per year.",
    impact: "High",
    difficulty: "Medium",
    saved: false,
    likes: 245,
  },
  {
    id: "2",
    category: "Home",
    title: "Install LED Bulbs",
    description: "Replace all traditional bulbs with LED alternatives to reduce energy consumption by up to 90%.",
    impact: "Medium",
    difficulty: "Easy",
    saved: false,
    likes: 189,
  },
  {
    id: "3",
    category: "Food",
    title: "Meatless Mondays",
    description: "Going meatless one day a week can reduce your carbon footprint by up to 700 pounds of CO2 per year.",
    impact: "Medium",
    difficulty: "Easy",
    saved: false,
    likes: 156,
  },
  {
    id: "4",
    category: "Shopping",
    title: "Bring Reusable Bags",
    description: "Using reusable shopping bags can prevent hundreds of plastic bags from entering landfills each year.",
    impact: "Low",
    difficulty: "Easy",
    saved: false,
    likes: 134,
  },
]

export function EcoTips() {
  const { toast } = useToast()
  const [tips, setTips] = useState<Tip[]>(initialTips)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateNewTip = async () => {
    setIsGenerating(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt:
          "Generate a practical eco-friendly tip for reducing carbon footprint. Include a title, description, category (Transport/Home/Food/Shopping), impact level (High/Medium/Low), and difficulty level (Easy/Medium/Hard).",
      })

      const [title, description, category, impact, difficulty] = text.split("\n")

      const newTip: Tip = {
        id: `tip-${Date.now()}`,
        category: category || "General",
        title: title || "New Eco Tip",
        description: description || "Here's a new way to reduce your carbon footprint.",
        impact: (impact as "High" | "Medium" | "Low") || "Medium",
        difficulty: (difficulty as "Easy" | "Medium" | "Hard") || "Medium",
        saved: false,
        likes: 0,
      }

      setTips([newTip, ...tips])
      toast({
        title: "New Tip Generated",
        description: "A new eco-friendly tip has been added to your list.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate new tip. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const toggleSave = (tipId: string) => {
    setTips(tips.map((tip) => (tip.id === tipId ? { ...tip, saved: !tip.saved } : tip)))
  }

  const toggleLike = (tipId: string) => {
    setTips(
      tips.map((tip) =>
        tip.id === tipId
          ? {
              ...tip,
              likes: tip.liked ? tip.likes - 1 : tip.likes + 1,
              liked: !tip.liked,
            }
          : tip,
      ),
    )
  }

  const shareTip = (tip: Tip) => {
    toast({
      title: "Tip Shared",
      description: "The eco tip has been copied to your clipboard.",
    })
  }

  const filteredTips = tips.filter(
    (tip) => selectedCategory === "all" || tip.category.toLowerCase() === selectedCategory.toLowerCase(),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Eco-Friendly Tips</CardTitle>
          <CardDescription>Discover ways to reduce your carbon footprint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Button onClick={generateNewTip} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate New Tip
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setTips(initialTips)}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Tips
            </Button>
          </div>

          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="transport">
                <Car className="mr-2 h-4 w-4" />
                Transport
              </TabsTrigger>
              <TabsTrigger value="home">
                <Home className="mr-2 h-4 w-4" />
                Home
              </TabsTrigger>
              <TabsTrigger value="food">
                <Utensils className="mr-2 h-4 w-4" />
                Food
              </TabsTrigger>
              <TabsTrigger value="shopping">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shopping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredTips.map((tip) => (
                <TipCard
                  key={tip.id}
                  tip={tip}
                  onSave={() => toggleSave(tip.id)}
                  onLike={() => toggleLike(tip.id)}
                  onShare={() => shareTip(tip)}
                />
              ))}
            </TabsContent>

            {["transport", "home", "food", "shopping"].map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {filteredTips
                  .filter((tip) => tip.category.toLowerCase() === category)
                  .map((tip) => (
                    <TipCard
                      key={tip.id}
                      tip={tip}
                      onSave={() => toggleSave(tip.id)}
                      onLike={() => toggleLike(tip.id)}
                      onShare={() => shareTip(tip)}
                    />
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function TipCard({
  tip,
  onSave,
  onLike,
  onShare,
}: {
  tip: Tip
  onSave: () => void
  onLike: () => void
  onShare: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{tip.title}</CardTitle>
            <CardDescription>{tip.category}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge variant={tip.impact === "High" ? "default" : tip.impact === "Medium" ? "secondary" : "outline"}>
              {tip.impact} Impact
            </Badge>
            <Badge variant="outline">{tip.difficulty}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{tip.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onLike}>
              <ThumbsUp className={`mr-2 h-4 w-4 ${tip.liked ? "fill-current" : ""}`} />
              {tip.likes}
            </Button>
            <Button variant="outline" size="sm" onClick={onSave}>
              <BookmarkPlus className={`mr-2 h-4 w-4 ${tip.saved ? "fill-current" : ""}`} />
              {tip.saved ? "Saved" : "Save"}
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={onShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

