"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"


export default function Home() {
  const [tools, setTools] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Fetch approved tools
    fetch("/api/tools?status=approved")
      .then((res) => res.json())
      .then((data) => setTools(data))
  }, [])

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || tool.category === selectedCategory
    return matchesSearch && matchesCategory
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
            A curated library of cybersecurity tools from GitHub & beyond.
          </h1>
          <p className="text-xl text-slate-400 mb-8 text-balance">
            Discover, filter, and contribute to the best collection of open-source security tools.
          </p>
          <Link href="/tools">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-8 py-6 text-lg">
              Browse Tools
            </Button>
          </Link>
        </div>

        {/* Featured Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTools.slice(0, 4).map((tool) => (
            <Card key={tool.id} className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition p-6">
              <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{tool.description}</p>
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
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="/tools" className="hover:text-white transition">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/submit" className="hover:text-white transition">
                    Submit
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>© 2025 CyberTool Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
