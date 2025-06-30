import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit') || '50'
    const min_score = searchParams.get('min_score') || '5'
    const search = searchParams.get('search') || ''

    // Build backend URL
    const backend_url = process.env.BACKEND_URL || 'http://localhost:8000'
    let url = `${backend_url}/api/misdeeds?limit=${limit}&min_score=${min_score}`
    
    if (search) {
      url = `${backend_url}/api/misdeeds/search?q=${encodeURIComponent(search)}&limit=${limit}&min_score=${min_score}`
    }

    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching misdeeds:', error)
    return NextResponse.json(
      { error: 'Failed to fetch misdeeds' },
      { status: 500 }
    )
  }
} 