'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, ChevronRight, X, Plus } from 'lucide-react'
import { MisdeedLogo } from '@/components/ui/logo'

export default function PostJob() {
  // Job posting form state
  const [showJobForm, setShowJobForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: '',
    tags: '',
    description: '',
    fullDescription: '',
    email: ''
  })



  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitJob = () => {
    if (!formData.title || !formData.company || !formData.salary) {
      alert('Please fill in the required fields: Title, Company, and Salary')
      return
    }

    // Get existing jobs from localStorage
    const existingJobs = JSON.parse(localStorage.getItem('userJobs') || '[]')
    
    // Create new job object
    const newJob = {
      id: Date.now(),
      title: formData.title,
      company: formData.company,
      location: formData.location || 'Remote',
      salary: formData.salary,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [formData.type || 'Full-time'],
      hiringMultiple: false,
      description: formData.description || `${formData.company} is hiring for ${formData.title}. Apply now!`,
      fullDescription: formData.fullDescription || formData.description || `Join our team as a ${formData.title} at ${formData.company}.`,
      type: formData.type || 'Full-time',
      rating: 4.0,
      email: formData.email
    }
    
    // Add new job to the beginning of the array
    const updatedJobs = [newJob, ...existingJobs]
    
    // Save to localStorage
    localStorage.setItem('userJobs', JSON.stringify(updatedJobs))
    
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      salary: '',
      type: '',
      tags: '',
      description: '',
      fullDescription: '',
      email: ''
    })
    
    setShowJobForm(false)
    alert('Job posted successfully! Check the home page to see your listing.')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <MisdeedLogo />
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/company-reviews" className="text-gray-600 hover:text-gray-900">Employer reviews</a>
              <a href="/salaries" className="text-gray-600 hover:text-gray-900 underline">Post Job</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/signin" className="text-blue-600 hover:text-blue-700">Sign in</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Post Your Job
              </h1>
              <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                Share your job opening with qualified candidates on our platform. 
                Reach talent actively looking for their next opportunity.
              </p>
              <div className="flex items-center space-x-6 text-slate-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm">Free to post</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm">Instant visibility</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span className="text-sm">Quality candidates</span>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:block ml-12">
              <div className="relative">
                <div className="w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="relative">
                    {/* Main briefcase */}
                    <div className="w-32 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-2xl">
                      <span className="text-white text-4xl">💼</span>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <span className="text-white text-xl">📄</span>
                    </div>
                    
                    <div className="absolute -top-4 -right-8 w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <span className="text-white text-lg">👥</span>
                    </div>
                    
                    <div className="absolute -bottom-6 -right-4 w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-150">
                      <span className="text-white text-xl">✨</span>
                    </div>
                    
                    <div className="absolute -bottom-2 -left-8 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse delay-300">
                      <span className="text-white text-sm">💡</span>
                    </div>
                  </div>
                </div>
                
                {/* Background decorative elements */}
                <div className="absolute top-10 right-20 w-4 h-4 bg-blue-400/30 rounded-full animate-ping" />
                <div className="absolute bottom-20 left-10 w-6 h-6 bg-purple-400/30 rounded-full animate-ping delay-500" />
                <div className="absolute top-32 left-20 w-3 h-3 bg-green-400/30 rounded-full animate-ping delay-1000" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post a Job Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Find Great Talent?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create your job posting in minutes. Our platform connects you with qualified candidates who are actively looking for opportunities.
            </p>
            
            {!showJobForm && (
              <div className="space-y-6">
                <Button 
                  onClick={() => setShowJobForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-14 px-10 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Create Job Posting
                </Button>
                
                {/* Benefits grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🚀</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Setup</h3>
                    <p className="text-gray-600 text-sm">Post your job in under 5 minutes with our streamlined form</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">👥</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Candidates</h3>
                    <p className="text-gray-600 text-sm">Reach qualified professionals actively seeking new opportunities</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">📊</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Visibility</h3>
                    <p className="text-gray-600 text-sm">Your job appears immediately on our job board for maximum exposure</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {showJobForm && (
            <div className="max-w-5xl mx-auto">
              <Card className="shadow-2xl border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Create Job Posting</h3>
                      <p className="text-gray-600 mt-1">Fill out the details below to post your job</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowJobForm(false)}
                      className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="e.g. Software Engineer"
                      value={formData.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="e.g. Tech Corp"
                      value={formData.company}
                      onChange={(e) => handleFormChange('company', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <Input
                      placeholder="e.g. Remote, San Francisco, CA"
                      value={formData.location}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary *
                    </label>
                    <Input
                      placeholder="e.g. $80,000 - $120,000 per year"
                      value={formData.salary}
                      onChange={(e) => handleFormChange('salary', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type
                    </label>
                    <Select value={formData.type} onValueChange={(value) => handleFormChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <Input
                      placeholder="e.g. Remote, Flexible schedule, Benefits"
                      value={formData.tags}
                      onChange={(e) => handleFormChange('tags', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <Input
                    type="email"
                    placeholder="e.g. hiring@company.com"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Brief description of the role..."
                    value={formData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Job Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={8}
                    placeholder="Detailed job description, requirements, responsibilities..."
                    value={formData.fullDescription}
                    onChange={(e) => handleFormChange('fullDescription', e.target.value)}
                  />
                </div>

                                <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowJobForm(false)}
                    className="h-12 px-8 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitJob}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 px-8 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    🚀 Post Job
                  </Button>
                </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}