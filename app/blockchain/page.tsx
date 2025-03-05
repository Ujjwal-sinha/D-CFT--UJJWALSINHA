"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, LineChart, Line } from "recharts"
import { useToast } from "@/components/ui/use-toast"
import { Plus, AlertCircle } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Network,
  GitMerge,
  Cpu,
  Boxes,
  Coins,
  ArrowLeftRight,
  FuelIcon as GasPump,
  Server,
  ShieldCheck,
  Code2,
  Leaf,
  Battery,
  Wind,
  Sun,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Transaction {
  id: string
  type: string
  amount: string
  status: "Verified" | "Pending" | "Confirmed"
}

const initialTransactions: Transaction[] = [
  { id: "0x1234...5678", type: "Carbon Offset", amount: "0.5 tons", status: "Verified" },
  { id: "0x5678...9abc", type: "Energy Usage", amount: "200 kWh", status: "Pending" },
  { id: "0x9abc...def0", type: "Green Token Reward", amount: "50 tokens", status: "Confirmed" },
  { id: "0xdef0...1234", type: "Recycling Action", amount: "10 kg", status: "Verified" },
]

const blockchainStats = [
  { name: "Total Transactions", value: 1234 },
  { name: "Carbon Offsets", value: 500 },
  { name: "Green Tokens Issued", value: 10000 },
  { name: "Active Users", value: 789 },
]

const transactionTrendData = [
  { date: "2023-01", transactions: 800 },
  { date: "2023-02", transactions: 1000 },
  { date: "2023-03", transactions: 1200 },
  { date: "2023-04", transactions: 1100 },
  { date: "2023-05", transactions: 1300 },
  { date: "2023-06", transactions: 1500 },
]

interface CarbonFootprintData {
  timestamp: string
  value: number
}

