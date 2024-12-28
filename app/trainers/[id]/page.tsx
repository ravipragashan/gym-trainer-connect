import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Calendar, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'

// This would typically come from a database based on the ID
const trainer = {
  id: 1,
  name: "John Doe",
  specialty: "Weight Training",
  rating: 4.8,
  bio: "Certified personal trainer with 10+ years of experience in weight training and functional fitness.",
  experience: "10+ years",
  certifications: ["NASM Certified Personal Trainer", "CrossFit Level 1 Trainer"],
  availability: ["Monday", "Wednesday", "Friday"],
  price: "$50/hour",
  image: "/placeholder.svg?height=400&width=400"
}

export default function TrainerProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
        <img src={trainer.image} alt={trainer.name} className="w-64 h-64 rounded-full object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{trainer.name}</h1>
          <p className="text-xl text-muted-foreground">{trainer.specialty}</p>
          <p className="flex items-center mt-2">
            Rating: {trainer.rating}
            <Star className="h-5 w-5 fill-yellow-400 ml-1" />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{trainer.bio}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience & Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Experience: {trainer.experience}</p>
            <ul className="list-disc list-inside mt-2">
              {trainer.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {trainer.availability.map((day, index) => (
                <li key={index} className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {day}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="flex items-center text-xl font-semibold">
              <DollarSign className="h-5 w-5 mr-2" />
              {trainer.price}
            </p>
          </CardContent>
        </Card>
      </div>

      <Button size="lg" className="mt-8 w-full" asChild>
        <Link href={`/book-session?trainerId=${trainer.id}`}>Book a Session</Link>
      </Button>
    </div>
  )
}

