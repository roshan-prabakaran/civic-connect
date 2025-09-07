import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { AlertCircle, Users, MapPin, TrendingUp, Calendar, Filter, Download } from "lucide-react"
import Link from "next/link"
import { getIssues, getDepartments } from "@/lib/database"
import { NotificationBell } from "@/components/real-time-notifications"
import { LiveDashboardStats, LiveActivityFeed } from "@/components/real-time-updates"

// Mock data for charts
const issuesByCategory = [
  { name: "Potholes", value: 156, color: "#059669" },
  { name: "Streetlights", value: 89, color: "#10b981" },
  { name: "Water Issues", value: 67, color: "#34d399" },
  { name: "Parks", value: 134, color: "#6ee7b7" },
  { name: "Traffic", value: 45, color: "#a7f3d0" },
]

const resolutionTrends = [
  { month: "Oct", reported: 245, resolved: 198 },
  { month: "Nov", reported: 289, resolved: 234 },
  { month: "Dec", reported: 267, resolved: 245 },
  { month: "Jan", reported: 312, resolved: 289 },
]

const departmentPerformance = [
  { department: "Public Works", avgDays: 3.2, issues: 245, resolved: 89 },
  { department: "Water & Sewer", avgDays: 1.8, issues: 67, resolved: 95 },
  { department: "Parks & Rec", avgDays: 4.1, issues: 134, resolved: 78 },
  { department: "Transportation", avgDays: 2.5, issues: 45, resolved: 92 },
]

export default async function AdminDashboard() {
  const recentIssues = await getIssues({ limit: 5 })
  const departments = await getDepartments()

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
              <h1 className="text-2xl font-bold text-foreground">CivicConnect Admin</h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <NotificationBell />
              <Link href="/admin/issues">
                <Button variant="outline">Manage Issues</Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="outline">Analytics</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
            <p className="text-muted-foreground">Monitor municipal issue reports and departmental performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <LiveDashboardStats />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Issues by Category */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Issues by Category</CardTitle>
              <CardDescription>Distribution of reported issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={issuesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {issuesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {issuesByCategory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <LiveActivityFeed />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Average resolution time and completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{dept.department}</span>
                      <div className="text-right text-sm">
                        <div className="font-medium">{dept.avgDays} days avg</div>
                        <div className="text-muted-foreground">{dept.resolved}% resolved</div>
                      </div>
                    </div>
                    <Progress value={dept.resolved} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{dept.issues} total issues</span>
                      <span>{Math.round((dept.issues * dept.resolved) / 100)} resolved</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Issues */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Issues</CardTitle>
                  <CardDescription>Latest reported issues requiring attention</CardDescription>
                </div>
                <Link href="/admin/issues">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIssues.slice(0, 5).map((issue: any) => (
                  <div key={issue.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        issue.priority === "high"
                          ? "bg-destructive"
                          : issue.priority === "medium"
                            ? "bg-chart-4"
                            : "bg-muted-foreground"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm text-foreground truncate">{issue.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {issue.status?.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {issue.category_name} • {issue.department_name}
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(issue.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/admin/issues">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Manage Issues</h3>
                <p className="text-sm text-muted-foreground">View and assign reported issues</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/departments">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Departments</h3>
                <p className="text-sm text-muted-foreground">Manage departments and staff</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Analytics</h3>
                <p className="text-sm text-muted-foreground">Detailed reports and insights</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/settings">
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Settings</h3>
                <p className="text-sm text-muted-foreground">System configuration</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
