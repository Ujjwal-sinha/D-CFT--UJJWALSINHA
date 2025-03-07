"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Factory, Users, MapPin, Globe, Leaf, BarChart3, Calendar, AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface CompanyModalProps {
  isOpen: boolean
  onClose: () => void
}

const industries = [
  "Technology",
  "Manufacturing",
  "Energy",
  "Transportation",
  "Agriculture",
  "Healthcare",
  "Finance",
  "Retail",
  "Construction",
  "Education",
  "Other",
]

const companyTypes = [
  "Corporation",
  "Limited Liability Company (LLC)",
  "Partnership",
  "Sole Proprietorship",
  "Non-profit",
  "B Corporation",
  "Public Benefit Corporation",
]

const companySize = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1001-5000 employees",
  "5000+ employees",
]

export function CompanyModal({ isOpen, onClose }: CompanyModalProps) {
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Company general information
  const [companyName, setCompanyName] = useState("EcoTech Solutions")
  const [industry, setIndustry] = useState("Technology")
  const [companyType, setCompanyType] = useState("B Corporation")
  const [size, setSize] = useState("51-200 employees")
  const [founded, setFounded] = useState("2015")
  const [website, setWebsite] = useState("https://ecotechsolutions.example.com")
  const [description, setDescription] = useState(
    "EcoTech Solutions is dedicated to developing innovative technology solutions that help businesses reduce their environmental impact while improving operational efficiency.",
  )

  // Company location
  const [headquarters, setHeadquarters] = useState("San Francisco, CA")
  const [operatingRegions, setOperatingRegions] = useState("North America, Europe, Asia")

  // Sustainability profile
  const [sustainabilityGoals, setSustainabilityGoals] = useState("Carbon neutral by 2025, Zero waste by 2027")
  const [certifications, setCertifications] = useState("ISO 14001, B Corp Certification")
  const [carbonFootprint, setCarbonFootprint] = useState("1250")
  const [renewableEnergy, setRenewableEnergy] = useState("75")
  const [publicReporting, setPublicReporting] = useState(true)
  const [scienceBasedTargets, setScienceBasedTargets] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Updating company:", {
        companyName,
        industry,
        companyType,
        size,
        founded,
        website,
        description,
        headquarters,
        operatingRegions,
        sustainabilityGoals,
        certifications,
        carbonFootprint,
        renewableEnergy,
        publicReporting,
        scienceBasedTargets,
      })

      toast({
        title: "Company Updated",
        description: "Your company information has been successfully updated.",
      })
      setIsSubmitting(false)
      onClose()
    }, 1000)
  }

  const handleReset = () => {
    // Confirm before resetting
    if (window.confirm("Are you sure you want to reset all company information? This cannot be undone.")) {
      setCompanyName("")
      setIndustry("")
      setCompanyType("")
      setSize("")
      setFounded("")
      setWebsite("")
      setDescription("")
      setHeadquarters("")
      setOperatingRegions("")
      setSustainabilityGoals("")
      setCertifications("")
      setCarbonFootprint("")
      setRenewableEnergy("")
      setPublicReporting(false)
      setScienceBasedTargets(false)

      toast({
        title: "Company Information Reset",
        description: "All company information has been reset to default values.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Edit Company Profile
          </DialogTitle>
          <DialogDescription>
            Update your company information and sustainability profile. This information will be used for reporting and
            benchmarking.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="companyName" className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" /> Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="flex items-center gap-1">
                      <Factory className="h-4 w-4" /> Industry
                    </Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind}>
                            {ind}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyType" className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" /> Company Type
                    </Label>
                    <Select value={companyType} onValueChange={setCompanyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        {companyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="size" className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> Company Size
                    </Label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySize.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founded" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Founded Year
                    </Label>
                    <Input
                      id="founded"
                      value={founded}
                      onChange={(e) => setFounded(e.target.value)}
                      placeholder="e.g., 2010"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-1">
                    <Globe className="h-4 w-4" /> Website
                  </Label>
                  <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://example.com"
                    type="url"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-1">
                    Company Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your company's mission and vision"
                    rows={4}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="headquarters" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Headquarters
                  </Label>
                  <Input
                    id="headquarters"
                    value={headquarters}
                    onChange={(e) => setHeadquarters(e.target.value)}
                    placeholder="City, State/Province, Country"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operatingRegions" className="flex items-center gap-1">
                    <Globe className="h-4 w-4" /> Operating Regions
                  </Label>
                  <Textarea
                    id="operatingRegions"
                    value={operatingRegions}
                    onChange={(e) => setOperatingRegions(e.target.value)}
                    placeholder="List regions where your company operates"
                    rows={3}
                  />
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" /> Why Location Matters
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your company's location affects your carbon footprint calculation, regulatory requirements, and
                    available sustainability incentives. Providing accurate location information helps us tailor our
                    recommendations to your specific circumstances.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sustainability" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sustainabilityGoals" className="flex items-center gap-1">
                    <Leaf className="h-4 w-4" /> Sustainability Goals
                  </Label>
                  <Textarea
                    id="sustainabilityGoals"
                    value={sustainabilityGoals}
                    onChange={(e) => setSustainabilityGoals(e.target.value)}
                    placeholder="Describe your company's sustainability goals"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="certifications" className="flex items-center gap-1">
                    <Badge className="h-4 py-0 px-1 text-xs">✓</Badge> Certifications
                  </Label>
                  <Input
                    id="certifications"
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    placeholder="List sustainability certifications (comma separated)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Examples: ISO 14001, B Corp, LEED, Energy Star, Carbon Trust
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carbonFootprint" className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" /> Carbon Footprint (tCO2e/year)
                    </Label>
                    <Input
                      id="carbonFootprint"
                      value={carbonFootprint}
                      onChange={(e) => setCarbonFootprint(e.target.value)}
                      placeholder="e.g., 1000"
                      type="number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="renewableEnergy" className="flex items-center gap-1">
                      <Leaf className="h-4 w-4" /> Renewable Energy (%)
                    </Label>
                    <Input
                      id="renewableEnergy"
                      value={renewableEnergy}
                      onChange={(e) => setRenewableEnergy(e.target.value)}
                      placeholder="e.g., 50"
                      type="number"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="publicReporting">Public Sustainability Reporting</Label>
                      <p className="text-sm text-muted-foreground">Does your company publish sustainability reports?</p>
                    </div>
                    <Switch id="publicReporting" checked={publicReporting} onCheckedChange={setPublicReporting} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="scienceBasedTargets">Science-Based Targets</Label>
                      <p className="text-sm text-muted-foreground">
                        Has your company committed to science-based targets?
                      </p>
                    </div>
                    <Switch
                      id="scienceBasedTargets"
                      checked={scienceBasedTargets}
                      onCheckedChange={setScienceBasedTargets}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6 flex items-center justify-between">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