export default function BlockchainData() {
  const [searchTerm, setSearchTerm] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [newTransactionType, setNewTransactionType] = useState("")
  const [newTransactionAmount, setNewTransactionAmount] = useState("")
  const { toast } = useToast()
  const [anomalies, setAnomalies] = useState<string[]>([])
  const [isDetectingAnomalies, setIsDetectingAnomalies] = useState(false)
  const [aiInsights, setAiInsights] = useState("")
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [predictedTransactions, setPredictedTransactions] = useState<{ date: string; transactions: number }[]>([])
  const [isGeneratingPrediction, setIsGeneratingPrediction] = useState(false)
  const [carbonFootprint, setCarbonFootprint] = useState<CarbonFootprintData[]>([])
  const [isDetectingCarbonFootprint, setIsDetectingCarbonFootprint] = useState(false)
  const [carbonFootprintAnalysis, setCarbonFootprintAnalysis] = useState("")

  useEffect(() => {
    // Simulating real-time blockchain updates
    const interval = setInterval(() => {
      const newTransaction: Transaction = {
        id: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
        type: ["Carbon Offset", "Energy Usage", "Green Token Reward", "Recycling Action"][
          Math.floor(Math.random() * 4)
        ],
        amount: `${Math.floor(Math.random() * 100)} ${["tons", "kWh", "tokens", "kg"][Math.floor(Math.random() * 4)]}`,
        status: ["Verified", "Pending", "Confirmed"][Math.floor(Math.random() * 3)] as
          | "Verified"
          | "Pending"
          | "Confirmed",
      }
      setTransactions((prev) => [newTransaction, ...prev.slice(0, -1)])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleVerifyTransaction = () => {
    toast({
      title: "Transaction Verified",
      description: "The selected transaction has been verified on the blockchain.",
    })
  }

  const handleAddTransaction = () => {
    if (newTransactionType && newTransactionAmount) {
      const newTransaction: Transaction = {
        id: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
        type: newTransactionType,
        amount: newTransactionAmount,
        status: "Pending",
      }
      setTransactions((prev) => [newTransaction, ...prev])
      setNewTransactionType("")
      setNewTransactionAmount("")
      toast({
        title: "Transaction Added",
        description: "Your new transaction has been added to the blockchain.",
      })
    }
  }

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const detectAnomalies = async () => {
    setIsDetectingAnomalies(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt:
          "Analyze the blockchain transactions and detect any anomalies or suspicious patterns. Provide a list of 3 potential anomalies.",
      })
      const detectedAnomalies = text.split("\n").filter(Boolean)
      setAnomalies(detectedAnomalies)
      toast({
        title: "Anomaly Detection Complete",
        description: `${detectedAnomalies.length} anomalies detected in the blockchain data.`,
      })
    } catch (error) {
      console.error("Error detecting anomalies:", error)
      toast({
        title: "Error",
        description: "Failed to detect anomalies. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDetectingAnomalies(false)
    }
  }

  const generateAIInsights = async () => {
    setIsGeneratingInsights(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt:
          "Analyze the blockchain data and provide insights on transaction patterns, user behavior, and sustainability impact. Give 3-4 key insights.",
      })
      setAiInsights(text)
    } catch (error) {
      console.error("Error generating AI insights:", error)
      toast({
        title: "Error",
        description: "Failed to generate AI insights. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingInsights(false)
    }
  }

  const generateTransactionPrediction = async () => {
    setIsGeneratingPrediction(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt:
          "Predict the number of blockchain transactions for the next 6 months based on historical data. Provide the predictions in a format of 'YYYY-MM: number'.",
      })
      const predictions = text.split("\n").map((line) => {
        const [date, transactions] = line.split(":")
        return { date: date.trim(), transactions: Number.parseInt(transactions.trim()) }
      })
      setPredictedTransactions(predictions)
    } catch (error) {
      console.error("Error generating transaction prediction:", error)
      toast({
        title: "Error",
        description: "Failed to generate transaction prediction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPrediction(false)
    }
  }

  const detectCarbonFootprint = async () => {
    setIsDetectingCarbonFootprint(true)
    try {
      // Simulating IoT sensor data collection
      const sensorData = Array.from({ length: 24 }, (_, i) => ({
        timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
        value: Math.random() * 10 + 5, // Random value between 5 and 15
      }))
      setCarbonFootprint(sensorData)

      // AI analysis of the carbon footprint data
      try {
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: `Analyze the following 24-hour carbon footprint data and provide insights:
          ${JSON.stringify(sensorData)}
          Give 3-4 key observations and recommendations for reducing the carbon footprint.`,
        })
        setCarbonFootprintAnalysis(text)
      } catch (aiError) {
        console.error("Error in AI analysis:", aiError)
        setCarbonFootprintAnalysis("AI analysis unavailable. Please check your API key configuration.")
      }

      toast({
        title: "Carbon Footprint Detection Complete",
        description: "Carbon footprint data has been collected and analyzed.",
      })
    } catch (error) {
      console.error("Error detecting carbon footprint:", error)
      toast({
        title: "Error",
        description: "Failed to detect carbon footprint. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDetectingCarbonFootprint(false)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blockchain Transparency</h1>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="stats">Blockchain Stats</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="carbon-footprint">Carbon Footprint</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Blockchain Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => setSearchTerm("")}>Clear</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-mono">{tx.id}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>
                        <Badge variant={tx.status === "Verified" ? "default" : "secondary"}>{tx.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={handleVerifyTransaction}>
                          Verify
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={blockchainStats}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-analysis">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={generateAIInsights} disabled={isGeneratingInsights}>
                  {isGeneratingInsights ? "Generating Insights..." : "Generate AI Insights"}
                </Button>
                {aiInsights && (
                  <div className="mt-4 p-4 bg-secondary rounded-md">
                    <h3 className="font-semibold mb-2">AI Insights:</h3>
                    <p className="whitespace-pre-line">{aiInsights}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Transaction Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={generateTransactionPrediction} disabled={isGeneratingPrediction}>
                  {isGeneratingPrediction ? "Generating Prediction..." : "Predict Future Transactions"}
                </Button>
                {predictedTransactions.length > 0 && (
                  <div className="mt-4 h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[...transactionTrendData, ...predictedTransactions]}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="transactions" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="carbon-footprint">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={detectCarbonFootprint} disabled={isDetectingCarbonFootprint}>
                {isDetectingCarbonFootprint ? "Detecting Carbon Footprint..." : "Detect Carbon Footprint"}
              </Button>
              {carbonFootprint.length > 0 && (
                <div className="mt-4 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={carbonFootprint}>
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
                      />
                      <YAxis />
                      <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
                      <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              {carbonFootprintAnalysis && (
                <div className="mt-4 p-4 bg-secondary rounded-md">
                  <h3 className="font-semibold mb-2">AI Analysis:</h3>
                  <p className="whitespace-pre-line">{carbonFootprintAnalysis}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <Label htmlFor="txType">Transaction Type</Label>
              <Input
                id="txType"
                value={newTransactionType}
                onChange={(e) => setNewTransactionType(e.target.value)}
                placeholder="Enter transaction type"
              />
            </div>
            <div>
              <Label htmlFor="txAmount">Transaction Amount</Label>
              <Input
                id="txAmount"
                value={newTransactionAmount}
                onChange={(e) => setNewTransactionAmount(e.target.value)}
                placeholder="Enter transaction amount"
              />
            </div>
            <Button onClick={handleAddTransaction}>
              <Plus className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Contract Address:</strong> 0x1234567890123456789012345678901234567890
            </p>
            <p>
              <strong>Total Transactions:</strong> {blockchainStats[0].value}
            </p>
            <p>
              <strong>Last Updated:</strong> {new Date().toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blockchain Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Immutable and transparent record of all carbon-related activities</li>
            <li>Verifiable carbon offset and sustainability actions</li>
            <li>Decentralized storage ensures data integrity and availability</li>
            <li>Smart contracts automate reward distribution and verification processes</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Anomaly Detection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Use AI to detect anomalies in your blockchain data:</p>
            <Button onClick={detectAnomalies} disabled={isDetectingAnomalies}>
              {isDetectingAnomalies ? "Detecting Anomalies..." : "Detect Anomalies"}
            </Button>
            {anomalies.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Detected Anomalies:</h4>
                <ul className="space-y-2">
                  {anomalies.map((anomaly, index) => (
                    <li key={index} className="flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                      {anomaly}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Code2 className="h-4 w-4" />
                    <CardTitle className="text-sm">Active Contracts</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <GitMerge className="h-4 w-4" />
                    <CardTitle className="text-sm">Contract Interactions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,345</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-4 w-4" />
                    <CardTitle className="text-sm">Security Score</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-xs text-muted-foreground">Contract Safety</p>
                </CardContent>
              </Card>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold">Recent Contract Deployments</h3>
              <ScrollArea className="h-[200px] rounded-md border p-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <Code2 className="h-4 w-4" />
                      <span className="font-mono">0x{Math.random().toString(16).slice(2, 10)}</span>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Network Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Network className="h-4 w-4" />
                  <span>Network TPS</span>
                </div>
                <span className="font-bold">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4" />
                  <span>Node Count</span>
                </div>
                <span className="font-bold">567</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Boxes className="h-4 w-4" />
                  <span>Block Height</span>
                </div>
                <span className="font-bold">12,345,678</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Server className="h-4 w-4" />
                  <span>Validator Status</span>
                </div>
                <Badge variant="outline">Healthy</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Token Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Coins className="h-4 w-4" />
                  <span>Total Supply</span>
                </div>
                <span className="font-bold">1,000,000</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ArrowLeftRight className="h-4 w-4" />
                  <span>Circulation</span>
                </div>
                <span className="font-bold">750,000</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GasPump className="h-4 w-4" />
                  <span>Average Gas Fee</span>
                </div>
                <span className="font-bold">0.0025 ETH</span>
              </div>
              <div>
                <Label>Gas Price Threshold</Label>
                <div className="flex items-center space-x-2">
                  <Slider defaultValue={[30]} max={100} step={1} className="flex-1" />
                  <span className="w-12 text-right">30%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cross-Chain Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Network className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold">Ethereum</h3>
                    <Badge className="mt-2">Connected</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Network className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold">Polygon</h3>
                    <Badge variant="outline" className="mt-2">
                      Available
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Network className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-semibold">Solana</h3>
                    <Badge variant="outline" className="mt-2">
                      Available
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add New Chain Integration
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Battery className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold">Energy per TX</h3>
                    <div className="text-2xl font-bold mt-2">0.05 kWh</div>
                    <p className="text-xs text-muted-foreground">Per Transaction</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Leaf className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold">Carbon Footprint</h3>
                    <div className="text-2xl font-bold mt-2">0.02 kg</div>
                    <p className="text-xs text-muted-foreground">CO2 per Block</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Wind className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold">Green Energy</h3>
                    <div className="text-2xl font-bold mt-2">85%</div>
                    <p className="text-xs text-muted-foreground">Network Usage</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Sun className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-semibold">Impact Score</h3>
                    <div className="text-2xl font-bold mt-2">A+</div>
                    <p className="text-xs text-muted-foreground">Environmental Rating</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
              <Label>Network Energy Efficiency</Label>
              <Progress value={85} className="bg-green-200" />
              <p className="text-sm text-muted-foreground">
                Our blockchain network operates at 85% energy efficiency, significantly better than industry average.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

