"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Star, Trophy, Zap, TreePine, Recycle, Wind } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  progress: number
  total: number
  category: string
  icon: React.ReactNode
  earned: boolean
  date?: string
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Carbon Crusher",
    description: "Reduce your carbon footprint by 50%",
    progress: 35,
    total: 50,
    category: "Reduction",
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    earned: false,
  },
  {
    id: "2",
    title: "Tree Hugger",
    description: "Plant 10 trees through offset projects",
    progress: 10,
    total: 10,
    category: "Conservation",
    icon: <TreePine className="h-8 w-8 text-green-500" />,
    earned: true,
    date: "2024-02-15",
  },
  {
    id: "3",
    title: "Waste Warrior",
    description: "Achieve zero waste for 30 days",
    progress: 25,
    total: 30,
    category: "Waste",
    icon: <Recycle className="h-8 w-8 text-blue-500" />,
    earned: false,
  },
  {
    id: "4",
    title: "Energy Expert",
    description: "Use 100% renewable energy for 3 months",
    progress: 2,
    total: 3,
    category: "Energy",
    icon: <Wind className="h-8 w-8 text-purple-500" />,
    earned: false,
  },
]

export function AchievementShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredAchievements = achievements.filter(
    (achievement) =>
      selectedCategory === "all" || achievement.category.toLowerCase() === selectedCategory.toLowerCase(),
  )

  const earnedCount = achievements.filter((a) => a.earned).length
  const totalCount = achievements.length
  const completionPercentage = (earnedCount / totalCount) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Track your sustainability milestones</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-lg font-bold">
                {earnedCount}/{totalCount}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{completionPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={completionPercentage} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="reduction">Reduction</TabsTrigger>
          <TabsTrigger value="conservation">Conservation</TabsTrigger>
          <TabsTrigger value="waste">Waste</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </TabsContent>

        {["reduction", "conservation", "waste", "energy"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredAchievements
                .filter((a) => a.category.toLowerCase() === category)
                .map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <Card className={achievement.earned ? "border-green-500" : ""}>
      <CardHeader className="flex flex-row items-center space-y-0">
        <div className="flex-1">
          <CardTitle className="text-lg flex items-center gap-2">
            {achievement.title}
            {achievement.earned && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
          </CardTitle>
          <CardDescription>{achievement.description}</CardDescription>
        </div>
        <div className="ml-4">{achievement.icon}</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {!achievement.earned ? (
            <>
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {achievement.progress}/{achievement.total}
                </span>
              </div>
              <Progress value={(achievement.progress / achievement.total) * 100} />
            </>
          ) : (
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-green-500 text-white">
                <Award className="mr-1 h-4 w-4" />
                Earned
              </Badge>
              <span className="text-sm text-muted-foreground">Completed {achievement.date}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

