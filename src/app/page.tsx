'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Search, MapPin, ChevronDown, MoreVertical, Star, ExternalLink, Bookmark, Share } from 'lucide-react'

export default function IndeedClone() {
  const [selectedJob, setSelectedJob] = useState(0)

  const jobs = [
    {
      title: "Back End Developer - AI Trainer",
      company: "DataAnnotation",
      location: "Remote in Hayward, CA",
      salary: "From $40 an hour",
      tags: ["Contract", "Flexible schedule"],
      hiringMultiple: true
    },
    {
      title: "Product Manager - AI Trainer",
      company: "DataAnnotation",
      location: "Remote in Santa Clara, CA",
      salary: "From $40 an hour",
      tags: ["Contract", "Flexible schedule"],
      hiringMultiple: false
    },
    {
      title: "FinTech Product Analyst - AI Trainer",
      company: "DataAnnotation",
      location: "Remote in Palo Alto, CA",
      salary: "From $40 an hour",
      tags: ["Contract", "Flexible schedule"],
      hiringMultiple: true
    }
  ]

  const selectedJobDetail = {
    title: "Algorithms and AI Principal Engineer",
    company: "ASML",
    rating: 3.8,
    location: "San Jose, CA 95134",
    salary: "$186,750 - $311,250 a year",
    type: "Full-time",
    description: "You must create an Indeed account before continuing to the company website to apply"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="text-blue-600 font-bold text-2xl">indeed</div>
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
                placeholder="Scale AI"
                defaultValue="Scale AI"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                className="pl-10 h-12 text-base"
                placeholder="Pleasanton, CA"
                defaultValue="Pleasanton, CA"
              />
            </div>
            <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-2">
            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Pay" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any pay</SelectItem>
                <SelectItem value="40k">$40,000+</SelectItem>
                <SelectItem value="60k">$60,000+</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Remote" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Within 25 miles" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">Within 25 miles</SelectItem>
                <SelectItem value="50">Within 50 miles</SelectItem>
                <SelectItem value="100">Within 100 miles</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Company" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any company</SelectItem>
                <SelectItem value="dataannotation">DataAnnotation</SelectItem>
                <SelectItem value="asml">ASML</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Job Type" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any type</SelectItem>
                <SelectItem value="fulltime">Full-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Employer/Recruiter" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
                <SelectItem value="recruiter">Recruiter</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Location" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any location</SelectItem>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Experience level" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any experience</SelectItem>
                <SelectItem value="entry">Entry level</SelectItem>
                <SelectItem value="mid">Mid level</SelectItem>
                <SelectItem value="senior">Senior level</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Education" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any education</SelectItem>
                <SelectItem value="bachelors">Bachelor's</SelectItem>
                <SelectItem value="masters">Master's</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Encouraged to apply" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="diversity">Diversity encouraged</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-auto bg-white border-gray-300">
                <SelectValue placeholder="Date posted" />
                <ChevronDown className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="1day">Last 24 hours</SelectItem>
                <SelectItem value="3days">Last 3 days</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Resume Upload Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="text-sm">
            <a href="/upload-resume" className="text-blue-600 hover:text-blue-700 underline">Upload your resume</a>
            <span className="text-gray-600"> - Let employers find you</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Left Side - Job Listings */}
          <div className="w-1/2 border-r border-gray-200">
            {/* Results Header */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Scale AI jobs in Pleasanton, CA
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-600">
                  Sort by: <span className="text-blue-600">relevance</span> - <a href="/jobs?sort=date" className="text-blue-600 hover:text-blue-700">date</a>
                </div>
                <div className="text-sm text-gray-600">
                  400+ jobs
                </div>
              </div>
            </div>

            {/* Job Cards */}
            <div className="bg-gray-50">
              {jobs.map((job, index) => (
                <Card
                  key={`${job.title}-${job.company}-${index}`}
                  className={`m-4 cursor-pointer hover:shadow-md transition-shadow ${selectedJob === index ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedJob(index)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {job.hiringMultiple && (
                          <div className="text-xs text-gray-500 mb-1">Hiring multiple candidates</div>
                        )}
                        <h3 className="font-medium text-blue-600 hover:text-blue-700 text-base">
                          {job.title}
                        </h3>
                        <div className="text-sm text-gray-600 mt-1">{job.company}</div>
                        <div className="text-sm text-gray-600">{job.location}</div>
                      </div>
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm font-medium text-gray-900 mb-2">{job.salary}</div>
                    <div className="flex gap-2 mb-3">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <a href="/jobs/similar" className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                      View similar jobs with this employer
                      <ChevronDown className="w-4 h-4 ml-1 rotate-270" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side - Job Details */}
          <div className="w-1/2 bg-white">
            <div className="p-6">
              {/* Close button */}
              <div className="flex justify-end mb-4">
                <button className="text-gray-400 hover:text-gray-600">✕</button>
              </div>

              {/* Job Title */}
              <h1 className="text-2xl font-semibold mb-4">{selectedJobDetail.title}</h1>

              {/* Company Info */}
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                    ASML
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-blue-600">{selectedJobDetail.company}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">{selectedJobDetail.rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location and Salary */}
              <div className="mb-4">
                <div className="text-gray-600 mb-1">{selectedJobDetail.location}</div>
                <div className="text-lg font-medium">
                  {selectedJobDetail.salary} - {selectedJobDetail.type}
                </div>
              </div>

              {/* Apply Button */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-3">
                  {selectedJobDetail.description}
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                    Apply on company site
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Profile Insights */}
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Profile insights</h2>
                <div className="text-sm text-gray-600 mb-4">
                  Find out how your skills align with the job description
                </div>

                {/* Skills Section */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs">⚡</span>
                    </div>
                    <span className="font-medium">Skills</span>
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">Do you have experience in Semiconductor experience?</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">Yes</Button>
                        <Button variant="outline" size="sm">No</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xs">🎓</span>
                    </div>
                    <span className="font-medium">Education</span>
                  </div>
                  <div className="ml-8">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm">Do you have a Master's degree?</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">Yes</Button>
                        <Button variant="outline" size="sm">No</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Job Details */}
              <div>
                <h2 className="text-lg font-medium mb-4">Job details</h2>
                {/* Additional job details would go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
