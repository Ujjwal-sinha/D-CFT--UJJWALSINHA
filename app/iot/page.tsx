"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, ResponsiveContainer, XAxis, YAxis, Line, Tooltip, Legend } from "recharts"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Thermometer,
  Zap,
  SunDim,
  Wind,
  PlugZap,
  Power,
  Plus,
  Home,
  Building2,
  Factory,
  Battery,
  Signal,
  AlertCircle,
  CheckCircle,
  XCircle,
  Droplet,
} from "lucide-react"
import type React from "react" // Added import for React
import { Textarea } from "@/components/ui/textarea"
import { CartesianGrid, AreaChart, Area, Cell, Pie, PieChart, BarChart, Bar } from "recharts"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter } from "recharts"
import { Calendar, AlertOctagon } from "lucide-react"

interface Device {
  id: string
  name: string
  type: string
  status: "Online" | "Offline"
  lastReading: string
  icon: React.ReactNode
}

const initialDevices: Device[] = [
  {
    id: "1",
    name: "Smart Thermostat",
    type: "Temperature",
    status: "Online",
    lastReading: "21°C",
    icon: <Thermometer className="h-4 w-4" />,
  },
  {
    id: "2",
    name: "EV Charger",
    type: "Charging",
    status: "Online",
    lastReading: "7.2 kW",
    icon: <Zap className="h-4 w-4" />,
  },
  {
    id: "3",
    name: "Solar Panels",
    type: "Generation",
    status: "Online",
    lastReading: "3.5 kW",
    icon: <SunDim className="h-4 w-4" />,
  },
  {
    id: "4",
    name: "Smart Meter",
    type: "Consumption",
    status: "Online",
    lastReading: "0.5 kWh/h",
    icon: <PlugZap className="h-4 w-4" />,
  },
  {
    id: "5",
    name: "Wind Turbine",
    type: "Generation",
    status: "Offline",
    lastReading: "0.0 kW",
    icon: <Wind className="h-4 w-4" />,
  },
]

const energyData = [
  { time: "00:00", usage: 2.5, generation: 0.0 },
  { time: "04:00", usage: 1.8, generation: 0.2 },
  { time: "08:00", usage: 3.2, generation: 1.5 },
  { time: "12:00", usage: 4.5, generation: 3.8 },
  { time: "16:00", usage: 3.8, generation: 2.5 },
  { time: "20:00", usage: 3.0, generation: 0.5 },
]

const energyConsumptionData = [
  { time: "00:00", consumption: 45, generation: 0 },
  { time: "04:00", consumption: 30, generation: 5 },
  { time: "08:00", consumption: 65, generation: 25 },
  { time: "12:00", consumption: 85, generation: 45 },
  { time: "16:00", consumption: 70, generation: 35 },
  { time: "20:00", consumption: 55, generation: 15 },
]

const deviceHealthData = [
  { name: "Smart Meters", operational: 95, maintenance: 3, failed: 2 },
  { name: "Solar Panels", operational: 88, maintenance: 7, failed: 5 },
  { name: "Wind Turbines", operational: 92, maintenance: 5, failed: 3 },
  { name: "EV Chargers", operational: 90, maintenance: 8, failed: 2 },
]

const resourceUtilizationData = [
  { resource: "Electricity", used: 75, available: 25 },
  { resource: "Water", used: 60, available: 40 },
  { resource: "Gas", used: 45, available: 55 },
  { resource: "Solar", used: 85, available: 15 },
]

const predictiveMaintenanceData = [
  { device: "Solar Panel A1", health: 95, nextMaintenance: "2024-04-15" },
  { device: "Wind Turbine W2", health: 88, nextMaintenance: "2024-04-02" },
  { device: "Smart Meter M3", health: 92, nextMaintenance: "2024-04-20" },
  { device: "EV Charger C4", health: 78, nextMaintenance: "2024-03-28" },
]

const failurePredictionData = [
  { month: "Jan", probability: 0.15, devices: 3 },
  { month: "Feb", probability: 0.22, devices: 4 },
  { month: "Mar", probability: 0.18, devices: 3 },
  { month: "Apr", probability: 0.35, devices: 6 },
  { month: "May", probability: 0.28, devices: 5 },
  { month: "Jun", probability: 0.2, devices: 4 },
]

