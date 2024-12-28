import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Calendar, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'

interface TrainerProfileProps {
  trainer: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    bio: string;
    experience: string;
    certifications: string[];
    availability: string[];
    price: string;
    image: string;
  };
  showBookButton?: boolean;
}

export default function TrainerProfile({ trainer, showBookButton = true }: TrainerProfileProps) {
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

      {showBookButton && (
        <Button size="lg" className="mt-8 w-full" asChild>
          <Link href={`/book-session?trainerId=${trainer.id}`}>Book a Session</Link>
        </Button>
      )}
    </div>
  )
}

