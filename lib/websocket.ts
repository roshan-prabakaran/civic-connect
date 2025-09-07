// WebSocket client for real-time features
"use client"

import { useEffect, useRef, useState } from "react"

export interface WebSocketMessage {
  type: "issue_update" | "new_issue" | "status_change" | "assignment" | "notification"
  data: any
  timestamp: string
  userId?: string
  issueId?: string
}

export function useWebSocket(url = "/api/ws") {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<WebSocketMessage[]>([])
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = () => {
    try {
      // In a real implementation, this would connect to your WebSocket server
      // For demo purposes, we'll simulate WebSocket behavior
      console.log("[WebSocket] Connecting to real-time server...")
      setIsConnected(true)

      // Simulate receiving messages
      const interval = setInterval(() => {
        const mockMessage: WebSocketMessage = {
          type: "issue_update",
          data: {
            issueId: "mock-issue-" + Date.now(),
            status: "in_progress",
            message: "Issue status updated by municipal staff",
          },
          timestamp: new Date().toISOString(),
        }
        setMessages((prev) => [...prev.slice(-9), mockMessage])
      }, 30000) // Every 30 seconds

      return () => {
        clearInterval(interval)
        setIsConnected(false)
      }
    } catch (error) {
      console.error("[WebSocket] Connection failed:", error)
      setIsConnected(false)

      // Retry connection after 5 seconds
      reconnectTimeoutRef.current = setTimeout(connect, 5000)
    }
  }

  useEffect(() => {
    const cleanup = connect()

    return () => {
      if (cleanup) cleanup()
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [])

  const sendMessage = (message: Omit<WebSocketMessage, "timestamp">) => {
    if (isConnected) {
      console.log("[WebSocket] Sending message:", message)
      // In a real implementation, this would send via WebSocket
      // For demo, we'll just add it to local messages
      setMessages((prev) => [...prev.slice(-9), { ...message, timestamp: new Date().toISOString() }])
    }
  }

  return {
    isConnected,
    messages,
    sendMessage,
    clearMessages: () => setMessages([]),
  }
}

// Hook for real-time notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      title: string
      message: string
      type: "info" | "success" | "warning" | "error"
      timestamp: string
      read: boolean
      issueId?: string
    }>
  >([
    {
      id: "1",
      title: "Issue Status Updated",
      message: "Your pothole report on Main Street has been assigned to a work crew.",
      type: "info",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      read: false,
      issueId: "CR-2024-001247",
    },
    {
      id: "2",
      title: "Issue Resolved",
      message: "The broken streetlight on Elm Street has been repaired.",
      type: "success",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: false,
      issueId: "CR-2024-001203",
    },
    {
      id: "3",
      title: "New Issue Reported",
      message: "A new water main break has been reported in your area.",
      type: "warning",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      read: true,
      issueId: "CR-2024-001248",
    },
  ])

  const addNotification = (notification: Omit<(typeof notifications)[0], "id" | "timestamp" | "read">) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev.slice(0, 19)]) // Keep last 20
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
  }
}
