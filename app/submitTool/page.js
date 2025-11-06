"use client"


import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SubmitToolPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    githubUrl: "",
    category: "",
    description: "",
    usage: "",
    resources: "",
    tags: "",
  })

  const categories = [
    "Web Security",
    "Network Security",
    "Forensics",
    "Malware Analysis",
    "Cloud Security",
    "Cryptography",
    "Pentesting",
    "OSINT",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      })

      if (!response.ok) throw new Error("Failed to submit tool")

      setSuccess(true)
      setTimeout(() => router.push("/"), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">Submit a Tool</h1>
          <p className="text-slate-400">Help us grow our curated library of cybersecurity tools.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-slate-800/50 border-slate-700 p-8">
          {success && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="text-emerald-400 font-semibold">Tool submitted successfully!</p>
                <p className="text-emerald-300 text-sm">Our team will review it shortly.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
              <span className="text-2xl">⚠</span>
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tool Name */}
            <div>
              <label className="block text-white font-semibold mb-2">Tool Name *</label>
              <Input
                placeholder="e.g., Nmap"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-white font-semibold mb-2">GitHub URL *</label>
              <Input
                placeholder="https://github.com/user/repo"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-white font-semibold mb-2">Category *</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white font-semibold mb-2">Short Description *</label>
              <Textarea
                placeholder="Provide a brief description of the tool"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-24"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {/* Usage Instructions */}
            <div>
              <label className="block text-white font-semibold mb-2">Usage Instructions (Optional)</label>
              <Textarea
                placeholder="Provide instructions on how to use the tool"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-24"
                value={formData.usage}
                onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
              />
            </div>

            {/* Resources */}
            <div>
              <label className="block text-white font-semibold mb-2">Extra Resources/Links (Optional)</label>
              <Textarea
                placeholder="Add any extra resources or links related to the tool"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 min-h-20"
                value={formData.resources}
                onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-white font-semibold mb-2">Tags (comma-separated, Optional)</label>
              <Input
                placeholder="e.g., Network Scanner, Security Auditing, Open Source"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold py-6 text-lg"
            >
              {loading ? "Submitting..." : "Submit for Review"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
