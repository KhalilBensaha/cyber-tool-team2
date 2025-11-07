"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"


export default function ToolsPage() {
  const [tools, setTools] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  useEffect(() => {
    fetch("/api/tools?status=approved")
      .then((res) => res.json())
      .then((data) => setTools(data))
  }, [])

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
  const allTags = Array.from(new Set(tools.flatMap((t) => t.tags)))

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || tool.category === selectedCategory
    const matchesTag = !selectedTag || tool.tags.includes(selectedTag)
    return matchesSearch && matchesCategory && matchesTag
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-white mb-4">Security Tools</h1>
          <p className="text-slate-400">Browse our collection of {tools.length} cybersecurity tools</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold text-white mb-3">Search</h3>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                  <Input
                    placeholder="Search tools..."
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-white mb-3">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      !selectedCategory
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === cat
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-semibold text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, 8).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        selectedTag === tag
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTools.map((tool) => (
                <Card
                  key={tool.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{tool.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span>⭐ {tool.stars}k</span>
                    <span>Updated {tool.updated}</span>
                  </div>
                  <Link href={`/tools/${tool.id}`}>
                    <Button
                      variant="outline"
                      className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
                    >
                      View Tool
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No tools found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
