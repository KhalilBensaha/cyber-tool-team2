"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-slate-950 font-bold">⚔</span>
            </div>
            CyberTool Hub
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-300 hover:text-white transition">
              Home
            </Link>
            <Link href="/tools" className="text-slate-300 hover:text-white transition">
              Tools
            </Link>
            <Link href="/categories" className="text-slate-300 hover:text-white transition">
              Categories
            </Link>
            <Link href="/submit" className="text-emerald-400 hover:text-emerald-300 transition font-medium">
              Submit Tool
            </Link>
            <Link href="/admin" className="text-slate-300 hover:text-white transition">
              Admin
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
              <Input
                placeholder="Search tools..."
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <button className="md:hidden text-white text-xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-800">
            <Link href="/" className="block py-2 text-slate-300 hover:text-white">
              Home
            </Link>
            <Link href="/tools" className="block py-2 text-slate-300 hover:text-white">
              Tools
            </Link>
            <Link href="/categories" className="block py-2 text-slate-300 hover:text-white">
              Categories
            </Link>
            <Link href="/submit" className="block py-2 text-emerald-400 font-medium">
              Submit Tool
            </Link>
            <Link href="/admin" className="block py-2 text-slate-300 hover:text-white">
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}