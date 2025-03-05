"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Check, X } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  timestamp: Date
  type: "alert" | "warning" | "success" | "info"
  read: boolean
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "High Energy Usage Detected",
      description: "Your energy consumption is 20% above normal levels.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "warning",
      read: false,
    },
    {
      id: "2",
      title: "Carbon Offset Goal Achieved",
      description: "Congratulations! You've reached your monthly offset target.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      type: "success",
      read: false,
    },
    {
      id: "3",
      title: "New Sustainability Report",
      description: "Your weekly sustainability report is now available.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: "info",
      read: false,
    },
    {
      id: "4",
      title: "Critical: Emissions Threshold",
      description: "Your emissions have exceeded the daily threshold.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      type: "alert",
      read: false,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds} seconds ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minutes ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hours ago`
    return `${Math.floor(hours / 24)} days ago`
  }

  const getBadgeVariant = (type: Notification["type"]) => {
    switch (type) {
      case "alert":
        return "destructive"
      case "warning":
        return "default"
      case "success":
        return "secondary"
      case "info":
        return "outline"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay updated on your sustainability metrics</CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No new notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 rounded-lg border p-4 ${
                    notification.read ? "bg-muted/50" : "bg-background"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <Badge variant={getBadgeVariant(notification.type)}>{notification.type}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{getTimeAgo(notification.timestamp)}</p>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <Button variant="ghost" size="icon" onClick={() => markAsRead(notification.id)}>
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

