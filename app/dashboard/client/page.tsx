"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

interface Session {
  id: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
  trainer: Trainer;
}

export default function ClientDashboard() {
  const { user } = useAuth();
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [progressMetrics, setProgressMetrics] = useState([]);
  const [bookedTrainers, setBookedTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const sessionsQuery = query(collection(db, 'sessions'), where('clientId', '==', user.uid));
        const sessionsSnapshot = await getDocs(sessionsQuery);
        const sessionsData = await Promise.all(sessionsSnapshot.docs.map(async doc => {
          const sessionData = { id: doc.id, ...doc.data() } as Session;
          const trainerDoc = await getDoc(doc(db, 'users', sessionData.trainerId));
          const trainerData = trainerDoc.data() as Trainer;
          sessionData.trainer = { id: trainerDoc.id, ...trainerData };
          return sessionData;
        }));
        setUpcomingSessions(sessionsData);

        const uniqueTrainers = Array.from(new Set(sessionsData.map(session => session.trainer.id)))
          .map(id => sessionsData.find(session => session.trainer.id === id)?.trainer as Trainer);
        setBookedTrainers(uniqueTrainers);

        const metricsQuery = query(collection(db, 'metrics'), where('userId', '==', user.uid));
        const metricsSnapshot = await getDocs(metricsQuery);
        const metricsData = metricsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProgressMetrics(metricsData);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Client Dashboard</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingSessions.map((session) => (
            <Card key={session.id}>
              <CardHeader>
                <CardTitle>{session.trainer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Date: {session.date}</p>
                <p>Time: {session.time}</p>
                <p>Status: {session.status}</p>
                {session.notes && <p>Notes: {session.notes}</p>}
                <Button className="mt-2" variant="outline">Reschedule</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild className="mt-4">
          <Link href="/book-session">Book New Session</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {progressMetrics.map((metric) => (
            <Card key={metric.id}>
              <CardHeader>
                <CardTitle>{metric.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className={metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild className="mt-4">
          <Link href="/update-metrics">Update Metrics</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Trainers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookedTrainers.map((trainer) => (
            <Card key={trainer.id}>
              <CardHeader>
                <CardTitle>{trainer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={trainer.image || "/placeholder.svg?height=100&width=100"} alt={trainer.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                <p>Specialty: {trainer.specialty}</p>
                <Button asChild className="mt-2" variant="outline">
                  <Link href={`/trainers/${trainer.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild className="mt-4">
          <Link href="/trainers">Find More Trainers</Link>
        </Button>
      </section>
    </div>
  )
}

