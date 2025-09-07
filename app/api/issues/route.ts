import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, this would connect to your actual database
const issues = [
  {
    id: "1",
    title: "Pothole on Main Street",
    description: "Large pothole causing damage to vehicles",
    category: "Roads & Infrastructure",
    priority: "High",
    status: "In Progress",
    location: { lat: 40.7128, lng: -74.006, address: "123 Main St, City, State" },
    reportedBy: "John Doe",
    reportedAt: "2024-01-15T10:30:00Z",
    assignedTo: "Public Works Department",
    photos: ["/street-pothole.png"],
    updates: [
      { date: "2024-01-15T10:30:00Z", message: "Issue reported by citizen", author: "System" },
      { date: "2024-01-16T09:00:00Z", message: "Assigned to Public Works Department", author: "Admin" },
      { date: "2024-01-17T14:30:00Z", message: "Work crew dispatched to assess damage", author: "Public Works" },
    ],
  },
  {
    id: "2",
    title: "Broken Streetlight",
    description: "Streetlight not working on Oak Avenue",
    category: "Lighting",
    priority: "Medium",
    status: "Open",
    location: { lat: 40.7589, lng: -73.9851, address: "456 Oak Ave, City, State" },
    reportedBy: "Jane Smith",
    reportedAt: "2024-01-14T18:45:00Z",
    assignedTo: null,
    photos: ["/broken-streetlight-night.png"],
    updates: [{ date: "2024-01-14T18:45:00Z", message: "Issue reported by citizen", author: "System" }],
  },
  {
    id: "3",
    title: "Water Main Break",
    description: "Water flooding the intersection",
    category: "Water & Sewer",
    priority: "Critical",
    status: "Resolved",
    location: { lat: 40.7505, lng: -73.9934, address: "789 Pine St, City, State" },
    reportedBy: "Mike Johnson",
    reportedAt: "2024-01-10T06:15:00Z",
    assignedTo: "Water Department",
    photos: ["/water-main-break-flooding-street.jpg"],
    updates: [
      { date: "2024-01-10T06:15:00Z", message: "Emergency issue reported", author: "System" },
      { date: "2024-01-10T07:00:00Z", message: "Emergency crew dispatched", author: "Water Dept" },
      { date: "2024-01-10T15:30:00Z", message: "Water main repaired and tested", author: "Water Dept" },
      { date: "2024-01-11T09:00:00Z", message: "Issue resolved and verified", author: "Admin" },
    ],
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const category = searchParams.get("category")
  const priority = searchParams.get("priority")

  let filteredIssues = [...issues]

  if (status && status !== "all") {
    filteredIssues = filteredIssues.filter((issue) => issue.status.toLowerCase() === status.toLowerCase())
  }

  if (category && category !== "all") {
    filteredIssues = filteredIssues.filter((issue) => issue.category === category)
  }

  if (priority && priority !== "all") {
    filteredIssues = filteredIssues.filter((issue) => issue.priority.toLowerCase() === priority.toLowerCase())
  }

  return NextResponse.json(filteredIssues)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newIssue = {
      id: (issues.length + 1).toString(),
      title: body.title,
      description: body.description,
      category: body.category,
      priority: body.priority || "Medium",
      status: "Open",
      location: body.location,
      reportedBy: body.reportedBy || "Anonymous",
      reportedAt: new Date().toISOString(),
      assignedTo: null,
      photos: body.photos || [],
      updates: [
        {
          date: new Date().toISOString(),
          message: "Issue reported by citizen",
          author: "System",
        },
      ],
    }

    issues.push(newIssue)

    return NextResponse.json(newIssue, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create issue" }, { status: 500 })
  }
}
