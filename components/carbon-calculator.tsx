"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Car, Plane, Home, ShoppingBag, Utensils, Calculator, ArrowRight, RefreshCw, Loader2 } from "lucide-react"

interface CalculationResult {
  transport: number
  home: number
  food: number
  shopping: number
  total: number
}

export function CarbonCalculator() {
  const { toast } = useToast()
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<CalculationResult | null>(null)

  // Transport inputs
  const [carMiles, setCarMiles] = useState(0)
  const [flightHours, setFlightHours] = useState(0)
  const [publicTransport, setPublicTransport] = useState(0)

  // Home inputs
  const [electricityUsage, setElectricityUsage] = useState(0)
  const [gasUsage, setGasUsage] = useState(0)
  const [renewablePercentage, setRenewablePercentage] = useState(0)

  // Food inputs
  const [meatConsumption, setMeatConsumption] = useState(50)
  const [dairyConsumption, setDairyConsumption] = useState(50)
  const [localFoodPercentage, setLocalFoodPercentage] = useState(0)

  // Shopping inputs
  const [monthlySpending, setMonthlySpending] = useState(0)
  const [recyclingRate, setRecyclingRate] = useState(0)

  const calculateFootprint = () => {
    setIsCalculating(true)

    // Simulate API call or complex calculation
    setTimeout(() => {
      const transport = carMiles * 0.404 + flightHours * 90 + publicTransport * 0.14
      const home = electricityUsage * 0.85 * (1 - renewablePercentage / 100) + gasUsage * 0.2
      const food = ((meatConsumption / 50) * 0.6 + (dairyConsumption / 50) * 0.4) * (1 - localFoodPercentage / 100)
      const shopping = monthlySpending * 0.01 * (1 - recyclingRate / 100)

      const result = {
        transport,
        home,
        food,
        shopping,
        total: transport + home + food + shopping,
      }

      setResult(result)
      setIsCalculating(false)

      toast({
        title: "Calculation Complete",
        description: `Your estimated carbon footprint is ${result.total.toFixed(2)} tons CO2e per year.`,
      })
    }, 2000)
  }

  const resetCalculator = () => {
    setCarMiles(0)
    setFlightHours(0)
    setPublicTransport(0)
    setElectricityUsage(0)
    setGasUsage(0)
    setRenewablePercentage(0)
    setMeatConsumption(50)
    setDairyConsumption(50)
    setLocalFoodPercentage(0)
    setMonthlySpending(0)
    setRecyclingRate(0)
    setResult(null)

    toast({
      title: "Calculator Reset",
      description: "All values have been reset to default.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Carbon Footprint Calculator</CardTitle>
          <CardDescription>Calculate your annual carbon footprint based on your lifestyle</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transport" className="space-y-4">
            <TabsList>
              <TabsTrigger value="transport">Transport</TabsTrigger>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="shopping">Shopping</TabsTrigger>
            </TabsList>

            <TabsContent value="transport" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Car Miles per Year</Label>
                  <div className="flex items-center space-x-4">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={carMiles}
                      onChange={(e) => setCarMiles(Number(e.target.value))}
                      placeholder="Enter miles"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Flight Hours per Year</Label>
                  <div className="flex items-center space-x-4">
                    <Plane className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={flightHours}
                      onChange={(e) => setFlightHours(Number(e.target.value))}
                      placeholder="Enter hours"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Public Transport Miles per Year</Label>
                  <div className="flex items-center space-x-4">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={publicTransport}
                      onChange={(e) => setPublicTransport(Number(e.target.value))}
                      placeholder="Enter miles"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="home" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Electricity Usage (kWh per month)</Label>
                  <div className="flex items-center space-x-4">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={electricityUsage}
                      onChange={(e) => setElectricityUsage(Number(e.target.value))}
                      placeholder="Enter kWh"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gas Usage (therms per month)</Label>
                  <div className="flex items-center space-x-4">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={gasUsage}
                      onChange={(e) => setGasUsage(Number(e.target.value))}
                      placeholder="Enter therms"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Renewable Energy Percentage</Label>
                  <Slider
                    value={[renewablePercentage]}
                    onValueChange={(value) => setRenewablePercentage(value[0])}
                    max={100}
                    step={1}
                  />
                  <div className="text-right text-sm text-muted-foreground">{renewablePercentage}%</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="food" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Meat Consumption</Label>
                  <div className="flex items-center space-x-4">
                    <Utensils className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={[meatConsumption]}
                      onValueChange={(value) => setMeatConsumption(value[0])}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground">{meatConsumption}%</div>
                </div>

                <div className="space-y-2">
                  <Label>Dairy Consumption</Label>
                  <div className="flex items-center space-x-4">
                    <Utensils className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={[dairyConsumption]}
                      onValueChange={(value) => setDairyConsumption(value[0])}
                      max={100}
                      step={1}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground">{dairyConsumption}%</div>
                </div>

                <div className="space-y-2">
                  <Label>Local Food Percentage</Label>
                  <Slider
                    value={[localFoodPercentage]}
                    onValueChange={(value) => setLocalFoodPercentage(value[0])}
                    max={100}
                    step={1}
                  />
                  <div className="text-right text-sm text-muted-foreground">{localFoodPercentage}%</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shopping" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Monthly Spending ($)</Label>
                  <div className="flex items-center space-x-4">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={monthlySpending}
                      onChange={(e) => setMonthlySpending(Number(e.target.value))}
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Recycling Rate</Label>
                  <Slider
                    value={[recyclingRate]}
                    onValueChange={(value) => setRecyclingRate(value[0])}
                    max={100}
                    step={1}
                  />
                  <div className="text-right text-sm text-muted-foreground">{recyclingRate}%</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex space-x-4">
            <Button onClick={calculateFootprint} disabled={isCalculating} className="flex-1">
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Footprint
                </>
              )}
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Your Carbon Footprint</CardTitle>
            <CardDescription>Annual emissions breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Transport</Label>
                <Progress value={(result.transport / result.total) * 100} />
                <div className="text-right text-sm">{result.transport.toFixed(2)} tons CO2e</div>
              </div>
              <div className="space-y-2">
                <Label>Home</Label>
                <Progress value={(result.home / result.total) * 100} />
                <div className="text-right text-sm">{result.home.toFixed(2)} tons CO2e</div>
              </div>
              <div className="space-y-2">
                <Label>Food</Label>
                <Progress value={(result.food / result.total) * 100} />
                <div className="text-right text-sm">{result.food.toFixed(2)} tons CO2e</div>
              </div>
              <div className="space-y-2">
                <Label>Shopping</Label>
                <Progress value={(result.shopping / result.total) * 100} />
                <div className="text-right text-sm">{result.shopping.toFixed(2)} tons CO2e</div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Total Annual Footprint</h3>
                  <p className="text-sm text-muted-foreground">Your estimated carbon emissions per year</p>
                </div>
                <div className="text-2xl font-bold">{result.total.toFixed(2)} tons CO2e</div>
              </div>
            </div>

            <Button className="w-full">
              View Detailed Report
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

