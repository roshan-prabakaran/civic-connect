// Database connection and query utilities for CivicConnect
import { neon } from "@neondatabase/serverless"

let sql: any = null

if (process.env.DATABASE_URL) {
  try {
    sql = neon(process.env.DATABASE_URL)
  } catch (error) {
    console.log("[Database] Failed to connect to database, using mock data:", error)
  }
}

// Database types
export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  role: "citizen" | "admin" | "department_head" | "field_staff"
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  name: string
  description?: string
  contact_email?: string
  contact_phone?: string
  is_active: boolean
  created_at: string
}

export interface IssueCategory {
  id: string
  name: string
  description?: string
  department_id: string
  priority_level: number
  estimated_resolution_days: number
  is_active: boolean
  created_at: string
}

export interface Issue {
  id: string
  title: string
  description: string
  category_id: string
  reporter_id: string
  assigned_to?: string
  department_id?: string
  status: "reported" | "acknowledged" | "in_progress" | "resolved" | "closed" | "rejected"
  priority: "low" | "medium" | "high" | "urgent"
  location_lat?: number
  location_lng?: number
  location_address?: string
  image_urls?: string[]
  estimated_resolution_date?: string
  actual_resolution_date?: string
  citizen_rating?: number
  citizen_feedback?: string
  internal_notes?: string
  created_at: string
  updated_at: string
}

export interface IssueUpdate {
  id: string
  issue_id: string
  user_id: string
  update_type: "comment" | "status_change" | "assignment" | "resolution"
  message: string
  old_status?: string
  new_status?: string
  is_public: boolean
  created_at: string
}

// Database query functions
export async function getIssues(filters?: {
  status?: string
  category_id?: string
  department_id?: string
  reporter_id?: string
  limit?: number
  offset?: number
}) {
  // Mock data fallback for demo purposes
  const mockIssues = [
    {
      id: "1",
      title: "Pothole on Main Street",
      description: "Large pothole causing damage to vehicles near the intersection of Main St and Oak Ave.",
      category_id: "1",
      category_name: "Roads & Infrastructure",
      reporter_id: "1",
      reporter_name: "John Doe",
      department_id: "1",
      department_name: "Public Works",
      status: "in_progress",
      priority: "high",
      location_lat: 40.7128,
      location_lng: -74.006,
      location_address: "123 Main St, City, State",
      image_urls: ["/street-pothole.png"],
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-16T14:20:00Z",
    },
    {
      id: "2",
      title: "Broken Streetlight",
      description: "Streetlight not working on Oak Avenue, creating safety concerns for pedestrians.",
      category_id: "2",
      category_name: "Lighting",
      reporter_id: "2",
      reporter_name: "Jane Smith",
      department_id: "1",
      department_name: "Public Works",
      status: "reported",
      priority: "medium",
      location_lat: 40.7589,
      location_lng: -73.9851,
      location_address: "456 Oak Ave, City, State",
      image_urls: ["/broken-streetlight-night.png"],
      created_at: "2024-01-14T18:45:00Z",
      updated_at: "2024-01-14T18:45:00Z",
    },
    {
      id: "3",
      title: "Water Main Break",
      description: "Water flooding the intersection, emergency repair needed.",
      category_id: "3",
      category_name: "Water & Sewer",
      reporter_id: "3",
      reporter_name: "Mike Johnson",
      department_id: "2",
      department_name: "Water Department",
      status: "resolved",
      priority: "urgent",
      location_lat: 40.7505,
      location_lng: -73.9934,
      location_address: "789 Pine St, City, State",
      image_urls: ["/water-main-break-flooding-street.jpg"],
      created_at: "2024-01-10T06:15:00Z",
      updated_at: "2024-01-11T09:00:00Z",
    },
  ]

  try {
    // Try database connection first
    if (sql) {
      let query = `
        SELECT i.*, 
               c.name as category_name,
               d.name as department_name,
               u.first_name || ' ' || u.last_name as reporter_name
        FROM issues i
        LEFT JOIN issue_categories c ON i.category_id = c.id
        LEFT JOIN departments d ON i.department_id = d.id
        LEFT JOIN users u ON i.reporter_id = u.id
        WHERE 1=1
      `

      const params: any[] = []
      let paramIndex = 1

      if (filters?.status) {
        query += ` AND i.status = $${paramIndex}`
        params.push(filters.status)
        paramIndex++
      }

      if (filters?.category_id) {
        query += ` AND i.category_id = $${paramIndex}`
        params.push(filters.category_id)
        paramIndex++
      }

      if (filters?.department_id) {
        query += ` AND i.department_id = $${paramIndex}`
        params.push(filters.department_id)
        paramIndex++
      }

      if (filters?.reporter_id) {
        query += ` AND i.reporter_id = $${paramIndex}`
        params.push(filters.reporter_id)
        paramIndex++
      }

      query += ` ORDER BY i.created_at DESC`

      if (filters?.limit) {
        query += ` LIMIT $${paramIndex}`
        params.push(filters.limit)
        paramIndex++
      }

      if (filters?.offset) {
        query += ` OFFSET $${paramIndex}`
        params.push(filters.offset)
      }

      return await sql(query, params)
    }
  } catch (error) {
    console.log("[Database] Using mock data fallback:", error)
  }

  // Apply filters to mock data
  let filteredIssues = [...mockIssues]

  if (filters?.status) {
    filteredIssues = filteredIssues.filter((issue) => issue.status === filters.status)
  }

  if (filters?.limit) {
    filteredIssues = filteredIssues.slice(0, filters.limit)
  }

  return filteredIssues
}

