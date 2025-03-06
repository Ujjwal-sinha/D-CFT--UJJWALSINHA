"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { Check, X, Leaf, Zap, TreePine, Building2, Globe, Award, HelpCircle, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface PlanFeature {
  name: string
  free: boolean
  basic: boolean
  professional: boolean
  enterprise: boolean
  icon?: React.ReactNode
  tooltip?: string
}

export default function PremiumPlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly")
  const { toast } = useToast()
  const router = useRouter()

  const handleUpgrade = (plan: string) => {
    toast({
      title: "Upgrading Plan",
      description: `You're being redirected to upgrade to the ${plan} plan.`,
    })
    // In a real app, this would redirect to a checkout page
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  const features: PlanFeature[] = [
    {
      name: "Carbon Footprint Tracking",
      free: true,
      basic: true,
      professional: true,
      enterprise: true,
      icon: <Leaf className="h-4 w-4 text-green-500" />,
    },
    {
      name: "Basic Analytics",
      free: true,
      basic: true,
      professional: true,
      enterprise: true,
    },
    {
      name: "AI Recommendations",
      free: false,
      basic: true,
      professional: true,
      enterprise: true,
      icon: <Zap className="h-4 w-4 text-amber-500" />,
    },
    {
      name: "Carbon Offset Projects",
      free: false,
      basic: true,
      professional: true,
      enterprise: true,
      icon: <TreePine className="h-4 w-4 text-green-700" />,
    },
    {
      name: "Team Collaboration",
      free: false,
      basic: false,
      professional: true,
      enterprise: true,
      icon: <Building2 className="h-4 w-4 text-blue-500" />,
    },
    {
      name: "Advanced Analytics",
      free: false,
      basic: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "API Access",
      free: false,
      basic: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Custom Reporting",
      free: false,
      basic: false,
      professional: true,
      enterprise: true,
    },
    {
      name: "Dedicated Account Manager",
      free: false,
      basic: false,
      professional: false,
      enterprise: true,
    },
    {
      name: "Enterprise Integrations",
      free: false,
      basic: false,
      professional: false,
      enterprise: true,
      icon: <Globe className="h-4 w-4 text-indigo-500" />,
    },
    {
      name: "Regulatory Compliance",
      free: false,
      basic: false,
      professional: false,
      enterprise: true,
      icon: <Award className="h-4 w-4 text-purple-500" />,
    },
    {
      name: "Custom Sustainability Goals",
      free: false,
      basic: false,
      professional: false,
      enterprise: true,
    },
  ]

  const getPrice = (base: number) => {
    return billingCycle === "annually" ? base * 10 : base
  }

  const getSavingsText = (base: number) => {
    const monthly = base * 12
    const annually = base * 10
    const savings = monthly - annually
    const percentage = Math.round((savings / monthly) * 100)
    return `Save $${savings}/year (${percentage}%)`
  }

  return (
    <div className="container mx-auto py-12 px-4 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Sustainable Pricing Plans</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan to accelerate your sustainability journey and reduce your carbon footprint.
        </p>
      </div>

      <div className="flex justify-center items-center space-x-2 pb-8">
        <Label
          htmlFor="billing-toggle"
          className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}
        >
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={billingCycle === "annually"}
          onCheckedChange={(checked) => setBillingCycle(checked ? "annually" : "monthly")}
        />
        <div className="flex items-center">
          <Label
            htmlFor="billing-toggle"
            className={billingCycle === "annually" ? "font-medium" : "text-muted-foreground"}
          >
            Annually
          </Label>
          {billingCycle === "annually" && (
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
              <Sparkles className="h-3 w-3 mr-1 text-green-500" />
              Save 16%
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Free Plan */}
        <Card className="flex flex-col border-muted">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Get started with basic carbon tracking</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground ml-1">forever</span>
            </div>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {feature.free ? (
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                  )}
                  <span className={!feature.free ? "text-muted-foreground" : ""}>
                    {feature.name}
                    {feature.icon && <span className="ml-2 inline-block">{feature.icon}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleUpgrade("Free")}>
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Basic Plan */}
        <Card className="flex flex-col border-primary/20">
          <CardHeader>
            <CardTitle>Basic</CardTitle>
            <CardDescription>Perfect for individual sustainability enthusiasts</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4">
              <span className="text-3xl font-bold">${getPrice(9)}</span>
              <span className="text-muted-foreground ml-1">/{billingCycle === "monthly" ? "month" : "year"}</span>
              {billingCycle === "annually" && (
                <div className="mt-1">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {getSavingsText(9)}
                  </Badge>
                </div>
              )}
            </div>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {feature.basic ? (
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                  )}
                  <span className={!feature.basic ? "text-muted-foreground" : ""}>
                    {feature.name}
                    {feature.icon && <span className="ml-2 inline-block">{feature.icon}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleUpgrade("Basic")}>
              Upgrade to Basic
            </Button>
          </CardFooter>
        </Card>

        {/* Professional Plan */}
        <Card className="flex flex-col relative border-primary shadow-md">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
            <Badge className="bg-primary text-primary-foreground">Popular</Badge>
          </div>
          <CardHeader>
            <CardTitle>Professional</CardTitle>
            <CardDescription>Ideal for small businesses and teams</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4">
              <span className="text-3xl font-bold">${getPrice(29)}</span>
              <span className="text-muted-foreground ml-1">/{billingCycle === "monthly" ? "month" : "year"}</span>
              {billingCycle === "annually" && (
                <div className="mt-1">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {getSavingsText(29)}
                  </Badge>
                </div>
              )}
            </div>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {feature.professional ? (
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                  )}
                  <span className={!feature.professional ? "text-muted-foreground" : ""}>
                    {feature.name}
                    {feature.icon && <span className="ml-2 inline-block">{feature.icon}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => handleUpgrade("Professional")}>
              Upgrade to Professional
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col border-primary/20">
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>Advanced solutions for large organizations</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4">
              <span className="text-3xl font-bold">${getPrice(99)}</span>
              <span className="text-muted-foreground ml-1">/{billingCycle === "monthly" ? "month" : "year"}</span>
              {billingCycle === "annually" && (
                <div className="mt-1">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {getSavingsText(99)}
                  </Badge>
                </div>
              )}
            </div>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {feature.enterprise ? (
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                  )}
                  <span className={!feature.enterprise ? "text-muted-foreground" : ""}>
                    {feature.name}
                    {feature.icon && <span className="ml-2 inline-block">{feature.icon}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleUpgrade("Enterprise")}>
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="features" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Feature Comparison</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Feature Comparison</CardTitle>
              <CardDescription>Compare all features across our pricing plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-2">Feature</th>
                      <th className="text-center py-4 px-2">Free</th>
                      <th className="text-center py-4 px-2">Basic</th>
                      <th className="text-center py-4 px-2">Professional</th>
                      <th className="text-center py-4 px-2">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-2 flex items-center">
                          {feature.name}
                          {feature.icon && <span className="ml-2">{feature.icon}</span>}
                        </td>
                        <td className="text-center py-3 px-2">
                          {feature.free ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          {feature.basic ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          {feature.professional ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                        <td className="text-center py-3 px-2">
                          {feature.enterprise ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about our pricing plans</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Can I switch between plans?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new features will be
                    available immediately. If you downgrade, the changes will take effect at the end of your current
                    billing cycle.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does the annual billing work?</AccordionTrigger>
                  <AccordionContent>
                    With annual billing, you pay for 10 months and get 2 months free, resulting in a 16% discount
                    compared to monthly billing. You'll be charged once per year, and your subscription will
                    automatically renew unless canceled.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers
                    for Enterprise plans. We also support cryptocurrency payments for those interested in further
                    reducing their carbon footprint.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is there a free trial for paid plans?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer a 14-day free trial for our Basic and Professional plans. No credit card is required
                    to start your trial. For Enterprise plans, please contact our sales team for a personalized demo and
                    trial period.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Do you offer discounts for non-profits?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer special pricing for non-profit organizations, educational institutions, and
                    sustainability-focused startups. Please contact our support team with verification of your status to
                    apply for these discounts.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="testimonials" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Testimonials</CardTitle>
              <CardDescription>See what our customers are saying about D-CFT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">GreenTech Solutions</h4>
                        <p className="text-sm text-muted-foreground">Professional Plan</p>
                      </div>
                    </div>
                    <p className="italic">
                      "D-CFT has transformed how we track and reduce our carbon footprint. The Professional plan gives
                      us all the tools we need to collaborate as a team and make meaningful sustainability
                      improvements."
                    </p>
                    <div className="flex mt-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Globe className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">EcoFriendly Corp</h4>
                        <p className="text-sm text-muted-foreground">Enterprise Plan</p>
                      </div>
                    </div>
                    <p className="italic">
                      "As a large organization with complex sustainability needs, the Enterprise plan has been
                      invaluable. The dedicated account manager and regulatory compliance features have saved us
                      countless hours."
                    </p>
                    <div className="flex mt-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Leaf className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Sarah J.</h4>
                        <p className="text-sm text-muted-foreground">Basic Plan</p>
                      </div>
                    </div>
                    <p className="italic">
                      "The Basic plan is perfect for my needs. I can track my personal carbon footprint and get AI
                      recommendations that have helped me reduce my environmental impact by over 30% in just six
                      months."
                    </p>
                    <div className="flex mt-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <TreePine className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Green Earth Initiative</h4>
                        <p className="text-sm text-muted-foreground">Professional Plan</p>
                      </div>
                    </div>
                    <p className="italic">
                      "We've been able to engage our entire team in sustainability efforts thanks to D-CFT. The
                      collaboration features and advanced analytics have made a huge difference in how we approach
                      carbon reduction."
                    </p>
                    <div className="flex mt-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-primary/5 rounded-lg p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
        <p className="mb-6">
          Contact our sustainability experts to create a tailored plan that meets your organization's specific needs.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Separator />

      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">Still have questions?</h2>
        <p className="text-muted-foreground">
          Our sustainability experts are here to help you choose the right plan for your needs.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button variant="outline">
            <HelpCircle className="mr-2 h-4 w-4" />
            View Documentation
          </Button>
          <Button variant="outline">Contact Support</Button>
        </div>
      </div>
    </div>
  )
}

function Star(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

