import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MapPin, Search, Layers } from "lucide-react"
import Link from "next/link"

export default function CommunityMapPage() {
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

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 border-r bg-card overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Community Map</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Explore reported issues in your area and see what's being addressed by the city.
            </p>

            {/* Filters */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search location..." className="pl-10" />
                </div>
              </div>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="reported">Reported</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="pothole">Potholes</SelectItem>
                  <SelectItem value="streetlight">Streetlights</SelectItem>
                  <SelectItem value="water">Water Issues</SelectItem>
                  <SelectItem value="parks">Parks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Legend */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Map Legend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <span>Reported</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Resolved</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Issues List */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Recent Issues</h3>
              <div className="space-y-3">
                {[
                  { id: 1, title: "Pothole on Main St", status: "in_progress", category: "Roads", distance: "0.2 mi" },
                  { id: 2, title: "Broken streetlight", status: "reported", category: "Lighting", distance: "0.4 mi" },
                  {
                    id: 3,
                    title: "Graffiti removal needed",
                    status: "resolved",
                    category: "Parks",
                    distance: "0.6 mi",
                  },
                  { id: 4, title: "Water main leak", status: "in_progress", category: "Water", distance: "0.8 mi" },
                ].map((issue) => (
                  <Card key={issue.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-foreground">{issue.title}</h4>
                        <Badge
                          variant={
                            issue.status === "resolved"
                              ? "default"
                              : issue.status === "in_progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {issue.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{issue.category}</span>
                        <span>{issue.distance} away</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                This would display an interactive map showing all reported issues in your area. Click on markers to see
                issue details and status updates.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-4 bg-card rounded-lg border">
                  <div className="w-3 h-3 bg-destructive rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium">23 Reported</div>
                  <div className="text-xs text-muted-foreground">New issues</div>
                </div>
                <div className="p-4 bg-card rounded-lg border">
                  <div className="w-3 h-3 bg-chart-4 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium">15 In Progress</div>
                  <div className="text-xs text-muted-foreground">Being worked on</div>
                </div>
                <div className="p-4 bg-card rounded-lg border">
                  <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium">67 Resolved</div>
                  <div className="text-xs text-muted-foreground">This month</div>
                </div>
                <div className="p-4 bg-card rounded-lg border">
                  <div className="text-sm font-medium">2.8 days</div>
                  <div className="text-xs text-muted-foreground">Avg resolution</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button size="sm" variant="outline" className="bg-background">
              <MapPin className="w-4 h-4 mr-2" />
              My Location
            </Button>
            <Link href="/citizen/report">
              <Button size="sm" className="bg-primary">
                Report Issue Here
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
