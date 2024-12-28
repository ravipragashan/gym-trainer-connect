import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForTrainersPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold mb-6">For Trainers</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Why Join GoFit?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Expand Your Client Base</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reach a wider audience of potential clients looking for trainers with your expertise.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Set your own hours and manage your schedule through our easy-to-use platform.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Secure Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Receive payments promptly and securely through our integrated payment system.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">How It Works for Trainers</h2>
        <ol className="list-decimal list-inside space-y-4">
          <li>Create your professional profile on GoFit.</li>
          <li>Set your availability and pricing for sessions.</li>
          <li>Receive booking requests from potential clients.</li>
          <li>Conduct sessions and help clients achieve their fitness goals.</li>
          <li>Get paid securely through our platform.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Trainer Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>John's Client Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <p>"Since joining GoFit, I've doubled my client base and increased my income significantly!"</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Lisa's Work-Life Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>"The flexible scheduling allows me to balance my training career with my family life. It's been a game-changer!"</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Requirements to Join</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Valid personal training certification from a recognized organization</li>
          <li>Proof of liability insurance</li>
          <li>At least 1 year of professional training experience</li>
          <li>Excellent communication and interpersonal skills</li>
          <li>Commitment to client safety and professional ethics</li>
        </ul>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Grow Your Training Business?</h2>
        <Button asChild size="lg">
          <Link href="/trainers/apply">Apply as a Trainer</Link>
        </Button>
      </section>
    </div>
  )
}

