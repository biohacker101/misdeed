'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, DollarSign, MapPin, User, Briefcase, Plus } from 'lucide-react'
import { MisdeedLogo } from '@/components/ui/logo'

// Job categories as defined in the design spec
const JOB_CATEGORIES = [
  "Events & Gigs",
  "Creative & Design",
  "Home & Labor",
  "Tech & Digital",
  "Quirky & Miscellaneous"
]

// Pay types
const PAY_TYPES = [
  "Flat Rate",
  "Hourly",
  "Per Item",
  "Negotiable"
]

interface JobFormData {
  title: string
  category: string
  location: string
  pay_amount: string
  pay_type: string
  description: string
  contact_method: string
  username: string
}

export default function PostJobPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    category: '',
    location: '',
    pay_amount: '',
    pay_type: '',
    description: '',
    contact_method: '',
    username: ''
  })
  const [errors, setErrors] = useState<Partial<JobFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<JobFormData> = {}

    // Required field validation
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Job title must be 100 characters or less'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }

    if (!formData.pay_amount.trim()) {
      newErrors.pay_amount = 'Pay amount is required'
    } else {
      const payAmount = parseFloat(formData.pay_amount)
      if (isNaN(payAmount) || payAmount < 0) {
        newErrors.pay_amount = 'Please enter a valid pay amount'
      }
    }

    if (!formData.pay_type) {
      newErrors.pay_type = 'Please select a pay type'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description should be at least 50 characters'
    }

    if (!formData.contact_method.trim()) {
      newErrors.contact_method = 'Contact method is required'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const jobData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        location: formData.location.trim(),
        pay_amount: parseFloat(formData.pay_amount),
        pay_type: formData.pay_type,
        contact_method: formData.contact_method.trim(),
        username: formData.username.trim()
      }

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData)
      })

      if (!response.ok) {
        throw new Error('Failed to create job posting')
      }

      const result = await response.json()
      setSubmitSuccess(true)
      
      // Redirect to home page after a short delay to show success message
      setTimeout(() => {
        router.push('/')
      }, 2000)

    } catch (error) {
      console.error('Error creating job:', error)
      alert('Failed to create job posting. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCategoryDescription = (category: string) => {
    const descriptions = {
      "Events & Gigs": "Photography, event assistance, stand-ins, crowd filling",
      "Creative & Design": "Art, graphics, voice work, writing, custom creations",
      "Home & Labor": "Assembly, organization, pet care, household tasks",
      "Tech & Digital": "Social media, tech support, digital organization, reviews",
      "Quirky & Miscellaneous": "Unique requests, companionship, testing, unusual tasks"
    }
    return descriptions[category as keyof typeof descriptions] || ""
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
            <div className="flex items-center space-x-8">
              <MisdeedLogo />
            </div>
          </div>
        </header>

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Success!</h1>
              <p className="text-gray-600 mb-4">
                Your job posting has been created successfully. You'll be redirected to the homepage shortly.
              </p>
              <Button onClick={() => router.push('/')} className="bg-blue-600 hover:bg-blue-700">
                View All Jobs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <MisdeedLogo />
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900">Find Jobs</a>
              <a href="/company-reviews" className="text-gray-600 hover:text-gray-900">Company reviews</a>
              <a href="/salaries" className="text-gray-600 hover:text-gray-900">Find salaries</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/signin" className="text-blue-600 hover:text-blue-700">Sign in</a>
            <Button variant="outline" onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post an Unorthodox Job</h1>
          <p className="text-gray-600">
            Share your unique task or creative gig with our community of unconventional workers
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Job Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Job Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Need a Fake Date for a Wedding"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`mt-1 ${errors.title ? 'border-red-300' : ''}`}
                  maxLength={100}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className={`mt-1 ${errors.category ? 'border-red-300' : ''}`}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        <div className="flex flex-col">
                          <span>{category}</span>
                          <span className="text-xs text-gray-500">{getCategoryDescription(category)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location *
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Downtown Portland, OR or Remote/Online"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`pl-10 ${errors.location ? 'border-red-300' : ''}`}
                  />
                </div>
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>

              {/* Payment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pay_amount" className="text-sm font-medium text-gray-700">
                    Pay Amount *
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="pay_amount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="150.00"
                      value={formData.pay_amount}
                      onChange={(e) => handleInputChange('pay_amount', e.target.value)}
                      className={`pl-10 ${errors.pay_amount ? 'border-red-300' : ''}`}
                    />
                  </div>
                  {errors.pay_amount && <p className="mt-1 text-sm text-red-600">{errors.pay_amount}</p>}
                </div>

                <div>
                  <Label htmlFor="pay_type" className="text-sm font-medium text-gray-700">
                    Pay Type *
                  </Label>
                  <Select value={formData.pay_type} onValueChange={(value) => handleInputChange('pay_type', value)}>
                    <SelectTrigger className={`mt-1 ${errors.pay_type ? 'border-red-300' : ''}`}>
                      <SelectValue placeholder="Select pay type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAY_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.pay_type && <p className="mt-1 text-sm text-red-600">{errors.pay_type}</p>}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Job Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your task in detail. What exactly do you need done? What are the requirements? When does it need to be completed?"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`mt-1 min-h-32 ${errors.description ? 'border-red-300' : ''}`}
                  rows={6}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                <p className="mt-1 text-sm text-gray-500">
                  Minimum 50 characters ({formData.description.length} characters)
                </p>
              </div>

              {/* Contact Method */}
              <div>
                <Label htmlFor="contact_method" className="text-sm font-medium text-gray-700">
                  How should applicants contact you? *
                </Label>
                <Input
                  id="contact_method"
                  type="text"
                  placeholder="e.g., Message me on the platform or Email me at your@email.com"
                  value={formData.contact_method}
                  onChange={(e) => handleInputChange('contact_method', e.target.value)}
                  className={`mt-1 ${errors.contact_method ? 'border-red-300' : ''}`}
                />
                {errors.contact_method && <p className="mt-1 text-sm text-red-600">{errors.contact_method}</p>}
              </div>

              {/* Username */}
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Your Username *
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="YourUsername"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={`pl-10 ${errors.username ? 'border-red-300' : ''}`}
                  />
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Job...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Post Job
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/')}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 