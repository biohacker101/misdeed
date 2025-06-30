'use client'

import React, { useState, useEffect } from 'react'

interface Job {
  title: string
  company: string
  location: string
  salary: string
  tags: string[]
  hiringMultiple: boolean
  rating?: number
  type?: string
  email?: string
  description?: string
  fullDescription?: string
}
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Search, MapPin, ChevronDown, MoreVertical, Star, ExternalLink, Bookmark, Share } from 'lucide-react'
import { MisdeedLogo } from '@/components/ui/logo'

export default function IndeedClone() {
  const [selectedJob, setSelectedJob] = useState(0)
  const [userJobs, setUserJobs] = useState<Job[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')

  // Load user jobs from localStorage on component mount
  useEffect(() => {
    const savedJobs = localStorage.getItem('userJobs')
    if (savedJobs) {
      setUserJobs(JSON.parse(savedJobs))
    }
  }, [])

  // Reset selected job when search results change
  // biome-ignore lint/correctness/useExhaustiveDependencies: We need to reset selected job when search/location changes
  useEffect(() => {
    setSelectedJob(0)
  }, [searchQuery, locationQuery])

  const handleSearch = () => {
    // Search is handled by the filter logic above
    // This function can be used for additional search actions if needed
  }

  const defaultJobs = [
    {
      title: "Webcam Stand-In",
      company: "Alex Chen",
      location: "Fully remote (anywhere with a quiet space and solid internet)",
      salary: "$15/hr + $2 'tech rescue' bonus",
      tags: ["Flexible part-time", "Remote"],
      hiringMultiple: false
    },
    {
      title: "Secret Date Cameraperson",
      company: "Sam Parker",
      location: "Downtown Rooftop Bars",
      salary: "$25/hr + $10 'stealth moment' bonus",
      tags: ["Evenings & Weekends", "Stealth Required"],
      hiringMultiple: false
    },
    {
      title: "Professional Hugger",
      company: "Pat Harrison",
      location: "Downtown Café Nooks",
      salary: "$20/hr + $5 'extended embrace' bonus",
      tags: ["Afternoons & Weekends", "Human Connection"],
      hiringMultiple: false
    },
    {
      title: "Fit my Ikea Furniture for me",
      company: "Morgan Carter",
      location: "Palo Alto, CA",
      salary: "$25/hr + $15 'No Screw Left Behind' bonus",
      tags: ["One-time Gig", "Assembly Required"],
      hiringMultiple: false
    }
  ]

  // Combine user jobs with default jobs (user jobs first)
  const allJobs = [...userJobs, ...defaultJobs]
  
  // Filter jobs based on search query and location
  const jobs = allJobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLocation = locationQuery === '' ||
      job.location.toLowerCase().includes(locationQuery.toLowerCase())
    
    return matchesSearch && matchesLocation
  })

  const defaultJobDetails = [
    {
      title: "Webcam Stand-In",
      company: "Alex Chen",
      rating: 4.2,
      location: "Fully remote (anywhere with a quiet space and solid internet)",
      salary: "$15/hr + $2 'tech rescue' bonus",
      type: "Flexible part-time",
      email: "alex.chen@misdeed.jobs",
      fullDescription: `I'm Alex, a busy exec who sometimes can't make every video call. I need someone to join my Zoom and Teams meetings in my place—to check in early, stay on screen looking engaged, handle simple AV glitches, and send me a quick summary afterward.

WHAT YOU'LL DO:

• Join each call 5 minutes before it starts and confirm mic/camera are working
• Maintain a professional presence (nod, smile, type brief confirmations like "Agreed" in chat)
• Step in with calm troubleshooting ("Sorry, can you hear me now?") if audio or video cuts out
• Jot down any unresolved issues and email me a one-sentence recap after the meeting

YOU SHOULD HAVE:

• A webcam and 10 Mbps+ internet in a quiet room
• Familiarity with Zoom and Teams (basic host controls a plus)
• A patient, attentive attitude—most calls last 30–60 minutes
• Ability to follow simple instructions and stay "on" without drawing attention

HOW TO APPLY:

Email alex.chen@misdeed.jobs with:

1. A sentence or two about your experience and availability
2. A 15-second clip of you nodding and saying "Testing, one-two-three" as if checking your mic

I'll review submissions as they come in and get back to you within 48 hours. Thanks!`,
      description: "Busy executive seeking someone to join video calls in their place. Handle basic meeting presence and simple tech troubleshooting. Flexible remote work."
    },
         {
       title: "Secret Date Cameraperson",
       company: "Sam Parker",
       rating: 4.3,
       location: "Downtown Rooftop Bars",
       salary: "$25/hr + $10 'stealth moment' bonus",
       type: "Evenings & Weekends",
       email: "sam.parker@misdeed.jobs",
       description: "I'm going on a nerve-wracking first date and want it secretly filmed—every laugh, every awkward pause—for, uh, 'research.' Flexible evening hours; rooftop bar rendezvous preferred.",
       fullDescription: `I'm Sam, and I need someone to covertly record my upcoming date at a busy rooftop lounge. No flash, no tripod—just discreet, steady footage of me attempting to be charming (or failing spectacularly).

WHAT YOU'LL DO:

• Arrive 15 minutes early to scope out the best hidden angles
• Conceal a small camera or phone on a table centerpiece or menu
• Capture both wide shots of the atmosphere and tight shots of my date's reactions
• Whisper cue words (via text) when it's time for a close-up ("Smile now!")
• Swap batteries or memory cards between courses without drawing attention
• Deliver raw footage and flag the three most "embarrassing but adorable" clips

YOU SHOULD HAVE:

• A smartphone or micro-camera with good low-light performance
• Stealth skills—bonus if you've ever held a phone under the table
• Comfort lurking in corner tables for 1–2 hours
• Basic editing chops to crop out nearby nosy onlookers

HOW TO APPLY:

Email sam.parker@misdeed.jobs with:

Subject: "Date Film Ops"
• A one-line stealth resume (e.g., "Filmed two surprise proposals—both went viral")
• Two blurred-out sample clips (faces obscured)

I'll pick someone who can capture all the cringe and charm—and reply within 48 hours. Good luck staying unseen!`
     },
     {
       title: "Professional Hug Specialist",
       company: "Pat Harrison",
       rating: 4.6,
       location: "Downtown Café Nooks",
       salary: "$20/hr + $5 'extended embrace' bonus",
       type: "Afternoons & Weekends",
       email: "pat.harrison@misdeed.jobs",
       description: "I'm new in town and craving friendly, platonic hugs in cozy public spots. Looking for someone who can deliver warm, boundary-respecting squeezes—no small talk required.",
       fullDescription: `I'm Pat, recently relocated and missing genuine human connection. I need a dependable hugger to meet me at a quiet café or park bench for short, heartfelt embraces that boost morale and melt away stress.

WHAT YOU'LL DO:

• Arrive 10 minutes early to choose a discreet, comfortable spot
• Offer 3–5 minute hugs on cue (side hugs, bear hugs—whatever feels right)
• Provide gentle, encouraging words or supportive silence afterward
• Respect personal space and check in verbally for ongoing consent
• Keep sessions punctual and wrap up gracefully

YOU SHOULD HAVE:

• Genuine empathy and clean, comfortable clothing
• Comfort hugging strangers in public settings
• Ability to set and honor clear physical and emotional boundaries
• Punctuality and a friendly, non-intrusive presence

HOW TO APPLY:

Email pat.harrison@misdeed.jobs with:

1. Subject: "Hug Squad Application"
2. A one-sentence description of your signature hug style
3. A 5-second video of you hugging a cushion or teddy bear

I'll review submissions as they arrive and respond within 48 hours. Looking forward to your warm embrace!`
     },
     {
       title: "Fit my Ikea Furniture for me",
       company: "Morgan Carter",
       rating: 4.8,
       location: "Palo Alto, CA",
       salary: "$25/hr + $15 'No Screw Left Behind' bonus",
       type: "One-time Gig",
       email: "morgan.carter@misdeed.jobs",
       description: "New homeowner buried under IKEA boxes seeks someone to turn particleboard into usable furniture—Allen keys at the ready.",
       fullDescription: `I'm Morgan, and despite my best efforts, I've managed to create a small mountain of IKEA flat-packs in my living room. I need a patient assembler to follow—or creatively interpret—those mysterious instruction diagrams and build me up to five pieces of furniture.

WHAT YOU'LL DO:

• Unpack, sort, and verify all parts and hardware
• Interpret IKEA manuals (bonus points for surviving Step 7) or improvise when parts don't match diagrams
• Assemble up to 5 items: bookshelves, desk, dresser, and a WOBBLY coffee table if you dare
• Anchor tall items to walls (stud finder and brackets provided)
• Box up leftover packaging and stash spare screws in a labeled bag

YOU SHOULD HAVE:

• Proven flat-pack assembly experience (IKEA, Wayfair, or similar)
• Your own toolkit (allen keys, screwdriver, hammer, level)
• A zen-master's patience for ambiguous illustrations
• Reliable transportation and ability to carry 25–50 lb boxes

HOW TO APPLY:

Email morgan.carter@misdeed.jobs with:

1. Subject: "Flat-Pack Fixer Application"
2. A one-sentence tale of your proudest furniture assembly (or survival)
3. A photo of your handiwork—a flawlessly built shelf or a gloriously upright dresser

I'll review applications as they come in and reply within 48 hours. Help me turn chaos into a living room!`
     }
  ]

  // Combine user job details with default job details (user jobs first)
  const allJobDetails = [...userJobs, ...defaultJobDetails]
  
  // Filter job details to match the filtered jobs
  const jobDetails = allJobDetails.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLocation = locationQuery === '' ||
      job.location.toLowerCase().includes(locationQuery.toLowerCase())
    
    return matchesSearch && matchesLocation
  })
  
  const selectedJobDetail = jobDetails[selectedJob] || jobDetails[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <MisdeedLogo />
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900 underline">Home</a>
              <a href="/company-reviews" className="text-gray-600 hover:text-gray-900">Employer reviews</a>
              <a href="/salaries" className="text-gray-600 hover:text-gray-900">Post Job</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/signin" className="text-blue-600 hover:text-blue-700">Sign in</a>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                className="pl-10 h-12 text-base"
                placeholder="What absurd task?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                className="pl-10 h-12 text-base"
                placeholder="Where? "
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
            <Button 
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
              onClick={handleSearch}
            >
              Search
            </Button>
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
                  {searchQuery || locationQuery ? (
                    <>
                      {searchQuery && `"${searchQuery}"`} jobs 
                      {locationQuery && ` in ${locationQuery}`}
                    </>
                  ) : (
                    "Misdeed jobs"
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-sm text-gray-600">
                  Sort by: <span className="text-blue-600">relevance</span> - <a href="/jobs?sort=date" className="text-blue-600 hover:text-blue-700">date</a>
                </div>
                <div className="text-sm text-gray-600">
                  {jobs.length} job{jobs.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {/* Job Cards */}
            <div className="bg-gray-50">
              {jobs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-lg mb-2">No misdeeds found 🕵️</p>
                  <p className="text-sm">Try adjusting your search terms or check out our featured gigs above!</p>
                </div>
              ) : (
                jobs.map((job, index) => (
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
                      {job.tags.map((tag: string) => (
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
                ))
              )}
            </div>
          </div>

          {/* Right Side - Job Details */}
          <div className="w-1/2 bg-white">
            <div className="p-6">
              {selectedJobDetail ? (
                <>
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
                    {selectedJobDetail.company.split(' ').map((word: string) => word[0]).join('').slice(0, 2).toUpperCase()}
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
                    {selectedJobDetail.email ? (
                      <a href={`mailto:${selectedJobDetail.email}`} className="flex items-center">
                        Apply now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    ) : (
                      <>
                        Apply on company site
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </>
                    )}
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

              {/* Full Job Description */}
              {selectedJobDetail.fullDescription && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-4">Full job description</h2>
                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                    {selectedJobDetail.fullDescription}
                  </div>
                </div>
              )}





             
                </>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-lg mb-2">Select a job to view details</p>
                  <p className="text-sm">Click on any job card to see the full description</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}