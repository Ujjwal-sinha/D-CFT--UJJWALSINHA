"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  FileText,
  CheckCircle,
  Clock,
  Download,
  Upload,
  Building2,
  Scale,
  Landmark,
  Calendar,
  DollarSign,
  FileSignature,
  AlertCircle,
  Shield,
  BadgeCheck,
} from "lucide-react"

const complianceStatus = {
  emissions: "Compliant",
  reporting: "Pending",
  permits: "Action Required",
  verification: "Under Review",
}

const carbonCredits = [
  {
    id: "CR-2024-001",
    type: "Carbon Offset",
    amount: "500",
    status: "Verified",
    expiry: "2025-12-31",
  },
  {
    id: "CR-2024-002",
    type: "Renewable Energy",
    amount: "300",
    status: "Pending",
    expiry: "2025-12-31",
  },
  {
    id: "CR-2024-003",
    type: "Energy Efficiency",
    amount: "200",
    status: "Verified",
    expiry: "2025-12-31",
  },
]

const regulatoryUpdates = [
  {
    date: "2024-02-15",
    title: "New Carbon Tax Guidelines",
    description: "Updated guidelines for carbon tax calculations and reporting requirements.",
    impact: "High",
  },
  {
    date: "2024-02-10",
    title: "Emissions Trading Update",
    description: "Changes to emissions trading verification process and documentation.",
    impact: "Medium",
  },
  {
    date: "2024-02-05",
    title: "Renewable Energy Credits",
    description: "New incentives for renewable energy adoption and credit trading.",
    impact: "High",
  },
]

const incentivePrograms = [
  {
    name: "Green Technology Tax Credit",
    deadline: "2024-06-30",
    maxAmount: "$50,000",
    status: "Open",
  },
  {
    name: "Energy Efficiency Grant",
    deadline: "2024-09-15",
    maxAmount: "$25,000",
    status: "Open",
  },
  {
    name: "Sustainable Transport Rebate",
    deadline: "2024-12-31",
    maxAmount: "$10,000",
    status: "Open",
  },
]

interface Permit {
  id: string
  type: string
  issueDate: string
  expiryDate: string
  status: string
  requirements: string[]
}

interface Grant {
  id: string
  name: string
  amount: string
  deadline: string
  status: string
  progress: number
}

const permits: Permit[] = [
  {
    id: "PER-2024-001",
    type: "Environmental Operation",
    issueDate: "2024-01-01",
    expiryDate: "2025-01-01",
    status: "Active",
    requirements: ["Monthly emissions reporting", "Quarterly waste management audit", "Annual compliance review"],
  },
  {
    id: "PER-2024-002",
    type: "Carbon Trading",
    issueDate: "2024-02-01",
    expiryDate: "2025-02-01",
    status: "Pending Review",
    requirements: ["Trading volume reports", "Transaction verification", "Compliance documentation"],
  },
]

const grants: Grant[] = [
  {
    id: "GNT-2024-001",
    name: "Clean Energy Transition",
    amount: "$100,000",
    deadline: "2024-06-30",
    status: "In Progress",
    progress: 60,
  },
  {
    id: "GNT-2024-002",
    name: "Sustainable Manufacturing",
    amount: "$75,000",
    deadline: "2024-08-15",
    status: "Draft",
    progress: 25,
  },
]

const upcomingAudits = [
  {
    date: "2024-03-15",
    type: "Environmental Compliance",
    auditor: "EPA",
    status: "Scheduled",
  },
  {
    date: "2024-04-01",
    type: "Carbon Credit Verification",
    auditor: "CarbonTrust",
    status: "Pending",
  },
]