const energyPredictionData = [
  { month: "Jan", predicted: 450, actual: 460, lower: 420, upper: 480 },
  { month: "Feb", predicted: 480, actual: 475, lower: 450, upper: 510 },
  { month: "Mar", predicted: 520, actual: 515, lower: 490, upper: 550 },
  { month: "Apr", predicted: 540, actual: null, lower: 510, upper: 570 },
  { month: "May", predicted: 580, actual: null, lower: 550, upper: 610 },
  { month: "Jun", predicted: 620, actual: null, lower: 590, upper: 650 },
]

const maintenanceScoreData = [
  { subject: "Equipment Age", A: 65, B: 90 },
  { subject: "Performance", A: 80, B: 85 },
  { subject: "Reliability", A: 75, B: 88 },
  { subject: "Efficiency", A: 70, B: 82 },
  { subject: "Usage Load", A: 85, B: 75 },
]

const deviceReplacementData = [
  { id: "SM001", name: "Smart Meter 1", age: 3.5, efficiency: 92, replacement: "2024-08-15" },
  { id: "SP002", name: "Solar Panel 2", age: 4.2, efficiency: 85, replacement: "2024-06-20" },
  { id: "WT003", name: "Wind Turbine 3", age: 2.8, efficiency: 95, replacement: "2025-01-10" },
  { id: "EV004", name: "EV Charger 4", age: 5.0, efficiency: 78, replacement: "2024-04-30" },
]

const anomalyPredictionData = [
  { time: 1, normal: 120, anomaly: null },
  { time: 2, normal: 125, anomaly: null },
  { time: 3, normal: 130, anomaly: null },
  { time: 4, normal: 128, anomaly: null },
  { time: 5, normal: 135, anomaly: 180 },
  { time: 6, normal: 140, anomaly: null },
  { time: 7, normal: 138, anomaly: null },
  { time: 8, normal: 145, anomaly: 190 },
]

const costPredictionData = [
  { category: "Energy", current: 5000, predicted: 4200, savings: 800 },
  { category: "Maintenance", current: 3000, predicted: 2400, savings: 600 },
  { category: "Operations", current: 4500, predicted: 3800, savings: 700 },
  { category: "Equipment", current: 6000, predicted: 5100, savings: 900 },
]

