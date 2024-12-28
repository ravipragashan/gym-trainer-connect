import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

const TrainerDashboard = () => {
  const { user } = useAuth();
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const sessionsQuery = query(collection(db, 'sessions'), where('trainerId', '==', user.uid));
        const sessionsSnapshot = await getDocs(sessionsQuery);
        const sessionsData = sessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUpcomingSessions(sessionsData);

        const clientsQuery = query(collection(db, 'users'), where('trainerId', '==', user.uid));
        const clientsSnapshot = await getDocs(clientsQuery);
        const clientsData = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClients(clientsData);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trainer Dashboard</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle>{session.type} with {session.client}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Date: {session.date}</p>
                <p>Time: {session.time}</p>
                <Button className="mt-2" variant="outline">Reschedule</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Clients</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Card key={client.id}>
              <CardHeader>
                <CardTitle>{client.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Last Session: {client.lastSession}</p>
                <p>Next Session: {client.nextSession}</p>
                <Button asChild className="mt-2" variant="outline">
                  <Link href={`/clients/${client.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild className="mt-4">
          <Link href="/trainer/availability">Manage Availability</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Performance</h2>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Sessions: 45</p>
            <p>New Clients: 3</p>
            <p>Client Retention Rate: 95%</p>
            <Button asChild className="mt-2">
              <Link href="/trainer/performance">View Detailed Stats</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default TrainerDashboard;

