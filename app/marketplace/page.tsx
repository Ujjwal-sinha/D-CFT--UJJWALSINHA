"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart, Search, Tag, Leaf, Zap, Recycle, TreePine, Star, Plus, Minus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  rating: number
  ecoRating: number
  image: string
  tags: string[]
}

interface CarbonCredit {
  id: string
  name: string
  description: string
  price: number
  amount: number
  location: string
  verification: string
  image: string
  remaining: number
  total: number
}

const products: Product[] = [
  {
    id: "prod-1",
    name: "Eco-Friendly Water Bottle",
    description: "Reusable stainless steel water bottle with zero plastic components",
    price: 25,
    category: "Home",
    rating: 4.5,
    ecoRating: 5,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D",
    tags: ["Plastic-Free", "Reusable", "Sustainable"],
  },
  {
    id: "prod-2",
    name: "Solar Powered Charger",
    description: "Portable solar panel charger for all your devices",
    price: 45,
    category: "Electronics",
    rating: 4.2,
    ecoRating: 4.8,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBjaGFyZ2VyfGVufDB8fDB8fHww",
    tags: ["Renewable", "Energy-Saving", "Portable"],
  },
  {
    id: "prod-3",
    name: "Bamboo Toothbrush Set",
    description: "Pack of 4 biodegradable bamboo toothbrushes",
    price: 12,
    category: "Personal Care",
    rating: 4.7,
    ecoRating: 5,
    image:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFtYm9vJTIwdG9vdGhicnVzaHxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["Biodegradable", "Plastic-Free", "Zero-Waste"],
  },
  {
    id: "prod-4",
    name: "Organic Cotton T-Shirt",
    description: "100% organic cotton t-shirt made with sustainable practices",
    price: 30,
    category: "Clothing",
    rating: 4.3,
    ecoRating: 4.5,
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    tags: ["Organic", "Fair-Trade", "Sustainable"],
  },
  {
    id: "prod-5",
    name: "Reusable Produce Bags",
    description: "Set of 5 mesh bags for grocery shopping",
    price: 15,
    category: "Home",
    rating: 4.8,
    ecoRating: 5,
    image:
      "https://images.unsplash.com/photo-1592985684811-6c0f98adb014?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjZSUyMGJhZ3N8ZW58MHx8MHx8fDA%3D",
    tags: ["Reusable", "Plastic-Free", "Zero-Waste"],
  },
  {
    id: "prod-6",
    name: "Energy Efficient LED Bulbs",
    description: "Pack of 4 long-lasting LED light bulbs",
    price: 20,
    category: "Home",
    rating: 4.6,
    ecoRating: 4.7,
    image:
      "https://images.unsplash.com/photo-1532006066969-7306f9f3552c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVkJTIwYnVsYnxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["Energy-Saving", "Long-Lasting", "Efficient"],
  },
]

const carbonCredits: CarbonCredit[] = [
  {
    id: "cc-1",
    name: "Amazon Rainforest Conservation",
    description: "Support conservation efforts in the Amazon rainforest",
    price: 15,
    amount: 1,
    location: "Brazil",
    verification: "Verified Carbon Standard",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D",
    remaining: 7500,
    total: 10000,
  },
  {
    id: "cc-2",
    name: "Wind Farm Project",
    description: "Support the development of wind farms for renewable energy",
    price: 20,
    amount: 1,
    location: "United States",
    verification: "Gold Standard",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2luZCUyMGZhcm18ZW58MHx8MHx8fDA%3D",
    remaining: 12000,
    total: 20000,
  },
  {
    id: "cc-3",
    name: "Solar Energy Project",
    description: "Fund solar panel installations in developing communities",
    price: 25,
    amount: 1,
    location: "India",
    verification: "Climate Action Reserve",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBwYW5lbHN8ZW58MHx8MHx8fDA%3D",
    remaining: 5000,
    total: 15000,
  },
  {
    id: "cc-4",
    name: "Reforestation Initiative",
    description: "Plant trees in deforested areas to restore ecosystems",
    price: 10,
    amount: 1,
    location: "Kenya",
    verification: "Plan Vivo",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJlZSUyMHBsYW50aW5nfGVufDB8fDB8fHww",
    remaining: 8000,
    total: 10000,
  },
  {
    id: "cc-5",
    name: "Ocean Cleanup Project",
    description: "Support efforts to remove plastic waste from oceans",
    price: 30,
    amount: 1,
    location: "Pacific Ocean",
    verification: "American Carbon Registry",
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2NlYW4lMjBjbGVhbnVwfGVufDB8fDB8fHww",
    remaining: 3000,
    total: 8000,
  },
]

