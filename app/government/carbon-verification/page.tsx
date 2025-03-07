"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import {
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  Filter,
  RefreshCw,
  Upload,
  Download,
  Eye,
  Clock,
  Calendar,
} from "lucide-react"

interface CarbonCredit {
  id: string
  projectName: string
  amount: number
  status: "Verified" | "Pending" | "Rejected"
  issueDate: string
  expiryDate: string
  verifier: string
  documents: string[]
  lastVerified: string
  methodology: string
}

const carbonCredits: CarbonCredit[] = [
  {
    id: "CC-2024-001",
    projectName: "Amazon Reforestation Project",
    amount: 1000,
    status: "Verified",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15",
    verifier: "Global Carbon Council",
    documents: ["verification_report.pdf", "methodology_documentation.pdf"],
    lastVerified: "2024-02-01",
    methodology: "VCS VM0007",
  },
  {
    id: "CC-2024-002",
    projectName: "Solar Farm Initiative",
    amount: 750,
    status: "Pending",
    issueDate: "2024-02-01",
    expiryDate: "2025-02-01",
    verifier: "Gold Standard",
    documents: ["project_documentation.pdf"],
    lastVerified: "2024-02-15",
    methodology: "GS RE",
  },
  {
    id: "CC-2024-003",
    projectName: "Wind Energy Project",
    amount: 500,
    status: "Rejected",
    issueDate: "2024-01-01",
    expiryDate: "2025-01-01",
    verifier: "Verra",
    documents: ["audit_report.pdf", "rejection_notice.pdf"],
    lastVerified: "2024-01-20",
    methodology: "VCS VM0008",
  },
]

export default function CarbonVerificationPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [localCredits, setLocalCredits] = useState<CarbonCredit[]>(carbonCredits)

  const handleFileUpload = (creditId: string) => {
    toast({
      title: "File Uploaded",
      description: "Your document has been successfully uploaded for verification.",
    })
  }

  const handleDownloadDocument = (document: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${document}...`,
    })
  }

  const handleVerificationRequest = (creditId: string) => {
    toast({
      title: "Verification Requested",
      description: "Your carbon credit verification request has been submitted.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="mr-1 h-4 w-4" />
            {status}
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-4 w-4" />
            {status}
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-4 w-4" />
            {status}
          </Badge>
        )
    }
  }

  const filteredCredits = localCredits.filter(
    (credit) =>
      (selectedStatus === "all" || credit.status === selectedStatus) &&
      (credit.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        credit.id.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Carbon Credit Verification</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Submit New Credits
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,250</div>
            <p className="text-xs text-muted-foreground mt-2">Carbon credits (tons CO2e)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Credits</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,000</div>
            <Progress value={44.4} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">44.4% of total credits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">750</div>
            <Progress value={33.3} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">33.3% of total credits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Credits</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500</div>
            <Progress value={22.2} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">22.2% of total credits</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Carbon Credits</CardTitle>
          <CardDescription>Manage and track carbon credit verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search credits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh All
            </Button>
          </div>

          <Tabs defaultValue="all" value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList>
              <TabsTrigger value="all">All Credits</TabsTrigger>
              <TabsTrigger value="Verified">Verified</TabsTrigger>
              <TabsTrigger value="Pending">Pending</TabsTrigger>
              <TabsTrigger value="Rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Details</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCredits.map((credit) => (
                    <TableRow key={credit.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{credit.projectName}</p>
                          <p className="text-sm text-muted-foreground">{credit.id}</p>
                          <p className="text-sm text-muted-foreground">Methodology: {credit.methodology}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{credit.amount} tons CO2e</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(credit.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Issue: {credit.issueDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Expiry: {credit.expiryDate}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{credit.verifier}</p>
                          <p className="text-sm text-muted-foreground">Last verified: {credit.lastVerified}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          {credit.documents.map((doc) => (
                            <div key={doc} className="flex items-center justify-between">
                              <span className="text-sm">{doc}</span>
                              <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(doc)}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleFileUpload(credit.id)}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload New
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => handleVerificationRequest(credit.id)}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Request Verification
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {["Verified", "Pending", "Rejected"].map((status) => (
              <TabsContent key={status} value={status}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Details</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Verification</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCredits
                      .filter((credit) => credit.status === status)
                      .map((credit) => (
                        <TableRow key={credit.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{credit.projectName}</p>
                              <p className="text-sm text-muted-foreground">{credit.id}</p>
                              <p className="text-sm text-muted-foreground">Methodology: {credit.methodology}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{credit.amount} tons CO2e</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(credit.status)}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Issue: {credit.issueDate}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Expiry: {credit.expiryDate}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{credit.verifier}</p>
                              <p className="text-sm text-muted-foreground">Last verified: {credit.lastVerified}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              {credit.documents.map((doc) => (
                                <div key={doc} className="flex items-center justify-between">
                                  <span className="text-sm">{doc}</span>
                                  <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(doc)}>
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => handleFileUpload(credit.id)}
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload New
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() => handleVerificationRequest(credit.id)}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Request Verification
                              </Button>
                              <Button variant="outline" size="sm" className="w-full">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

