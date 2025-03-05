"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  KeyIcon as ApiKey,
  KeyRound,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BarChart3,
  Clock,
  FileText,
  Settings,
  Shield,
  Terminal,
  Eye,
  EyeOff,
  Copy,
  Download,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Activity,
  Info,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/chart"

// Sample data for the dashboard
const apiEndpoints = [
  {
    id: "env-data-api",
    name: "Environmental Data API",
    status: "Operational",
    lastSync: "2 minutes ago",
    successRate: 99.9,
    responseTime: 120,
    requests: 1243,
    description: "Access to environmental metrics, carbon data, and sustainability indicators",
    version: "v2.3.1",
    trend: "up",
  },
  {
    id: "reg-compliance-api",
    name: "Regulatory Compliance API",
    status: "Degraded",
    lastSync: "5 minutes ago",
    successRate: 95.5,
    responseTime: 350,
    requests: 876,
    description: "Compliance checking and regulatory reporting for environmental standards",
    version: "v1.8.0",
    trend: "down",
  },
  {
    id: "carbon-credit-api",
    name: "Carbon Credit Trading API",
    status: "Operational",
    lastSync: "1 minute ago",
    successRate: 100,
    responseTime: 85,
    requests: 2156,
    description: "Carbon credit verification, trading, and marketplace integration",
    version: "v3.0.2",
    trend: "up",
  },
  {
    id: "gov-reporting-api",
    name: "Government Reporting API",
    status: "Operational",
    lastSync: "3 minutes ago",
    successRate: 98.7,
    responseTime: 210,
    requests: 543,
    description: "Automated reporting to government agencies and regulatory bodies",
    version: "v2.1.5",
    trend: "stable",
  },
]

// Sample historical data for charts
const generateHistoricalData = (days = 14) => {
  const data = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date: date.toISOString().split("T")[0],
      requests: Math.floor(Math.random() * 5000) + 3000,
      responseTime: Math.floor(Math.random() * 200) + 100,
      errors: Math.floor(Math.random() * 50),
    })
  }

  return data
}

// Sample usage data for endpoints
const generateUsageData = () => {
  return apiEndpoints.map((endpoint) => ({
    name: endpoint.name,
    requests: endpoint.requests,
    errors: Math.floor((endpoint.requests * (100 - endpoint.successRate)) / 100),
    avgResponseTime: endpoint.responseTime,
  }))
}

