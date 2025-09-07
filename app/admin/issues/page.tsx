import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  MapPin,
  Clock,
  User,
  ArrowLeft,
  MoreHorizontal,
  Eye,
  UserCheck,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { getIssues } from "@/lib/database"

export default async function AdminIssuesPage() {
  const allIssues = await getIssues({ limit: 50 })
  const reportedIssues = await getIssues({ status: "reported", limit: 20 })
  const inProgressIssues = await getIssues({ status: "in_progress", limit: 20 })

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
            <h2 className="text-3xl font-bold text-foreground mb-2">Issue Management</h2>
            <p className="text-muted-foreground">Review, assign, and track the resolution of citizen-reported issues</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search issues by title, location, or ID..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="public-works">Public Works</SelectItem>
                  <SelectItem value="water-sewer">Water & Sewer</SelectItem>
                  <SelectItem value="parks">Parks & Recreation</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Issues Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Issues ({allIssues.length})</TabsTrigger>
            <TabsTrigger value="reported">New ({reportedIssues.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgressIssues.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <IssuesList issues={allIssues} />
          </TabsContent>

          <TabsContent value="reported">
            <IssuesList issues={reportedIssues} />
          </TabsContent>

          <TabsContent value="in-progress">
            <IssuesList issues={inProgressIssues} />
          </TabsContent>

          <TabsContent value="resolved">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Resolved issues will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function IssuesList({ issues }: { issues: any[] }) {
  return (
    <div className="space-y-4">
      {issues.map((issue: any) => (
        <Card key={issue.id} className="hover:bg-muted/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-foreground text-lg">{issue.title}</h3>
                  <Badge
                    variant={
                      issue.status === "resolved"
                        ? "default"
                        : issue.status === "in_progress"
                          ? "secondary"
                          : issue.status === "acknowledged"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {issue.status?.replace("_", " ") || "reported"}
                  </Badge>
                  <Badge
                    variant={
                      issue.priority === "urgent"
                        ? "destructive"
                        : issue.priority === "high"
                          ? "destructive"
                          : issue.priority === "medium"
                            ? "default"
                            : "outline"
                    }
                  >
                    {issue.priority || "medium"} priority
                  </Badge>
                  {issue.category_name && <Badge variant="outline">{issue.category_name}</Badge>}
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{issue.description}</p>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{issue.location_address || "Location not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>Reported by {issue.reporter_name || "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {issue.department_name && (
                  <div className="mt-3">
                    <Badge variant="secondary" className="text-xs">
                      {issue.department_name}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Assign
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Update
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {issues.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Issues Found</h3>
            <p className="text-muted-foreground">
              No issues match your current filters. Try adjusting your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
