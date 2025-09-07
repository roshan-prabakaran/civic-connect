import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, MapPin, ArrowLeft, Phone, Mail, TrendingUp, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { getDepartments } from "@/lib/database"

// Mock performance data
const departmentStats = {
  "Public Works": { activeIssues: 45, avgResolution: 3.2, satisfaction: 4.2, staff: 12 },
  "Water & Sewer": { activeIssues: 23, avgResolution: 1.8, satisfaction: 4.6, staff: 8 },
  "Parks & Recreation": { activeIssues: 34, avgResolution: 4.1, satisfaction: 4.4, staff: 15 },
  "Traffic & Transportation": { activeIssues: 18, avgResolution: 2.5, satisfaction: 4.1, staff: 6 },
  "Environmental Services": { activeIssues: 29, avgResolution: 3.8, satisfaction: 4.3, staff: 10 },
  "Code Enforcement": { activeIssues: 16, avgResolution: 5.2, satisfaction: 3.9, staff: 5 },
}

export default async function DepartmentsPage() {
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
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Department Management</h2>
            <p className="text-muted-foreground">Monitor department performance and manage staff assignments</p>
          </div>
          <Button>Add Department</Button>
        </div>

        {/* Department Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Departments</p>
                  <p className="text-3xl font-bold text-foreground">{departments.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Issues</p>
                  <p className="text-3xl font-bold text-foreground">165</p>
                  <p className="text-sm text-muted-foreground">Across all departments</p>
                </div>
                <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Resolution</p>
                  <p className="text-3xl font-bold text-foreground">3.4</p>
                  <p className="text-sm text-muted-foreground">Days across all depts</p>
                </div>
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-chart-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                  <p className="text-3xl font-bold text-foreground">4.3</p>
                  <p className="text-sm text-muted-foreground">Average rating</p>
                </div>
                <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-chart-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Departments List */}
        <div className="grid gap-6">
          {departments.map((department: any) => {
            const stats = departmentStats[department.name as keyof typeof departmentStats] || {
              activeIssues: 0,
              avgResolution: 0,
              satisfaction: 0,
              staff: 0,
            }

            return (
              <Card key={department.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{department.name}</CardTitle>
                        <Badge variant={department.is_active ? "default" : "secondary"}>
                          {department.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">{department.description}</CardDescription>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground mb-1">{stats.activeIssues}</div>
                      <div className="text-sm text-muted-foreground">Active Issues</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground mb-1">{stats.avgResolution}</div>
                      <div className="text-sm text-muted-foreground">Avg Resolution (days)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground mb-1">{stats.satisfaction}/5</div>
                      <div className="text-sm text-muted-foreground">Satisfaction Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground mb-1">{stats.staff}</div>
                      <div className="text-sm text-muted-foreground">Staff Members</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Performance Score</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((stats.satisfaction / 5) * 100)}%
                        </span>
                      </div>
                      <Progress value={(stats.satisfaction / 5) * 100} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="space-y-1">
                        {department.contact_email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span>{department.contact_email}</span>
                          </div>
                        )}
                        {department.contact_phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{department.contact_phone}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Issues
                        </Button>
                        <Button variant="outline" size="sm">
                          View Staff
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
