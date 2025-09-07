import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MapPin, Search, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { IssueChat } from "@/components/real-time-chat"

// Mock data for user's reports
const userReports = [
  {
    id: "CR-2024-001247",
    title: "Large pothole on Main Street",
    description: "Deep pothole causing damage to vehicles near the intersection of Main St and Oak Ave.",
    category: "Pothole",
    status: "in_progress",
    priority: "medium",
    location: "Main Street & Oak Avenue",
    department: "Public Works",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-16T14:20:00Z",
    estimated_resolution: "2024-01-20",
    updates: [
      {
        date: "2024-01-16T14:20:00Z",
        message: "Work crew assigned. Repair scheduled for this week.",
        type: "status_change",
      },
      {
        date: "2024-01-15T11:00:00Z",
        message: "Report received and forwarded to Public Works department.",
        type: "acknowledgment",
      },
    ],
  },
  {
    id: "CR-2024-001203",
    title: "Broken streetlight on Elm Street",
    description: "Streetlight has been out for several days, creating safety concerns for pedestrians.",
    category: "Streetlight",
    status: "resolved",
    priority: "low",
    location: "Elm Street (near house #245)",
    department: "Public Works",
    created_at: "2024-01-10T16:45:00Z",
    updated_at: "2024-01-14T09:15:00Z",
    actual_resolution: "2024-01-14",
    rating: 5,
    updates: [
      { date: "2024-01-14T09:15:00Z", message: "Streetlight repaired and tested. Issue resolved.", type: "resolution" },
      { date: "2024-01-12T13:30:00Z", message: "Electrician dispatched to assess the issue.", type: "status_change" },
      { date: "2024-01-10T17:00:00Z", message: "Report received and logged.", type: "acknowledgment" },
    ],
  },
  {
    id: "CR-2024-001189",
    title: "Graffiti on park bench",
    description: "Offensive graffiti on bench in Central Park needs removal.",
    category: "Graffiti",
    status: "acknowledged",
    priority: "low",
    location: "Central Park - East entrance",
    department: "Parks & Recreation",
    created_at: "2024-01-08T12:20:00Z",
    updated_at: "2024-01-09T08:45:00Z",
    estimated_resolution: "2024-01-18",
    updates: [
      {
        date: "2024-01-09T08:45:00Z",
        message: "Report acknowledged. Cleanup scheduled for next week.",
        type: "acknowledgment",
      },
    ],
  },
]

export default function MyReportsPage() {
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
            <Link href="/citizen">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">My Reports</h2>
          <p className="text-muted-foreground text-lg">
            Track the status of your submitted issues and see resolution progress.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search your reports..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="reported">Reported</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="pothole">Pothole</SelectItem>
                  <SelectItem value="streetlight">Streetlight</SelectItem>
                  <SelectItem value="graffiti">Graffiti</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            {/* Reports List - simplified for space */}
            <div className="space-y-4">
              {userReports.map((report) => (
                <Card key={report.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{report.title}</CardTitle>
                          <Badge
                            variant={
                              report.status === "resolved"
                                ? "default"
                                : report.status === "in_progress"
                                  ? "secondary"
                                  : report.status === "acknowledged"
                                    ? "outline"
                                    : "outline"
                            }
                          >
                            {report.status === "in_progress"
                              ? "In Progress"
                              : report.status === "resolved"
                                ? "Resolved"
                                : report.status === "acknowledged"
                                  ? "Acknowledged"
                                  : "Reported"}
                          </Badge>
                          <Badge variant="outline">{report.category}</Badge>
                        </div>
                        <CardDescription className="mb-2">{report.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {report.location}
                          </span>
                          <span>ID: {report.id}</span>
                          <span>{report.department}</span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>Reported: {new Date(report.created_at).toLocaleDateString()}</p>
                        {report.estimated_resolution && (
                          <p>Est. Resolution: {new Date(report.estimated_resolution).toLocaleDateString()}</p>
                        )}
                        {report.actual_resolution && (
                          <p className="text-primary font-medium">
                            Resolved: {new Date(report.actual_resolution).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Progress Updates
                      </h4>
                      <div className="space-y-2">
                        {report.updates.map((update, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="text-sm text-foreground">{update.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(update.date).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {report.status === "resolved" && report.rating && (
                        <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">
                              You rated this resolution: {report.rating}/5 stars
                            </span>
                          </div>
                        </div>
                      )}

                      {report.status === "resolved" && !report.rating && (
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            Rate Resolution
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <IssueChat issueId="CR-2024-001247" />
          </div>
        </div>

        {/* Empty State */}
        {userReports.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Reports Yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't submitted any issue reports yet. Help improve your community by reporting local issues.
              </p>
              <Link href="/citizen/report">
                <Button>Report Your First Issue</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
