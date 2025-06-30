# 🚨 Misdeed - AI-Powered Scam Job Detection System

**Misdeed** is an Indeed-like platform that specifically identifies and displays scam job postings using AI-powered analysis. Built for a meme hackathon, this system helps protect job seekers from fraudulent employment opportunities.

## 🎯 Project Overview

Misdeed consists of three main components:
1. **Web Scraper** - Extracts job postings from Indeed and other platforms
2. **AI Scam Analyzer** - Uses heuristic-based analysis to score job postings for scam indicators
3. **Frontend Platform** - Beautiful Indeed-like interface displaying detected scam jobs with warnings

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Scraper   │───▶│  Scam Analyzer  │───▶│   Backend API   │
│                 │    │                 │    │                 │
│ • Indeed        │    │ • Heuristics    │    │ • FastAPI       │
│ • Anti-blocking │    │ • Spell check   │    │ • SQLite DB     │
│ • Rate limiting │    │ • Pattern match │    │ • REST endpoints│
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  Frontend UI    │
                                              │                 │
                                              │ • Next.js       │
                                              │ • Tailwind CSS  │
                                              │ • shadcn/ui     │
                                              └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- Chrome browser (for scraping)

### 1. Clone and Setup
```bash
git clone https://github.com/biohacker101/misdeed
cd misdeed-1
npm install
```

### 2. Setup Python Environment
```bash
# Setup scraper
cd scraper
python3 -m venv venv
source venv/bin/activate
pip install selenium beautifulsoup4 requests webdriver-manager pyspellchecker

# Setup analyzer
cd ../analyzer
pip install pyspellchecker

# Setup backend
cd ../backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
```

### 3. Start the System
```bash
# Terminal 1: Start Backend API
cd backend
python api.py

# Terminal 2: Start Frontend
cd ..
npm run dev

# Terminal 3: Run Scraper Pipeline
python main_scraper.py
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 📊 Features

### ✅ Implemented Features

#### 🕷️ Web Scraper (`scraper/`)
- **Multiple Platform Support**: Indeed (primary), extensible for LinkedIn, Glassdoor
- **Anti-Detection Measures**:
  - User-agent rotation
  - Random delays (2-5 seconds)
  - Headless/non-headless modes
  - Window size randomization
- **Robust Extraction**: Multiple CSS selectors for different page layouts
- **Rate Limiting**: Respectful scraping with configurable delays

#### 🧠 AI Scam Analyzer (`analyzer/`)
- **Heuristic-Based Scoring**: 20-point scale for scam likelihood
- **Detection Rules**:
  - ✅ Upfront payment requests
  - ✅ Sensitive information requests (SSN, bank details)
  - ✅ Messaging app contact (WhatsApp, Telegram)
  - ✅ Spelling error density analysis
  - ✅ Generic email domains
  - ✅ False urgency language
  - ✅ Unrealistic salary promises
  - ✅ Vague job descriptions
  - ✅ No experience required patterns

#### 🖥️ Frontend Platform (`src/`)
- **Indeed-like Interface**: Familiar job search experience
- **Scam Warnings**: Clear alerts and risk levels
- **Real-time Data**: Live connection to backend API
- **Interactive Features**:
  - Job search and filtering
  - Detailed scam analysis display
  - Scam score visualization
  - Warning badges and alerts

#### 🔧 Backend API (`backend/`)
- **FastAPI Framework**: High-performance async API
- **SQLite Database**: Persistent storage for detected misdeeds
- **REST Endpoints**:
  - `GET /api/misdeeds` - List scam jobs
  - `GET /api/misdeeds/search` - Search scam jobs
  - `POST /api/jobs` - Submit job for analysis
- **CORS Support**: Frontend integration ready

### 🎭 Mock Data System
Since Indeed implements strong anti-bot protection, we've included a mock scraper that generates realistic scam job data for testing:

```bash
# Use mock scraper (default)
python main_scraper.py

