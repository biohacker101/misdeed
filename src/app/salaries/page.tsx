'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, ChevronRight, X } from 'lucide-react'
import { MisdeedLogo } from '@/components/ui/logo'

export default function FindSalaries() {
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('United States')
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries')

  const salaryData = [
    {
      title: 'Software Engineer',
      salary: '$124,203',
      jobOpenings: 15420
    },
    {
      title: 'Registered Nurse',
      salary: '$93,802',
      jobOpenings: 8750
    },
    {
      title: 'Accountant',
      salary: '$66,411',
      jobOpenings: 5230
    },
    {
      title: 'Business Analyst',
      salary: '$86,485',
      jobOpenings: 3890
    },
    {
      title: 'Nursing Assistant',
      salary: '$46,142',
      jobOpenings: 6720
    },
    {
      title: 'Sales Executive',
      salary: '$83,337',
      jobOpenings: 4560
    },
    {
      title: 'Human Resources Specialist',
      salary: '$60,830',
      jobOpenings: 2870
    },
    {
      title: 'Customer Service Representative',
      salary: '$69,721',
      jobOpenings: 7340
    },
    {
      title: 'Assistant Store Manager',
      salary: '$37,892',
      jobOpenings: 3450
    },
    {
      title: 'Warehouse Associate',
      salary: '$36,415',
      jobOpenings: 9120
    },
    {
      title: 'Server',
      salary: '$49,514',
      jobOpenings: 12380
    },
    {
      title: 'Front Desk Agent',
      salary: '$46,057',
      jobOpenings: 2940
    },
    {
      title: 'Crew Member',
      salary: '$47,852',
      jobOpenings: 8760
    },
    {
      title: 'Administrative Assistant',
      salary: '$54,458',
      jobOpenings: 4320
    },
    {
      title: 'Data Entry Clerk',
      salary: '$50,797',
      jobOpenings: 3210
    }
  ]

  const industries = [
    'All Industries',
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Manufacturing',
    'Education',
    'Government',
    'Non-profit',
    'Construction'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <MisdeedLogo />
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/company-reviews" className="text-gray-600 hover:text-gray-900">Company reviews</a>
              <a href="/salaries" className="text-gray-600 hover:text-gray-900 underline">Find salaries</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/signin" className="text-blue-600 hover:text-blue-700">Sign in</a>
            <a href="/employers" className="text-gray-600 hover:text-gray-900">Employers / Post Job</a>
          </div>
        </div>
      </header>

      {/* Hero Section - Dark Blue */}
      <div className="bg-slate-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                Discover your earning potential
              </h1>
              <p className="text-xl text-slate-200 mb-8">
                Explore high-paying careers, salaries, and job openings by industry and location.
              </p>

              {/* Search Form */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What
                    </label>
                    <Input
                      className="h-12 text-base"
                      placeholder="Job title"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Where
                    </label>
                    <div className="relative">
                      <Input
                        className="h-12 text-base pr-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      {location && (
                        <button
                          onClick={() => setLocation('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <Button className="w-full md:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-700">
                  Search
                </Button>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:block ml-8">
              <div className="w-64 h-64 bg-slate-700 rounded-full flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-24 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-3xl">💼</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-orange-500 text-xl">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browse Top Paying Jobs */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Browse top paying jobs by industry
          </h2>
          
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose an industry
            </label>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-64 h-12">
                <SelectValue placeholder="All Industries" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Salary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salaryData.map((job, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {job.title}
                    </h3>
                    <p className="text-blue-600 font-semibold text-xl mb-1">
                      Average Salary {job.salary} per year
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <a 
                  href={`/jobs?q=${encodeURIComponent(job.title)}`}
                  className="text-blue-600 hover:text-blue-700 text-sm underline"
                >
                  Job Openings
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Salary information is based on data collected from employers and anonymous employees.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>Updated monthly</span>
            <span>•</span>
            <span>Based on {salaryData.length}+ job titles</span>
            <span>•</span>
            <span>Covers all industries</span>
          </div>
        </div>
      </div>
    </div>
  )
} 