"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Calendar, AlertTriangle, Info, Trophy, Users, Trash2, CheckCheck } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "alert" | "achievement" | "reminder" | "social" | "system"
  read: boolean
  actionable?: boolean
  action?: string
}

const notifications: Notification[] = [
  {
    id: "notif-1",
    title: "Carbon Footprint Alert",
    description: "Your carbon footprint has increased by 15% this week. Check your dashboard for details.",
    time: "10 minutes ago",
    type: "alert",
    read: false,
    actionable: true,
    action: "View Dashboard",
  },
  {
    id: "notif-2",
    title: "Achievement Unlocked",
    description: "Congratulations! You've earned the 'Green Commuter' badge for using public transport for 2 weeks.",
    time: "2 hours ago",
    type: "achievement",
    read: false,
    actionable: true,
    action: "View Badge",
  },
  {
    id: "notif-3",
    title: "Reminder: Energy Saving Challenge",
    description: "The Energy Saving Challenge starts tomorrow. Make sure you're prepared!",
    time: "5 hours ago",
    type: "reminder",
    read: true,
    actionable: true,
    action: "View Challenge",
  },
  {
    id: "notif-4",
    title: "Jane Cooper liked your post",
    description: "Jane Cooper liked your post about solar panel installation.",
    time: "1 day ago",
    type: "social",
    read: true,
  },
  {
    id: "notif-5",
    title: "New Comment on Your Post",
    description: "Alex Morgan commented on your post: 'Great job on reducing your carbon footprint!'",
    time: "1 day ago",
    type: "social",
    read: true,
    actionable: true,
    action: "View Comment",
  },
  {
    id: "notif-6",
    title: "System Update",
    description: "D-CFT has been updated with new features. Check out what's new!",
    time: "2 days ago",
    type: "system",
    read: true,
    actionable: true,
    action: "Learn More",
  },
  {
    id: "notif-7",
    title: "Weekly Carbon Report",
    description: "Your weekly carbon footprint report is now available. You've reduced your emissions by 5%!",
    time: "3 days ago",
    type: "system",
    read: true,
    actionable: true,
    action: "View Report",
  },
]

export default function NotificationsPage() {
  const { toast } = useToast()
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(notifications)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [dailyDigest, setDailyDigest] = useState(false)
  const [alertNotifications, setAlertNotifications] = useState(true)
  const [achievementNotifications, setAchievementNotifications] = useState(true)
  const [reminderNotifications, setReminderNotifications] = useState(true)
  const [socialNotifications, setSocialNotifications] = useState(true)
  const [systemNotifications, setSystemNotifications] = useState(true)

  const unreadCount = localNotifications.filter((notification) => !notification.read).length

  const markAsRead = (id: string) => {
    setLocalNotifications(
      localNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setLocalNotifications(localNotifications.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "All Notifications Marked as Read",
      description: "All notifications have been marked as read.",
    })
  }

  const deleteNotification = (id: string) => {
    setLocalNotifications(localNotifications.filter((notification) => notification.id !== id))
    toast({
      title: "Notification Deleted",
      description: "The notification has been deleted.",
    })
  }

  const clearAllNotifications = () => {
    setLocalNotifications([])
    toast({
      title: "All Notifications Cleared",
      description: "All notifications have been cleared.",
    })
  }

  const handleAction = (notification: Notification) => {
    toast({
      title: "Action Taken",
      description: `You clicked on "${notification.action}" for notification: ${notification.title}`,
    })
    markAsRead(notification.id)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Delivery Methods</h3>
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
            </div>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <input type="checkbox" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
            </div>
            <div className="flex items-center justify-between">
              <span>Daily Digest</span>
              <input type="checkbox" checked={dailyDigest} onChange={() => setDailyDigest(!dailyDigest)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
