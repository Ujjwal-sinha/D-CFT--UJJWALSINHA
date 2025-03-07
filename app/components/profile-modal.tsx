"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Globe,
  Languages,
  Calendar,
  Shield,
  Bell,
  Leaf,
  Trash2,
  Save,
  X,
  Plus,
  Loader2,
} from "lucide-react"
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

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [name, setName] = useState("Alex Johnson")
  const [email, setEmail] = useState("alex.johnson@example.com")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [bio, setBio] = useState(
    "Passionate about reducing carbon footprints and promoting sustainable practices in tech. Leading initiatives to create a more sustainable future for our planet.",
  )
  const [title, setTitle] = useState("Sustainability Champion")
  const [company, setCompany] = useState("EcoTech Solutions")
  const [location, setLocation] = useState("San Francisco, CA")
  const [website, setWebsite] = useState("https://alexjohnson.eco")
  const [languages, setLanguages] = useState("English, Spanish")
  const [joinDate, setJoinDate] = useState("2023-03-15")
  const [photo, setPhoto] = useState<string | null>("/placeholder.svg?height=100&width=100")
  const [isPublic, setIsPublic] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [sustainabilityInterests, setSustainabilityInterests] = useState([
    "Renewable Energy",
    "Circular Economy",
    "Sustainable Tech",
    "Climate Policy",
  ])
  const [newInterest, setNewInterest] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddInterest = () => {
    if (newInterest.trim() && !sustainabilityInterests.includes(newInterest.trim())) {
      setSustainabilityInterests([...sustainabilityInterests, newInterest.trim()])
      setNewInterest("")
      toast({
        title: "Interest Added",
        description: `${newInterest.trim()} has been added to your interests.`,
      })
    }
  }

  const handleRemoveInterest = (interest: string) => {
    setSustainabilityInterests(sustainabilityInterests.filter((i) => i !== interest))
    toast({
      title: "Interest Removed",
      description: `${interest} has been removed from your interests.`,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Updating profile:", {
        name,
        email,
        phone,
        bio,
        title,
        company,
        location,
        website,
        languages,
        joinDate,
        photo,
        isPublic,
        emailNotifications,
        pushNotifications,
        sustainabilityInterests,
      })

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
      setIsSubmitting(false)
      onClose()
    }, 1000)
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Your account deletion request has been submitted. You will receive a confirmation email.",
      variant: "destructive",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and preferences. Your profile helps us personalize your sustainability
            journey.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="w-full" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="personal" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="professional" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Professional</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-1">
                <Leaf className="h-4 w-4" />
                <span className="hidden sm:inline">Sustainability</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="flex flex-col items-center gap-4 mb-6">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                  <AvatarImage src={photo || undefined} alt="Profile picture" />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-4 h-4" />
                  Change Photo
                </Button>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-1">
                    <User className="h-4 w-4" /> Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio" className="flex items-center gap-1">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself and your sustainability journey"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Your bio will be visible to other users and helps build connections with like-minded sustainability
                    advocates.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="professional" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" /> Job Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Your professional title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" /> Company
                  </Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your organization"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-1">
                    <Globe className="h-4 w-4" /> Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages" className="flex items-center gap-1">
                    <Languages className="h-4 w-4" /> Languages
                  </Label>
                  <Input
                    id="languages"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    placeholder="Languages you speak"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joinDate" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Join Date
                  </Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Join date cannot be modified</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-profile" className="flex items-center gap-1">
                      <Shield className="h-4 w-4" /> Public Profile
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Make your sustainability achievements visible to others
                    </p>
                  </div>
                  <Switch id="public-profile" checked={isPublic} onCheckedChange={setIsPublic} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="flex items-center gap-1">
                      <Mail className="h-4 w-4" /> Email Notifications
                    </Label>
                    <p className="text-xs text-muted-foreground">Receive updates about your sustainability goals</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications" className="flex items-center gap-1">
                      <Bell className="h-4 w-4" /> Push Notifications
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Get real-time alerts about sustainability challenges
                    </p>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <Leaf className="h-4 w-4" /> Sustainability Interests
                  </Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {sustainabilityInterests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {interest}
                        <button
                          type="button"
                          className="ml-1 h-3 w-3 rounded-full"
                          onClick={() => handleRemoveInterest(interest)}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add a new interest"
                      className="flex-1"
                    />
                    <Button type="button" size="sm" onClick={handleAddInterest} disabled={!newInterest.trim()}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your interests help us recommend relevant sustainability content and connect you with like-minded
                    individuals.
                  </p>
                </div>

                <Separator />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" type="button" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Account
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
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6 gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