export async function createIssue(issue: Omit<Issue, "id" | "created_at" | "updated_at">) {
  try {
    if (sql) {
      const result = await sql`
        INSERT INTO issues (
          title, description, category_id, reporter_id, status, priority,
          location_lat, location_lng, location_address, image_urls
        ) VALUES (
          ${issue.title}, ${issue.description}, ${issue.category_id}, ${issue.reporter_id},
          ${issue.status}, ${issue.priority}, ${issue.location_lat}, ${issue.location_lng},
          ${issue.location_address}, ${issue.image_urls}
        )
        RETURNING *
      `
      return result[0]
    }
  } catch (error) {
    console.log("[Database] Using mock createIssue fallback:", error)
  }

  // Mock response for demo
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...issue,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

export async function updateIssueStatus(issueId: string, status: Issue["status"], userId: string, message?: string) {
  try {
    if (sql) {
      // Update the issue status
      const result = await sql`
        UPDATE issues 
        SET status = ${status}, updated_at = NOW()
        WHERE id = ${issueId}
        RETURNING *
      `

      // Add an update record
      if (message) {
        await sql`
          INSERT INTO issue_updates (issue_id, user_id, update_type, message, new_status)
          VALUES (${issueId}, ${userId}, 'status_change', ${message}, ${status})
        `
      }

      return result[0]
    }
  } catch (error) {
    console.log("[Database] Using mock updateIssueStatus fallback:", error)
  }

  // Mock response for demo
  return {
    id: issueId,
    status,
    updated_at: new Date().toISOString(),
  }
}

export async function getDepartments() {
  // Mock departments fallback
  const mockDepartments = [
    {
      id: "1",
      name: "Public Works",
      description: "Responsible for road maintenance, streetlights, and general infrastructure.",
      contact_email: "publicworks@city.gov",
      contact_phone: "(555) 123-4567",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Water & Sewer",
      description: "Manages water supply, sewer systems, and related infrastructure.",
      contact_email: "water@city.gov",
      contact_phone: "(555) 123-4568",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "3",
      name: "Parks & Recreation",
      description: "Maintains parks, playgrounds, and recreational facilities.",
      contact_email: "parks@city.gov",
      contact_phone: "(555) 123-4569",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "4",
      name: "Transportation",
      description: "Handles traffic signals, signage, and transportation infrastructure.",
      contact_email: "transport@city.gov",
      contact_phone: "(555) 123-4570",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "5",
      name: "Environmental Services",
      description: "Waste management, recycling, and environmental compliance.",
      contact_email: "environment@city.gov",
      contact_phone: "(555) 123-4571",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "6",
      name: "Code Enforcement",
      description: "Building codes, zoning violations, and property maintenance.",
      contact_email: "code@city.gov",
      contact_phone: "(555) 123-4572",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
  ]

  try {
    if (sql) {
      return await sql`
        SELECT * FROM departments 
        WHERE is_active = true 
        ORDER BY name
      `
    }
  } catch (error) {
    console.log("[Database] Using mock departments fallback:", error)
  }

  return mockDepartments
}

export async function getIssueCategories() {
  // Mock categories fallback
  const mockCategories = [
    {
      id: "1",
      name: "Roads & Infrastructure",
      description: "Potholes, road damage, sidewalk issues",
      department_id: "1",
      department_name: "Public Works",
      priority_level: 3,
      estimated_resolution_days: 7,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      name: "Lighting",
      description: "Streetlight outages, broken fixtures",
      department_id: "1",
      department_name: "Public Works",
      priority_level: 2,
      estimated_resolution_days: 3,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "3",
      name: "Water & Sewer",
      description: "Water leaks, sewer backups, drainage issues",
      department_id: "2",
      department_name: "Water & Sewer",
      priority_level: 4,
      estimated_resolution_days: 2,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "4",
      name: "Parks & Recreation",
      description: "Playground equipment, park maintenance",
      department_id: "3",
      department_name: "Parks & Recreation",
      priority_level: 1,
      estimated_resolution_days: 14,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "5",
      name: "Traffic & Transportation",
      description: "Traffic signals, road signs, crosswalks",
      department_id: "4",
      department_name: "Transportation",
      priority_level: 3,
      estimated_resolution_days: 5,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "6",
      name: "Waste Management",
      description: "Garbage collection, recycling issues",
      department_id: "5",
      department_name: "Environmental Services",
      priority_level: 2,
      estimated_resolution_days: 1,
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
    },
  ]

  try {
    if (sql) {
      return await sql`
        SELECT c.*, d.name as department_name
        FROM issue_categories c
        LEFT JOIN departments d ON c.department_id = d.id
        WHERE c.is_active = true
        ORDER BY c.name
      `
    }
  } catch (error) {
    console.log("[Database] Using mock categories fallback:", error)
  }

  return mockCategories
}
