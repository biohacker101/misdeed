import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'location', 'pay_amount', 'pay_type', 'contact_method', 'username']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Build backend URL
    const backend_url = process.env.BACKEND_URL || 'http://localhost:8000'
    const url = `${backend_url}/api/jobs`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: 'Failed to create job posting' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') || '100'
    const category = searchParams.get('category')

    // Build backend URL
    const backend_url = process.env.BACKEND_URL || 'http://localhost:8000'
    let url = `${backend_url}/api/jobs?limit=${limit}`
    
    if (category) {
      url += `&category=${encodeURIComponent(category)}`
    }

    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
} 