export default function GovernmentIntegration() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [violationReport, setViolationReport] = useState("")
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast({
        title: "File Selected",
        description: `${file.name} has been selected for upload.`,
      })
    }
  }

  const handleBatchUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setSelectedFiles(files)
      toast({
        title: "Files Selected",
        description: `${files.length} files have been selected for upload.`,
      })
    }
  }

  const handleSubmitReport = () => {
    if (selectedFile) {
      toast({
        title: "Report Submitted",
        description: "Your compliance report has been submitted successfully.",
      })
      setSelectedFile(null)
    } else {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
    }
  }

  const handleSubmitViolation = () => {
    if (violationReport.trim()) {
      toast({
        title: "Violation Reported",
        description: "Your report has been submitted for review.",
      })
      setViolationReport("")
    } else {
      toast({
        title: "Error",
        description: "Please provide violation details.",
        variant: "destructive",
      })
    }
  }

  const calculateCarbonTax = (emissions: number) => {
    const taxRate = 25 // $25 per ton of CO2
    return emissions * taxRate
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "compliant":
      case "verified":
      case "active":
        return <Badge className="bg-green-500">{status}</Badge>
      case "pending":
      case "under review":
      case "pending review":
        return <Badge variant="secondary">{status}</Badge>
      case "action required":
        return <Badge variant="destructive">{status}</Badge>
      case "draft":
        return <Badge variant="outline">{status}</Badge>
      case "in progress":
        return <Badge>{status}</Badge>
      case "scheduled":
        return <Badge>{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high":
        return <Badge variant="destructive">{impact}</Badge>
      case "medium":
        return <Badge variant="secondary">{impact}</Badge>
      case "low":
        return <Badge variant="outline">{impact}</Badge>
      default:
        return <Badge>{impact}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Government Integration</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">75%</div>
            <p className="text-xs text-muted-foreground">Overall compliance score</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Credits</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,000</div>
            <p className="text-xs text-muted-foreground">Available credits</p>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Government initiatives</p>
            <Progress value={100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Days remaining</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compliance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="permits">Permits</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="calculator">Tax Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Current status of regulatory compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(complianceStatus).map(([key, status]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize">{key}</span>
                    {getStatusBadge(status)}
                  </div>
                ))}
                <div className="mt-6">
                  <Label htmlFor="report">Upload Compliance Report</Label>
                  <div className="flex gap-4 mt-2">
                    <Input id="report" type="file" onChange={handleFileUpload} className="flex-1" />
                    <Button onClick={handleSubmitReport}>
                      <Upload className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Credits Management</CardTitle>
              <CardDescription>Track and manage your carbon credits</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Credit ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount (tons)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carbonCredits.map((credit) => (
                    <TableRow key={credit.id}>
                      <TableCell>{credit.id}</TableCell>
                      <TableCell>{credit.type}</TableCell>
                      <TableCell>{credit.amount}</TableCell>
                      <TableCell>{getStatusBadge(credit.status)}</TableCell>
                      <TableCell>{credit.expiry}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Updates</CardTitle>
              <CardDescription>Latest government policies and regulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulatoryUpdates.map((update, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{update.title}</CardTitle>
                        {getImpactBadge(update.impact)}
                      </div>
                      <CardDescription>{update.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{update.description}</p>
                      <Button variant="link" className="mt-2 p-0">
                        Read more
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incentives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Government Incentive Programs</CardTitle>
              <CardDescription>Available sustainability incentives and programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incentivePrograms.map((program, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{program.name}</CardTitle>
                        <Badge variant="outline">{program.status}</Badge>
                      </div>
                      <CardDescription>Deadline: {program.deadline}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span>Maximum Amount: {program.maxAmount}</span>
                        <Button>Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Permits</CardTitle>
              <CardDescription>Manage and track your environmental permits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {permits.map((permit) => (
                  <Card key={permit.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{permit.type}</CardTitle>
                        {getStatusBadge(permit.status)}
                      </div>
                      <CardDescription>ID: {permit.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>Issue Date: {permit.issueDate}</p>
                        <p>Expiry Date: {permit.expiryDate}</p>
                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Requirements:</h4>
                          <ul className="list-disc list-inside">
                            {permit.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Government Grants</CardTitle>
              <CardDescription>Track and manage grant applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {grants.map((grant) => (
                  <Card key={grant.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{grant.name}</CardTitle>
                        {getStatusBadge(grant.status)}
                      </div>
                      <CardDescription>Amount: {grant.amount}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>Deadline: {grant.deadline}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Application Progress</span>
                            <span>{grant.progress}%</span>
                          </div>
                          <Progress value={grant.progress} />
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button>Continue Application</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Audits</CardTitle>
              <CardDescription>Schedule and prepare for government audits</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Auditor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAudits.map((audit, index) => (
                    <TableRow key={index}>
                      <TableCell>{audit.date}</TableCell>
                      <TableCell>{audit.type}</TableCell>
                      <TableCell>{audit.auditor}</TableCell>
                      <TableCell>{getStatusBadge(audit.status)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Policy Violation</CardTitle>
              <CardDescription>Submit reports of environmental policy violations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="violation-report">Violation Details</Label>
                  <Textarea
                    id="violation-report"
                    placeholder="Describe the violation..."
                    value={violationReport}
                    onChange={(e) => setViolationReport(e.target.value)}
                  />
                </div>
                <Button onClick={handleSubmitViolation}>Submit Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Securely manage and store government-related documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Upload Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="single-upload">Single File Upload</Label>
                          <Input id="single-upload" type="file" onChange={handleFileUpload} />
                        </div>
                        <div>
                          <Label htmlFor="batch-upload">Batch Upload</Label>
                          <Input id="batch-upload" type="file" multiple onChange={handleBatchUpload} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Digital Signatures</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Securely sign and verify documents using digital signatures
                        </p>
                        <Button className="w-full">
                          <FileSignature className="mr-2 h-4 w-4" />
                          Sign Document
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Recent Documents</h3>
                  <ScrollArea className="h-[200px] border rounded-md p-4">
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>Document-{i + 1}.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Tax Calculator</CardTitle>
              <CardDescription>Calculate estimated carbon tax based on emissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emissions">Annual CO2 Emissions (tons)</Label>
                    <Input
                      id="emissions"
                      type="number"
                      placeholder="Enter emissions in tons"
                      onChange={(e) => {
                        const tax = calculateCarbonTax(Number(e.target.value))
                        toast({
                          title: "Estimated Carbon Tax",
                          description: `$${tax.toLocaleString()} per year`,
                        })
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Tax Deductions Available:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Clean energy investments (up to 30% reduction)
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Energy efficiency improvements (up to 20% reduction)
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Carbon offset projects (up to 15% reduction)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Calendar</CardTitle>
            <CardDescription>Upcoming deadlines and important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAudits.map((audit, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{audit.type}</p>
                    <p className="text-sm text-muted-foreground">{audit.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common government-related tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Shield className="h-6 w-6 mb-2" />
                Verify Compliance
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <BadgeCheck className="h-6 w-6 mb-2" />
                Request Certificate
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <AlertCircle className="h-6 w-6 mb-2" />
                Report Issue
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <DollarSign className="h-6 w-6 mb-2" />
                Tax Filing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

