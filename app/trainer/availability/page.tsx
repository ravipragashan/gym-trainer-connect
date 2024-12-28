"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

export default function ManageAvailability() {
  const [availability, setAvailability] = useState<Record<string, string[]>>({})

  const handleAvailabilityChange = (day: string, time: string) => {
    setAvailability((prev) => {
      const updatedAvailability = { ...prev }
      if (!updatedAvailability[day]) {
        updatedAvailability[day] = []
      }
      if (updatedAvailability[day].includes(time)) {
        updatedAvailability[day] = updatedAvailability[day].filter((t) => t !== time)
      } else {
        updatedAvailability[day].push(time)
      }
      return updatedAvailability
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle saving the availability
    console.log('Saving availability:', availability)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {daysOfWeek.map((day) => (
                <div key={day}>
                  <h3 className="font-semibold mb-2">{day}</h3>
                  {timeSlots.map((time) => (
                    <div key={`${day}-${time}`} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${day}-${time}`}
                        checked={availability[day]?.includes(time) || false}
                        onCheckedChange={() => handleAvailabilityChange(day, time)}
                      />
                      <Label htmlFor={`${day}-${time}`}>{time}</Label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <Button type="submit" className="mt-6">Save Availability</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