export default function ApiDashboard() {
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("7d")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const historicalData = useMemo(() => generateHistoricalData(), [])
  const usageData = useMemo(() => generateUsageData(), [])

  // Filter endpoints based on search query
  const filteredEndpoints = useMemo(() => {
    if (!searchQuery.trim()) return apiEndpoints

    return apiEndpoints.filter(
      (endpoint) =>
        endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  // Generate a new API key
  const handleRegenerateKey = useCallback(() => {
    const newKey = `gov_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`
    setApiKey(newKey)
    setShowApiKey(true)
    toast({
      title: "API Key Regenerated",
      description: "Your new API key has been generated successfully. Keep it secure.",
    })
  }, [toast])

  // Copy API key to clipboard
  const handleCopyApiKey = useCallback(() => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    })
  }, [apiKey, toast])

  // Simulate refreshing data
  const refreshData = useCallback(() => {
    setIsRefreshing(true)

    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Data Refreshed",
        description: "API dashboard data has been updated.",
      })
    }, 1500)
  }, [toast])

  // Get status icon based on API status
  const getStatusIcon = useCallback((status: string) => {
    switch (status.toLowerCase()) {
      case "operational":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "down":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }, [])

  // Get trend icon based on trend direction
  const getTrendIcon = useCallback((trend: string) => {
    switch (trend.toLowerCase()) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      case "stable":
        return <Activity className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }, [])

  // Initialize API key on component mount
  useEffect(() => {
    // Simulate loading an existing API key
    const mockApiKey = `gov_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`
    setApiKey(mockApiKey)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Government API Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor your government API integrations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
          <Button onClick={handleRegenerateKey}>
            <KeyRound className="mr-2 h-4 w-4" />
            New API Key
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total API Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,821</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +12.5%
              </span>
              <span>from last 24 hours</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +3.2%
              </span>
              <span>from last 24 hours</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.6%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                -0.3%
              </span>
              <span>from last 24 hours</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/4</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-500 flex items-center">
                <Activity className="mr-1 h-4 w-4" />
                Stable
              </span>
              <span>from last 24 hours</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="endpoints">
            <Zap className="mr-2 h-4 w-4" />
            API Endpoints
          </TabsTrigger>
          <TabsTrigger value="authentication">
            <Shield className="mr-2 h-4 w-4" />
            Authentication
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <FileText className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search endpoints..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="degraded">Degraded</SelectItem>
                <SelectItem value="down">Down</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredEndpoints.map((endpoint) => (
              <Card key={endpoint.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{endpoint.name}</CardTitle>
                      <Badge
                        variant={
                          endpoint.status.toLowerCase() === "operational"
                            ? "default"
                            : endpoint.status.toLowerCase() === "degraded"
                              ? "outline"
                              : "destructive"
                        }
                        className="ml-2"
                      >
                        {getStatusIcon(endpoint.status)}
                        <span className="ml-1">{endpoint.status}</span>
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEndpoint(selectedEndpoint === endpoint.id ? null : endpoint.id)}
                    >
                      {selectedEndpoint === endpoint.id ? (
                        <span className="flex items-center">
                          <Info className="mr-1 h-4 w-4" /> Hide Details
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Info className="mr-1 h-4 w-4" /> View Details
                        </span>
                      )}
                    </Button>
                  </div>
                  <CardDescription>{endpoint.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Success Rate</span>
                      <span className="font-medium flex items-center">
                        {endpoint.successRate}%{getTrendIcon(endpoint.trend)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Response Time</span>
                      <span className="font-medium">{endpoint.responseTime}ms</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Requests (24h)</span>
                      <span className="font-medium">{endpoint.requests}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Version</span>
                      <span className="font-medium">{endpoint.version}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health</span>
                      <span>{endpoint.successRate}%</span>
                    </div>
                    <Progress
                      value={endpoint.successRate}
                      className={
                        endpoint.successRate > 98
                          ? "bg-green-500"
                          : endpoint.successRate > 95
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }
                    />
                  </div>

                  {selectedEndpoint === endpoint.id && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Endpoint Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2">Request Metrics (Last 24h)</h5>
                          <div className="h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={historicalData.slice(-7)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="requests" fill="#3b82f6" name="Requests" />
                                <Bar dataKey="errors" fill="#ef4444" name="Errors" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2">Response Time (ms)</h5>
                          <div className="h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={historicalData.slice(-7)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="responseTime" stroke="#8884d8" name="Response Time" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2">Endpoint URL</h5>
                          <code className="text-xs bg-muted p-2 rounded block">
                            https://api.d-cft.gov/{endpoint.id}/v{endpoint.version.substring(1)}
                          </code>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2">Sample Request</h5>
                          <code className="text-xs bg-muted p-2 rounded block">
                            curl -X GET https://api.d-cft.gov/{endpoint.id}/v{endpoint.version.substring(1)}/data \
                            <br />
                            -H "Authorization: Bearer YOUR_API_KEY" \<br />
                            -H "Content-Type: application/json"
                          </code>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-muted/50 py-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    Last updated: {endpoint.lastSync}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Authentication</CardTitle>
              <CardDescription>Manage your API keys and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input value={apiKey} readOnly type={showApiKey ? "text" : "password"} className="pr-10" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Button variant="outline" onClick={handleCopyApiKey}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>

                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Security Warning</AlertTitle>
                  <AlertDescription>
                    Keep your API key secure. Do not share it with anyone or expose it in client-side code. If you
                    suspect your key has been compromised, regenerate it immediately.
                  </AlertDescription>
                </Alert>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">API Key Settings</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Key Name</Label>
                      <Input defaultValue="Primary Government API Key" />
                    </div>
                    <div className="space-y-2">
                      <Label>Expiration</Label>
                      <Select defaultValue="never">
                        <SelectTrigger>
                          <SelectValue placeholder="Select expiration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30days">30 Days</SelectItem>
                          <SelectItem value="90days">90 Days</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Access Permissions</h3>
                  <div className="space-y-4">
                    {apiEndpoints.map((endpoint) => (
                      <div key={endpoint.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ApiKey className="h-4 w-4 text-muted-foreground" />
                          <span>{endpoint.name}</span>
                        </div>
                        <Badge>Full Access</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Credentials
              </Button>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Update Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">API Usage Analytics</h2>
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Request Volume</CardTitle>
                <CardDescription>Total API requests over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="requests" stroke="#3b82f6" name="Requests" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
                <CardDescription>Average response time in milliseconds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="responseTime" stroke="#8884d8" name="Response Time (ms)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Usage by Endpoint</CardTitle>
              <CardDescription>Comparison of usage across different endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="requests" fill="#3b82f6" name="Requests" />
                    <Bar dataKey="errors" fill="#ef4444" name="Errors" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Detailed performance analysis by endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Endpoint</th>
                      <th className="text-left py-3 px-4">Requests</th>
                      <th className="text-left py-3 px-4">Avg. Response Time</th>
                      <th className="text-left py-3 px-4">Success Rate</th>
                      <th className="text-left py-3 px-4">Errors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiEndpoints.map((endpoint) => (
                      <tr key={endpoint.id} className="border-b">
                        <td className="py-3 px-4">{endpoint.name}</td>
                        <td className="py-3 px-4">{endpoint.requests}</td>
                        <td className="py-3 px-4">{endpoint.responseTime}ms</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <span className="mr-2">{endpoint.successRate}%</span>
                            {getStatusIcon(endpoint.status)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {Math.floor((endpoint.requests * (100 - endpoint.successRate)) / 100)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Access detailed documentation for government APIs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Getting Started</CardTitle>
                    <CardDescription>Learn the basics of using the Government APIs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Terminal className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>API Overview</span>
                      </li>
                      <li className="flex items-center">
                        <ApiKey className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Authentication Guide</span>
                      </li>
                      <li className="flex items-center">
                        <RefreshCw className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Rate Limits & Quotas</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Documentation
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">API Reference</CardTitle>
                    <CardDescription>Complete reference for all API endpoints</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {apiEndpoints.map((endpoint) => (
                        <li key={endpoint.id} className="flex items-center">
                          <Terminal className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{endpoint.name}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View API Reference
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tutorials & Guides</CardTitle>
                    <CardDescription>Step-by-step guides for common use cases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Data Integration Guide</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Compliance Reporting</span>
                      </li>
                      <li className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Error Handling Best Practices</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <FileText className="mr-2 h-4 w-4" />
                      View Tutorials
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Interactive API Explorer</h3>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Test API Endpoints</CardTitle>
                    <CardDescription>Try out API calls directly from your browser</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Endpoint</Label>
                        <Select defaultValue="env-data-api">
                          <SelectTrigger>
                            <SelectValue placeholder="Select endpoint" />
                          </SelectTrigger>
                          <SelectContent>
                            {apiEndpoints.map((endpoint) => (
                              <SelectItem key={endpoint.id} value={endpoint.id}>
                                {endpoint.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Method</Label>
                        <Select defaultValue="GET">
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Request Body (JSON)</Label>
                        <div className="bg-muted rounded-md p-2 font-mono text-sm">
                          {`{\n  "param1": "value1",\n  "param2": "value2"\n}`}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Terminal className="mr-2 h-4 w-4" />
                      Send Request
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