export default function IoTIntegration() {
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [newDeviceName, setNewDeviceName] = useState("")
  const [newDeviceType, setNewDeviceType] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices((prevDevices) =>
        prevDevices.map((device) => ({
          ...device,
          lastReading: updateReading(device.type),
          status: Math.random() > 0.1 ? "Online" : "Offline", // 10% chance of going offline
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const updateReading = (type: string) => {
    switch (type) {
      case "Temperature":
        return `${(20 + Math.random() * 5).toFixed(1)}°C`
      case "Charging":
        return `${(5 + Math.random() * 5).toFixed(1)} kW`
      case "Generation":
        return `${(Math.random() * 5).toFixed(1)} kW`
      case "Consumption":
        return `${(0.2 + Math.random() * 0.8).toFixed(2)} kWh/h`
      default:
        return "N/A"
    }
  }

  const handleAddDevice = () => {
    if (newDeviceName && newDeviceType) {
      const newDevice: Device = {
        id: (devices.length + 1).toString(),
        name: newDeviceName,
        type: newDeviceType,
        status: "Online",
        lastReading: updateReading(newDeviceType),
        icon: <Power className="h-4 w-4" />,
      }
      setDevices([...devices, newDevice])
      setNewDeviceName("")
      setNewDeviceType("")
      toast({
        title: "Device Added",
        description: `${newDeviceName} has been added to your IoT network.`,
      })
    }
  }

  const toggleDeviceStatus = (id: string) => {
    try {
      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === id ? { ...device, status: device.status === "Online" ? "Offline" : "Online" } : device,
        ),
      )
      toast({
        title: "Device Status Updated",
        description: "The device status has been successfully updated.",
      })
    } catch (error) {
      console.error("Error updating device status:", error)
      toast({
        title: "Error",
        description: "Failed to update device status. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">IoT Device Integration</h1>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Energy Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={energyData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="usage" stroke="#8884d8" name="Energy Usage" />
              <Line type="monotone" dataKey="generation" stroke="#82ca9d" name="Energy Generation" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {devices.map((device) => (
                <li key={device.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {device.icon}
                    <span>{device.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={device.status === "Online" ? "default" : "secondary"}>{device.status}</Badge>
                    <span className="text-sm text-muted-foreground">{device.lastReading}</span>
                    <Switch
                      checked={device.status === "Online"}
                      onCheckedChange={() => toggleDeviceStatus(device.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Home Devices</span>
                </div>
                <Badge>5 Devices</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Office Devices</span>
                </div>
                <Badge>3 Devices</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Factory className="h-4 w-4" />
                  <span>Industrial Devices</span>
                </div>
                <Badge>2 Devices</Badge>
              </div>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Create New Group
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Battery className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <div className="text-2xl font-bold">85%</div>
                      <p className="text-sm text-muted-foreground">Average Battery</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Signal className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <div className="text-2xl font-bold">98%</div>
                      <p className="text-sm text-muted-foreground">Signal Strength</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                      <div className="text-2xl font-bold">2</div>
                      <p className="text-sm text-muted-foreground">Alerts</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Device</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="device-name">Device Name</Label>
                <Input
                  id="device-name"
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  placeholder="Enter device name"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="device-type">Device Type</Label>
                <Input
                  id="device-type"
                  value={newDeviceType}
                  onChange={(e) => setNewDeviceType(e.target.value)}
                  placeholder="Enter device type"
                />
              </div>
              <Button onClick={handleAddDevice} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Device
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Devices</TabsTrigger>
              <TabsTrigger value="online">Online</TabsTrigger>
              <TabsTrigger value="offline">Offline</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <DeviceList devices={devices} />
            </TabsContent>
            <TabsContent value="online">
              <DeviceList devices={devices.filter((d) => d.status === "Online")} />
            </TabsContent>
            <TabsContent value="offline">
              <DeviceList devices={devices.filter((d) => d.status === "Offline")} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-Time Energy Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyConsumptionData}>
                <defs>
                  <linearGradient id="consumption" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="generation" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="consumption"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#consumption)"
                  name="Consumption (kW)"
                />
                <Area
                  type="monotone"
                  dataKey="generation"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#generation)"
                  name="Generation (kW)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Device Health Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceHealthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="operational" stackId="a" fill="#4ade80" name="Operational %" />
                  <Bar dataKey="maintenance" stackId="a" fill="#fbbf24" name="Maintenance %" />
                  <Bar dataKey="failed" stackId="a" fill="#f87171" name="Failed %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resourceUtilizationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="used"
                    nameKey="resource"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {resourceUtilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#4ade80", "#60a5fa", "#f472b6", "#fbbf24"][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Predictive Maintenance Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveMaintenanceData.map((device) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{device.device}</p>
                  <p className="text-sm text-muted-foreground">Next Maintenance: {device.nextMaintenance}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-40">
                    <Progress
                      value={device.health}
                      className={cn(
                        device.health > 90 ? "bg-green-500" : device.health > 80 ? "bg-yellow-500" : "bg-red-500",
                      )}
                    />
                  </div>
                  <span className="text-sm font-medium">{device.health}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Real-Time Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Battery className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold">Power Usage</h3>
                  <div className="text-2xl font-bold mt-2">4.5 kW</div>
                  <p className="text-xs text-muted-foreground">Current Consumption</p>
                  <Badge className="mt-2" variant="outline">
                    Normal
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Droplet className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">Water Flow</h3>
                  <div className="text-2xl font-bold mt-2">2.3 m³/h</div>
                  <p className="text-xs text-muted-foreground">Current Flow Rate</p>
                  <Badge className="mt-2" variant="outline">
                    Optimal
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Thermometer className="h-8 w-8 mx-auto mb-2 text-red-500" />
                  <h3 className="font-semibold">Temperature</h3>
                  <div className="text-2xl font-bold mt-2">23.5°C</div>
                  <p className="text-xs text-muted-foreground">Average Reading</p>
                  <Badge className="mt-2" variant="outline">
                    Normal
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Wind className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
                  <h3 className="font-semibold">Air Quality</h3>
                  <div className="text-2xl font-bold mt-2">Good</div>
                  <p className="text-xs text-muted-foreground">PM2.5: 12 µg/m³</p>
                  <Badge className="mt-2" variant="outline">
                    Healthy
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Predictive Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="failures">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
              <TabsTrigger value="failures">Failures</TabsTrigger>
              <TabsTrigger value="energy">Energy</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="replacement">Replacement</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
              <TabsTrigger value="costs">Costs</TabsTrigger>
            </TabsList>

            <TabsContent value="failures" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={failurePredictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="probability"
                      stroke="#8884d8"
                      name="Failure Probability"
                    />
                    <Line yAxisId="right" type="monotone" dataKey="devices" stroke="#82ca9d" name="Affected Devices" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {failurePredictionData.slice(-3).map((data, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <AlertOctagon className="h-8 w-8 mx-auto mb-2 text-red-500" />
                        <h3 className="font-semibold">{data.month}</h3>
                        <div className="text-2xl font-bold mt-2">{(data.probability * 100).toFixed(1)}%</div>
                        <p className="text-xs text-muted-foreground">Failure Probability</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="energy">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={energyPredictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="upper"
                      stackId="1"
                      stroke="none"
                      fill="#8884d8"
                      fillOpacity={0.2}
                      name="Upper Bound"
                    />
                    <Area
                      type="monotone"
                      dataKey="lower"
                      stackId="2"
                      stroke="none"
                      fill="#8884d8"
                      fillOpacity={0.2}
                      name="Lower Bound"
                    />
                    <Line type="monotone" dataKey="predicted" stroke="#8884d8" name="Predicted" />
                    <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Actual" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="maintenance">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%">
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="Current" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Radar name="Predicted" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Maintenance Score Predictions</h3>
                  {maintenanceScoreData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.subject}</span>
                        <span className="text-muted-foreground">
                          Current: {item.A} → Predicted: {item.B}
                        </span>
                      </div>
                      <Progress value={(item.B / 100) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="replacement">
              <div className="space-y-4">
                {deviceReplacementData.map((device, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{device.name}</h3>
                          <p className="text-sm text-muted-foreground">ID: {device.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{device.replacement}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Predicted Replacement</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Age: {device.age} years</span>
                          <span>Efficiency: {device.efficiency}%</span>
                        </div>
                        <Progress value={device.efficiency} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="anomalies">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Scatter name="Normal Behavior" data={anomalyPredictionData} dataKey="normal" fill="#8884d8" />
                    <Scatter name="Predicted Anomalies" data={anomalyPredictionData} dataKey="anomaly" fill="#ff0000" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="costs">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costPredictionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" fill="#8884d8" name="Current Cost" />
                    <Bar dataKey="predicted" fill="#82ca9d" name="Predicted Cost" />
                    <Bar dataKey="savings" fill="#ffc658" name="Projected Savings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {costPredictionData.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h3 className="font-semibold">{item.category}</h3>
                        <div className="text-2xl font-bold mt-2 text-green-500">${item.savings.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Projected Savings</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>IoT Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Real-time monitoring of energy consumption and generation</li>
            <li>Automated data collection for accurate carbon footprint calculation</li>
            <li>Smart device control for optimized energy usage</li>
            <li>Integration with blockchain for secure and transparent data storage</li>
            <li>Predictive maintenance to reduce energy waste and extend device lifespan</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function DeviceList({ devices }: { devices: Device[] }) {
  return (
    <ul className="space-y-4">
      {devices.map((device) => (
        <li key={device.id} className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center space-x-2">
            {device.icon}
            <span>{device.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={device.status === "Online" ? "default" : "secondary"}>{device.status}</Badge>
            <span className="text-sm text-muted-foreground">{device.lastReading}</span>
            <Dialog>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{device.name}</DialogTitle>
                  <DialogDescription>Device Details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Device ID</Label>
                      <Input value={device.id} readOnly />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Input value={device.type} readOnly />
                    </div>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      {device.status === "Online" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span>{device.status}</span>
                    </div>
                  </div>
                  <div>
                    <Label>Last Reading</Label>
                    <div className="mt-1">{device.lastReading}</div>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input placeholder="Enter device location" />
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <Textarea placeholder="Add notes about this device" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Configure</Button>
                  <Button>Update Firmware</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </li>
      ))}
    </ul>
  )
}

