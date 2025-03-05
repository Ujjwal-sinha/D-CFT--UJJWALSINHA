"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Users,
  Trophy,
  Calendar,
  Globe,
  Search,
  Plus,
  UserPlus,
  Clock,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    badge?: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  timestamp: string
  tags: string[]
  liked?: boolean
}

interface Challenge {
  id: string
  title: string
  description: string
  participants: number
  deadline: string
  reward: string
  progress: number
  category: string
  image?: string
}

interface Group {
  id: string
  name: string
  description: string
  members: number
  category: string
  image?: string
  joined?: boolean
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  attendees: number
  category: string
  image?: string
  attending?: boolean
}

const posts: Post[] = [
  {
    id: "post-1",
    author: {
      name: "Jane Cooper",
      avatar: "https://i.pravatar.cc/150?img=1",
      badge: "Carbon Champion",
    },
    content:
      "Just installed solar panels on my roof! Excited to reduce my carbon footprint by an estimated 4 tons of CO2 per year. Has anyone else made the switch to solar? Any tips for maximizing efficiency?",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBwYW5lbHN8ZW58MHx8MHx8fDA%3D",
    likes: 42,
    comments: 15,
    shares: 7,
    timestamp: "2 hours ago",
    tags: ["SolarEnergy", "RenewablePower", "SustainableLiving"],
  },
  {
    id: "post-2",
    author: {
      name: "Alex Morgan",
      avatar: "https://i.pravatar.cc/150?img=2",
      badge: "Eco Warrior",
    },
    content:
      "Our community garden project is thriving! We've grown over 500 lbs of organic produce this season, all while sequestering carbon and creating a beautiful green space in our neighborhood.",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyZGVufGVufDB8fDB8fHww",
    likes: 78,
    comments: 23,
    shares: 12,
    timestamp: "5 hours ago",
    tags: ["CommunityGarden", "OrganicFood", "UrbanGreening"],
  },
  {
    id: "post-3",
    author: {
      name: "Robert Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    content:
      "Just completed my first month of bike commuting instead of driving! Saved 120 kg of CO2 emissions and feeling healthier than ever. Small changes really do add up!",
    likes: 56,
    comments: 8,
    shares: 3,
    timestamp: "1 day ago",
    tags: ["BikeCommuting", "SustainableTransport", "HealthyLiving"],
  },
]

const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Zero Waste Month",
    description: "Eliminate single-use plastics and reduce your waste for 30 days",
    participants: 1245,
    deadline: "Ends in 15 days",
    reward: "500 Green Tokens",
    progress: 65,
    category: "Waste Reduction",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8emVybyUyMHdhc3RlfGVufDB8fDB8fHww",
  },
  {
    id: "challenge-2",
    title: "Plant-Based Week",
    description: "Try eating plant-based meals for one week to reduce your carbon footprint",
    participants: 876,
    deadline: "Ends in 5 days",
    reward: "300 Green Tokens",
    progress: 80,
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "challenge-3",
    title: "Energy Saving Challenge",
    description: "Reduce your home energy consumption by 20% for one month",
    participants: 543,
    deadline: "Starts in 3 days",
    reward: "400 Green Tokens",
    progress: 0,
    category: "Energy",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW5lcmd5JTIwc2F2aW5nfGVufDB8fDB8fHww",
  },
]

const groups: Group[] = [
  {
    id: "group-1",
    name: "Urban Gardeners",
    description: "A community of city dwellers growing food and greening urban spaces",
    members: 1876,
    category: "Gardening",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyZGVufGVufDB8fDB8fHww",
  },
  {
    id: "group-2",
    name: "Renewable Energy Advocates",
    description: "Discussing and promoting renewable energy solutions for homes and communities",
    members: 2543,
    category: "Energy",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBwYW5lbHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "group-3",
    name: "Zero Waste Living",
    description: "Tips, tricks, and support for reducing waste in everyday life",
    members: 3210,
    category: "Waste Reduction",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8emVybyUyMHdhc3RlfGVufDB8fDB8fHww",
  },
]

const events: Event[] = [
  {
    id: "event-1",
    title: "Community Tree Planting",
    description: "Join us to plant 100 trees in the city park to increase urban green cover",
    date: "June 15, 2024",
    location: "Central City Park",
    attendees: 87,
    category: "Conservation",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJlZSUyMHBsYW50aW5nfGVufDB8fDB8fHww",
  },
  {
    id: "event-2",
    title: "Sustainable Living Workshop",
    description: "Learn practical tips for reducing your carbon footprint at home",
    date: "June 22, 2024",
    location: "Community Center",
    attendees: 45,
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3Nob3B8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "event-3",
    title: "Beach Cleanup Day",
    description: "Help clean plastic and debris from our local beaches",
    date: "July 8, 2024",
    location: "Sunset Beach",
    attendees: 124,
    category: "Cleanup",
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhY2glMjBjbGVhbnVwfGVufDB8fDB8fHww",
  },
]

