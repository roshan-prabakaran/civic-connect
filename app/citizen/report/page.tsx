import { ReportIssueForm } from "@/components/report-issue-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"

export default function ReportIssuePage() {
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Report an Issue</h2>
            <p className="text-muted-foreground text-lg">
              Help us improve your community by reporting local issues. We'll route your report to the appropriate
              department.
            </p>
          </div>

          <ReportIssueForm />
        </div>
      </div>
    </div>
  )
}