export default function MarketplacePage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [cart, setCart] = useState<{ id: string; quantity: number; type: "product" | "credit" }[]>([])

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "eco-rating":
        return b.ecoRating - a.ecoRating
      default:
        return 0
    }
  })

  const addToCart = (id: string, type: "product" | "credit") => {
    const existingItem = cart.find((item) => item.id === id && item.type === type)

    if (existingItem) {
      setCart(
        cart.map((item) => (item.id === id && item.type === type ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setCart([...cart, { id, quantity: 1, type }])
    }

    toast({
      title: "Added to Cart",
      description: "Item has been added to your cart.",
    })
  }

  const removeFromCart = (id: string, type: "product" | "credit") => {
    const existingItem = cart.find((item) => item.id === id && item.type === type)

    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((item) => (item.id === id && item.type === type ? { ...item, quantity: item.quantity - 1 } : item)),
      )
    } else {
      setCart(cart.filter((item) => !(item.id === id && item.type === type)))
    }

    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    })
  }

  const getCartItemCount = (id: string, type: "product" | "credit") => {
    const item = cart.find((item) => item.id === id && item.type === type)
    return item ? item.quantity : 0
  }

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      if (item.type === "product") {
        const product = products.find((p) => p.id === item.id)
        return total + (product ? product.price * item.quantity : 0)
      } else {
        const credit = carbonCredits.find((c) => c.id === item.id)
        return total + (credit ? credit.price * item.quantity : 0)
      }
    }, 0)
  }

  const checkout = () => {
    toast({
      title: "Checkout Successful",
      description: `You have purchased ${getTotalCartItems()} items for $${getCartTotal()}.`,
    })
    setCart([])
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sustainability Marketplace</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          <span>Cart ({getTotalCartItems()})</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Personal Care">Personal Care</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="eco-rating">Eco Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Eco Tags</Label>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    <Leaf className="h-3 w-3 mr-1" />
                    Sustainable
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    <Recycle className="h-3 w-3 mr-1" />
                    Recycled
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                    <Zap className="h-3 w-3 mr-1" />
                    Energy-Saving
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-sm text-muted-foreground">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const product =
                      item.type === "product"
                        ? products.find((p) => p.id === item.id)
                        : carbonCredits.find((c) => c.id === item.id)

                    if (!product) return null

                    return (
                      <div key={`${item.type}-${item.id}`} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${product.price} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFromCart(item.id, item.type)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => addToCart(item.id, item.type)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span>${getCartTotal()}</span>
                  </div>
                  <Button className="w-full" onClick={checkout}>
                    Checkout
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="products" className="space-y-4">
            <TabsList>
              <TabsTrigger value="products">Eco Products</TabsTrigger>
              <TabsTrigger value="carbon-credits">Carbon Credits</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge>${product.price}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Leaf className="h-4 w-4 fill-current text-green-500" />
                          <span className="text-sm ml-1">{product.ecoRating}</span>
                        </div>
                      </div>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => addToCart(product.id, "product")}>
                        Add to Cart
                      </Button>
                      {getCartItemCount(product.id, "product") > 0 && (
                        <Badge variant="outline">{getCartItemCount(product.id, "product")} in cart</Badge>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="carbon-credits" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {carbonCredits.map((credit) => (
                  <Card key={credit.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={credit.image || "/placeholder.svg"}
                        alt={credit.name}
                        className="h-full w-full object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{credit.name}</CardTitle>
                        <Badge>${credit.price}/ton</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <TreePine className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{credit.amount} ton CO2 offset</span>
                      </div>
                      <CardDescription>{credit.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                          <span>Location:</span>
                          <span>{credit.location}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Verification:</span>
                          <span>{credit.verification}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Remaining:</span>
                          <span>
                            {credit.remaining} / {credit.total} tons
                          </span>
                        </div>
                      </div>
                      <Progress value={(credit.remaining / credit.total) * 100} />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => addToCart(credit.id, "credit")}>
                        Purchase Credit
                      </Button>
                      {getCartItemCount(credit.id, "credit") > 0 && (
                        <Badge variant="outline">{getCartItemCount(credit.id, "credit")} in cart</Badge>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

