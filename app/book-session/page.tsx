"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from '@/hooks/useAuth'
import { collection, query, getDocs, addDoc, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
}

export default function BookSession() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [selectedTrainer, setSelectedTrainer] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    const fetchTrainers = async () => {
      const trainersQuery = query(collection(db, 'users'), where('userType', '==', 'trainer'))
      const trainersSnapshot = await getDocs(trainersQuery)
      const trainersData = trainersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Trainer))
      setTrainers(trainersData)
    }

    fetchTrainers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to book a session.",
        variant: "destructive",
      })
      return
    }
    if (!selectedTrainer || !selectedDate || !selectedTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    try {
      const sessionData = {
        clientId: user.uid,
        trainerId: selectedTrainer,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        notes: notes,
        status: 'pending'
      }

      await addDoc(collection(db, 'sessions'), sessionData)

      toast({
        title: "Session Booked",
        description: "Your session has been successfully booked!",
      })

      router.push('/dashboard/client')
    } catch (error) {
      console.error('Error booking session:', error)
      toast({
        title: "Error",
        description: "There was an error booking your session. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book a New Session</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select a Trainer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="flex items-center space-x-4">
                  <img src={trainer.image || "/placeholder.svg?height=50&width=50"} alt={trainer.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold">{trainer.name}</h3>
                    <p className="text-sm text-muted-foreground">{trainer.specialty}</p>
                  </div>
                  <Button
                    variant={selectedTrainer === trainer.id ? "default" : "outline"}
                    onClick={() => setSelectedTrainer(trainer.id)}
                  >
                    {selectedTrainer === trainer.id ? "Selected" : "Select"}
                  </Button>
                  <Button variant="link" asChild>
                    <Link href={`/trainers/${trainer.id}`}>View Profile</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <Select
                  id="time"
                  value={selectedTime}
                  onValueChange={setSelectedTime}
                >
                  <option value="">Choose a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific requirements or questions?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">Book Session</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

