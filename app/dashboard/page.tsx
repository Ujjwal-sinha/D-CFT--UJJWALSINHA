"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  Battery,
  Leaf,
  Zap,
  TrendingDown,
  TrendingUp,
  CalendarIcon,
  RefreshCcw,
  Settings2,
  Info,
  BarChart4,
  PieChart,
  LineChart,
  Loader2,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UserProfileCard } from "./components/user-profile-card"
import { PersonalizedRecommendations } from "./components/personalized-recommendations"
import { QuickActions } from "./components/quick-actions"
import { NotificationCenter } from "./components/notification-center"
import { GoalWizard } from "./components/goal-wizard"

// Sample data - in a real app, this would come from an API
const areaChartData = [
  { name: "Jan", footprint: 400 },
  { name: "Feb", footprint: 300 },
  { name: "Mar", footprint: 200 },
  { name: "Apr", footprint: 278 },
  { name: "May", footprint: 189 },
  { name: "Jun", footprint: 239 },
]

const pieChartData = [
  { name: "Transport", value: 400, color: "#0088FE" },
  { name: "Energy", value: 300, color: "#00C49F" },
  { name: "Food", value: 300, color: "#FFBB28" },
  { name: "Shopping", value: 200, color: "#FF8042" },
]

// Dashboard component with performance optimizations
export default function Dashboard() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [timeRange, setTimeRange] = useState("week")
  const [chartType, setChartType] = useState("area")

  // State for metrics - grouped together to reduce state updates
  const [metrics, setMetrics] = useState({
    carbonFootprint: 2.5,
    energyUsage: 450,
    tokenBalance: 1234,
    transportEmissions: 30,
    energyEmissions: 40,
    foodEmissions: 20,
    shoppingEmissions: 10,
  })

  // Memoize chart data to prevent unnecessary recalculations
  const currentChartData = useMemo(() => {
    // This would normally transform data based on the selected time range
    return areaChartData
  }, [])

  // Optimized data refresh function
  const handleRefreshData = useCallback(async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update all metrics in a single state update
      setMetrics((prev) => ({
        ...prev,
        carbonFootprint: Math.max(0, prev.carbonFootprint + (Math.random() - 0.5) * 0.2),
        energyUsage: Math.max(0, prev.energyUsage + (Math.random() - 0.5) * 20),
        tokenBalance: prev.tokenBalance + Math.floor(Math.random() * 10),
      }))

      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated with latest measurements.",
      })
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Unable to fetch latest data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, toast])

  // Simulate real-time updates with useEffect
  useEffect(() => {
    // Use a reference to cancel the interval on unmount
    const intervalId = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        carbonFootprint: Math.max(0, prev.carbonFootprint + (Math.random() - 0.5) * 0.05),
        energyUsage: Math.max(0, prev.energyUsage + (Math.random() - 0.5) * 5),
      }))
    }, 10000) // Less frequent updates for better performance

    return () => clearInterval(intervalId)
  }, [])

  // Memoized chart component to prevent unnecessary re-renders
  const ChartComponent = useMemo(() => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Carbon Footprint Trend</CardTitle>
            <CardDescription>Your emissions over time</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setChartType("area")}>
                    <LineChart className={`h-4 w-4 ${chartType === "area" ? "text-primary" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Area Chart</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setChartType("bar")}>
                    <BarChart4 className={`h-4 w-4 ${chartType === "bar" ? "text-primary" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Bar Chart</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => setChartType("pie")}>
                    <PieChart className={`h-4 w-4 ${chartType === "pie" ? "text-primary" : ""}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Pie Chart</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" && (
              <AreaChart data={currentChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Area type="monotone" dataKey="footprint" stroke="#8884d8" fill="#8884d8" name="Carbon Footprint" />
              </AreaChart>
            )}
            {chartType === "bar" && (
              <RechartsBarChart data={currentChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="footprint" fill="#8884d8" name="Carbon Footprint" />
              </RechartsBarChart>
            )}
            {chartType === "pie" && (
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </RechartsPieChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }, [chartType, currentChartData])

  // Memoized metrics cards to prevent unnecessary re-renders
  const MetricsCards = useMemo(() => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>Your current carbon emissions measured in tons of CO2 equivalent</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Leaf className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{metrics.carbonFootprint.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground ml-2">tons CO2e</div>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">-12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Usage</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>Your current energy consumption measured in kilowatt-hours</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-yellow-500 mr-2" />
              <div className="text-2xl font-bold">{Math.round(metrics.energyUsage)}</div>
              <div className="text-sm text-muted-foreground ml-2">kWh</div>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-500">+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Green Tokens</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Tokens earned through sustainable actions that can be redeemed for rewards
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Battery className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{metrics.tokenBalance}</div>
              <div className="text-sm text-muted-foreground ml-2">tokens</div>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">+15% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }, [metrics.carbonFootprint, metrics.energyUsage, metrics.tokenBalance])

  // Dashboard controls component
  const DashboardControls = useCallback(
    () => (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Dashboard Controls</CardTitle>
          <CardDescription>Customize your view and update data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Date Range</div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Time Range</div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Actions</div>
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={handleRefreshData} disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Refresh Data</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Dashboard Settings</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
    [handleRefreshData, isLoading, selectedDate, timeRange],
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Carbon Footprint Dashboard</h1>
        <Button variant="default" onClick={handleRefreshData} disabled={isLoading} className="hidden md:flex">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Data
            </>
          )}
        </Button>
      </div>

      {/* Dashboard Controls */}
      <DashboardControls />

      {/* Key Metrics */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Key Metrics</h2>
        <p className="text-sm text-muted-foreground">Your current sustainability performance</p>
        {MetricsCards}
      </div>

      {/* Main Chart */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Performance Trends</h2>
        <p className="text-sm text-muted-foreground">Track your progress over time</p>
        {ChartComponent}
      </div>

      {/* User Profile and Quick Actions */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your sustainability profile and take actions</p>
        <div className="grid gap-6 md:grid-cols-2">
          <UserProfileCard />
          <QuickActions />
        </div>
      </div>

      {/* Recommendations and Notifications */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Personalized Insights</h2>
        <p className="text-sm text-muted-foreground">Recommendations and updates tailored to you</p>
        <div className="grid gap-6 md:grid-cols-2">
          <PersonalizedRecommendations />
          <NotificationCenter />
        </div>
      </div>

      {/* Goal Setting */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Goal Setting</h2>
        <p className="text-sm text-muted-foreground">Create and track your sustainability goals</p>
        <GoalWizard />
      </div>
    </div>
  )
}

