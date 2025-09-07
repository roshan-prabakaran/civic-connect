import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Clock, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">CivicConnect</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/citizen">
                <Button variant="outline">Report Issue</Button>
              </Link>
              <Link href="/admin">
                <Button>Admin Dashboard</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Connect Your Community with Local Government
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Report local issues, track progress, and help make your community better. CivicConnect bridges the gap
            between citizens and municipal services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/citizen">
              <Button size="lg" className="text-lg px-8 py-6">
                <AlertCircle className="w-5 h-5 mr-2" />
                Report an Issue
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                <Users className="w-5 h-5 mr-2" />
                Municipal Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">How CivicConnect Works</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent process that connects citizens with their local government
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Report Issues</CardTitle>
                <CardDescription>
                  Easily report potholes, broken streetlights, and other municipal issues with photos and location data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Get real-time updates on your reports and see how your local government is addressing community needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>See Results</CardTitle>
                <CardDescription>
                  Watch as issues get resolved and provide feedback to help improve municipal services
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,247</div>
              <div className="text-muted-foreground">Issues Reported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">892</div>
              <div className="text-muted-foreground">Issues Resolved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3.2</div>
              <div className="text-muted-foreground">Avg. Days to Resolution</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-muted-foreground">Citizen Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Issue Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Common Issue Types</h3>
            <p className="text-muted-foreground">
              Report various types of municipal issues across different departments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Potholes", dept: "Public Works", count: 156, color: "bg-chart-1" },
              { name: "Streetlights", dept: "Public Works", count: 89, color: "bg-chart-2" },
              { name: "Water Issues", dept: "Water & Sewer", count: 67, color: "bg-chart-3" },
              { name: "Park Maintenance", dept: "Parks & Recreation", count: 134, color: "bg-chart-4" },
              { name: "Traffic Signals", dept: "Transportation", count: 45, color: "bg-chart-5" },
              { name: "Code Violations", dept: "Code Enforcement", count: 78, color: "bg-chart-1" },
            ].map((category) => (
              <Card key={category.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <Badge variant="secondary">{category.count} reports</Badge>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.dept}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">CivicConnect</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting communities with local government for better civic engagement.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">For Citizens</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/citizen" className="hover:text-foreground">
                    Report Issue
                  </Link>
                </li>
                <li>
                  <Link href="/citizen/track" className="hover:text-foreground">
                    Track Reports
                  </Link>
                </li>
                <li>
                  <Link href="/citizen/map" className="hover:text-foreground">
                    Community Map
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">For Government</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/admin" className="hover:text-foreground">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin/analytics" className="hover:text-foreground">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/admin/departments" className="hover:text-foreground">
                    Departments
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CivicConnect. Built for better communities.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
