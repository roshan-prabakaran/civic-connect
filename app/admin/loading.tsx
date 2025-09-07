export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
          <div className="w-5 h-5 bg-primary-foreground rounded"></div>
        </div>
        <p className="text-muted-foreground">Loading admin dashboard...</p>
      </div>
    </div>
  )
}
