"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Zap, TreePine, Car, ShoppingBag, ArrowRight, Loader2 } from "lucide-react"
import { useState } from "react"

interface QuickAction {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  action: () => Promise<void>
}

export function QuickActions() {
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)

  const quickActions: QuickAction[] = [
    {
      id: "energy",
      title: "Optimize Energy",
      description: "Run smart energy optimization",
      icon: Zap,
      action: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        toast({
          title: "Energy Optimization Complete",
          description: "Your energy usage has been optimized for efficiency.",
        })
      },
    },
    {
      id: "offset",
      title: "Carbon Offset",
      description: "Purchase carbon offset credits",
      icon: TreePine,
      action: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        toast({
          title: "Carbon Offset Purchased",
          description: "Successfully purchased 1 ton of carbon offset credits.",
        })
      },
    },
    {
      id: "transport",
      title: "Transport Analysis",
      description: "Analyze transport emissions",
      icon: Car,
      action: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        toast({
          title: "Transport Analysis Complete",
          description: "Your transport emissions report is ready to view.",
        })
      },
    },
    {
      id: "supply",
      title: "Supply Chain",
      description: "Review supply chain impact",
      icon: ShoppingBag,
      action: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        toast({
          title: "Supply Chain Review Complete",
          description: "Your supply chain environmental impact report is ready.",
        })
      },
    },
  ]

  const handleAction = async (action: QuickAction) => {
    try {
      setLoading(action.id)
      await action.action()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete the action. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common sustainability actions you can take right now</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto flex items-center justify-start space-x-4 p-4"
              onClick={() => handleAction(action)}
              disabled={loading !== null}
            >
              <action.icon className="h-5 w-5 shrink-0" />
              <div className="flex-1 text-left">
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              {loading === action.id ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="h-5 w-5" />
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

