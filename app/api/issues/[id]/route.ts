import { type NextRequest, NextResponse } from "next/server"

// This would connect to your actual database in production
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
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const issue = issues.find((i) => i.id === params.id)

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 })
  }

  return NextResponse.json(issue)
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const issueIndex = issues.findIndex((i) => i.id === params.id)

    if (issueIndex === -1) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 })
    }

    // Update issue
    issues[issueIndex] = { ...issues[issueIndex], ...body }

    // Add update log if status changed
    if (body.status) {
      issues[issueIndex].updates.push({
        date: new Date().toISOString(),
        message: `Status updated to ${body.status}`,
        author: "Admin",
      })
    }

    return NextResponse.json(issues[issueIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update issue" }, { status: 500 })
  }
}
