"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowUp, ArrowDown, TrendingUp, Activity, Target, Award } from "lucide-react"

const emissionsData = [
  { month: "Jan", emissions: 2.5 },
  { month: "Feb", emissions: 2.3 },
  { month: "Mar", emissions: 2.1 },
  { month: "Apr", emissions: 2.4 },
  { month: "May", emissions: 2.2 },
  { month: "Jun", emissions: 1.9 },
]

const categoryData = [
  { name: "Transport", value: 35, color: "#0088FE" },
  { name: "Energy", value: 30, color: "#00C49F" },
  { name: "Food", value: 20, color: "#FFBB28" },
  { name: "Shopping", value: 15, color: "#FF8042" },
]

const comparisonData = [
  { category: "Transport", you: 35, average: 45 },
  { category: "Energy", you: 30, average: 35 },
  { category: "Food", you: 20, average: 25 },
  { category: "Shopping", you: 15, average: 20 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emissions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1</div>
            <p className="text-xs text-muted-foreground">tons CO2e this month</p>
            <div className="mt-4 flex items-center space-x-2">
              <Badge variant="secondary" className="flex items-center">
                <ArrowDown className="mr-1 h-4 w-4 text-green-500" />
                12%
              </Badge>
              <span className="text-sm text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress to Goal</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <Progress value={75} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">Target: 1.5 tons CO2e/month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Credits</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5</div>
            <p className="text-xs text-muted-foreground">tons CO2e offset</p>
            <div className="mt-4 flex items-center space-x-2">
              <Badge variant="secondary" className="flex items-center">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                8%
              </Badge>
              <span className="text-sm text-muted-foreground">increase in offsets</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <Progress value={85} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">Top 15% in your region</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Emissions Trend</CardTitle>
            <CardDescription>Monthly carbon emissions over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emissionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="emissions" stroke="#8884d8" name="CO2e (tons)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Emissions by Category</CardTitle>
            <CardDescription>Distribution of your carbon footprint</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparison with Average</CardTitle>
          <CardDescription>Your emissions compared to regional average</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="you" fill="#8884d8" name="Your Emissions" />
              <Bar dataKey="average" fill="#82ca9d" name="Regional Average" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

