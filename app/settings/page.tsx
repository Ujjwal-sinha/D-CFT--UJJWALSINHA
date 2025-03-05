"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Globe, Lock, Smartphone, Database, Link, AlertTriangle, Save, RefreshCw, Trash2, Leaf } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [email, setEmail] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [theme, setTheme] = useState("light")
  const [language, setLanguage] = useState("en")
  const [volume, setVolume] = useState(50)
  const [fontSize, setFontSize] = useState(16)
  const [autoBackup, setAutoBackup] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [dataSharing, setDataSharing] = useState(true)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to default values.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Your account deletion request has been submitted.",
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          <TabsTrigger value="appearance">Display & Accessibility</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="it">Italiano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                  </div>
                  <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                </div>
                <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Active Sessions</Label>
                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4" />
                        <span>Current Device</span>
                      </div>
                      <Badge>Active Now</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your privacy preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect usage data to improve our service
                      </p>
                    </div>
                    <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
                  </div>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Privacy Notice</AlertTitle>
                    <AlertDescription>
                      Your data is encrypted and stored securely. We never share your personal information with third
                      parties without your consent.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Customize your viewing experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Font Size ({fontSize}px)</Label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    min={12}
                    max={24}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Volume ({volume}%)</Label>
                  <Slider value={[volume]} onValueChange={(value) => setVolume(value[0])} min={0} max={100} step={1} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>Make the application more accessible</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Contrast</Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Screen Reader Optimization</Label>
                    <p className="text-sm text-muted-foreground">Optimize content for screen readers</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage your integrated services and applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Environmental Data Service</h4>
                      <p className="text-sm text-muted-foreground">Connected since Jan 2024</p>
                    </div>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Carbon Tracking API</h4>
                      <p className="text-sm text-muted-foreground">Connected since Feb 2024</p>
                    </div>
                  </div>
                  <Button variant="outline">Manage</Button>
                </div>
                <Button className="w-full">
                  <Link className="mr-2 h-4 w-4" />
                  Connect New Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Control your data and backup settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Storage Usage</Label>
                    <span className="text-sm text-muted-foreground">65% of 1GB used</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backup</Label>
                    <p className="text-sm text-muted-foreground">Backup your data every 24 hours</p>
                  </div>
                  <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                </div>
                <div className="space-y-2">
                  <Label>Last Backup</Label>
                  <p className="text-sm text-muted-foreground">March 12, 2024 at 03:45 PM</p>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Database className="mr-2 h-4 w-4" />
                    Backup Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restore Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Download your data in different formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Export as JSON</Button>
                  <Button variant="outline">Export as CSV</Button>
                  <Button variant="outline">Export as PDF</Button>
                  <Button variant="outline">Export as XML</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

