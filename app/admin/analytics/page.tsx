import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Download, MapPin, ArrowLeft, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Mock analytics data
const monthlyTrends = [
  { month: "Jul", reported: 198, resolved: 165, satisfaction: 4.2 },
  { month: "Aug", reported: 234, resolved: 201, satisfaction: 4.3 },
  { month: "Sep", reported: 267, resolved: 245, satisfaction: 4.1 },
  { month: "Oct", reported: 289, resolved: 267, satisfaction: 4.4 },
  { month: "Nov", reported: 312, resolved: 289, satisfaction: 4.5 },
  { month: "Dec", reported: 298, resolved: 301, satisfaction: 4.6 },
]

const categoryBreakdown = [
  { name: "Potholes", value: 156, resolved: 134, avgDays: 3.2 },
  { name: "Streetlights", value: 89, resolved: 82, avgDays: 2.1 },
  { name: "Water Issues", value: 67, resolved: 63, avgDays: 1.8 },
  { name: "Parks", value: 134, resolved: 98, avgDays: 4.1 },
  { name: "Traffic", value: 45, resolved: 41, avgDays: 2.5 },
  { name: "Other", value: 78, resolved: 65, avgDays: 3.8 },
]

const resolutionTimes = [
  { timeRange: "< 1 day", count: 45, percentage: 12 },
  { timeRange: "1-3 days", count: 156, percentage: 42 },
  { timeRange: "4-7 days", count: 98, percentage: 26 },
  { timeRange: "1-2 weeks", count: 54, percentage: 15 },
  { timeRange: "> 2 weeks", count: 18, percentage: 5 },
]

const geographicData = [
  { area: "Downtown", issues: 89, resolved: 76, avgDays: 2.8 },
  { area: "North District", issues: 67, resolved: 59, avgDays: 3.1 },
  { area: "South District", issues: 78, resolved: 71, avgDays: 3.4 },
  { area: "East Side", issues: 45, resolved: 38, avgDays: 4.2 },
  { area: "West Side", issues: 56, resolved: 48, avgDays: 3.7 },
]

export default function AnalyticsPage() {
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
            <h2 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h2>
            <p className="text-muted-foreground">
              Comprehensive insights into municipal issue reporting and resolution
            </p>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Last 6 months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last month</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="geographic">Geographic</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                      <p className="text-3xl font-bold text-foreground">1,683</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary">+8.2%</span> vs last period
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Resolution Rate</p>
                      <p className="text-3xl font-bold text-foreground">87.3%</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary">+2.1%</span> improvement
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Resolution</p>
                      <p className="text-3xl font-bold text-foreground">3.2</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary">-0.4</span> days faster
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                      <p className="text-3xl font-bold text-foreground">4.5/5</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary">+0.2</span> rating increase
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Reporting & Resolution Trends</CardTitle>
                <CardDescription>Track the volume of reported issues and resolution rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="reported"
                        stackId="1"
                        stroke="#059669"
                        fill="#059669"
                        fillOpacity={0.6}
                        name="Reported"
                      />
                      <Area
                        type="monotone"
                        dataKey="resolved"
                        stackId="2"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                        name="Resolved"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Issues by Category</CardTitle>
                  <CardDescription>Distribution and resolution rates by issue type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryBreakdown.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{category.name}</span>
                          <div className="text-right text-sm">
                            <div className="font-medium">{category.value} total</div>
                            <div className="text-muted-foreground">
                              {Math.round((category.resolved / category.value) * 100)}% resolved
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(category.resolved / category.value) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{category.resolved} resolved</span>
                          <span>{category.avgDays} days avg</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resolution Time Distribution</CardTitle>
                  <CardDescription>How quickly issues are being resolved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={resolutionTimes} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="timeRange" type="category" width={80} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#059669" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance Comparison</CardTitle>
                <CardDescription>Compare resolution times and satisfaction across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Department performance analytics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geographic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Issue reporting patterns across different areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographicData.map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{area.area}</h4>
                        <p className="text-sm text-muted-foreground">
                          {area.issues} issues • {area.resolved} resolved • {area.avgDays} days avg
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{Math.round((area.resolved / area.issues) * 100)}%</div>
                        <div className="text-xs text-muted-foreground">Resolution Rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Trends</CardTitle>
                <CardDescription>Citizen satisfaction ratings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[3.5, 5]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="satisfaction"
                        stroke="#059669"
                        strokeWidth={3}
                        dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                        name="Satisfaction Rating"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
