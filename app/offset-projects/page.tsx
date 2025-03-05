"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const initialProjects = [
  {
    id: 1,
    name: "Reforestation in Amazon",
    description: "Plant trees in the Amazon rainforest to offset carbon emissions.",
    goal: 10000,
    current: 7500,
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Forestry",
  },
  {
    id: 2,
    name: "Solar Power for Schools",
    description: "Install solar panels in schools to reduce reliance on fossil fuels.",
    goal: 15000,
    current: 9000,
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBwYW5lbHN8ZW58MHx8MHx8fDA%3D",
    category: "Renewable Energy",
  },
  {
    id: 3,
    name: "Ocean Cleanup Initiative",
    description: "Remove plastic waste from oceans to protect marine ecosystems.",
    goal: 8000,
    current: 3000,
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2NlYW4lMjBjbGVhbnVwfGVufDB8fDB8fHww",
    category: "Ocean Conservation",
  },
  {
    id: 4,
    name: "Wind Farm Expansion",
    description: "Expand wind farm capacity to increase renewable energy production.",
    goal: 20000,
    current: 12000,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2luZCUyMGZhcm18ZW58MHx8MHx8fDA%3D",
    category: "Renewable Energy",
  },
  {
    id: 5,
    name: "Sustainable Agriculture",
    description: "Implement sustainable farming practices to reduce carbon emissions.",
    goal: 12000,
    current: 5000,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VzdGFpbmFibGUlMjBmYXJtaW5nfGVufDB8fDB8fHww",
    category: "Agriculture",
  },
  {
    id: 6,
    name: "Electric Vehicle Charging Network",
    description: "Expand the network of EV charging stations to promote electric vehicle adoption.",
    goal: 18000,
    current: 8000,
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bfb1060c59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3RyaWMlMjB2ZWhpY2xlJTIwY2hhcmdpbmd8ZW58MHx8MHx8fDA%3D",
    category: "Transportation",
  },
]

export default function OffsetProjects() {
  const { toast } = useToast()
  const [projects, setProjects] = useState(initialProjects)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isGeneratingRecommendation, setIsGeneratingRecommendation] = useState(false)
  const [aiRecommendation, setAiRecommendation] = useState("")
  const [contributingProject, setContributingProject] = useState<number | null>(null)

  const handleContribute = async (projectId: number) => {
    setContributingProject(projectId)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, current: project.current + 100 } : project,
        ),
      )
      toast({
        title: "Contribution Successful",
        description: "Thank you for supporting this project! You've contributed 100 tokens.",
      })
    } catch (error) {
      toast({
        title: "Contribution Failed",
        description: "There was an error processing your contribution. Please try again.",
        variant: "destructive",
      })
    } finally {
      setContributingProject(null)
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      (selectedCategory === "All" || project.category === selectedCategory) &&
      (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const generateAIRecommendation = async () => {
    setIsGeneratingRecommendation(true)
    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const randomProject = projects[Math.floor(Math.random() * projects.length)]
      setAiRecommendation(
        `Based on your carbon footprint and interests, we recommend the "${randomProject.name}" project. This ${randomProject.category.toLowerCase()} initiative aligns well with your sustainability goals and can significantly offset your carbon emissions.`,
      )
      toast({
        title: "Recommendation Generated",
        description: "We've found a project that matches your profile!",
      })
    } catch (error) {
      toast({
        title: "Recommendation Failed",
        description: "Unable to generate recommendation. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingRecommendation(false)
    }
  }

  useEffect(() => {
    // Simulating real-time updates for project contributions
    const interval = setInterval(() => {
      setProjects((prevProjects) =>
        prevProjects.map((project) => ({
          ...project,
          current: Math.min(project.current + Math.floor(Math.random() * 50), project.goal),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Carbon Offset Projects</h1>

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Project Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {aiRecommendation || "Click the button below to get a personalized project recommendation."}
          </p>
          <Button onClick={generateAIRecommendation} disabled={isGeneratingRecommendation}>
            {isGeneratingRecommendation ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Recommendation...
              </>
            ) : (
              "Get AI Recommendation"
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <Label htmlFor="search">Search Projects</Label>
          <Input
            id="search"
            placeholder="Search by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Forestry">Forestry</TabsTrigger>
            <TabsTrigger value="Renewable Energy">Renewable Energy</TabsTrigger>
            <TabsTrigger value="Ocean Conservation">Ocean Conservation</TabsTrigger>
            <TabsTrigger value="Agriculture">Agriculture</TabsTrigger>
            <TabsTrigger value="Transportation">Transportation</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <img src={project.image || "/placeholder.svg"} alt={project.name} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge className="mb-2">{project.category}</Badge>
              <Progress value={(project.current / project.goal) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {project.current} / {project.goal} tokens raised
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleContribute(project.id)}
                className="w-full"
                disabled={contributingProject === project.id}
              >
                {contributingProject === project.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Contributing...
                  </>
                ) : (
                  "Contribute 100 Tokens"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

