import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { getIssues } from "@/lib/database"
import { NotificationBell } from "@/components/real-time-notifications"

export default async function CitizenDashboard() {
  // In a real app, this would be filtered by the current user
  const recentIssues = await getIssues({ limit: 5 })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">CivicConnect</h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <NotificationBell />
              <Link href="/citizen/map">
                <Button variant="outline">Community Map</Button>
              </Link>
              <Link href="/citizen/my-reports">
                <Button variant="outline">My Reports</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to CivicConnect</h2>
          <p className="text-muted-foreground text-lg">
            Help improve your community by reporting local issues and tracking their resolution.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle>Report New Issue</CardTitle>
              <CardDescription>
                Found a pothole, broken streetlight, or other municipal issue? Report it here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/citizen/report">
                <Button className="w-full" size="lg">
                  Report Issue
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <CardTitle>Track Reports</CardTitle>
              <CardDescription>Check the status of your submitted reports and see progress updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/citizen/my-reports">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  View My Reports
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle>Community Map</CardTitle>
              <CardDescription>Explore reported issues in your area and see what's being addressed.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/citizen/map">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  View Map
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Community Issues */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-foreground">Recent Community Issues</h3>
            <Link href="/citizen/map">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {recentIssues.map((issue: any) => (
              <Card key={issue.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground">{issue.title}</h4>
                        <Badge
                          variant={
                            issue.status === "resolved"
                              ? "default"
                              : issue.status === "in_progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {issue.status.replace("_", " ")}
                        </Badge>
                        <Badge variant="outline">{issue.category_name}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{issue.description}</p>
                      {issue.location_address && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {issue.location_address}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{new Date(issue.created_at).toLocaleDateString()}</p>
                      <p>{issue.department_name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">247</div>
              <div className="text-sm text-muted-foreground">Issues This Month</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-accent mb-1">189</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-secondary mb-1">2.8</div>
              <div className="text-sm text-muted-foreground">Avg Days</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-chart-4 mb-1">4.7/5</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
