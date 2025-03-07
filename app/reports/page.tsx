"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Download,
  FileText,
  Calendar,
  Share2,
  Printer,
  Mail,
  BarChart2,
  PieChartIcon,
  LineChartIcon,
  FileSpreadsheet,
  FileIcon as FilePdf,
  FileJson,
  Loader2,
} from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"

const monthlyData = [
  { name: "Jan", emissions: 240 },
  { name: "Feb", emissions: 300 },
  { name: "Mar", emissions: 280 },
  { name: "Apr", emissions: 200 },
  { name: "May", emissions: 278 },
  { name: "Jun", emissions: 189 },
  { name: "Jul", emissions: 239 },
  { name: "Aug", emissions: 300 },
  { name: "Sep", emissions: 270 },
  { name: "Oct", emissions: 210 },
  { name: "Nov", emissions: 190 },
  { name: "Dec", emissions: 180 },
]

const categoryData = [
  { name: "Transport", value: 35, color: "#0088FE" },
  { name: "Energy", value: 30, color: "#00C49F" },
  { name: "Food", value: 15, color: "#FFBB28" },
  { name: "Shopping", value: 10, color: "#FF8042" },
  { name: "Other", value: 10, color: "#8884d8" },
]

const comparisonData = [
  { name: "Jan", you: 240, average: 300, best: 150 },
  { name: "Feb", you: 300, average: 320, best: 160 },
  { name: "Mar", you: 280, average: 310, best: 170 },
  { name: "Apr", you: 200, average: 305, best: 155 },
  { name: "May", you: 278, average: 315, best: 165 },
  { name: "Jun", you: 189, average: 300, best: 160 },
]

const reportHistory = [
  {
    id: "REP-2024-001",
    name: "Monthly Carbon Report",
    date: "2024-03-01",
    type: "Monthly",
    status: "Generated",
  },
  {
    id: "REP-2024-002",
    name: "Q1 Sustainability Report",
    date: "2024-04-01",
    type: "Quarterly",
    status: "Generated",
  },
  {
    id: "REP-2024-003",
    name: "Transport Emissions Analysis",
    date: "2024-04-15",
    type: "Custom",
    status: "Generated",
  },
  {
    id: "REP-2024-004",
    name: "Energy Consumption Report",
    date: "2024-05-01",
    type: "Monthly",
    status: "Scheduled",
  },
]

export default function ReportsPage() {
  const { toast } = useToast()
  const [reportName, setReportName] = useState("")
  const [reportType, setReportType] = useState("monthly")
  const [isGenerating, setIsGenerating] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  const handleGenerateReport = () => {
    if (!reportName) {
      toast({
        title: "Error",
        description: "Please enter a report name",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Report Generated",
        description: `Your report "${reportName}" has been generated successfully.`,
      })
    }, 2000)
  }

  const handleDownloadReport = (format: string) => {
    toast({
      title: "Download Started",
      description: `Your report is being downloaded in ${format.toUpperCase()} format.`,
    })
  }

  const handleShareReport = () => {
    toast({
      title: "Share Report",
      description: "Report sharing options have been sent to your email.",
    })
  }

  const handlePrintReport = () => {
    toast({
      title: "Print Report",
      description: "Sending report to printer...",
    })
  }

  const handleEmailReport = () => {
    toast({
      title: "Email Report",
      description: "Report has been emailed to your registered email address.",
    })
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Carbon Footprint Reports</h1>

      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create custom reports based on your carbon footprint data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input
                  id="report-name"
                  placeholder="Enter report name"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Report</SelectItem>
                    <SelectItem value="weekly">Weekly Report</SelectItem>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                    <SelectItem value="quarterly">Quarterly Report</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>

            <div className="space-y-2">
              <Label>Report Sections</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="emissions-summary" className="rounded" defaultChecked />
                  <Label htmlFor="emissions-summary">Emissions Summary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="category-breakdown" className="rounded" defaultChecked />
                  <Label htmlFor="category-breakdown">Category Breakdown</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="comparison" className="rounded" defaultChecked />
                  <Label htmlFor="comparison">Peer Comparison</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="trends" className="rounded" defaultChecked />
                  <Label htmlFor="trends">Trends Analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="recommendations" className="rounded" defaultChecked />
                  <Label htmlFor="recommendations">Recommendations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="raw-data" className="rounded" />
                  <Label htmlFor="raw-data">Raw Data</Label>
                </div>
              </div>
            </div>

            <Button onClick={handleGenerateReport} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="preview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preview">Report Preview</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Monthly Carbon Footprint Report</CardTitle>
                <CardDescription>
                  {date?.from ? format(date.from, "LLL dd, y") : ""} - {date?.to ? format(date.to, "LLL dd, y") : ""}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => handleDownloadReport("pdf")}>
                  <FilePdf className="h-4 w-4" />
                  <span className="sr-only">Download as PDF</span>
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDownloadReport("excel")}>
                  <FileSpreadsheet className="h-4 w-4" />
                  <span className="sr-only">Download as Excel</span>
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDownloadReport("json")}>
                  <FileJson className="h-4 w-4" />
                  <span className="sr-only">Download as JSON</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handleShareReport}>
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share Report</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handlePrintReport}>
                  <Printer className="h-4 w-4" />
                  <span className="sr-only">Print Report</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handleEmailReport}>
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email Report</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Emissions Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">2.5 tons</div>
                        <p className="text-sm text-muted-foreground">Total CO2 Emissions</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">-15%</div>
                        <p className="text-sm text-muted-foreground">Change from Previous Period</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">3.2 tons</div>
                        <p className="text-sm text-muted-foreground">Average in Your Region</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  Monthly Emissions Trend
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="emissions" fill="#8884d8" name="CO2 Emissions (kg)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <PieChartIcon className="mr-2 h-5 w-5" />
                  Emissions by Category
                </h3>
                <div className="h-[300px]">
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
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <LineChartIcon className="mr-2 h-5 w-5" />
                  Comparison with Peers
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="you" stroke="#8884d8" name="Your Emissions" />
                      <Line type="monotone" dataKey="average" stroke="#82ca9d" name="Average Emissions" />
                      <Line type="monotone" dataKey="best" stroke="#ffc658" name="Best Performers" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">AI-Generated Recommendations</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium">Transport Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Your transport emissions are 15% higher than average. Consider carpooling or using public
                      transportation twice a week to reduce emissions by approximately 20%.
                    </p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium">Energy Efficiency</h4>
                    <p className="text-sm text-muted-foreground">
                      Switching to LED lighting throughout your home could reduce your energy emissions by up to 10%.
                      Based on your current usage patterns, this would save approximately 0.2 tons of CO2 annually.
                    </p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium">Diet Changes</h4>
                    <p className="text-sm text-muted-foreground">
                      Reducing meat consumption by one day per week could lower your food-related emissions by 8%,
                      equivalent to approximately 0.15 tons of CO2 annually.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>Previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportHistory.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.status}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automatically generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Monthly Carbon Report</h3>
                          <p className="text-sm text-muted-foreground">Generated on the 1st of each month</p>
                          <div className="flex items-center mt-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">Next: June 1, 2024</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Quarterly Sustainability Report</h3>
                          <p className="text-sm text-muted-foreground">Generated every three months</p>
                          <div className="flex items-center mt-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">Next: July 1, 2024</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