export default function CommunityPage() {
  const { toast } = useToast()
  const [postContent, setPostContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [localPosts, setLocalPosts] = useState<Post[]>(posts)
  const [localChallenges, setLocalChallenges] = useState<Challenge[]>(challenges)
  const [localGroups, setLocalGroups] = useState<Group[]>(groups)
  const [localEvents, setLocalEvents] = useState<Event[]>(events)

  const handleCreatePost = () => {
    if (!postContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post",
        variant: "destructive",
      })
      return
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: "You",
        avatar: "https://i.pravatar.cc/150?img=5",
        badge: "Carbon Tracker",
      },
      content: postContent,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: "Just now",
      tags: [],
    }

    setLocalPosts([newPost, ...localPosts])
    setPostContent("")
    toast({
      title: "Post Created",
      description: "Your post has been published to the community",
    })
  }

  const handleLikePost = (postId: string) => {
    setLocalPosts(
      localPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          }
        }
        return post
      }),
    )
  }

  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "Challenge Joined",
      description: "You have successfully joined this challenge",
    })
  }

  const handleJoinGroup = (groupId: string) => {
    setLocalGroups(
      localGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.joined ? group.members - 1 : group.members + 1,
            joined: !group.joined,
          }
        }
        return group
      }),
    )
  }

  const handleAttendEvent = (eventId: string) => {
    setLocalEvents(
      localEvents.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            attendees: event.attending ? event.attendees - 1 : event.attendees + 1,
            attending: !event.attending,
          }
        }
        return event
      }),
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Sustainability Community</h1>

      <Card>
        <CardHeader>
          <CardTitle>Share with the Community</CardTitle>
          <CardDescription>Share your sustainability journey, ask questions, or post updates</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind about sustainability?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Add Photo
            </Button>
            <Button variant="outline" size="sm">
              Add Tag
            </Button>
          </div>
          <Button onClick={handleCreatePost}>Post</Button>
        </CardFooter>
      </Card>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Community Feed</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {localPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <CardTitle className="text-base">{post.author.name}</CardTitle>
                          {post.author.badge && (
                            <Badge variant="outline" className="ml-2">
                              {post.author.badge}
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{post.timestamp}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{post.content}</p>
                    {post.image && (
                      <div className="rounded-md overflow-hidden">
                        <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-auto" />
                      </div>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={post.liked ? "text-primary" : ""}
                        onClick={() => handleLikePost(post.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        {post.shares}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <Tabs defaultValue="challenges" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            <TabsContent value="challenges" className="space-y-4 mt-4">
              {localChallenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{challenge.title}</CardTitle>
                      <Badge>{challenge.category}</Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  {challenge.image && (
                    <div className="px-6">
                      <div className="rounded-md overflow-hidden">
                        <img
                          src={challenge.image || "/placeholder.svg"}
                          alt={challenge.title}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <CardContent className="pt-2 pb-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{challenge.deadline}</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} />
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                        <span className="text-sm">{challenge.reward}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => handleJoinChallenge(challenge.id)}>
                      Join Challenge
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Challenge
              </Button>
            </TabsContent>
            <TabsContent value="groups" className="space-y-4 mt-4">
              {localGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{group.name}</CardTitle>
                      <Badge>{group.category}</Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  {group.image && (
                    <div className="px-6">
                      <div className="rounded-md overflow-hidden">
                        <img
                          src={group.image || "/placeholder.svg"}
                          alt={group.name}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <CardContent className="pt-2 pb-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{group.members} members</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={group.joined ? "outline" : "default"}
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      {group.joined ? "Leave Group" : "Join Group"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </TabsContent>
            <TabsContent value="events" className="space-y-4 mt-4">
              {localEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      <Badge>{event.category}</Badge>
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  {event.image && (
                    <div className="px-6">
                      <div className="rounded-md overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <CardContent className="pt-2 pb-2">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.attendees} attending</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={event.attending ? "outline" : "default"}
                      onClick={() => handleAttendEvent(event.id)}
                    >
                      {event.attending ? "Cancel Attendance" : "Attend Event"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top contributors in the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      1
                    </div>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/150?img=1" />
                        <AvatarFallback>JC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Jane Cooper</p>
                        <p className="text-xs text-muted-foreground">5.2 tons CO2 saved</p>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500">Gold</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">2</div>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/150?img=2" />
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Alex Morgan</p>
                        <p className="text-xs text-muted-foreground">4.8 tons CO2 saved</p>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-gray-400">Silver</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">3</div>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                        <AvatarFallback>RC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Robert Chen</p>
                        <p className="text-xs text-muted-foreground">4.3 tons CO2 saved</p>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-amber-700">Bronze</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggested Connections</CardTitle>
              <CardDescription>People with similar sustainability interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=4" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Sarah Miller</p>
                      <p className="text-xs text-muted-foreground">Renewable Energy Enthusiast</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">James Lee</p>
                      <p className="text-xs text-muted-foreground">Zero Waste Advocate</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=6" />
                      <AvatarFallback>EP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Elena Patel</p>
                      <p className="text-xs text-muted-foreground">Sustainable Transport Expert</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

