"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Lightbulb, ArrowRight, ThumbsUp, ThumbsDown, Bookmark, RefreshCcw, Loader2 } from "lucide-react"

interface Recommendation {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  category: "energy" | "transport" | "food" | "lifestyle"
  saved: boolean
  liked: boolean | null
}

export function PersonalizedRecommendations() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "1",
      title: "Switch to LED lighting",
      description: "Replace all incandescent bulbs with LED alternatives to reduce energy consumption by up to 80%.",
      impact: "medium",
      category: "energy",
      saved: false,
      liked: null,
    },
    {
      id: "2",
      title: "Optimize your commute",
      description: "Consider carpooling or public transport twice a week to reduce your transport emissions.",
      impact: "high",
      category: "transport",
      saved: false,
      liked: null,
    },
    {
      id: "3",
      title: "Reduce meat consumption",
      description: "Try plant-based meals twice a week to significantly lower your food carbon footprint.",
      impact: "high",
      category: "food",
      saved: true,
      liked: true,
    },
    {
      id: "4",
      title: "Smart thermostat installation",
      description: "Install a smart thermostat to optimize heating and cooling, saving up to 15% on energy bills.",
      impact: "medium",
      category: "energy",
      saved: false,
      liked: null,
    },
    {
      id: "5",
      title: "Local seasonal shopping",
      description: "Shop for locally grown, seasonal produce to reduce food miles and support local farmers.",
      impact: "medium",
      category: "food",
      saved: false,
      liked: null,
    },
  ])

  const handleLike = (id: string, liked: boolean) => {
    setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, liked } : rec)))
    toast({
      title: liked ? "Recommendation Liked" : "Recommendation Disliked",
      description: "Your feedback helps us improve future recommendations.",
    })
  }

  const handleSave = (id: string) => {
    setRecommendations((prev) => prev.map((rec) => (rec.id === id ? { ...rec, saved: !rec.saved } : rec)))
    const recommendation = recommendations.find((rec) => rec.id === id)
    toast({
      title: recommendation?.saved ? "Recommendation Removed" : "Recommendation Saved",
      description: recommendation?.saved
        ? "Recommendation removed from your saved items."
        : "Recommendation saved for later reference.",
    })
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Recommendations Refreshed",
        description: "New personalized recommendations have been generated based on your profile.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh recommendations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getImpactColor = (impact: Recommendation["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
    }
  }

  const getCategoryIcon = (category: Recommendation["category"]) => {
    switch (category) {
      case "energy":
        return "⚡"
      case "transport":
        return "🚗"
      case "food":
        return "🍽️"
      case "lifestyle":
        return "🏠"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>Tailored suggestions based on your sustainability profile</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
          <span className="ml-2">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {recommendations.map((recommendation) => (
              <RecommendationItem
                key={recommendation.id}
                recommendation={recommendation}
                onLike={handleLike}
                onSave={handleSave}
              />
            ))}
          </TabsContent>
          <TabsContent value="energy" className="space-y-4">
            {recommendations
              .filter((rec) => rec.category === "energy")
              .map((recommendation) => (
                <RecommendationItem
                  key={recommendation.id}
                  recommendation={recommendation}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              ))}
          </TabsContent>
          <TabsContent value="transport" className="space-y-4">
            {recommendations
              .filter((rec) => rec.category === "transport")
              .map((recommendation) => (
                <RecommendationItem
                  key={recommendation.id}
                  recommendation={recommendation}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              ))}
          </TabsContent>
          <TabsContent value="food" className="space-y-4">
            {recommendations
              .filter((rec) => rec.category === "food")
              .map((recommendation) => (
                <RecommendationItem
                  key={recommendation.id}
                  recommendation={recommendation}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              ))}
          </TabsContent>
          <TabsContent value="saved" className="space-y-4">
            {recommendations
              .filter((rec) => rec.saved)
              .map((recommendation) => (
                <RecommendationItem
                  key={recommendation.id}
                  recommendation={recommendation}
                  onLike={handleLike}
                  onSave={handleSave}
                />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

interface RecommendationItemProps {
  recommendation: Recommendation
  onLike: (id: string, liked: boolean) => void
  onSave: (id: string) => void
}

function RecommendationItem({ recommendation, onLike, onSave }: RecommendationItemProps) {
  const getImpactColor = (impact: Recommendation["impact"]) => {
    switch (impact) {
      case "high":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
    }
  }

  const getCategoryIcon = (category: Recommendation["category"]) => {
    switch (category) {
      case "energy":
        return "⚡"
      case "transport":
        return "🚗"
      case "food":
        return "🍽️"
      case "lifestyle":
        return "🏠"
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{getCategoryIcon(recommendation.category)}</span>
            <h3 className="font-semibold">{recommendation.title}</h3>
            <Badge className={getImpactColor(recommendation.impact)}>
              {recommendation.impact.charAt(0).toUpperCase() + recommendation.impact.slice(1)} Impact
            </Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{recommendation.description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={recommendation.liked === true ? "default" : "outline"}
            size="sm"
            onClick={() => onLike(recommendation.id, true)}
          >
            <ThumbsUp className="mr-1 h-4 w-4" />
            Helpful
          </Button>
          <Button
            variant={recommendation.liked === false ? "default" : "outline"}
            size="sm"
            onClick={() => onLike(recommendation.id, false)}
          >
            <ThumbsDown className="mr-1 h-4 w-4" />
            Not for me
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={recommendation.saved ? "default" : "outline"}
            size="sm"
            onClick={() => onSave(recommendation.id)}
          >
            <Bookmark className="mr-1 h-4 w-4" />
            {recommendation.saved ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm">
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">View details</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

