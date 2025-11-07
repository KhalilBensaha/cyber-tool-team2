"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [tools, setTools] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("adminToken")
      if (!token) {
        router.push("/admin/login")
        return
      }
      setIsAuthenticated(true)
      fetchData()
    }
    checkAuth()
  }, [router])

  const fetchData = async () => {
    try {
      const [submissionsRes, toolsRes] = await Promise.all([fetch("/api/submissions"), fetch("/api/tools")])
      setSubmissions(await submissionsRes.json())
      setTools(await toolsRes.json())
    } catch (err) {
      console.error("Failed to fetch data:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  const handleApprove = async (id) => {
    try {
      await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      })
      setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: "approved" } : s)))
    } catch (err) {
      console.error("Failed to approve:", err)
    }
  }

  const handleReject = async (id) => {
    try {
      await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      })
      setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: "rejected" } : s)))
    } catch (err) {
      console.error("Failed to reject:", err)
    }
  }

  const handleDeleteTool = async (id) => {
    if (confirm("Are you sure you want to delete this tool?")) {
      try {
        await fetch(`/api/tools/${id}`, { method: "DELETE" })
        setTools(tools.filter((t) => t.id !== id))
      } catch (err) {
        console.error("Failed to delete:", err)
      }
    }
  }

  if (!isAuthenticated) {
    return null
  }

  const pendingSubmissions = submissions.filter((s) => s.status === "pending")
  const approvedSubmissions = submissions.filter((s) => s.status === "approved")
  const rejectedSubmissions = submissions.filter((s) => s.status === "rejected")

  const filteredSubmissions = submissions.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const stats = [
    { label: "Total Tools", value: tools.length, icon: "📊", color: "emerald" },
    { label: "Pending Reviews", value: pendingSubmissions.length, icon: "⏳", color: "amber" },
    { label: "Approved", value: approvedSubmissions.length, icon: "✓", color: "emerald" },
    { label: "Rejected", value: rejectedSubmissions.length, icon: "✕", color: "red" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Admin Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Admin Dashboard
              </h1>
              <p className="text-slate-400 mt-1">Manage tools and review submissions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-slate-400 text-sm">Welcome, Admin</p>
                <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
              >
                <span className="mr-2">🚪</span>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const colorClasses = {
              emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
              amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
              red: "bg-red-500/20 text-red-400 border-red-500/30",
            }
            return (
              <Card
                key={idx}
                className={`border ${colorClasses[stat.color]} bg-slate-800/50 p-6`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <span className="text-3xl opacity-50">{stat.icon}</span>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              Pending ({pendingSubmissions.length})
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              All Tools
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
            >
              History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {submissions.slice(0, 5).map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex-1">
                      <p className="text-white font-semibold">{sub.name}</p>
                      <p className="text-slate-400 text-sm">{sub.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sub.status === "pending"
                            ? "bg-amber-500/20 text-amber-400"
                            : sub.status === "approved"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Pending Tab */}
          <TabsContent value="pending" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Pending Submissions</h2>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredSubmissions
                  .filter((s) => s.status === "pending")
                  .map((sub) => (
                    <Card key={sub.id} className="bg-slate-700/50 border-slate-600 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">{sub.name}</h3>
                          <p className="text-slate-400 text-sm mb-2">{sub.description}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="px-2 py-1 bg-slate-600 rounded">{sub.category}</span>
                            <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <a href={sub.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300 hover:bg-slate-600 bg-transparent"
                          >
                            👁 View
                          </Button>
                        </a>
                      </div>
                      <div className="flex gap-3 pt-4 border-t border-slate-600">
                        <Button
                          onClick={() => handleApprove(sub.id)}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold"
                        >
                          ✓ Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(sub.id)}
                          variant="outline"
                          className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                        >
                          ✕ Reject
                        </Button>
                      </div>
                    </Card>
                  ))}
                {filteredSubmissions.filter((s) => s.status === "pending").length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-slate-400">No pending submissions</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">All Tools ({tools.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Stars</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-semibold">Updated</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map((tool) => (
                      <tr key={tool.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
                        <td className="py-3 px-4 text-white font-semibold">{tool.name}</td>
                        <td className="py-3 px-4 text-slate-400">{tool.category}</td>
                        <td className="py-3 px-4 text-slate-400">⭐ {tool.stars}k</td>
                        <td className="py-3 px-4 text-slate-400">{tool.updated}</td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            onClick={() => handleDeleteTool(tool.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            🗑
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Submission History</h2>
              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex-1">
                      <p className="text-white font-semibold">{sub.name}</p>
                      <p className="text-slate-400 text-sm">
                        {sub.category} • {new Date(sub.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        sub.status === "pending"
                          ? "bg-amber-500/20 text-amber-400"
                          : sub.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
