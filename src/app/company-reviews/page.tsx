'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { MisdeedLogo } from '@/components/ui/logo'

export default function MisdeedReviews() {
  const [searchQuery, setSearchQuery] = useState('')

  const misdeedTypes = [
    { name: 'Human Furniture', icon: '🪑', color: 'bg-pink-100', description: 'Be my coat rack for a photoshoot' },
    { name: 'Covert Ops', icon: '🕵️', color: 'bg-blue-100', description: 'Secretly photograph my date' },
    { name: 'Digital Doppelgängers', icon: '📹', color: 'bg-green-100', description: 'Sit in my Zoom calls' },
    { name: 'Live Stream Sherpas', icon: '📱', color: 'bg-orange-100', description: 'Hold a camera for my livestream' },
    { name: 'Emotional Stand-Ins', icon: '🎭', color: 'bg-purple-100', description: 'Agree with my in-laws on video' },
    { name: 'Miscellaneous Mayhem', icon: '🌶️', color: 'bg-yellow-100', description: 'Taste-test my new hot sauce recipe' }
  ]

  const featuredEmployers = [
    {
      name: 'Jordan Lee',
      nickname: 'The Date Documenter',
      logo: '📷',
      rating: 4.9,
      emojiRating: '😈😈😈😈😈',
      reviews: '23 stealth reviews',
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500',
      specialty: 'Covert Date Paparazzi',
      weirdnessLevel: 'Professional Creep'
    },
    {
      name: 'Alex Chen',
      nickname: 'The Meeting Ghost',
      logo: '👻',
      rating: 4.7,
      emojiRating: '😜😜😜😜😜',
      reviews: '18 phantom appearances',
      bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      specialty: 'Webcam Stand-In',
      weirdnessLevel: 'Digitally Absent'
    },
    {
      name: 'Taylor Rivers',
      nickname: 'The Plant Whisperer',
      logo: '🪴',
      rating: 4.5,
      emojiRating: '🌱🌱🌱🌱🌱',
      reviews: '31 hydration sessions',
      bgColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
      specialty: 'Live-in Plant Waterer',
      weirdnessLevel: 'Botanically Obsessed'
    },
    {
      name: 'Casey "ChillCo"',
      nickname: 'The Human Thermostat',
      logo: '🥶',
      rating: 4.2,
      emojiRating: '❄️❄️❄️❄️❄️',
      reviews: '12 temperature checks',
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
      specialty: 'Human Air Conditioner',
      weirdnessLevel: 'Perpetually Frozen'
    },
    {
      name: 'Morgan "SauceLord"',
      nickname: 'The Spice Tester',
      logo: '🌶️',
      rating: 3.8,
      emojiRating: '🔥🔥🔥🔥',
      reviews: '47 burned tongues',
      bgColor: 'bg-gradient-to-br from-red-500 to-orange-500',
      specialty: 'Hot Sauce Guinea Pig',
      weirdnessLevel: 'Dangerously Spicy'
    },
    {
      name: 'Riley "EchoMaster"',
      nickname: 'The Sound Shadow',
      logo: '🎤',
      rating: 4.3,
      emojiRating: '🎵🎵🎵🎵🎵',
      reviews: '15 echo experiences',
      bgColor: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      specialty: 'Professional Audience Member',
      weirdnessLevel: 'Acoustically Weird'
    },
    {
      name: 'Sam "FlexCorp"',
      nickname: 'The Human Furniture',
      logo: '🪑',
      rating: 3.9,
      emojiRating: '💪💪💪💪',
      reviews: '8 posture reviews',
      bgColor: 'bg-gradient-to-br from-amber-500 to-orange-500',
      specialty: 'Living Ottoman',
      weirdnessLevel: 'Structurally Sound'
    },
    {
      name: 'Avery "WatchCo"',
      nickname: 'The Professional Watcher',
      logo: '👀',
      rating: 4.1,
      emojiRating: '👁️👁️👁️👁️👁️',
      reviews: '29 surveillance reports',
      bgColor: 'bg-gradient-to-br from-gray-500 to-slate-600',
      specialty: 'Staring Contests & Observation',
      weirdnessLevel: 'Uncomfortably Attentive'
    },
    {
      name: 'Quinn "TaskMaster"',
      nickname: 'The Oddball',
      logo: '🎯',
      rating: 4.6,
      emojiRating: '🤪🤪🤪🤪🤪',
      reviews: '52 bizarre experiences',
      bgColor: 'bg-gradient-to-br from-pink-500 to-rose-500',
      specialty: 'Miscellaneous Weird Tasks',
      weirdnessLevel: 'Delightfully Unhinged'
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
              <a href="/company-reviews" className="text-gray-600 hover:text-gray-900 underline">Employer reviews</a>
              <a href="/salaries" className="text-gray-600 hover:text-gray-900">Post Job</a>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Rate your weirdest gig experiences
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            See which misdeed employers actually pay up and treat you right (relatively speaking)
          </p>



          {/* Post Misdeed Link */}
          <p className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
            Want to post your own bizarre gig? 
            <a href="/salaries" className="underline ml-1">Create a misdeed →</a>
          </p>
        </div>

        {/* Browse by Misdeed Type */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Browse by misdeed type
          </h2>
          <p className="text-gray-600 mb-8">Find your perfect flavor of weirdness</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {misdeedTypes.map((misdeed, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${misdeed.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{misdeed.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2">
                    {misdeed.name}
                  </h3>
                  <p className="text-xs text-gray-600 italic">
                    "{misdeed.description}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <a href="/misdeed-types" className="text-blue-600 hover:text-blue-700 font-medium">
              🔮 Explore all weird categories
            </a>
          </div>
        </div>

        {/* Featured Employers */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Our most... "distinguished" employers
          </h2>
          <p className="text-gray-600 mb-8">See who's paying for the weirdest favors (and who actually pays up)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEmployers.map((employer, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-blue-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-14 h-14 ${employer.bgColor} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                      {employer.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {employer.name}
                      </h3>
                      <p className="text-xs text-blue-600 font-medium mb-2">
                        {employer.nickname}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">
                          {employer.emojiRating}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">
                          {employer.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {employer.reviews}
                      </p>
                      <Badge variant="outline" className="text-xs mb-2">
                        {employer.weirdnessLevel}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-800">
                      "{employer.specialty}"
                    </p>
                  </div>
                  
                  <div className="flex space-x-4 text-xs">
                    <a href={`/employers/${employer.name.toLowerCase().replace(/\s+/g, '-')}/gigs`} className="text-blue-600 hover:text-blue-700 font-medium">
                      🎯 View Gigs
                    </a>
                    <a href={`/employers/${employer.name.toLowerCase().replace(/\s+/g, '-')}/reviews`} className="text-blue-600 hover:text-blue-700 font-medium">
                      📝 Reviews
                    </a>
                    <a href={`/employers/${employer.name.toLowerCase().replace(/\s+/g, '-')}/apply`} className="text-blue-600 hover:text-blue-700 font-medium">
                      🚀 Apply
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