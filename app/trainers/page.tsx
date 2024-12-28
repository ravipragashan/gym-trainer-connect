"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Star } from 'lucide-react'

// This would typically come from a database
const trainers = [
  { id: 1, name: "John Doe", specialty: "Weight Training", rating: 4.8, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Jane Smith", specialty: "Yoga", rating: 4.9, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Mike Johnson", specialty: "Cardio", rating: 4.7, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Emily Brown", specialty: "Pilates", rating: 4.6, image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "David Lee", specialty: "CrossFit", rating: 4.8, image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Sarah Wilson", specialty: "Nutrition", rating: 4.9, image: "/placeholder.svg?height=200&width=200" },
]

export default function TrainersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [minRating, setMinRating] = useState('')

  const filteredTrainers = trainers.filter(trainer => 
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (specialty === '' || trainer.specialty === specialty) &&
    (minRating === '' || trainer.rating >= parseFloat(minRating))
  )

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Find Your Perfect Trainer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input 
            id="search" 
            placeholder="Search trainers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="specialty">Specialty</Label>
          <Select 
            id="specialty"
            value={specialty}
            onValueChange={setSpecialty}
          >
            <option value="">All Specialties</option>
            <option value="Weight Training">Weight Training</option>
            <option value="Yoga">Yoga</option>
            <option value="Cardio">Cardio</option>
            <option value="Pilates">Pilates</option>
            <option value="CrossFit">CrossFit</option>
            <option value="Nutrition">Nutrition</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="rating">Minimum Rating</Label>
          <Select 
            id="rating"
            value={minRating}
            onValueChange={setMinRating}
          >
            <option value="">Any Rating</option>
            <option value="4">4.0+</option>
            <option value="4.5">4.5+</option>
            <option value="4.8">4.8+</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <Card key={trainer.id} className="overflow-hidden">
            <img src={trainer.image} alt={trainer.name} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{trainer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Specialty: {trainer.specialty}</p>
              <p className="mb-4 flex items-center">
                Rating: {trainer.rating}
                <Star className="h-4 w-4 fill-yellow-400 ml-1" />
              </p>
              <Button asChild className="w-full">
                <Link href={`/trainers/${trainer.id}`}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

