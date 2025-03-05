"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, FileCheck, AlertTriangle, CheckCircle } from "lucide-react"

export default function ImpactAssessment() {
  const [loading, setLoading] = useState(false)
  const [assessmentProgress, setAssessmentProgress] = useState(0)
  const { toast } = useToast()

  const handleSubmitAssessment = () => {
    setLoading(true)
    // Simulate assessment progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setAssessmentProgress(progress)
      if (progress === 100) {
        clearInterval(interval)
        setLoading(false)
        toast({
          title: "Assessment Complete",
          description: "Your environmental impact assessment has been generated.",
        })
      }
    }, 500)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Environmental Impact Assessment</h1>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Enter the details of your project for assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter project name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-type">Project Type</Label>
                <Select>
                  <SelectTrigger id="project-type">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea
                id="project-description"
                placeholder="Describe your project and its potential environmental impact"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Project Location</Label>
                <Input id="location" placeholder="Enter project location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Project Duration</Label>
                <Input id="duration" placeholder="Enter project duration" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Environmental Factors</CardTitle>
            <CardDescription>Assess potential environmental impacts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Air Quality Impact</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Impact</SelectItem>
                    <SelectItem value="medium">Medium Impact</SelectItem>
                    <SelectItem value="high">High Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Water Resources Impact</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Impact</SelectItem>
                    <SelectItem value="medium">Medium Impact</SelectItem>
                    <SelectItem value="high">High Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Biodiversity Impact</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select impact level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Impact</SelectItem>
                    <SelectItem value="medium">Medium Impact</SelectItem>
                    <SelectItem value="high">High Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mitigation Measures</CardTitle>
            <CardDescription>Describe measures to minimize environmental impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="air-measures">Air Quality Measures</Label>
                <Textarea id="air-measures" placeholder="Describe measures to minimize air quality impact" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="water-measures">Water Protection Measures</Label>
                <Textarea id="water-measures" placeholder="Describe measures to protect water resources" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="biodiversity-measures">Biodiversity Protection</Label>
                <Textarea id="biodiversity-measures" placeholder="Describe measures to protect biodiversity" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Progress</CardTitle>
          <CardDescription>Track the progress of your impact assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={assessmentProgress} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Data Collection</span>
              <span>Analysis</span>
              <span>Report Generation</span>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSubmitAssessment} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FileCheck className="mr-2 h-4 w-4" />
                    Generate Assessment
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Project meets environmental regulations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Required Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">3 actions needed for full compliance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCheck className="mr-2 h-5 w-5 text-blue-500" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">All required documents submitted</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

