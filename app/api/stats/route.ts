import { NextResponse } from "next/server"

export async function GET() {
  // Mock statistics - in production, this would query your database
  const stats = {
    totalIssues: 1247,
    resolvedIssues: 892,
    inProgressIssues: 234,
    openIssues: 121,
    averageResolutionTime: 3.2,
    citizenSatisfaction: 4.8,
    departmentStats: [
      { name: "Public Works", total: 456, resolved: 389, inProgress: 45, open: 22 },
      { name: "Water & Sewer", total: 234, resolved: 198, inProgress: 28, open: 8 },
      { name: "Parks & Recreation", total: 189, resolved: 156, inProgress: 23, open: 10 },
      { name: "Transportation", total: 167, resolved: 134, inProgress: 21, open: 12 },
      { name: "Code Enforcement", total: 201, resolved: 167, inProgress: 24, open: 10 },
    ],
    categoryStats: [
      { category: "Potholes", count: 156, resolved: 134 },
      { category: "Streetlights", count: 89, resolved: 76 },
      { category: "Water Issues", count: 67, resolved: 58 },
      { category: "Park Maintenance", count: 134, resolved: 112 },
      { category: "Traffic Signals", count: 45, resolved: 38 },
      { category: "Code Violations", count: 78, resolved: 65 },
    ],
    monthlyTrends: [
      { month: "Jan", reported: 98, resolved: 87 },
      { month: "Feb", reported: 112, resolved: 95 },
      { month: "Mar", reported: 134, resolved: 118 },
      { month: "Apr", reported: 156, resolved: 142 },
      { month: "May", reported: 178, resolved: 165 },
      { month: "Jun", reported: 145, resolved: 134 },
    ],
  }

  return NextResponse.json(stats)
}
