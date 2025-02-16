"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Blocks, CheckCircle, AlertTriangle, Search, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Certificate {
  id: string
  projectName: string
  issueDate: string
  status: "Valid" | "Expired" | "Revoked"
  blockchainHash: string
}

export default function BlockchainCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "CERT-001",
      projectName: "City Center Renovation",
      issueDate: "2023-05-15",
      status: "Valid",
      blockchainHash: "0x1234...5678",
    },
    {
      id: "CERT-002",
      projectName: "Riverside Development",
      issueDate: "2023-06-20",
      status: "Valid",
      blockchainHash: "0xabcd...efgh",
    },
    {
      id: "CERT-003",
      projectName: "Metro Station Upgrade",
      issueDate: "2023-04-10",
      status: "Expired",
      blockchainHash: "0x9876...5432",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const getStatusIcon = (status: Certificate["status"]) => {
    switch (status) {
      case "Valid":
        return <CheckCircle className="text-green-500" />
      case "Expired":
        return <AlertTriangle className="text-yellow-500" />
      case "Revoked":
        return <AlertTriangle className="text-red-500" />
    }
  }

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blockchain Certificates</h1>
        <Button>
          <Blocks className="mr-2 h-4 w-4" /> Issue New Certificate
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="space-y-4">
            {filteredCertificates.map((cert) => (
              <Card key={cert.id} className="bg-gray-50">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <Blocks className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{cert.projectName}</p>
                      <p className="text-sm text-muted-foreground">Certificate ID: {cert.id}</p>
                      <p className="text-sm text-muted-foreground">Issued: {cert.issueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`flex items-center space-x-1 text-sm ${
                        cert.status === "Valid"
                          ? "text-green-500"
                          : cert.status === "Expired"
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    >
                      {getStatusIcon(cert.status)}
                      <span>{cert.status}</span>
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Certificate Details</DialogTitle>
                          <DialogDescription>
                            <p>
                              <strong>Project:</strong> {cert.projectName}
                            </p>
                            <p>
                              <strong>Certificate ID:</strong> {cert.id}
                            </p>
                            <p>
                              <strong>Issue Date:</strong> {cert.issueDate}
                            </p>
                            <p>
                              <strong>Status:</strong> {cert.status}
                            </p>
                            <p>
                              <strong>Blockchain Hash:</strong> {cert.blockchainHash}
                            </p>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

