"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, MoreVertical, Clock, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  sender: "citizen" | "admin" | "system"
  senderName: string
  message: string
  timestamp: string
  read: boolean
  type?: "text" | "status_update" | "image"
}

export function IssueChat({ issueId }: { issueId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "system",
      senderName: "CivicConnect",
      message: "Your issue has been received and assigned ID CR-2024-001247. We will keep you updated on progress.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
      type: "status_update",
    },
    {
      id: "2",
      sender: "admin",
      senderName: "Mike Davis - Public Works",
      message:
        "Thank you for reporting this pothole. Our team has reviewed the location and we have scheduled a repair crew for this week.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      read: true,
    },
    {
      id: "3",
      sender: "citizen",
      senderName: "You",
      message: "Great! Will there be any traffic disruptions during the repair?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: true,
    },
    {
      id: "4",
      sender: "admin",
      senderName: "Mike Davis - Public Works",
      message:
        "The repair should take about 2-3 hours. We will set up traffic cones but expect minimal disruption. Work is scheduled for tomorrow morning at 9 AM.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: false,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: "citizen",
      senderName: "You",
      message: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate admin response after a delay
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const adminResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "admin",
          senderName: "Mike Davis - Public Works",
          message: "Thanks for the question! I will check with the team and get back to you shortly.",
          timestamp: new Date().toISOString(),
          read: false,
        }
        setMessages((prev) => [...prev, adminResponse])
      }, 2000)
    }, 1000)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Issue Discussion</CardTitle>
            <CardDescription>Chat with municipal staff about your issue</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {issueId}
            </Badge>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => {
              const showDate =
                index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="text-center my-4">
                      <Badge variant="outline" className="text-xs">
                        {formatDate(message.timestamp)}
                      </Badge>
                    </div>
                  )}

                  <div
                    className={cn(
                      "flex gap-3",
                      message.sender === "citizen" && "flex-row-reverse",
                      message.sender === "system" && "justify-center",
                    )}
                  >
                    {message.sender !== "system" && message.sender !== "citizen" && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {message.senderName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={cn(
                        "max-w-[70%] space-y-1",
                        message.sender === "citizen" && "items-end",
                        message.sender === "system" && "max-w-[90%] text-center",
                      )}
                    >
                      {message.sender !== "system" && message.sender !== "citizen" && (
                        <div className="text-xs text-muted-foreground">{message.senderName}</div>
                      )}

                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm",
                          message.sender === "citizen" && "bg-primary text-primary-foreground",
                          message.sender === "admin" && "bg-muted",
                          message.sender === "system" && "bg-muted/50 text-muted-foreground italic",
                        )}
                      >
                        {message.message}
                      </div>

                      <div
                        className={cn(
                          "flex items-center gap-1 text-xs text-muted-foreground",
                          message.sender === "citizen" && "justify-end",
                        )}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(message.timestamp)}</span>
                        {message.sender === "citizen" && (
                          <CheckCheck
                            className={cn("w-3 h-3", message.read ? "text-primary" : "text-muted-foreground")}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">MD</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
