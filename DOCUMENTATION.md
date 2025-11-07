# CyberTool Hub - Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [Components Guide](#components-guide)
7. [Routes & Pages](#routes--pages)
8. [Styling & Design System](#styling--design-system)
9. [Development Workflow](#development-workflow)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## Project Overview

**CyberTool Hub** is a modern web application built with Next.js 15 that provides a curated library of cybersecurity tools. It allows users to browse, search, filter, and submit cybersecurity tools, with an admin dashboard for managing submissions.

### Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** JavaScript (with JSX)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Fonts:** Geist Sans & Geist Mono
- **Package Manager:** npm

### Key Features
- 🔍 Search and filter cybersecurity tools
- 📂 Browse tools by category
- ✍️ Submit new tools for review
- 🛡️ Admin dashboard for managing submissions
- 📱 Fully responsive design
- 🎨 Modern dark-themed UI with gradient backgrounds

---

## Architecture

### Next.js App Router
The project uses Next.js 15's App Router architecture, which organizes routes using the file system:
- Each folder in `app/` represents a route segment
- `page.js` files define route UI
- `layout.js` files define shared UI for route segments
- Client components use `"use client"` directive
- Server components are the default

### Component Structure
```
┌─────────────────────────────────┐
│     Root Layout (layout.js)      │
│  - Global styles                 │
│  - Navbar (client component)     │
│  - Background gradient           │
└──────────────┬──────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐         ┌──────▼──────┐
│ Pages  │         │ Components  │
│ (app/) │         │ (reusable)  │
└────────┘         └─────────────┘
```

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/KhalilBensaha/cyber-tool-team2.git
cd cyber-tool
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open in browser:**
Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run start
```

---

## Project Structure

```
cyber-tool/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with Navbar
│   ├── page.js                   # Homepage
│   ├── globals.css               # Global styles (Tailwind)
│   ├── admin/                    # Admin routes
│   │   ├── page.js              # Admin dashboard
│   │   ├── loading.js           # Loading state
│   │   └── login/               # Admin login
│   │       ├── page.js
│   │       └── loading.js
│   ├── categories/              # Categories page
│   │   └── page.jsx
│   ├── data/                    # Mock data
│   │   └── index.js
│   ├── submit/                  # Tool submission page
│   │   └── page.js
│   ├── submitTool/              # Alternative submission
│   │   └── page.js
│   └── tools/                   # Tools listing page
│       └── page.jsx
├── components/                  # Reusable components
│   ├── Navbar.jsx              # Navigation component
│   └── ui/                     # shadcn/ui components
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── select.jsx
│       ├── tabs.jsx
│       └── textarea.jsx
├── lib/                        # Utility functions
│   └── utils.js               # cn() for className merging
├── public/                     # Static assets
│   └── illustrations/
├── components.json             # shadcn/ui config
├── jsconfig.json              # JavaScript config
├── next.config.mjs            # Next.js config
├── package.json               # Dependencies
├── postcss.config.mjs         # PostCSS config
└── tailwind.config.js         # Tailwind config
```

---

## Key Features

### 1. Homepage (`app/page.js`)
- **Hero section** with call-to-action
- **Featured tools grid** displaying 4 tools
- **Search functionality** (navbar integration)
- **Category filtering**
- **Footer** with links

### 2. Tools Page (`app/tools/page.jsx`)
- Complete list of cybersecurity tools
- Filter by category
- Filter by tags
- Search functionality
- Tool cards with:
  - Name & description
  - Category badge
  - GitHub stars
  - Last updated date
  - Action buttons

### 3. Categories Page (`app/categories/page.jsx`)
- Browse tools by security category
- Categories include:
  - Web Security
  - Network Security
  - Forensics
  - Malware Analysis
  - Cloud Security
  - Cryptography
  - Pentesting
  - OSINT

### 4. Submit Tool Page (`app/submit/page.js`)
- **Form validation** using react-hook-form + yup
- Required fields:
  - Tool name
  - GitHub URL (validated regex)
  - Category (dropdown)
  - Description (min 10 chars)
- Optional fields:
  - Usage instructions
  - Extra resources
- **Real-time validation** feedback
- **Submit button** disabled until form is valid

### 5. Admin Dashboard (`app/admin/page.js`)

#### Protected Route
- Checks for `adminToken` in localStorage
- Redirects to `/admin/login` if not authenticated

#### Dashboard Features
- **Statistics cards:**
  - Total Tools
  - Pending Reviews
  - Approved Submissions
  - Rejected Submissions

- **Tabs:**
  1. **Overview** - Recent activity
  2. **Pending** - Review submissions (Approve/Reject)
  3. **All Tools** - Manage existing tools (Delete)
  4. **History** - View all submission history

- **Search functionality** within submissions
- **Logout button** clears token and redirects

### 6. Admin Login (`app/admin/login/page.js`)
- Password-based authentication
- **Demo password:** `CyberTool2025!`
- Error handling with visual feedback
- Stores token in localStorage on success
- Auto-redirects to dashboard

---

## Components Guide

### Core Components

#### 1. Navbar (`components/Navbar.jsx`)
**Client Component** - Requires state management

**Features:**
- Logo with brand name
- Desktop navigation links (Home, Tools, Categories, Submit Tool, Admin)
- Search bar (desktop only)
- Mobile menu toggle
- Responsive design

**State:**
- `mobileMenuOpen` - Controls mobile menu visibility
- `searchTerm` - Manages search input

**Usage:**
```jsx
import Navbar from "@/components/Navbar"

// Used in layout.js
<Navbar />
```

#### 2. UI Components (`components/ui/`)
All UI components are from **shadcn/ui** library.

##### Button (`ui/button.jsx`)
```jsx
import { Button } from "@/components/ui/button"

// Variants: default, outline, ghost, destructive
<Button variant="outline">Click Me</Button>
<Button className="bg-emerald-500">Submit</Button>
```

##### Card (`ui/card.jsx`)
```jsx
import { Card, CardContent, CardFooter } from "@/components/ui/card"

<Card className="bg-slate-800/50">
  <CardContent>
    Content here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

##### Input (`ui/input.jsx`)
```jsx
import { Input } from "@/components/ui/input"

<Input 
  placeholder="Enter text"
  className="bg-slate-800"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

##### Tabs (`ui/tabs.jsx`)
```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

---

## Routes & Pages

### Public Routes

#### `/` - Homepage
- **File:** `app/page.js`
- **Type:** Client Component
- **Purpose:** Landing page with featured tools
- **State Management:**
  - Tools data
  - Search term
  - Selected category
  - Mobile menu toggle

#### `/tools` - Tools Listing
- **File:** `app/tools/page.jsx`
- **Type:** Client Component
- **Purpose:** Browse all tools with filters
- **Features:**
  - Category filter dropdown
  - Tag filter
  - Search bar
  - Grid layout of tool cards

#### `/categories` - Category Browser
- **File:** `app/categories/page.jsx`
- **Type:** Client Component
- **Purpose:** Browse tools by security category
- **Features:**
  - Category cards with tool counts
  - Direct navigation to filtered views

#### `/submit` - Submit Tool
- **File:** `app/submit/page.js`
- **Type:** Client Component
- **Purpose:** Submit new tools for review
- **Dependencies:**
  - react-hook-form
  - @hookform/resolvers/yup
  - yup (validation schema)

**Form Schema:**
```javascript
const schema = yup.object({
  tool: yup.string().required("Tool name is required"),
  github: yup.string()
    .matches(/^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/)
    .required("GitHub URL is required"),
  category: yup.string().required("Please select a category"),
  description: yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  instructions: yup.string().optional(),
  resources: yup.string().optional(),
})
```

### Protected Routes

#### `/admin` - Admin Dashboard
- **File:** `app/admin/page.js`
- **Type:** Client Component
- **Auth:** Requires `adminToken` in localStorage
- **Purpose:** Manage tools and submissions
- **API Calls:**
  - `GET /api/submissions` - Fetch submissions
  - `GET /api/tools` - Fetch tools
  - `PATCH /api/submissions/{id}` - Approve/Reject
  - `DELETE /api/tools/{id}` - Delete tool

#### `/admin/login` - Admin Login
- **File:** `app/admin/login/page.js`
- **Type:** Client Component
- **Auth:** Public (login page)
- **Default Password:** `CyberTool2025!`

---

## Styling & Design System

### Color Palette

#### Background Colors
```css
/* Primary gradient */
bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950

/* Card backgrounds */
bg-slate-800/50  /* Semi-transparent cards */
bg-slate-700/50  /* Nested cards */

/* Borders */
border-slate-800  /* Primary borders */
border-slate-700  /* Secondary borders */
border-slate-600  /* Tertiary borders */
```

#### Text Colors
```css
text-white          /* Primary text */
text-slate-300      /* Secondary text (links) */
text-slate-400      /* Tertiary text (descriptions) */
text-slate-500      /* Placeholder text */
```

#### Accent Colors
```css
/* Emerald (Primary CTA) */
bg-emerald-500
text-emerald-400
border-emerald-500/50

/* Amber (Warning/Pending) */
bg-amber-500/20
text-amber-400

/* Red (Error/Delete) */
bg-red-500/20
text-red-400
border-red-500/50
```

### Typography

#### Fonts
- **Sans Serif:** Geist Sans (variable font)
- **Monospace:** Geist Mono (variable font)

#### Font Sizes
```css
text-5xl md:text-6xl  /* Hero titles */
text-3xl              /* Page titles */
text-xl               /* Section headings */
text-lg               /* Card titles */
text-base             /* Body text */
text-sm               /* Meta information */
text-xs               /* Labels, badges */
```

### Component Patterns

#### Card Pattern
```jsx
<Card className="bg-slate-800/50 border-slate-700 p-6">
  <h3 className="text-lg font-bold text-white mb-2">Title</h3>
  <p className="text-slate-400 text-sm mb-4">Description</p>
  {/* Content */}
</Card>
```

#### Button Pattern
```jsx
// Primary CTA
<Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950">
  Action
</Button>

// Secondary
<Button variant="outline" className="border-slate-700 text-slate-300">
  Cancel
</Button>

// Destructive
<Button variant="outline" className="border-red-500/50 text-red-400">
  Delete
</Button>
```

#### Badge Pattern
```jsx
<span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
  Badge Text
</span>
```

---

## Development Workflow

### Adding a New Page

1. **Create the page file:**
```bash
# For a new route /about
touch app/about/page.js
```

2. **Add the component:**
```jsx
"use client" // If using state/effects

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold text-white mb-4">About</h1>
        {/* Content */}
      </div>
    </div>
  )
}
```

3. **Add to navbar (optional):**
Edit `components/Navbar.jsx`:
```jsx
<Link href="/about" className="text-slate-300 hover:text-white transition">
  About
</Link>
```

### Adding a New UI Component

1. **Install from shadcn/ui:**
```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

2. **Import and use:**
```jsx
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
```

### Creating Custom Components

1. **Create file in `components/`:**
```bash
touch components/ToolCard.jsx
```

2. **Define component:**
```jsx
import { Card } from "@/components/ui/card"

export default function ToolCard({ tool }) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <h3 className="text-lg font-bold text-white">{tool.name}</h3>
      <p className="text-slate-400 text-sm">{tool.description}</p>
    </Card>
  )
}
```

3. **Import and use:**
```jsx
import ToolCard from "@/components/ToolCard"

<ToolCard tool={toolData} />
```

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Vercel:**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel auto-detects Next.js and configures build settings
- Click "Deploy"

3. **Environment Variables (if needed):**
Add in Vercel dashboard under Settings → Environment Variables

### Other Platforms

#### Build command:
```bash
npm run build
```

#### Start command:
```bash
npm run start
```

#### Node version:
```
18.x or higher
```

---

## Troubleshooting

### Common Issues

#### 1. "Module not found: Can't resolve '@/components/ui/button'"
**Solution:** Install the component
```bash
npx shadcn@latest add button
```

#### 2. Hydration Errors
**Cause:** Server/client mismatch (often from browser extensions)

**Solution:** Add to root element in `layout.js`:
```jsx
<html lang="en" suppressHydrationWarning>
```

#### 3. Tailwind Classes Not Working
**Solution:** Ensure file is included in Tailwind config:
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

#### 4. Path Alias Not Working
**Solution:** Verify `jsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### 5. Build Errors in Production
**Solution:** Run build locally first:
```bash
npm run build
```
Fix any errors before deploying.

### Development Tips

1. **Clear Next.js cache:**
```bash
rm -rf .next
npm run dev
```

2. **Check for errors:**
Open browser console (F12) and check for errors

3. **Hot reload not working:**
Restart dev server:
```bash
# Ctrl+C to stop
npm run dev
```

4. **Formatting code:**
If you have Prettier:
```bash
npx prettier --write .
```

---

## API Integration (Future)

The app is designed to work with these API endpoints:

### Tools API
```
GET    /api/tools              # Get all tools
GET    /api/tools?status=approved  # Get approved tools
DELETE /api/tools/{id}         # Delete a tool
```

### Submissions API
```
GET    /api/submissions        # Get all submissions
POST   /api/submissions        # Create submission
PATCH  /api/submissions/{id}   # Update submission status
```

**Example Response:**
```json
{
  "id": "tool-1",
  "name": "Nmap",
  "category": "Network Security",
  "description": "Network scanner",
  "githubUrl": "https://github.com/nmap/nmap",
  "tags": ["scanning", "network"],
  "stars": 8500,
  "updated": "2 days ago",
  "status": "approved",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

---

## Contributing

### Code Style
- Use functional components
- Add `"use client"` for components with state/effects
- Use Tailwind classes (avoid inline styles)
- Keep components small and focused
- Use meaningful variable names

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add: Description of feature"

# Push and create PR
git push origin feature/new-feature
```

### Commit Message Convention
```
Add: New feature
Fix: Bug fix
Update: Improve existing feature
Remove: Delete code/feature
Docs: Documentation changes
Style: Formatting, no code change
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Yup Validation](https://github.com/jquense/yup)

---

## License

MIT License - Feel free to use this project for learning and development.

---

## Support

For questions or issues:
- Create an issue on GitHub
- Contact: [Your contact info]

---

**Last Updated:** November 7, 2025
**Version:** 1.0.0
