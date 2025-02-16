"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle } from "lucide-react"

interface BlockchainWarrantyProps {
  projectId: number
  projectName: string
}

export function BlockchainWarranty({ projectId, projectName }: BlockchainWarrantyProps) {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async () => {
    setIsLoading(true)
    // Simulating blockchain verification process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsVerified(true)
    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain-Based Warranty Certificate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Project: {projectName}</p>
          <p>Project ID: {projectId}</p>
          {isVerified ? (
            <div className="flex items-center text-green-500">
              <CheckCircle className="mr-2" />
              <span>Warranty certificate verified on the blockchain.</span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-500">
              <AlertTriangle className="mr-2" />
              <span>Warranty certificate not yet verified.</span>
            </div>
          )}
          <Button onClick={handleVerify} disabled={isVerified || isLoading} className="w-full sm:w-auto">
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

