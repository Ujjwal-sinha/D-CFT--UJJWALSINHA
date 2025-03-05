"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Preferences {
  notifications: boolean
  emailUpdates: boolean
  autoRefresh: boolean
  refreshInterval: string
  dataFormat: string
  theme: string
}

export function PreferencesDialog() {
  const { toast } = useToast()
  const [preferences, setPreferences] = useState<Preferences>({
    notifications: true,
    emailUpdates: false,
    autoRefresh: true,
    refreshInterval: "5",
    dataFormat: "metric",
    theme: "system",
  })

  const handleSave = () => {
    toast({
      title: "Preferences Updated",
      description: "Your dashboard preferences have been saved.",
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">Open preferences</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Dashboard Preferences</DialogTitle>
          <DialogDescription>
            Customize your dashboard experience. Changes will be saved automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-2">Enable Notifications</Label>
            <Switch
              checked={preferences.notifications}
              onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, notifications: checked }))}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-2">Email Updates</Label>
            <Switch
              checked={preferences.emailUpdates}
              onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, emailUpdates: checked }))}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-2">Auto Refresh</Label>
            <Switch
              checked={preferences.autoRefresh}
              onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, autoRefresh: checked }))}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-2">Refresh Interval</Label>
            <Select
              value={preferences.refreshInterval}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, refreshInterval: value }))}
              disabled={!preferences.autoRefresh}
            >
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Every minute</SelectItem>
                <SelectItem value="5">Every 5 minutes</SelectItem>
                <SelectItem value="15">Every 15 minutes</SelectItem>
                <SelectItem value="30">Every 30 minutes</SelectItem>
                <SelectItem value="60">Every hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-2">Data Format</Label>
            <Select
              value={preferences.dataFormat}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, dataFormat: value }))}
            >
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (kg, km)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs, miles)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="col-span-2">Theme</Label>
            <Select
              value={preferences.theme}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, theme: value }))}
            >
              <SelectTrigger className="col-span-2">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

