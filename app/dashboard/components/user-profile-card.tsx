"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Edit,
  Share2,
  UserPlus,
  Camera,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  Leaf,
  Zap,
  Droplet,
  Trash2,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"

// Update the UserProfileCard component with enhanced features
export function UserProfileCard() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    title: "Sustainability Champion",
    company: "EcoTech Solutions",
    location: "San Francisco, CA",
    joinDate: "March 2023",
    bio: "Passionate about reducing carbon footprints and promoting sustainable practices in tech. Leading initiatives to create a more sustainable future for our planet.",
    level: 7,
    xp: 720,
    nextLevelXp: 1000,
    badges: [
      { id: 1, name: "Carbon Reducer", color: "bg-green-500" },
      { id: 2, name: "Energy Saver", color: "bg-blue-500" },
      { id: 3, name: "Community Leader", color: "bg-purple-500" },
      { id: 4, name: "Water Conservationist", color: "bg-cyan-500" },
      { id: 5, name: "Zero Waste Pioneer", color: "bg-amber-500" },
    ],
    achievements: 12,
    followers: 87,
    following: 34,
    avatarUrl: "/placeholder.svg?height=100&width=100",
    carbonSaved: 2.4,
    energySaved: 345,
    waterSaved: 1200,
    wasteDiverted: 85,
    interests: ["Renewable Energy", "Circular Economy", "Sustainable Tech", "Climate Policy"],
    skills: ["Carbon Accounting", "ESG Reporting", "Sustainability Strategy", "Green IT"],
  })

  const handleSaveProfile = (formData: FormData) => {
    const name = formData.get("name") as string
    const title = formData.get("title") as string
    const company = formData.get("company") as string
    const location = formData.get("location") as string
    const bio = formData.get("bio") as string

    setProfile({
      ...profile,
      name,
      title,
      company,
      location,
      bio,
    })

    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    })
  }

  const handleShareProfile = () => {
    // Simulate sharing functionality
    toast({
      title: "Profile Shared",
      description: "Your sustainability profile has been shared.",
    })
  }

  const handleFollowersClick = () => {
    toast({
      title: "Followers",
      description: "View all users following your sustainability journey.",
    })
  }

  const handleFollowingClick = () => {
    toast({
      title: "Following",
      description: "View all users you're following for sustainability inspiration.",
    })
  }

  const handleAvatarUpload = () => {
    toast({
      title: "Avatar Upload",
      description: "Profile picture upload functionality would open here.",
    })
  }

  const handleAddBadge = () => {
    toast({
      title: "Badge Added",
      description: "New sustainability badge has been added to your profile.",
    })
  }

  const handleAddSkill = () => {
    toast({
      title: "Skill Added",
      description: "New sustainability skill has been added to your profile.",
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500" />
      <CardHeader className="relative pt-0 -mt-16">
        <div className="flex items-end gap-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow"
              onClick={handleAvatarUpload}
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Upload avatar</span>
            </Button>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {profile.title} at {profile.company}
                </CardDescription>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </CardDescription>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {profile.joinDate}
                </CardDescription>
              </div>
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Make changes to your sustainability profile here.</DialogDescription>
                  </DialogHeader>
                  <form action={handleSaveProfile}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={profile.name} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={profile.title} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" defaultValue={profile.company} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" defaultValue={profile.location} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" defaultValue={profile.bio} rows={3} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Interests</Label>
                        <div className="flex flex-wrap gap-2">
                          {profile.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {interest}
                              <button
                                type="button"
                                className="ml-1 h-3 w-3 rounded-full"
                                onClick={() => {
                                  toast({
                                    title: "Interest Removed",
                                    description: `${interest} has been removed from your interests.`,
                                  })
                                }}
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                          <Button type="button" variant="outline" size="sm" className="h-7" onClick={handleAddSkill}>
                            <Plus className="h-3.5 w-3.5 mr-1" /> Add
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="skills">Skills & Interests</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">{profile.bio}</p>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {profile.badges.map((badge) => (
                <Badge key={badge.id} className={`${badge.color} hover:${badge.color}/90 transition-colors`}>
                  {badge.name}
                </Badge>
              ))}
              <Button variant="outline" size="sm" className="h-6 rounded-full" onClick={handleAddBadge}>
                <Plus className="h-3 w-3 mr-1" /> Add Badge
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Award className="h-4 w-4" /> Level {profile.level}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {profile.xp} / {profile.nextLevelXp} XP
                  </span>
                </div>
                <Progress value={(profile.xp / profile.nextLevelXp) * 100} className="h-2" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Leaf className="h-8 w-8 text-green-500 mb-2" />
                    <h3 className="font-medium">Carbon Saved</h3>
                    <p className="text-2xl font-bold mt-1">{profile.carbonSaved} tons</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Zap className="h-8 w-8 text-amber-500 mb-2" />
                    <h3 className="font-medium">Energy Saved</h3>
                    <p className="text-2xl font-bold mt-1">{profile.energySaved} kWh</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Droplet className="h-8 w-8 text-blue-500 mb-2" />
                    <h3 className="font-medium">Water Saved</h3>
                    <p className="text-2xl font-bold mt-1">{profile.waterSaved} gal</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Trash2 className="h-8 w-8 text-purple-500 mb-2" />
                    <h3 className="font-medium">Waste Diverted</h3>
                    <p className="text-2xl font-bold mt-1">{profile.wasteDiverted}%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Sustainability Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-background">
                    {skill}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-7" onClick={handleAddSkill}>
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Skill
                </Button>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="text-sm font-medium mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    {interest}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-7" onClick={handleAddSkill}>
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Interest
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between py-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <Button variant="ghost" className="flex flex-col" onClick={handleFollowersClick}>
            <span className="text-lg font-bold">{profile.followers}</span>
            <span className="text-xs text-muted-foreground">Followers</span>
          </Button>
          <Button variant="ghost" className="flex flex-col" onClick={handleFollowingClick}>
            <span className="text-lg font-bold">{profile.following}</span>
            <span className="text-xs text-muted-foreground">Following</span>
          </Button>
          <Button variant="ghost" className="flex flex-col">
            <span className="text-lg font-bold">{profile.achievements}</span>
            <span className="text-xs text-muted-foreground">Achievements</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleShareProfile}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Connect
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

