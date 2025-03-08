"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"

const predefinedResponses = {
  greeting: [
    "Hello! How can I help you with D-CFT today?",
    "Welcome! I'm here to assist you with your carbon footprint tracking.",
    "Hi there! Need help with sustainability tracking?",
    "Greetings! I'm your D-CFT assistant. How can I make your sustainability journey easier today?",
    "Welcome back! Ready to continue your sustainability journey?",
  ],
  carbonFootprint: [
    "Based on your recent activity, your carbon footprint is trending downward. Great job!",
    "I notice you've been making eco-friendly choices. Would you like some tips to reduce your footprint further?",
    "Your current carbon footprint is below average for your region. Keep up the good work!",
    "Your carbon footprint has decreased by 12% compared to last month. That's impressive progress!",
    "I've analyzed your data and found that your transportation choices have significantly reduced your carbon footprint.",
    "Your carbon footprint from energy usage has increased slightly. Would you like some tips to reduce it?",
  ],
  tips: [
    "Try using public transportation more often to reduce your carbon emissions.",
    "Consider switching to LED bulbs - they use 75% less energy than traditional bulbs.",
    "Reducing meat consumption by even one meal a week can significantly impact your carbon footprint.",
    "Did you know? Unplugging electronics when not in use can save up to 10% on your energy bill and reduce carbon emissions.",
    "Try a 'meatless Monday' challenge to reduce your food-related carbon footprint.",
    "Setting your thermostat just 1°C lower in winter can reduce your heating bill by up to 10%.",
    "Consider installing a smart thermostat to optimize your home's energy usage automatically.",
    "When shopping, look for products with minimal packaging to reduce waste.",
    "Washing clothes in cold water can reduce energy usage by up to 90% compared to hot water.",
  ],
  rewards: [
    "You've earned 50 green tokens this week! Would you like to see available rewards?",
    "Great progress! You're close to unlocking a new sustainability achievement.",
    "Your eco-friendly actions have earned you bonus tokens. Check the rewards section!",
    "Congratulations! You've qualified for our 'Carbon Reducer' badge. It's now displayed on your profile.",
    "You're in the top 10% of users for energy conservation this month! You've earned 100 bonus tokens.",
    "You've completed 3 sustainability challenges this week. That's worth 75 green tokens!",
    "Your consistent eco-friendly choices have put you on track for our 'Sustainability Champion' award.",
  ],
  analysis: [
    "I've analyzed your energy usage patterns and found potential savings of up to 15% by adjusting your heating schedule.",
    "Based on your transportation data, switching to public transit twice a week could reduce your carbon footprint by 20%.",
    "Your food-related emissions are 30% lower than average. Great job with your dietary choices!",
    "I notice you travel frequently. Have you considered carbon offsetting for your flights?",
    "Your weekend energy usage is significantly higher than weekdays. Would you like some tips to optimize this?",
  ],
  goals: [
    "You're 75% of the way to your goal of reducing home energy usage by 20%.",
    "Your goal to reduce car usage is on track! You've decreased driving by 15% this month.",
    "You set a goal to try plant-based meals 3 times a week. How is that going?",
    "I see you're working toward zero-waste shopping. Would you like some local store recommendations?",
    "You're making great progress on your water conservation goal. Just 5% more to reach your target!",
    "Based on your current progress, you'll reach your annual carbon reduction goal 2 months early!",
  ],
  community: [
    "Your neighborhood has collectively reduced carbon emissions by 15% this month. You're part of that success!",
    "Have you checked out the community challenges? There's a new one about reducing plastic waste.",
    "Three of your friends have joined D-CFT recently. Would you like to connect with them?",
    "Your sustainability story has inspired 12 other users! Consider sharing more of your journey.",
    "There's a local tree-planting event this weekend. Would you like details?",
    "Your company ranks in the top 20% for employee sustainability engagement. That's impressive!",
  ],
  education: [
    "Did you know? A single tree can absorb up to 48 pounds of CO2 per year.",
    "Fun fact: Electric vehicles typically have a 50% smaller carbon footprint than gas-powered cars, even accounting for battery production.",
    "Interesting insight: The fashion industry produces 10% of global carbon emissions - more than international flights and maritime shipping combined.",
    "Quick tip: Composting can divert up to 30% of household waste from landfills.",
    "Sustainability fact: Solar panels typically pay for themselves in energy savings within 6-10 years.",
    "Climate science update: The latest IPCC report indicates that limiting warming to 1.5°C is still possible with immediate action.",
  ],
  marketplace: [
    "I noticed you're interested in sustainable home products. Our marketplace has new eco-friendly cleaning supplies available.",
    "Based on your preferences, you might like the new carbon offset projects from rainforest conservation.",
    "There's a limited-time offer on energy-efficient appliances in our marketplace. Would you like to see them?",
    "Your purchase history suggests you might be interested in our new sustainable fashion collection.",
    "The carbon credits you purchased last month have helped fund a wind farm project that's now operational!",
  ],
  technical: [
    "I'm experiencing a temporary connection issue. Your data is still being tracked accurately.",
    "Your account is successfully connected to your smart home devices. I'll analyze this data to provide personalized insights.",
    "The API integration with your utility provider is complete. I can now provide more accurate energy usage analysis.",
    "Your data export is ready. You can download it from the Reports section.",
    "System update: We've enhanced our carbon calculation algorithms for even more precise footprint measurements.",
    "I've detected an unusual pattern in your energy data. It might be worth checking if all devices are functioning correctly.",
  ],
  feedback: [
    "Thanks for your feedback! We're constantly working to improve your D-CFT experience.",
    "I've recorded your suggestion and sent it to our development team.",
    "Your input helps us improve. Is there anything else you'd like to see in future updates?",
    "We appreciate your insights! Would you be interested in joining our beta testing program for new features?",
    "Thank you for reporting that issue. Our team is working on a fix that should be available in the next update.",
  ],
}

