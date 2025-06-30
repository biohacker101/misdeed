'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Search, MapPin, ChevronDown, MoreVertical, Star, ExternalLink, Bookmark, Share, AlertTriangle, Shield } from 'lucide-react'
import { MisdeedLogo } from '@/components/ui/logo'

interface Misdeed {
  id: number
  job_title: string
  company_name: string
  description: string
  location: string
  original_url: string
  source_platform: string
  scam_score: number
  scam_reasons: string[]
  date_scraped: string
}

export default function MisdeedApp() {
  const [misdeeds, setMisdeeds] = useState<Misdeed[]>([])
  const [selectedMisdeed, setSelectedMisdeed] = useState<Misdeed | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLocation, setSearchLocation] = useState('')

  useEffect(() => {
    fetchMisdeeds()
  }, [])

  const fetchMisdeeds = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/misdeeds')
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setMisdeeds(data)
        if (data.length > 0) {
          setSelectedMisdeed(data[0])
        }
      }
    } catch (error) {
      console.error('Error fetching misdeeds:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      
      const response = await fetch(`/api/misdeeds?${params}`)
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setMisdeeds(data)
        if (data.length > 0) {
          setSelectedMisdeed(data[0])
        }
      }
    } catch (error) {
      console.error('Error searching misdeeds:', error)
    } finally {
      setLoading(false)
    }
  }

  const getScamBadgeColor = (score: number) => {
    if (score >= 15) return 'bg-red-600'
    if (score >= 10) return 'bg-red-500'
    if (score >= 5) return 'bg-orange-500'
    return 'bg-yellow-500'
  }

  const getScamLevel = (score: number) => {
    if (score >= 15) return 'EXTREME RISK'
    if (score >= 10) return 'HIGH RISK'
    if (score >= 5) return 'MODERATE RISK'
    return 'LOW RISK'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <MisdeedLogo />
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 underline">Home</a>
              <a href="/company-reviews" className="text-gray-600 hover:text-gray-900">Company reviews</a>
              <a href="/salaries" className="text-gray-600 hover:text-gray-900">Find salaries</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/signin" className="text-blue-600 hover:text-blue-700">Sign in</a>
            <a href="/employers" className="text-gray-600 hover:text-gray-900">Employers / Post Job</a>
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
                placeholder="Search scam job types..."
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
            <Button onClick={handleSearch} className="h-12 px-8 bg-red-600 hover:bg-red-700">
              Search Scams
            </Button>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border-b border-red-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-red-800">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">
              ⚠️ WARNING: These are SCAM job postings detected by our AI system. Do not apply or provide personal information!
            </span>
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
                {loading ? 'Loading...' : `${misdeeds.length} Scam Jobs Found`}
              </h2>
              <Shield className="w-5 h-5 text-red-600" />
            </div>
          </div>

          <div className="overflow-y-auto max-h-screen">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading scam jobs...</div>
            ) : misdeeds.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No scam jobs found</div>
            ) : (
              misdeeds.map((misdeed, index) => (
                <div
                  key={misdeed.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedMisdeed?.id === misdeed.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => setSelectedMisdeed(misdeed)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2">{misdeed.job_title}</h3>
                    <Badge className={`${getScamBadgeColor(misdeed.scam_score)} text-white text-xs`}>
                      {misdeed.scam_score}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{misdeed.company_name}</p>
                  <p className="text-sm text-gray-500 mb-2">{misdeed.location}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {getScamLevel(misdeed.scam_score)}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {new Date(misdeed.date_scraped).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="flex-1 bg-white">
          {selectedMisdeed ? (
            <div className="p-6">
              {/* Job Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedMisdeed.job_title}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-600 mb-2">
                      <span className="font-medium">{selectedMisdeed.company_name}</span>
                      <span>•</span>
                      <span>{selectedMisdeed.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getScamBadgeColor(selectedMisdeed.scam_score)} text-white`}>
                      Scam Score: {selectedMisdeed.scam_score}
                    </Badge>
                  </div>
                </div>

                {/* Scam Alert */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800 mb-2">
                        🚨 {getScamLevel(selectedMisdeed.scam_score)} - SCAM DETECTED
                      </h3>
                      <div className="space-y-1">
                        {selectedMisdeed.scam_reasons.map((reason, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-red-700">
                            <span>•</span>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mb-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(selectedMisdeed.original_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Original (CAUTION)
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Report to Authorities
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share Warning
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Job Description */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Scam Job Description (ANALYSIS ONLY)
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMisdeed.description}</p>
                </div>
              </div>

              {/* Source Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Detection Information</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>Source Platform: {selectedMisdeed.source_platform}</p>
                  <p>Detected: {new Date(selectedMisdeed.date_scraped).toLocaleString()}</p>
                  <p>Scam Score: {selectedMisdeed.scam_score}/20 (Higher = More Suspicious)</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Select a scam job posting to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
