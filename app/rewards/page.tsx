"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Loader2,
  Share2,
  ArrowUpRight,
  Gift,
  Zap,
  Link2,
  GitBranch,
  TreeDeciduous,
  Building2,
  Wallet,
  ArrowLeftRight,
  Plus,
} from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Separator } from "@/components/ui/separator"

interface Reward {
  id: string
  name: string
  description: string
  cost: number
  platform: string
}

interface RewardHistory {
  action: string
  tokens: number
  date: string
  platform: string
}

const initialRewards: Reward[] = [
  { id: "1", name: "Carbon Offset Credits", description: "Offset 1 ton of CO2", cost: 500, platform: "D-CFT" },
  {
    id: "2",
    name: "Eco-friendly Product Discount",
    description: "20% off on sustainable products",
    cost: 200,
    platform: "GreenMart",
  },
  { id: "3", name: "Plant a Tree", description: "Plant a tree in a deforested area", cost: 100, platform: "TreePlant" },
  {
    id: "4",
    name: "Public Transport Pass",
    description: "1-day pass for public transportation",
    cost: 150,
    platform: "CityTransit",
  },
  {
    id: "5",
    name: "Renewable Energy Credit",
    description: "Support 100 kWh of renewable energy",
    cost: 300,
    platform: "CleanPower",
  },
]

const initialRewardHistory: RewardHistory[] = [
  { action: "Used public transport", tokens: 10, date: "2023-06-15", platform: "D-CFT" },
  { action: "Recycled waste", tokens: 5, date: "2023-06-14", platform: "RecycleRewards" },
  { action: "Purchased eco-friendly product", tokens: 15, date: "2023-06-13", platform: "GreenMart" },
  { action: "Reduced energy consumption", tokens: 20, date: "2023-06-12", platform: "D-CFT" },
]

export default function TokenRewards() {
  const [tokenBalance, setTokenBalance] = useState(1234)
  const [rewards, setRewards] = useState<Reward[]>(initialRewards)
  const [rewardHistory, setRewardHistory] = useState<RewardHistory[]>(initialRewardHistory)
  const [shareCode, setShareCode] = useState("")
  const [isGeneratingReward, setIsGeneratingReward] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulating token balance updates
    const interval = setInterval(() => {
      setTokenBalance((prev) => prev + Math.floor(Math.random() * 10))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleRedeemReward = (reward: Reward) => {
    if (tokenBalance >= reward.cost) {
      setTokenBalance((prev) => prev - reward.cost)
      setRewardHistory((prev) => [
        {
          action: `Redeemed ${reward.name}`,
          tokens: -reward.cost,
          date: new Date().toISOString().split("T")[0],
          platform: reward.platform,
        },
        ...prev,
      ])
      toast({
        title: "Reward Redeemed",
        description: `You have successfully redeemed ${reward.name} for ${reward.cost} tokens.`,
      })
    } else {
      toast({
        title: "Insufficient Tokens",
        description: "You don't have enough tokens to redeem this reward.",
        variant: "destructive",
      })
    }
  }

  const handleShareRewards = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    setShareCode(code)
    toast({
      title: "Rewards Shared",
      description: `Your rewards can be shared using the code: ${code}`,
    })
  }

  const handleImportRewards = () => {
    // Simulating reward import from another platform
    const importedReward: Reward = {
      id: (rewards.length + 1).toString(),
      name: "Imported Eco-Workshop",
      description: "Attend an online eco-friendly workshop",
      cost: 250,
      platform: "EcoLearn",
    }
    setRewards((prev) => [...prev, importedReward])
    toast({
      title: "Rewards Imported",
      description: "New rewards have been imported from another platform.",
    })
  }

  const generateAIReward = async () => {
    setIsGeneratingReward(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: "Generate a unique and creative eco-friendly reward for a sustainability platform.",
      })
      const aiReward: Reward = {
        id: (rewards.length + 1).toString(),
        name: text.split("\n")[0],
        description: text.split("\n")[1] || "AI-generated eco-friendly reward",
        cost: Math.floor(Math.random() * 400) + 100,
        platform: "AI-Eco",
      }
      setRewards((prev) => [...prev, aiReward])
      toast({
        title: "AI Reward Generated",
        description: "A new AI-generated reward has been added to the list.",
      })
    } catch (error) {
      console.error("Error generating AI reward:", error)
      toast({
        title: "Error",
        description: "Failed to generate AI reward. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReward(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Green Token Rewards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Token Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{tokenBalance} Tokens</div>
            <Progress value={(tokenBalance % 1000) / 10} className="mb-2" />
            <p className="text-sm text-muted-foreground">{1000 - (tokenBalance % 1000)} tokens to next reward tier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Share & Import Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={handleShareRewards} className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share Your Rewards
              </Button>
              {shareCode && (
                <div className="flex items-center space-x-2">
                  <Input value={shareCode} readOnly />
                  <Button variant="outline" onClick={() => navigator.clipboard.writeText(shareCode)}>
                    Copy
                  </Button>
                </div>
              )}
              <Button onClick={handleImportRewards} className="w-full">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Import Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">Available Rewards</TabsTrigger>
          <TabsTrigger value="history">Reward History</TabsTrigger>
        </TabsList>
        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>Redeem Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rewards.map((reward) => (
                  <Card key={reward.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{reward.name}</CardTitle>
                      <Badge>{reward.platform}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">{reward.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{reward.cost} tokens</span>
                        <Button onClick={() => handleRedeemReward(reward)}>Redeem</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Reward History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Tokens</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Platform</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewardHistory.map((reward, index) => (
                    <TableRow key={index}>
                      <TableCell>{reward.action}</TableCell>
                      <TableCell>{reward.tokens}</TableCell>
                      <TableCell>{reward.date}</TableCell>
                      <TableCell>{reward.platform}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Generate AI Reward</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Let our AI create a unique eco-friendly reward for you!</p>
          <Button onClick={generateAIReward} disabled={isGeneratingReward}>
            {isGeneratingReward ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Reward...
              </>
            ) : (
              <>
                <Gift className="mr-2 h-4 w-4" />
                Generate AI Reward
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Boost Your Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Connect with our partner platforms to earn more tokens and access exclusive rewards!</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              Connect with GreenMart
            </Button>
            <Button variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              Connect with CityTransit
            </Button>
            <Button variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              Connect with RecycleRewards
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reward Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Link2 className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-semibold">Blockchain Integration</h3>
                    <Badge className="mt-2">Active</Badge>
                    <p className="text-sm text-muted-foreground mt-2">Rewards tracked on blockchain</p>
                    <Progress value={90} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <TreeDeciduous className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold">Environmental Rewards</h3>
                    <Badge variant="outline" className="mt-2">
                      Connected
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">Earn from eco-actions</p>
                    <Progress value={75} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Building2 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <h3 className="font-semibold">Government Programs</h3>
                    <Badge variant="secondary" className="mt-2">
                      Available
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">Official incentives</p>
                    <Progress value={30} className="mt-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="font-semibold">Integration Benefits</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <GitBranch className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Automatic reward synchronization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Smart contract distribution</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowLeftRight className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Cross-platform compatibility</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TreeDeciduous className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Environmental action tracking</span>
                </div>
              </div>

              <div className="mt-4">
                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Integration
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