const suggestions = [
  "How can I reduce my carbon footprint?",
  "Show me my sustainability stats",
  "What rewards are available?",
  "Give me eco-friendly tips",
  "How am I doing on my goals?",
  "Tell me a sustainability fact",
  "Community initiatives near me",
  "Analyze my energy usage",
  "Marketplace recommendations",
]

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "suggestion" | "error"
  isLoading?: boolean
}

interface MessageGroup {
  date: string
  messages: Message[]
}

const groupMessagesByDate = (messages: Message[]): MessageGroup[] => {
  const groups: { [key: string]: Message[] } = {}

  messages.forEach((message) => {
    const date = message.timestamp.toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
  })

  return Object.entries(groups).map(([date, messages]) => ({
    date,
    messages,
  }))
}

const getRandomResponse = (category: keyof typeof predefinedResponses): string => {
  const responses = predefinedResponses[category]
  return responses[Math.floor(Math.random() * responses.length)]
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [])

  const addMessage = (content: string, sender: "user" | "bot", type: "text" | "suggestion" | "error" = "text") => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      sender,
      timestamp: new Date(),
      type,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    addMessage(userMessage, "user")
    setIsTyping(true)

    try {
      // Simulate AI processing time with variable delay for realism
      await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1500))

      let response: string
      const lowerCaseMessage = userMessage.toLowerCase()

      // More sophisticated message parsing
      if (
        lowerCaseMessage.includes("hello") ||
        lowerCaseMessage.includes("hi") ||
        lowerCaseMessage.includes("hey") ||
        lowerCaseMessage.includes("greet")
      ) {
        response = getRandomResponse("greeting")
      } else if (
        lowerCaseMessage.includes("carbon") ||
        lowerCaseMessage.includes("footprint") ||
        lowerCaseMessage.includes("emission")
      ) {
        response = getRandomResponse("carbonFootprint")
      } else if (
        lowerCaseMessage.includes("tip") ||
        lowerCaseMessage.includes("advice") ||
        lowerCaseMessage.includes("suggest") ||
        lowerCaseMessage.includes("how to")
      ) {
        response = getRandomResponse("tips")
      } else if (
        lowerCaseMessage.includes("reward") ||
        lowerCaseMessage.includes("token") ||
        lowerCaseMessage.includes("point") ||
        lowerCaseMessage.includes("earn")
      ) {
        response = getRandomResponse("rewards")
      } else if (
        lowerCaseMessage.includes("analyze") ||
        lowerCaseMessage.includes("analysis") ||
        lowerCaseMessage.includes("data") ||
        lowerCaseMessage.includes("pattern")
      ) {
        response = getRandomResponse("analysis")
      } else if (
        lowerCaseMessage.includes("goal") ||
        lowerCaseMessage.includes("target") ||
        lowerCaseMessage.includes("objective") ||
        lowerCaseMessage.includes("aim")
      ) {
        response = getRandomResponse("goals")
      } else if (
        lowerCaseMessage.includes("community") ||
        lowerCaseMessage.includes("neighbor") ||
        lowerCaseMessage.includes("group") ||
        lowerCaseMessage.includes("together")
      ) {
        response = getRandomResponse("community")
      } else if (
        lowerCaseMessage.includes("learn") ||
        lowerCaseMessage.includes("fact") ||
        lowerCaseMessage.includes("know") ||
        lowerCaseMessage.includes("education")
      ) {
        response = getRandomResponse("education")
      } else if (
        lowerCaseMessage.includes("market") ||
        lowerCaseMessage.includes("buy") ||
        lowerCaseMessage.includes("purchase") ||
        lowerCaseMessage.includes("product")
      ) {
        response = getRandomResponse("marketplace")
      } else if (
        lowerCaseMessage.includes("error") ||
        lowerCaseMessage.includes("issue") ||
        lowerCaseMessage.includes("problem") ||
        lowerCaseMessage.includes("bug")
      ) {
        response = getRandomResponse("technical")
      } else if (
        lowerCaseMessage.includes("feedback") ||
        lowerCaseMessage.includes("suggest") ||
        lowerCaseMessage.includes("improve") ||
        lowerCaseMessage.includes("better")
      ) {
        response = getRandomResponse("feedback")
      } else if (
        lowerCaseMessage.includes("stat") ||
        lowerCaseMessage.includes("progress") ||
        lowerCaseMessage.includes("dashboard")
      ) {
        // Combine responses for a more detailed answer
        response = `${getRandomResponse("carbonFootprint")} ${getRandomResponse("goals")}`
      } else {
        // If no specific category is matched, provide a helpful general response
        const generalResponses = [
          "I'm here to help with all your sustainability needs. Could you tell me more about what you're looking for?",
          "I'd love to assist you with that. Could you provide a bit more detail so I can give you the best information?",
          "That's an interesting question. I can help with carbon tracking, sustainability tips, rewards, community initiatives, and more. What area are you most interested in?",
          "I'm your D-CFT assistant, ready to help with sustainability tracking and eco-friendly recommendations. How can I assist you today?",
          "I'm processing your request. In the meantime, did you know you can ask me about your carbon footprint, sustainability tips, or community initiatives?",
        ]
        response = generalResponses[Math.floor(Math.random() * generalResponses.length)]
      }

      // Add a small delay before showing the response to simulate typing
      setTimeout(() => {
        addMessage(response, "bot")
        setIsTyping(false)

        // Sometimes offer a follow-up suggestion
        if (Math.random() > 0.7) {
          setTimeout(() => {
            const followUps = [
              "Would you like to know more about this topic?",
              "Is there anything specific about this you'd like to explore further?",
              "I can provide more detailed information if you're interested.",
              "Would you like some related tips or insights?",
              "Is there anything else you'd like to know about your sustainability journey?",
            ]
            const followUp = followUps[Math.floor(Math.random() * followUps.length)]
            addMessage(followUp, "bot", "suggestion")
          }, 1000)
        }
      }, 500)
    } catch (error) {
      addMessage("I apologize, but I'm having trouble responding right now. Please try again.", "bot", "error")
      setIsTyping(false)
    }
  }

  const renderTypingIndicator = () => {
    return (
      <div className="flex items-center space-x-2 text-muted-foreground p-2 bg-secondary rounded-lg max-w-[80%]">
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></span>
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></span>
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "600ms" }}></span>
      </div>
    )
  }

  return (
    <>
      <Button className="fixed bottom-4 right-4 rounded-full p-4" onClick={() => setIsOpen(true)}>
        <MessageCircle className="h-6 w-6" />
      </Button>
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>AI Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
              {groupMessagesByDate(messages).map((group) => (
                <div key={group.date} className="mb-4">
                  <div className="text-xs text-muted-foreground text-center mb-2">{group.date}</div>
                  {group.messages.map((message) => (
                    <div key={message.id} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                      <span
                        className={cn(
                          "inline-block p-2 rounded-lg",
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground",
                          message.type === "error" && "bg-destructive text-destructive-foreground",
                          message.type === "suggestion" && "bg-muted text-muted-foreground",
                        )}
                      >
                        {message.content}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
              {isTyping && <div className="mb-4 text-left">{renderTypingIndicator()}</div>}
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t">
            <div className="mb-2 flex gap-2 overflow-x-auto">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => {
                    setInput(suggestion)
                    handleSendMessage()
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" size="icon" disabled={isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  )
}

