import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Dumbbell, Calendar, Trophy } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-20 bg-gradient-to-r from-primary to-primary-foreground text-white rounded-lg">
        <h1 className="text-5xl font-bold mb-6">Welcome to GoFit</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Find the perfect trainer to help you achieve your fitness goals and transform your life.</p>
        <div className="space-x-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/trainers">Find a Trainer</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/trainers/register">Become a Trainer</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Dumbbell className="mr-2" />
                1. Find a Trainer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Browse our extensive list of qualified trainers and find the perfect match for your fitness goals.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" />
                2. Schedule a Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Book a session with your chosen trainer at a time and place that suits you.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2" />
                3. Achieve Your Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Work with your trainer to reach your fitness objectives and lead a healthier lifestyle.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Trainers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((id) => (
            <Card key={id} className="overflow-hidden">
              <img src={`/placeholder.svg?height=200&width=300`} alt="Trainer" className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold mb-2">Trainer Name</h3>
                <p className="mb-4">Speciality: Weight Training</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/trainers/${id}`}>View Profile <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

