"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, TrendingUp, Users } from "lucide-react"
import { useWebSocket } from "@/lib/websocket"
import { cn } from "@/lib/utils"

export function LiveDashboardStats() {
  const { messages, isConnected } = useWebSocket()
  const [stats, setStats] = useState({
    totalIssues: 1247,
    resolved: 892,
    avgResolution: 3.2,
    satisfaction: 4.8,
  })

  useEffect(() => {
    // Simulate real-time stat updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalIssues: prev.totalIssues + Math.floor(Math.random() * 3),
        resolved: prev.resolved + Math.floor(Math.random() * 2),
      }))
    }, 45000) // Update every 45 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalIssues.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">+12%</span> from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
          </div>
          {isConnected && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Resolved</p>
              <p className="text-3xl font-bold text-foreground">{stats.resolved.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">+8%</span> from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
          </div>
          {isConnected && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Resolution</p>
              <p className="text-3xl font-bold text-foreground">{stats.avgResolution}</p>
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">-0.3</span> days improvement
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary" />
            </div>
          </div>
          {isConnected && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="relative">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
              <p className="text-3xl font-bold text-foreground">{stats.satisfaction}</p>
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">+0.2</span> rating increase
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          {isConnected && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function LiveActivityFeed() {
  const { messages, isConnected } = useWebSocket()
  const [activities, setActivities] = useState([
    {
      id: "1",
      type: "issue_reported",
      message: "New pothole reported on Oak Street",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      user: "Sarah Johnson",
      issueId: "CR-2024-001249",
    },
    {
      id: "2",
      type: "status_update",
      message: "Streetlight repair completed on Main Street",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      user: "Public Works Team",
      issueId: "CR-2024-001203",
    },
    {
      id: "3",
      type: "assignment",
      message: "Water main issue assigned to emergency crew",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      user: "Admin",
      issueId: "CR-2024-001248",
    },
  ])

  useEffect(() => {
    // Add new messages to activity feed
    messages.forEach((message) => {
      if (message.type === "issue_update" || message.type === "new_issue") {
        setActivities((prev) => [
          {
            id: Date.now().toString(),
            type: message.type,
            message: message.data.message || "Issue updated",
            timestamp: message.timestamp,
            user: "System",
            issueId: message.data.issueId,
          },
          ...prev.slice(0, 9),
        ]) // Keep last 10
      }
    })
  }, [messages])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "issue_reported":
        return <AlertCircle className="w-4 h-4 text-chart-2" />
      case "status_update":
        return <CheckCircle className="w-4 h-4 text-primary" />
      case "assignment":
        return <Users className="w-4 h-4 text-chart-4" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    return `${Math.floor(diffInMinutes / 60)}h ago`
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Live Activity</h3>
          <div className="flex items-center gap-2">
            <div
              className={cn("w-2 h-2 rounded-full", isConnected ? "bg-primary animate-pulse" : "bg-muted-foreground")}
            ></div>
            <span className="text-xs text-muted-foreground">{isConnected ? "Live" : "Offline"}</span>
          </div>
        </div>

        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-all duration-500",
                index === 0 && "bg-primary/5 border border-primary/20",
              )}
            >
              <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground mb-1">{activity.message}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{formatTime(activity.timestamp)}</span>
                  {activity.issueId && (
                    <>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {activity.issueId}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
