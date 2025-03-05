"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Target, ArrowRight, ArrowLeft, Check } from "lucide-react"

export function GoalWizard() {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [goalData, setGoalData] = useState({
    type: "carbon",
    target: 15,
    timeframe: "month",
    reminder: true,
    difficulty: "moderate",
    category: "overall",
  })

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    toast({
      title: "Goal Created",
      description: "Your new sustainability goal has been set. Good luck!",
    })
    setStep(1)
  }

  const updateGoalData = (key: string, value: any) => {
    setGoalData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="mr-2 h-5 w-5 text-primary" />
          Sustainability Goal Wizard
        </CardTitle>
        <CardDescription>Create personalized sustainability goals in a few steps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    step === i
                      ? "border-primary bg-primary text-primary-foreground"
                      : step > i
                        ? "border-primary bg-primary/20"
                        : "border-muted bg-muted"
                  }`}
                >
                  {step > i ? <Check className="h-5 w-5" /> : i}
                </div>
                <span className="mt-2 text-xs text-muted-foreground">
                  {i === 1 ? "Type" : i === 2 ? "Target" : i === 3 ? "Timeline" : "Review"}
                </span>
              </div>
            ))}
            <div className="absolute left-0 right-0 top-1/2 -z-10 h-0.5 bg-muted" />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">What type of goal would you like to set?</h3>
              <RadioGroup
                value={goalData.type}
                onValueChange={(value) => updateGoalData("type", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="carbon" id="carbon" />
                  <Label htmlFor="carbon" className="flex-1 cursor-pointer">
                    <div className="font-medium">Carbon Reduction</div>
                    <div className="text-sm text-muted-foreground">Reduce your overall carbon footprint</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="energy" id="energy" />
                  <Label htmlFor="energy" className="flex-1 cursor-pointer">
                    <div className="font-medium">Energy Saving</div>
                    <div className="text-sm text-muted-foreground">Lower your energy consumption</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="waste" id="waste" />
                  <Label htmlFor="waste" className="flex-1 cursor-pointer">
                    <div className="font-medium">Waste Reduction</div>
                    <div className="text-sm text-muted-foreground">
                      Minimize waste generation and increase recycling
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="water" id="water" />
                  <Label htmlFor="water" className="flex-1 cursor-pointer">
                    <div className="font-medium">Water Conservation</div>
                    <div className="text-sm text-muted-foreground">Reduce water usage and waste</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium">Which area would you like to focus on?</h3>
              <RadioGroup
                value={goalData.category}
                onValueChange={(value) => updateGoalData("category", value)}
                className="grid grid-cols-2 gap-3"
              >
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="overall" id="overall" />
                  <Label htmlFor="overall">Overall</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="transport" id="transport" />
                  <Label htmlFor="transport">Transport</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home">Home</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="food" id="food" />
                  <Label htmlFor="food">Food</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">Set your target reduction percentage</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Target: {goalData.target}% reduction</span>
                  <span className="text-sm text-muted-foreground">
                    {goalData.target < 10
                      ? "Conservative"
                      : goalData.target < 20
                        ? "Moderate"
                        : goalData.target < 30
                          ? "Ambitious"
                          : "Very Ambitious"}
                  </span>
                </div>
                <Slider
                  value={[goalData.target]}
                  min={5}
                  max={40}
                  step={1}
                  onValueChange={(value) => updateGoalData("target", value[0])}
                />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium">Choose your difficulty level</h3>
              <RadioGroup
                value={goalData.difficulty}
                onValueChange={(value) => updateGoalData("difficulty", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="easy" id="easy" />
                  <Label htmlFor="easy" className="flex-1 cursor-pointer">
                    <div className="font-medium">Easy</div>
                    <div className="text-sm text-muted-foreground">Simple changes with minimal disruption</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className="flex-1 cursor-pointer">
                    <div className="font-medium">Moderate</div>
                    <div className="text-sm text-muted-foreground">
                      Balanced approach with some lifestyle adjustments
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="challenging" id="challenging" />
                  <Label htmlFor="challenging" className="flex-1 cursor-pointer">
                    <div className="font-medium">Challenging</div>
                    <div className="text-sm text-muted-foreground">Significant changes requiring dedication</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">Set your timeframe</h3>
              <RadioGroup
                value={goalData.timeframe}
                onValueChange={(value) => updateGoalData("timeframe", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="week" id="week" />
                  <Label htmlFor="week" className="flex-1 cursor-pointer">
                    <div className="font-medium">Weekly</div>
                    <div className="text-sm text-muted-foreground">Short-term goal with quick feedback</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="month" id="month" />
                  <Label htmlFor="month" className="flex-1 cursor-pointer">
                    <div className="font-medium">Monthly</div>
                    <div className="text-sm text-muted-foreground">Medium-term goal with sustainable changes</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="quarter" id="quarter" />
                  <Label htmlFor="quarter" className="flex-1 cursor-pointer">
                    <div className="font-medium">Quarterly</div>
                    <div className="text-sm text-muted-foreground">Longer-term goal with meaningful impact</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="year" id="year" />
                  <Label htmlFor="year" className="flex-1 cursor-pointer">
                    <div className="font-medium">Yearly</div>
                    <div className="text-sm text-muted-foreground">
                      Long-term goal for significant lifestyle changes
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional options</h3>
              <div className="flex items-center space-x-2">
                <Switch
                  id="reminder"
                  checked={goalData.reminder}
                  onCheckedChange={(checked) => updateGoalData("reminder", checked)}
                />
                <Label htmlFor="reminder">Enable progress reminders</Label>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Review your goal</h3>
            <div className="rounded-lg border p-4">
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="font-medium">Goal Type:</dt>
                  <dd className="text-right">
                    {goalData.type.charAt(0).toUpperCase() + goalData.type.slice(1)} Reduction
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Category:</dt>
                  <dd className="text-right">
                    {goalData.category.charAt(0).toUpperCase() + goalData.category.slice(1)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Target:</dt>
                  <dd className="text-right">{goalData.target}% reduction</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Timeframe:</dt>
                  <dd className="text-right">
                    {goalData.timeframe.charAt(0).toUpperCase() + goalData.timeframe.slice(1)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Difficulty:</dt>
                  <dd className="text-right">
                    {goalData.difficulty.charAt(0).toUpperCase() + goalData.difficulty.slice(1)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Reminders:</dt>
                  <dd className="text-right">{goalData.reminder ? "Enabled" : "Disabled"}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-2 font-medium">What happens next?</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Your goal will be added to your dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>You'll receive personalized recommendations to help achieve your goal</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Progress will be tracked automatically based on your activity</span>
                </li>
                {goalData.reminder && (
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>You'll receive regular reminders to stay on track</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button onClick={handleNext}>
          {step < 4 ? (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Complete
              <Check className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

