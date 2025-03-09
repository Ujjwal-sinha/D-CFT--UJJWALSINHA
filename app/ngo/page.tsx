"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Info,
  Users,
  TreeDeciduous,
  Factory,
  Leaf,
  MapPin,
  ArrowRight,
  Download,
  ExternalLink,
} from "lucide-react"
import IndiaMap from "./components/india-map"

export default function NGOPage() {
  const [activeState, setActiveState] = useState<string | null>("Odisha")
  const [showProjects, setShowProjects] = useState(false)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        {/* Hero Section */}
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-800/80 z-10"></div>
          <div
            className="h-64 bg-cover bg-center"
            style={{ backgroundImage: "url('/placeholder.svg?height=400&width=1200')" }}
          ></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 z-20">
            <Badge className="w-fit mb-2 bg-green-600 hover:bg-green-700">NGO Initiative</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Carbon Footprint Reduction Network</h1>
            <p className="text-white/90 max-w-2xl">
              Collaborating with NGOs across India to monitor, reduce, and offset carbon emissions with special focus on
              high-impact regions like Odisha.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                India Carbon Emission Map
              </CardTitle>
              <CardDescription>
                Interactive visualization of carbon emissions across Indian states with focus on Odisha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] relative">
                <IndiaMap activeState={activeState} setActiveState={setActiveState} />

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 p-3 rounded-md shadow-md">
                  <p className="text-sm font-medium mb-2">Emissions Level (MT CO₂e/year)</p>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 bg-green-200"></div>
                    <span>Low (&lt;50)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 bg-yellow-200"></div>
                    <span>Medium (50-100)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 bg-orange-200"></div>
                    <span>High (100-150)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 bg-red-200"></div>
                    <span>Very High (&gt;150)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <div className="w-4 h-4 bg-blue-400"></div>
                    <span>Focus State (Odisha)</span>
                  </div>
                </div>
              </div>

              {/* State Info */}
              {activeState && (
                <div className="mt-4 p-4 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{activeState}</h3>
                      <p className="text-sm text-muted-foreground">
                        {activeState === "Odisha"
                          ? "Primary focus region with 5 active NGO projects"
                          : "Secondary region with monitoring capabilities"}
                      </p>
                    </div>
                    {activeState === "Odisha" && (
                      <Button size="sm" onClick={() => setShowProjects(!showProjects)}>
                        {showProjects ? "Hide Projects" : "Show Projects"}
                      </Button>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Emissions</p>
                      <p className="text-lg font-medium">{activeState === "Odisha" ? "112.5 MT CO₂e" : "Varies"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reduction Target</p>
                      <p className="text-lg font-medium">{activeState === "Odisha" ? "30% by 2030" : "Varies"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Primary Sources</p>
                      <p className="text-lg font-medium">{activeState === "Odisha" ? "Industry, Power" : "Varies"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">NGO Partners</p>
                      <p className="text-lg font-medium">{activeState === "Odisha" ? "5 Active" : "Varies"}</p>
                    </div>
                  </div>

                  {/* Odisha Projects */}
                  {showProjects && activeState === "Odisha" && (
                    <div className="mt-4">
                      <Separator className="my-3" />
                      <h4 className="font-medium mb-2">Active NGO Projects in Odisha</h4>
                      <div className="space-y-3">
                        {[
                          {
                            name: "Coastal Mangrove Restoration",
                            progress: 65,
                            impact: "12.3 MT CO₂e sequestered annually",
                          },
                          {
                            name: "Clean Energy for Rural Communities",
                            progress: 42,
                            impact: "8.7 MT CO₂e reduced annually",
                          },
                          {
                            name: "Industrial Efficiency Program",
                            progress: 78,
                            impact: "23.5 MT CO₂e reduced annually",
                          },
                          {
                            name: "Sustainable Agriculture Initiative",
                            progress: 31,
                            impact: "5.2 MT CO₂e reduced annually",
                          },
                          {
                            name: "Urban Waste Management",
                            progress: 54,
                            impact: "7.8 MT CO₂e reduced annually",
                          },
                        ].map((project, index) => (
                          <div key={index} className="bg-muted/50 p-3 rounded-md">
                            <div className="flex justify-between items-center mb-1">
                              <h5 className="font-medium">{project.name}</h5>
                              <Badge variant="outline">{project.progress}% Complete</Badge>
                            </div>
                            <Progress value={project.progress} className="h-2 mb-2" />
                            <p className="text-xs text-muted-foreground">{project.impact}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Column - Info */}
          <div className="space-y-6">
            {/* Emission Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-emerald-600" />
                  Emission Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="odisha">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="odisha" className="flex-1">
                      Odisha
                    </TabsTrigger>
                    <TabsTrigger value="india" className="flex-1">
                      India
                    </TabsTrigger>
                    <TabsTrigger value="global" className="flex-1">
                      Global
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="odisha" className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Total Emissions</p>
                        <p className="text-lg font-semibold">112.5 MT CO₂e</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Per Capita</p>
                        <p className="text-lg font-semibold">2.4 T CO₂e</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">YoY Change</p>
                        <p className="text-lg font-semibold text-red-500">+3.2%</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Forest Cover</p>
                        <p className="text-lg font-semibold">32.98%</p>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Emission Sources</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Industry</span>
                            <span>42%</span>
                          </div>
                          <Progress value={42} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Power Generation</span>
                            <span>28%</span>
                          </div>
                          <Progress value={28} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Transportation</span>
                            <span>15%</span>
                          </div>
                          <Progress value={15} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Agriculture</span>
                            <span>10%</span>
                          </div>
                          <Progress value={10} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Other</span>
                            <span>5%</span>
                          </div>
                          <Progress value={5} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="india">
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">National Emissions</p>
                        <p className="text-lg font-semibold">2,875 MT CO₂e</p>
                        <p className="text-xs text-muted-foreground mt-1">3rd largest emitter globally</p>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Per Capita</p>
                        <p className="text-lg font-semibold">1.9 T CO₂e</p>
                        <p className="text-xs text-muted-foreground mt-1">Below global average of 4.7 T</p>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Reduction Target</p>
                        <p className="text-lg font-semibold">45% by 2030</p>
                        <p className="text-xs text-muted-foreground mt-1">From 2005 levels</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="global">
                    <div className="space-y-3">
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Global Emissions</p>
                        <p className="text-lg font-semibold">36,700 MT CO₂e</p>
                        <p className="text-xs text-muted-foreground mt-1">Annual total (2022)</p>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Temperature Rise</p>
                        <p className="text-lg font-semibold">+1.1°C</p>
                        <p className="text-xs text-muted-foreground mt-1">Above pre-industrial levels</p>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-xs text-muted-foreground">Paris Agreement</p>
                        <p className="text-lg font-semibold">1.5°C Target</p>
                        <p className="text-xs text-muted-foreground mt-1">Requires 45% reduction by 2030</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* NGO Initiatives */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  NGO Initiatives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <h4 className="font-medium">Odisha Green Alliance</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Coalition of 5 NGOs focused on reducing industrial emissions and promoting renewable energy in
                    Odisha.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      Industry
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      Energy
                    </Badge>
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-md">
                  <h4 className="font-medium">Coastal Resilience Project</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mangrove restoration along Odisha's 480km coastline, sequestering carbon and protecting against
                    cyclones.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      Sequestration
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      Adaptation
                    </Badge>
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-md">
                  <h4 className="font-medium">Clean Cookstove Initiative</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Distribution of 50,000 efficient cookstoves to rural households, reducing emissions and improving
                    health.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      Residential
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      Health
                    </Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View All 12 Initiatives <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Get Involved */}
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/20 border-emerald-200 dark:border-emerald-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-600" />
                  Get Involved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Support an NGO Project</Button>
                  <Button variant="outline" className="w-full border-emerald-200 dark:border-emerald-800">
                    Download Impact Report <Download className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="w-full border-emerald-200 dark:border-emerald-800">
                    Join Volunteer Network <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-emerald-600" />
                About Carbon Emissions in Odisha
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Odisha, located on India's eastern coast, faces unique challenges in carbon emissions due to its
                industrial profile and rapid development. The state is home to significant steel, aluminum, and thermal
                power industries.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Despite contributing only about 3.5% of India's total emissions, Odisha has seen a faster growth rate in
                emissions compared to the national average, primarily driven by industrial expansion and power
                generation.
              </p>
              <p className="text-sm text-muted-foreground">
                The state government has committed to a 30% reduction in emissions intensity by 2030, with a focus on
                industrial efficiency, renewable energy expansion, and forest conservation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreeDeciduous className="h-5 w-5 text-emerald-600" />
                Sequestration Potential
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Odisha has significant carbon sequestration potential through its forests, which cover nearly 33% of its
                geographical area. The state's mangrove forests along the coast are particularly effective carbon sinks.
              </p>
              <div className="bg-muted/30 p-3 rounded-md mb-4">
                <h4 className="text-sm font-medium mb-2">Sequestration by Ecosystem</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Tropical Forests</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Mangroves</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Agricultural Soils</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Wetlands</span>
                      <span>10%</span>
                    </div>
                    <Progress value={10} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Other</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} className="h-1.5" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                NGO initiatives are focused on enhancing these natural carbon sinks through reforestation, mangrove
                restoration, and sustainable agriculture practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-5 w-5 text-emerald-600" />
                Industrial Transformation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Odisha's industrial sector accounts for over 40% of the state's emissions. NGOs are working with
                industries to implement cleaner technologies and improve energy efficiency.
              </p>
              <div className="bg-muted/30 p-3 rounded-md mb-4">
                <h4 className="text-sm font-medium mb-2">Key Industrial Initiatives</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex items-center justify-center bg-green-100 text-green-800 rounded-full mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <span>Energy efficiency improvements in steel and aluminum plants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex items-center justify-center bg-green-100 text-green-800 rounded-full mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <span>Waste heat recovery systems in manufacturing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex items-center justify-center bg-green-100 text-green-800 rounded-full mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <span>Transition to renewable energy for industrial operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex items-center justify-center bg-green-100 text-green-800 rounded-full mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <span>Carbon capture pilot projects at power plants</span>
                  </li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground">
                These initiatives have the potential to reduce industrial emissions by up to 25% by 2030.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

