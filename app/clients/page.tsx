import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForClientsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold mb-6">For Clients</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Why Choose GoFit?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Expert Trainers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Access a network of certified and experienced trainers specializing in various fitness areas.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Personalized Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Receive customized workout and nutrition plans tailored to your specific goals and needs.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Book sessions at times that suit your schedule, with options for in-person or virtual training.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li>Sign up for a free account on GoFit.</li>
          <li>Browse our extensive list of trainers and read their profiles.</li>
          <li>Choose a trainer that matches your goals and preferences.</li>
          <li>Book a session directly through our platform.</li>
          <li>Attend your session and start working towards your fitness goals!</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Client Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sarah's Transformation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>"I've lost 30 pounds and gained so much confidence thanks to my trainer from GoFit!"</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mike's Strength Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <p>"My trainer helped me increase my bench press by 50 pounds in just 3 months. I'm amazed at my progress!"</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Fitness Journey?</h2>
        <Button asChild size="lg">
          <Link href="/register">Sign Up Now</Link>
        </Button>
      </section>
    </div>
  )
}

