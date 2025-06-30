'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Search, MapPin, ChevronDown, MoreVertical, Star, ExternalLink, Bookmark, Share, Plus, Briefcase, DollarSign, User, Calendar } from 'lucide-react'
import { MisdeedLogo } from '@/components/ui/logo'

interface Job {
  id: number
  title: string
  description: string
  category: string
  location: string
  pay_amount: number
  pay_type: string
  contact_method: string
  username: string
  created_at: string
}

// Job categories for filtering
const JOB_CATEGORIES = [
  "All Categories",
  "Events & Gigs",
  "Creative & Design",
  "Home & Labor",
  "Tech & Digital",
  "Quirky & Miscellaneous"
]

export default function MisdeedApp() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/jobs') // Using new jobs API
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setJobs(data)
        if (data.length > 0) {
          setSelectedJob(data[0])
        }
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory && selectedCategory !== 'All Categories') {
        params.append('category', selectedCategory)
      }
      
      const response = await fetch(`/api/jobs?${params}`)
      const data = await response.json()
      
      if (Array.isArray(data)) {
        let filteredJobs = data
        
        // Client-side filtering for search query and location
        if (searchQuery) {
          filteredJobs = filteredJobs.filter(job =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        }
        
        if (searchLocation) {
          filteredJobs = filteredJobs.filter(job =>
            job.location.toLowerCase().includes(searchLocation.toLowerCase())
          )
        }
        
        setJobs(filteredJobs)
        if (filteredJobs.length > 0) {
          setSelectedJob(filteredJobs[0])
        }
      }
    } catch (error) {
      console.error('Error searching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Events & Gigs": "bg-purple-100 text-purple-800",
      "Creative & Design": "bg-pink-100 text-pink-800",
      "Home & Labor": "bg-green-100 text-green-800",
      "Tech & Digital": "bg-blue-100 text-blue-800",
      "Quirky & Miscellaneous": "bg-orange-100 text-orange-800"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const formatPay = (amount: number, type: string) => {
    if (type === "Negotiable") return "Negotiable"
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
    
    switch (type) {
      case "Hourly": return `${formatted}/hr`
      case "Per Item": return `${formatted}/item`
      default: return formatted
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <MisdeedLogo />
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 underline">Find Jobs</a>
              <a href="/company-reviews" className="text-gray-600 hover:text-gray-900">Company reviews</a>
              <a href="/salaries" className="text-gray-600 hover:text-gray-900">Find salaries</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/signin" className="text-blue-600 hover:text-blue-700">Sign in</a>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.location.href = '/post-job'}>
              <Plus className="w-4 h-4 mr-2" />
              Post a Job
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                className="pl-10 h-12 text-base"
                placeholder="Search unorthodox jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                className="pl-10 h-12 text-base"
                placeholder="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {JOB_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
              Find Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Message */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              🎯 Find Unique, Unorthodox Job Opportunities
            </h1>
            <p className="text-gray-600">
              From fake wedding dates to LEGO builders - discover creative gigs and unusual tasks that pay well
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto flex">
        {/* Job List */}
        <div className="w-1/3 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {loading ? 'Loading...' : `${jobs.length} Unique Jobs`}
              </h2>
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="overflow-y-auto max-h-screen">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading amazing jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No jobs found</div>
            ) : (
              jobs.map((job, index) => (
                <div
                  key={job.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedJob?.id === job.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2">{job.title}</h3>
                    <Badge className={`${getCategoryColor(job.category)} text-xs`}>
                      {job.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {formatPay(job.pay_amount, job.pay_type)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{job.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{job.username}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(job.created_at)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="flex-1 bg-white">
          {selectedJob ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className={`${getCategoryColor(selectedJob.category)}`}>
                      {selectedJob.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">
                        {formatPay(selectedJob.pay_amount, selectedJob.pay_type)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedJob.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Posted by {selectedJob.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{formatDate(selectedJob.created_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedJob.pay_type}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedJob.description}
                </p>
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">How to Apply</h2>
                <p className="text-gray-700 mb-4">{selectedJob.contact_method}</p>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Apply Now
                </Button>
                <Button variant="outline" className="flex-1">
                  Contact {selectedJob.username}
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a job to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
