"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UpdateMetrics() {
  const [metrics, setMetrics] = useState({
    weight: '',
    bodyFat: '',
    benchPress: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetrics({ ...metrics, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the metrics update logic
    console.log('Updating metrics:', metrics)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Update Your Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={metrics.weight}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyFat">Body Fat %</Label>
              <Input
                id="bodyFat"
                name="bodyFat"
                type="number"
                step="0.1"
                value={metrics.bodyFat}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benchPress">Bench Press (lbs)</Label>
              <Input
                id="benchPress"
                name="benchPress"
                type="number"
                value={metrics.benchPress}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button type="submit" className="w-full">Update Metrics</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

