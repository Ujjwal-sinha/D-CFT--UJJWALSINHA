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
  ],
  carbonFootprint: [
    "Based on your recent activity, your carbon footprint is trending downward. Great job!",
    "I notice you've been making eco-friendly choices. Would you like some tips to reduce your footprint further?",
    "Your current carbon footprint is below average for your region. Keep up the good work!",
  ],
  tips: [
    "Try using public transportation more often to reduce your carbon emissions.",
    "Consider switching to LED bulbs - they use 75% less energy than traditional bulbs.",
    "Reducing meat consumption by even one meal a week can significantly impact your carbon footprint.",
  ],
  rewards: [
    "You've earned 50 green tokens this week! Would you like to see available rewards?",
    "Great progress! You're close to unlocking a new sustainability achievement.",
    "Your eco-friendly actions have earned you bonus tokens. Check the rewards section!",
  ],
}

const suggestions = [
  "How can I reduce my carbon footprint?",
  "Show me my sustainability stats",
  "What rewards are available?",
  "How do green tokens work?",
  "Give me eco-friendly tips",
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
      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let response: string
      if (userMessage.toLowerCase().includes("carbon")) {
        response = getRandomResponse("carbonFootprint")
      } else if (userMessage.toLowerCase().includes("tip")) {
        response = getRandomResponse("tips")
      } else if (userMessage.toLowerCase().includes("reward")) {
        response = getRandomResponse("rewards")
      } else {
        response = getRandomResponse("greeting")
      }

      addMessage(response, "bot")
    } catch (error) {
      addMessage("I apologize, but I'm having trouble responding right now. Please try again.", "bot", "error")
    } finally {
      setIsTyping(false)
    }
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
              {isTyping && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              )}
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

