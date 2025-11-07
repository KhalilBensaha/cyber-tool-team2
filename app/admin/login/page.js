"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Default admin password - in production, use proper authentication
  const ADMIN_PASSWORD = "CyberTool2025!"

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (password === ADMIN_PASSWORD) {
        // Store token in localStorage
        localStorage.setItem("adminToken", "admin_" + Date.now())
        router.push("/admin")
      } else {
        setError("Invalid password. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-slate-400">Enter your password to access the dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
            <span className="text-xl">⚠</span>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white font-semibold mb-2">Admin Password</label>
            <Input
              type="password"
              placeholder="Enter admin password"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold py-6 text-lg"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
          <p className="text-slate-400 text-xs text-center">
            Demo Password: <span className="text-emerald-400 font-mono">CyberTool2025!</span>
          </p>
        </div>
      </Card>
    </div>
  )
}
