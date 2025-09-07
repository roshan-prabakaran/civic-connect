"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Camera, MapPin, Upload, X, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const issueCategories = [
  { id: "pothole", name: "Pothole", department: "Public Works", priority: "Medium" },
  { id: "streetlight", name: "Broken Streetlight", department: "Public Works", priority: "Low" },
  { id: "water-main", name: "Water Main Break", department: "Water & Sewer", priority: "High" },
  { id: "sewer", name: "Sewer Backup", department: "Water & Sewer", priority: "High" },
  { id: "playground", name: "Damaged Playground", department: "Parks & Recreation", priority: "Medium" },
  { id: "graffiti", name: "Graffiti", department: "Parks & Recreation", priority: "Low" },
  { id: "traffic-light", name: "Traffic Light Malfunction", department: "Transportation", priority: "High" },
  { id: "illegal-parking", name: "Illegal Parking", department: "Transportation", priority: "Low" },
  { id: "trash", name: "Overflowing Trash", department: "Environmental Services", priority: "Medium" },
  { id: "dumping", name: "Illegal Dumping", department: "Environmental Services", priority: "Medium" },
]

export function ReportIssueForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    images: [] as File[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (formData.images.length + files.length > 3) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 3 images.",
        variant: "destructive",
      })
      return
    }
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setFormData((prev) => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }))
          toast({
            title: "Location captured",
            description: "Your current location has been added to the report.",
          })
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enter the address manually.",
            variant: "destructive",
          })
        },
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          location: {
            address: formData.location,
            lat: null, // Would be populated from geolocation
            lng: null,
          },
          reportedBy: "Anonymous User", // In real app, would use authenticated user
          photos: formData.images.map((img) => img.name), // In real app, would upload images first
        }),
      })

      if (response.ok) {
        const newIssue = await response.json()
        setIsSubmitted(true)

        toast({
          title: "Issue reported successfully!",
          description: `Your report has been assigned ID #${newIssue.id}. We'll keep you updated on progress.`,
        })
      } else {
        throw new Error("Failed to submit issue")
      }
    } catch (error) {
      toast({
        title: "Error submitting report",
        description: "Please try again later or contact support if the problem persists.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-2 border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Report Submitted Successfully!</h3>
          <p className="text-muted-foreground mb-4">
            Your issue has been reported and assigned ID <strong>#CR-2024-001247</strong>. We'll send you updates as we
            work to resolve it.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ title: "", description: "", category: "", location: "", images: [] })
              }}
            >
              Report Another Issue
            </Button>
            <Button variant="outline" asChild>
              <a href="/citizen/my-reports">View My Reports</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const selectedCategory = issueCategories.find((cat) => cat.id === formData.category)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Issue Category */}
      <Card>
        <CardHeader>
          <CardTitle>Issue Category</CardTitle>
          <CardDescription>
            Select the type of issue you're reporting. This helps us route it to the right department.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an issue category" />
            </SelectTrigger>
            <SelectContent>
              {issueCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{category.name}</span>
                    <div className="flex gap-2 ml-4">
                      <Badge variant="outline" className="text-xs">
                        {category.department}
                      </Badge>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCategory && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Department:</span>
                <Badge variant="secondary">{selectedCategory.department}</Badge>
                <span className="font-medium">Priority:</span>
                <Badge
                  variant={
                    selectedCategory.priority === "High"
                      ? "destructive"
                      : selectedCategory.priority === "Medium"
                        ? "default"
                        : "outline"
                  }
                >
                  {selectedCategory.priority}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Issue Details */}
      <Card>
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
          <CardDescription>Provide a clear title and detailed description of the issue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              placeholder="e.g., Large pothole on Main Street"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the issue in detail. Include any relevant information that might help with resolution."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>
            Help us locate the issue by providing an address or using your current location.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="location">Address or Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter street address or coordinates"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                required
              />
              <Button type="button" variant="outline" onClick={getCurrentLocation}>
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card>
        <CardHeader>
          <CardTitle>Photos (Optional)</CardTitle>
          <CardDescription>
            Upload up to 3 photos to help illustrate the issue. Photos help us understand and prioritize the problem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.images.length < 3 && (
              <div>
                <Label htmlFor="images" className="cursor-pointer">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload photos or drag and drop</p>
                  </div>
                </Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            )}

            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <Card>
        <CardContent className="p-6">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={
              isSubmitting || !formData.title || !formData.description || !formData.category || !formData.location
            }
          >
            {isSubmitting ? (
              <>
                <Upload className="w-4 h-4 mr-2 animate-spin" />
                Submitting Report...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Submit Issue Report
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-3">
            By submitting this report, you agree to our terms of service and privacy policy.
          </p>
        </CardContent>
      </Card>
    </form>
  )
}
