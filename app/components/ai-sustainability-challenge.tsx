"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Award } from "lucide-react"

interface Challenge {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Meatless Monday",
    description: "Go vegetarian for a full day to reduce your carbon footprint.",
    difficulty: "Easy",
    points: 50,
  },
  {
    id: 2,
    title: "Zero-Waste Shopping",
    description: "Complete your grocery shopping without using any single-use plastics.",
    difficulty: "Medium",
    points: 100,
  },
  {
    id: 3,
    title: "Energy Saver",
    description: "Reduce your daily energy consumption by 20% for a week.",
    difficulty: "Hard",
    points: 200,
  },
]

export function AISustainabilityChallenge() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [progress, setProgress] = useState(0)
  const [isGeneratingChallenge, setIsGeneratingChallenge] = useState(false)
  const { toast } = useToast()

  const generateChallenge = () => {
    setIsGeneratingChallenge(true)
    // Simulating AI processing time
    setTimeout(() => {
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
      setCurrentChallenge(randomChallenge)
      setProgress(0)
      setIsGeneratingChallenge(false)
    }, 1500)
  }

  const completeChallenge = () => {
    if (currentChallenge) {
      toast({
        title: "Challenge Completed!",
        description: `Congratulations! You've earned ${currentChallenge.points} points.`,
      })
      setCurrentChallenge(null)
      setProgress(0)
    }
  }

  useEffect(() => {
    if (currentChallenge && progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 10), 1000)
      return () => clearTimeout(timer)
    }
  }, [currentChallenge, progress])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5" />
          AI Sustainability Challenge
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentChallenge ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{currentChallenge.title}</h3>
            <p>{currentChallenge.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Difficulty: {currentChallenge.difficulty}</span>
              <span className="text-sm font-medium">Points: {currentChallenge.points}</span>
            </div>
            <Progress value={progress} className="w-full" />
            <Button onClick={completeChallenge} disabled={progress < 100}>
              {progress < 100 ? "In Progress..." : "Complete Challenge"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p>Ready for a new sustainability challenge? Let our AI generate one for you!</p>
            <Button onClick={generateChallenge} disabled={isGeneratingChallenge}>
              {isGeneratingChallenge ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Challenge...
                </>
              ) : (
                "Generate New Challenge"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

