"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Settings() {
  const [email, setEmail] = useState("user@example.com")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const handleSave = () => {
    // Burada ayarları kaydetme işlemi yapılacak
    console.log("Ayarlar kaydedildi")
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Ayarlar</h1>
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Ayarları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="email">E-posta</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <Label htmlFor="notifications" className="flex items-center">
              <Input
                id="notifications"
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="mr-2"
              />
              Bildirimleri Etkinleştir
            </Label>
          </div>
          <Button onClick={handleSave}>Kaydet</Button>
        </CardContent>
      </Card>
    </>
  )
}

