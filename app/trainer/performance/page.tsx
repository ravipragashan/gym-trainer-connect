import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from a database or API
const performanceData = {
  totalSessions: 150,
  totalClients: 25,
  averageRating: 4.8,
  monthlyRevenue: 5000,
  clientRetentionRate: 85,
}

const monthlySessionsData = [
  { month: 'Jan', sessions: 40 },
  { month: 'Feb', sessions: 42 },
  { month: 'Mar', sessions: 45 },
  { month: 'Apr', sessions: 50 },
  { month: 'May', sessions: 48 },
  { month: 'Jun', sessions: 52 },
]

export default function TrainerPerformance() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Performance Statistics</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{performanceData.totalSessions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{performanceData.totalClients}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{performanceData.averageRating}/5.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${performanceData.monthlyRevenue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Client Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{performanceData.clientRetentionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {/* Here you would typically use a charting library like Chart.js or Recharts */}
            <p>Chart showing monthly sessions would go here</p>
            <ul>
              {monthlySessionsData.map((data) => (
                <li key={data.month}>{data.month}: {data.sessions} sessions</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