# Use real scraper (may be blocked)
# Edit main_scraper.py: use_mock=False
```

## 📈 Scam Detection Algorithm

### Scoring System (0-20 points)
- **5+ points**: Flagged as scam (MISDEED)
- **15+ points**: Extreme risk
- **10-14 points**: High risk  
- **5-9 points**: Moderate risk

### Detection Heuristics
1. **Payment Requests** (+5 points): "Pay $99 registration fee"
2. **Personal Info** (+5 points): "Send SSN", "Bank account details"
3. **Messaging Apps** (+3 points): "Contact WhatsApp", "Telegram only"
4. **Spelling Errors** (+2 points): High density of misspellings
5. **Generic Emails** (+1 point): Gmail, Yahoo domains for business
6. **False Urgency** (+3 points): "URGENT", "IMMEDIATE", "ACT FAST"
7. **Unrealistic Pay** (+4 points): "$5000/week", "Easy money"
8. **Vague Descriptions** (+2 points): Generic job requirements
9. **No Experience** (+2 points): "No experience necessary"

## 📁 Project Structure

```
misdeed-1/
├── scraper/
│   ├── indeed_scraper.py      # Real Indeed scraper
│   ├── mock_scraper.py        # Mock data generator
│   └── venv/                  # Python environment
├── analyzer/
│   ├── main.py                # Scam detection algorithm
│   └── venv/                  # Python environment  
├── backend/
│   ├── api.py                 # FastAPI backend
│   ├── misdeeds.db           # SQLite database
│   └── venv/                  # Python environment
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main frontend page
│   │   └── api/misdeeds/     # Next.js API routes
│   └── components/ui/        # UI components
├── main_scraper.py           # Integration pipeline
└── misdeed_results.json      # Latest scan results
```

## 🔍 Usage Examples

### Running a Scam Detection Scan
```bash
python main_scraper.py
```

Output:
```
🚀 Welcome to Misdeed - Scam Job Detection System
🎭 Using Mock Scraper for testing
✅ Backend API is accessible

🔍 Starting Misdeed Pipeline with 3 queries...
📍 Location: Remote
📄 Pages per query: 1

[1/3] Scraping: 'data entry remote'
   ✅ Found 11 jobs

🔬 Analyzing jobs for scam indicators...
   🚩 MISDEED: Work From Home - No Experience! (Score: 19)
      Reasons: Requests upfront payment or fees, Requests sensitive personal information upfront

📊 FINAL SUMMARY:
   Total jobs processed: 29
   Misdeeds detected: 17
   Legitimate jobs: 12
```

### API Usage
```bash
# Get all misdeeds
curl "http://localhost:8000/api/misdeeds"

# Search for specific scams
curl "http://localhost:8000/api/misdeeds/search?q=data+entry"

# Get high-risk scams only
curl "http://localhost:8000/api/misdeeds?min_score=15"
```

## 🛡️ Anti-Bot Challenges & Solutions

### Current Challenges
1. **Cloudflare Protection**: Indeed uses advanced bot detection
2. **Dynamic Content**: JavaScript-heavy page loading
3. **Rate Limiting**: Aggressive request throttling

### Implemented Solutions
1. **User-Agent Rotation**: Multiple browser signatures
2. **Random Delays**: Human-like browsing patterns
3. **Selenium WebDriver**: Full browser automation
4. **Mock Data System**: Realistic test data for development

### Future Improvements
1. **Proxy Rotation**: Multiple IP addresses
2. **CAPTCHA Solving**: Automated challenge resolution
3. **Browser Fingerprinting**: More sophisticated evasion
4. **Alternative Sources**: LinkedIn, Glassdoor integration

## 🎨 Frontend Features

### Job Listings
- Real-time scam job data
- Risk level badges (Extreme, High, Moderate)
- Company and location information
- Scam score visualization

### Job Details
- Full scam analysis breakdown
- Detailed warning messages
- Original posting links (with warnings)
- Report to authorities buttons

### Search & Filter
- Search by job type or company
- Filter by risk level
- Location-based filtering

## 🔧 Technical Details

### Technologies Used
- **Frontend**: Next.js 15, React 18, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, SQLite, Pydantic
- **Scraping**: Selenium, BeautifulSoup4, Chrome WebDriver
- **Analysis**: Python, pyspellchecker, regex patterns

### Performance
- **Scraping Speed**: ~10-15 jobs/minute (with delays)
- **Analysis Speed**: ~100 jobs/second
- **Database**: SQLite for simplicity, easily upgradeable
- **Frontend**: Server-side rendering with Next.js

## 🚨 Disclaimers

⚠️ **Important Notes**:
1. **Educational Purpose**: This project is for educational/hackathon purposes
2. **Respect robots.txt**: Always check and respect website scraping policies
3. **Rate Limiting**: Implement appropriate delays to avoid overloading servers
4. **False Positives**: AI detection may flag legitimate jobs - always verify
5. **Legal Compliance**: Ensure compliance with local laws regarding web scraping

## 🤝 Contributing

This project was built for a meme hackathon, but contributions are welcome!

### Areas for Improvement
1. **Better Scraping**: More sophisticated anti-detection
2. **ML Integration**: Machine learning for better scam detection
3. **More Platforms**: LinkedIn, Glassdoor, ZipRecruiter support
4. **Mobile App**: React Native implementation
5. **Real-time Alerts**: Notification system for new scams

## 📄 License

MIT License - Feel free to use this for educational purposes!

## 🎉 Demo

Visit the live demo at: **http://localhost:3000** (when running locally)

**Sample Detected Scams**:
- "EASY MONEY WORK FROM HOME!!!" (Score: 19/20)
- "Personal Assistant - URGENT HIRING" (Score: 20/20)  
- "Mystery Shopper - Immediate Start" (Score: 19/20)

---

**Built with ❤️ for protecting job seekers from scams!**
