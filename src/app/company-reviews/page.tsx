'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Star } from 'lucide-react'
import { MisdeedLogo } from '@/components/ui/logo'

export default function CompanyReviews() {
  const [searchQuery, setSearchQuery] = useState('')

  const industries = [
    { name: 'Aerospace & Defense', icon: '✈️', color: 'bg-pink-100' },
    { name: 'Agriculture', icon: '🌾', color: 'bg-blue-100' },
    { name: 'Arts, Entertainment & Recreation', icon: '🎭', color: 'bg-green-100' },
    { name: 'Construction, Repair & Maintenance Services', icon: '🔧', color: 'bg-orange-100' },
    { name: 'Education', icon: '📚', color: 'bg-pink-100' },
    { name: 'Energy, Mining & Utilities', icon: '⚡', color: 'bg-blue-100' }
  ]

  const popularCompanies = [
    {
      name: 'Amazon Warehouse',
      logo: '📦',
      rating: 3.5,
      reviews: '73,107 reviews',
      bgColor: 'bg-orange-500'
    },
    {
      name: 'Chick-fil-A Corporate',
      logo: '🐔',
      rating: 4.1,
      reviews: '127 reviews',
      bgColor: 'bg-red-500'
    },
    {
      name: 'Nordstrom',
      logo: 'N',
      rating: 3.8,
      reviews: '17,924 reviews',
      bgColor: 'bg-black'
    },
    {
      name: 'Cintas',
      logo: '🧹',
      rating: 3.2,
      reviews: '5,881 reviews',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'Ross Dress For Less',
      logo: '👔',
      rating: 3.4,
      reviews: '18,366 reviews',
      bgColor: 'bg-teal-500'
    },
    {
      name: 'Planet Fitness',
      logo: '💪',
      rating: 3.7,
      reviews: '7,864 reviews',
      bgColor: 'bg-purple-500'
    },
    {
      name: 'Vector Marketing',
      logo: '📈',
      rating: 2.8,
      reviews: '12,453 reviews',
      bgColor: 'bg-blue-600'
    },
    {
      name: 'AutoZone',
      logo: '🚗',
      rating: 3.5,
      reviews: '8,921 reviews',
      bgColor: 'bg-red-600'
    },
    {
      name: 'Publix',
      logo: 'P',
      rating: 3.9,
      reviews: '15,267 reviews',
      bgColor: 'bg-green-600'
    }
  ]

  const renderStars = (rating: number): JSX.Element[] => {
    const stars: JSX.Element[] = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />)
    }
    
    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }
    
    return stars
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
              <a href="/company-reviews" className="text-gray-600 hover:text-gray-900 underline">Company reviews</a>
              <a href="/salaries" className="text-gray-600 hover:text-gray-900">Find salaries</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/signin" className="text-blue-600 hover:text-blue-700">Sign in</a>
            <a href="/employers" className="text-gray-600 hover:text-gray-900">Employers / Post Job</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Find great places to work
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get access to millions of company reviews
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-4">
            <div className="flex items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  className="pl-10 h-12 text-base border-gray-300"
                  placeholder="Company name or job title"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="h-12 px-8 ml-2 bg-blue-600 hover:bg-blue-700">
                Find Companies
              </Button>
            </div>
          </div>

          {/* Salaries Link */}
          <p className="text-blue-600 hover:text-blue-700 cursor-pointer">
            Do you want to search for salaries?
          </p>
        </div>

        {/* Browse by Industry */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Browse companies by industry
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {industries.map((industry, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${industry.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl">{industry.icon}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm leading-tight">
                    {industry.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <a href="/industries" className="text-blue-600 hover:text-blue-700 font-medium">
              See all industries
            </a>
          </div>
        </div>

        {/* Popular Companies */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Popular companies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCompanies.map((company, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-12 h-12 ${company.bgColor} rounded flex items-center justify-center text-white font-bold`}>
                      {company.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">
                        {company.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {renderStars(company.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {company.rating}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {company.reviews}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 text-sm">
                    <a href={`/companies/${company.name.toLowerCase().replace(/\s+/g, '-')}/salaries`} className="text-blue-600 hover:text-blue-700">
                      Salaries
                    </a>
                    <a href={`/companies/${company.name.toLowerCase().replace(/\s+/g, '-')}/questions`} className="text-blue-600 hover:text-blue-700">
                      Q&A
                    </a>
                    <a href={`/companies/${company.name.toLowerCase().replace(/\s+/g, '-')}/jobs`} className="text-blue-600 hover:text-blue-700">
                      Open jobs
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 