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
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Calendar,
  Clock,
  Upload,
  Download,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react"

interface Requirement {
  id: string
  title: string
  description: string
  deadline: string
  status: "Compliant" | "Non-Compliant" | "Pending Review"
  lastUpdated: string
  documents: string[]
  progress: number
}

const requirements: Requirement[] = [
  {
    id: "REQ-2024-001",
    title: "Annual Emissions Report",
    description: "Submit detailed report of annual carbon emissions and reduction efforts",
    deadline: "2024-12-31",
    status: "Pending Review",
    lastUpdated: "2024-03-01",
    documents: ["emissions_report_2024.pdf", "supporting_data.xlsx"],
    progress: 75,
  },
  {
    id: "REQ-2024-002",
    title: "Carbon Credit Verification",
    description: "Verify carbon credits through approved third-party auditor",
    deadline: "2024-06-30",
    status: "Compliant",
    lastUpdated: "2024-02-15",
    documents: ["credit_verification.pdf"],
    progress: 100,
  },
  {
    id: "REQ-2024-003",
    title: "Environmental Impact Assessment",
    description: "Complete assessment of environmental impact for new initiatives",
    deadline: "2024-09-30",
    status: "Non-Compliant",
    lastUpdated: "2024-01-20",
    documents: [],
    progress: 30,
  },
]

export default function RegulatoryCompliancePage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [localRequirements, setLocalRequirements] = useState<Requirement[]>(requirements)

  const handleFileUpload = (requirementId: string) => {
    // Simulate file upload
    toast({
      title: "File Uploaded",
      description: "Your document has been successfully uploaded.",
    })
  }

  const handleDownloadDocument = (document: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${document}...`,
    })
  }

  const handleRefreshStatus = (requirementId: string) => {
    toast({
      title: "Status Updated",
      description: "The compliance status has been refreshed.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Compliant":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="mr-1 h-4 w-4" />
            {status}
          </Badge>
        )
      case "Non-Compliant":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-4 w-4" />
            {status}
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <AlertTriangle className="mr-1 h-4 w-4" />
            {status}
          </Badge>
        )
    }
  }

  const filteredRequirements = localRequirements.filter(
    (req) =>
      (selectedStatus === "all" || req.status === selectedStatus) &&
      (req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Regulatory Compliance</h1>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Last updated: 2024-03-01</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-2">Awaiting authority review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-2">Within next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Required Actions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-2">Immediate attention needed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Requirements</CardTitle>
          <CardDescription>Track and manage regulatory compliance requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search requirements..."
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
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Compliant">Compliant</TabsTrigger>
              <TabsTrigger value="Non-Compliant">Non-Compliant</TabsTrigger>
              <TabsTrigger value="Pending Review">Pending Review</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requirement</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequirements.map((requirement) => (
                    <TableRow key={requirement.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{requirement.title}</p>
                          <p className="text-sm text-muted-foreground">{requirement.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {requirement.deadline}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(requirement.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Progress value={requirement.progress} />
                          <p className="text-sm text-muted-foreground">{requirement.progress}% complete</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          {requirement.documents.map((doc) => (
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
                            onClick={() => handleFileUpload(requirement.id)}
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
                            onClick={() => handleRefreshStatus(requirement.id)}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Update Status
                          </Button>
                          <Button variant="outline" size="sm" className="w-full">
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {["Compliant", "Non-Compliant", "Pending Review"].map((status) => (
              <TabsContent key={status} value={status}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequirements
                      .filter((req) => req.status === status)
                      .map((requirement) => (
                        <TableRow key={requirement.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{requirement.title}</p>
                              <p className="text-sm text-muted-foreground">{requirement.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {requirement.deadline}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(requirement.status)}</TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Progress value={requirement.progress} />
                              <p className="text-sm text-muted-foreground">{requirement.progress}% complete</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              {requirement.documents.map((doc) => (
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
                                onClick={() => handleFileUpload(requirement.id)}
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
                                onClick={() => handleRefreshStatus(requirement.id)}
                              >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Update Status
                              </Button>
                              <Button variant="outline" size="sm" className="w-full">
                                <FileText className="mr-2 h-4 w-4" />
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

