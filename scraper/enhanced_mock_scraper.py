"""
Enhanced Mock Scraper for Testing
Generates extensive realistic scam job data for testing the Misdeed pipeline.
"""

import random
import time
import json
from typing import List, Dict
from datetime import datetime, timedelta

class EnhancedMockScraper:
    def __init__(self):
        """Initialize the enhanced mock scraper with extensive sample data."""
        self.scam_companies = [
            "QuickCash Solutions", "EasyMoney Corp", "HomeWorkPro", "FastBucks LLC",
            "MoneyMaker Systems", "WorkFromHome Inc", "InstantPay Solutions",
            "CashFlow Enterprises", "EarnFast Company", "ProfitNow LLC",
            "GlobalEarn Ltd", "WealthBuilder Co", "PayFast Solutions",
            "DreamJob Inc", "SuccessNow Corp", "RichLife LLC", "EarnMore Pro",
            "CashMaster Systems", "WinBig Company", "EasyProfit Corp",
            "QuickRich Solutions", "MoneyFlow Inc", "PayDay Systems",
            "WealthMaker Co", "CashCow Enterprises", "EarnNow LLC",
            "ProfitMaker Inc", "MoneyTree Corp", "WealthGenerator Ltd",
            "CashBuilder Systems", "EarnBig Solutions", "PayMore Inc"
        ]
        
        self.scam_job_titles = [
            "EASY MONEY WORK FROM HOME!!!", "Make $5000/Week Data Entry",
            "Personal Assistant - URGENT HIRING", "Envelope Stuffing - Quick Cash",
            "Mystery Shopper - Immediate Start", "Crypto Trading Assistant - High Pay",
            "Work From Home - No Experience!", "Data Entry Clerk - $50/Hour",
            "Virtual Assistant - HIRING NOW!", "Online Survey Taker - Easy Money",
            "Package Handling Agent - Quick Money", "Remote Admin - $60/Hour",
            "Email Processing Specialist", "Copy and Paste Jobs - Easy Cash",
            "Online Chat Support - No Experience", "Document Processing - Work From Home",
            "Quality Assurance Tester - Remote", "Social Media Manager - Flexible",
            "Customer Service Rep - Immediate Start", "Appointment Setter - High Commission",
            "Lead Generation Specialist", "Content Moderator - Easy Work",
            "Transcription Specialist - Flexible Hours", "Research Assistant - Remote",
            "Online Tutor - Easy Money", "Virtual Bookkeeper - No Experience",
            "Digital Marketing Assistant", "E-commerce Assistant - Remote",
            "Online Sales Representative - High Pay", "Remote Secretary - Flexible",
            "Freelance Writer - Quick Cash", "Online Reviewer - Easy Money",
            "Data Analyst - Work From Home", "Remote Project Manager",
            "Online Consultant - High Earnings", "Virtual Recruiter - Commission Based",
            "Remote Graphic Designer - Urgent", "Online Event Coordinator",
            "Digital Content Creator - Flexible", "Remote Travel Agent",
            "Online Personal Trainer", "Virtual Interior Designer",
            "Remote Financial Advisor", "Online Language Translator",
            "Virtual Real Estate Agent", "Remote IT Support - No Experience",
            "Online Fitness Coach", "Virtual Wedding Planner",
            "Remote SEO Specialist", "Online Business Consultant"
        ]
        
        self.scam_descriptions = [
            "Make $5000 per week working from home! No experience needed! Just pay $99 registration fee and start earning immediately! Contact us on WhatsApp: +1234567890. Send your bank account details to get started.",
            
            "URGENT HIRING! Personal assistant needed ASAP! Earn $4000 weekly! Must pay $50 background check fee upfront. Text us at +1987654321 for immediate employment. Provide SSN for verification.",
            
            "Easy data entry work! $45 per hour! Work flexible schedule from home! Send $75 training fee to training@quickcash-solutions.com to begin. No skills required!",
            
            "Mystery shopper positions available! Get paid to shop! Earn $300 per assignment! Must invest $200 in starter kit. Contact mysteryshopper@gmail.com immediately!",
            
            "Crypto trading opportunity! Make $10000 monthly! No experience necessary! Send $500 investment fee to get started. WhatsApp only: +1555123456. Act fast - limited spots!",
            
            "Envelope stuffing from home! Earn $2000 weekly! Pay $25 processing fee and we'll send materials. Email your bank account info to payments@homeworkpro.net. Start today!",
            
            "Online surveys - easy money! $200 daily! Pay $35 registration fee to unlock high-paying surveys. Send payment to surveys@earnfast.com. Hiring immediately!",
            
            "Virtual assistant - WORK FROM HOME! $60/hour! Must provide social security number and ID scan for background check. Pay $40 administration fee. Contact via Telegram: @VirtualJobs",
            
            "Package handling from home! Receive packages and reship them! Earn $500 per package! Pay $150 setup fee for supplies. Send copy of driver's license and SSN. Start immediately!",
            
            "Email processing jobs! Process 500 emails daily! Earn $0.50 per email! Pay $29.99 training fee to access email database. Work from anywhere! Contact emailjobs@fastcash.net",
            
            "Copy and paste work! Earn $300 daily! Simply copy text from one website to another! Pay $49 for premium access. No experience needed! Join thousands of satisfied workers!",
            
            "Online chat support! $25/hour! Chat with customers about our products! Must pay $60 for software license. Immediate start available! Text 'CHAT' to +1555999888",
            
            "Quality assurance testing! Test websites and apps! $200 per test! Pay $80 for testing certification. Work flexible hours! Send payment to qa@testingpro.com",
            
            "Social media management! Manage Instagram accounts! $40/hour! Pay $90 for social media course access. Start earning today! WhatsApp: +1777888999",
            
            "Appointment setting! Set appointments for local businesses! $300 weekly! Pay $35 for lead database access. Commission based pay! Easy work from home!",
            
            "Lead generation specialist! Generate leads for real estate agents! $50 per qualified lead! Pay $120 for CRM software access. Unlimited earning potential!",
            
            "Content moderation! Review social media posts! $20/hour! Pay $45 for content guidelines training. Flexible schedule! Work from anywhere worldwide!",
            
            "Transcription work! Transcribe audio files! $22/hour! Pay $65 for transcription software. Fast typing required! Join our team of professionals!",
            
            "Research assistant! Conduct online research! $35/hour! Pay $55 for research database access. Academic background preferred! Immediate openings available!",
            
            "Online tutoring! Teach students via video chat! $50/hour! Pay $100 for teaching platform access. Any subject welcome! Flexible scheduling!",
            
            "Virtual bookkeeping! Manage QuickBooks for small businesses! $45/hour! Pay $85 for accounting software. No experience needed - we'll train you!",
            
            "Digital marketing! Run Facebook ads for businesses! $400 weekly! Pay $150 for marketing tools access. High demand skill! Start your career today!",
            
            "E-commerce assistant! List products on Amazon! $30/hour! Pay $75 for Amazon seller tools. Product research included! Work from home opportunity!",
            
            "Online sales! Sell digital products via phone! $1000 weekly commission! Pay $110 for sales training materials. Top performers earn $5000 monthly!",
            
            "Virtual secretary! Handle emails and calendars! $35/hour! Pay $50 for office software suite. Professional experience preferred! Remote position!",
            
            "Freelance writing! Write articles and blog posts! $40/hour! Pay $70 for writing platform access. Native English speakers only! Unlimited work available!",
            
            "Online product reviews! Review products on Amazon! $15 per review! Pay $40 for reviewer certification. Keep the products you review! Easy money!",
            
            "Remote data analysis! Analyze spreadsheets and create reports! $55/hour! Pay $95 for data analysis software. Excel skills required! Professional opportunity!",
            
            "Virtual project management! Coordinate remote teams! $65/hour! Pay $125 for project management tools. Leadership experience preferred! Growing company!",
            
            "Online consulting! Provide business advice via video calls! $100/hour! Pay $200 for consultant certification. Business experience required! Set your own hours!"
        ]
        
        self.locations = [
            "Remote", "Work from Home", "Anywhere", "USA", "Canada", "UK",
            "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX",
            "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA",
            "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL",
            "Fort Worth, TX", "Columbus, OH", "San Francisco, CA", "Charlotte, NC",
            "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC",
            "Boston, MA", "El Paso, TX", "Nashville, TN", "Detroit, MI",
            "Oklahoma City, OK", "Portland, OR", "Las Vegas, NV", "Memphis, TN",
            "Louisville, KY", "Baltimore, MD", "Milwaukee, WI", "Albuquerque, NM",
            "Tucson, AZ", "Fresno, CA", "Mesa, AZ", "Sacramento, CA",
            "Atlanta, GA", "Kansas City, MO", "Colorado Springs, CO", "Miami, FL",
            "Raleigh, NC", "Omaha, NE", "Long Beach, CA", "Virginia Beach, VA"
        ]
        
        self.suspicious_emails = [
            "@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com",
            "@aol.com", "@protonmail.com", "@tutanota.com", "@guerrillamail.com"
        ]
        
        self.suspicious_contact_methods = [
            "WhatsApp", "Telegram", "Signal", "Text only", "Email only",
            "Discord", "Skype", "WeChat", "Viber", "Facebook Messenger"
        ]

    def generate_extensive_mock_data(self, num_jobs: int = 500) -> List[Dict]:
        """Generate extensive mock data with a mix of scam and legitimate jobs."""
        jobs = []
        
        print(f"Generating {num_jobs} mock jobs...")
        
        for i in range(num_jobs):
            if i % 50 == 0:
                print(f"Generated {i}/{num_jobs} jobs...")
            
            # 70% scam jobs, 30% legitimate jobs
            if random.random() < 0.7:
                job = self._generate_advanced_scam_job()
            else:
                job = self._generate_legitimate_job()
            
            jobs.append(job)
        
        print(f"Generated {len(jobs)} total mock jobs!")
        return jobs

    def _generate_advanced_scam_job(self) -> Dict:
        """Generate an advanced scam job with realistic details."""
        # Generate random dates within the last 30 days
        days_ago = random.randint(0, 30)
        post_date = (datetime.now() - timedelta(days=days_ago)).strftime("%Y-%m-%d")
        
        # Scam salary ranges (unrealistically high)
        scam_salaries = [
            "$5000 per week", "$4000 weekly", "$200 daily", "$50 per hour",
            "$300 per assignment", "$10000 monthly", "$2000 weekly",
            "$75 per hour", "$600 daily", "$8000 monthly", "$100 per hour",
            "$1000 weekly", "$250 daily", "$12000 monthly", "$150 per hour",
            "$500 per task", "$80 per hour", "$400 daily", "$6000 monthly"
        ]
        
        job_title = random.choice(self.scam_job_titles)
        company = random.choice(self.scam_companies)
        description = random.choice(self.scam_descriptions)
        
        # Add random variations to make it more realistic
        if random.random() < 0.3:  # 30% chance of adding extra suspicious elements
            description += f" Contact us immediately at {random.choice(['info', 'jobs', 'hiring', 'hr'])}{random.choice(self.suspicious_emails)}"
        
        if random.random() < 0.2:  # 20% chance of adding phone number
            description += f" Call/Text: +1{random.randint(100, 999)}{random.randint(100, 999)}{random.randint(1000, 9999)}"
        
        return {
            'job_title': job_title,
            'company_name': company,
            'job_description': description,
            'location': random.choice(self.locations),
            'salary_range': random.choice(scam_salaries),
            'post_date': post_date,
            'original_url': f"https://www.indeed.com/viewjob?jk=mock{random.randint(100000, 999999)}",
            'source_platform': random.choice(['Indeed', 'LinkedIn', 'ZipRecruiter', 'Monster', 'Glassdoor'])
        }

    def _generate_legitimate_job(self) -> Dict:
        """Generate a legitimate job posting."""
        legitimate_companies = [
            "Microsoft", "Google", "Apple", "Amazon", "Meta", "Netflix", "Adobe",
            "Salesforce", "Oracle", "IBM", "Intel", "Cisco", "VMware", "Uber",
            "Airbnb", "Twitter", "Spotify", "Dropbox", "Slack", "Zoom",
            "Tesla", "SpaceX", "NVIDIA", "PayPal", "Stripe", "Square",
            "Shopify", "Twilio", "MongoDB", "Atlassian", "GitHub", "GitLab"
        ]
        
        legitimate_titles = [
            "Software Engineer", "Data Scientist", "Product Manager", "UX Designer",
            "Marketing Specialist", "Sales Representative", "Account Manager",
            "Business Analyst", "Content Writer", "Customer Support Specialist",
            "DevOps Engineer", "Full Stack Developer", "Frontend Developer",
            "Backend Developer", "Mobile Developer", "QA Engineer",
            "Technical Writer", "Scrum Master", "Digital Marketing Manager",
            "HR Business Partner", "Financial Analyst", "Operations Manager"
        ]
        
        legitimate_descriptions = [
            "We are looking for a skilled software engineer with experience in Python, JavaScript, and AWS. You will work on developing scalable web applications and APIs. Strong problem-solving skills required.",
            
            "Join our data science team to build machine learning models and analyze large datasets. Experience with SQL, Python, and statistical analysis required. Competitive salary and benefits.",
            
            "Seeking a product manager to lead cross-functional teams and drive product strategy. MBA preferred. Experience in tech industry required. Excellent communication skills essential.",
            
            "UX Designer needed to create user-centered designs for our mobile applications. Proficiency in Figma, Sketch, and user research methods required. Portfolio required for application.",
            
            "Marketing specialist to develop and execute marketing campaigns across digital channels. Experience with Google Analytics, social media marketing, and content creation required.",
            
            "Sales representative to drive revenue growth and build relationships with enterprise clients. CRM experience preferred. Commission-based compensation with base salary.",
            
            "Account manager to maintain and grow existing client relationships. Strong communication skills and project management experience required. Remote work available.",
            
            "Business analyst to gather requirements and analyze business processes. SQL and Excel skills required. Experience with Tableau or Power BI preferred.",
            
            "Content writer to create engaging blog posts, website copy, and marketing materials. Strong writing portfolio required. SEO knowledge a plus.",
            
            "Customer support specialist to provide excellent service via phone, email, and chat. Previous support experience preferred. Flexible schedule available."
        ]
        
        # Realistic salary ranges
        legitimate_salaries = [
            "$120,000 - $150,000", "$100,000 - $130,000", "$80,000 - $110,000",
            "$150,000 - $200,000", "$90,000 - $120,000", "Competitive salary",
            "$70,000 - $95,000", "$110,000 - $140,000", "$85,000 - $115,000",
            "$130,000 - $160,000", "$95,000 - $125,000", "$75,000 - $100,000"
        ]
        
        # Generate random dates within the last 14 days
        days_ago = random.randint(0, 14)
        post_date = (datetime.now() - timedelta(days=days_ago)).strftime("%Y-%m-%d")
        
        return {
            'job_title': random.choice(legitimate_titles),
            'company_name': random.choice(legitimate_companies),
            'job_description': random.choice(legitimate_descriptions),
            'location': random.choice([
                "San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX",
                "Boston, MA", "Chicago, IL", "Los Angeles, CA", "Remote",
                "Denver, CO", "Atlanta, GA", "Portland, OR", "Miami, FL"
            ]),
            'salary_range': random.choice(legitimate_salaries),
            'post_date': post_date,
            'original_url': f"https://www.indeed.com/viewjob?jk=legit{random.randint(100000, 999999)}",
            'source_platform': random.choice(['Indeed', 'LinkedIn', 'AngelList', 'ZipRecruiter'])
        }


def main():
    """Generate extensive mock data and save to file."""
    scraper = EnhancedMockScraper()
    
    # Generate 500 mock jobs
    jobs = scraper.generate_extensive_mock_data(500)
    
    # Save to file
    with open('extensive_mock_data.json', 'w', encoding='utf-8') as f:
        json.dump(jobs, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(jobs)} mock jobs to extensive_mock_data.json")
    
    # Print sample
    print("\nSample of generated jobs:")
    for i, job in enumerate(jobs[:5], 1):
        print(f"{i}. {job['job_title']} at {job['company_name']}")
        print(f"   Salary: {job['salary_range']}")
        print(f"   Location: {job['location']}")
        print(f"   Description: {job['job_description'][:100]}...")
        print()


if __name__ == "__main__":
    main() 