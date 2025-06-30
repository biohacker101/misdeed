"""
Mock Scraper for Testing
Generates realistic scam job data for testing the Misdeed pipeline.
"""

import random
import time
import json
from typing import List, Dict

class MockScraper:
    def __init__(self):
        """Initialize the mock scraper with sample data."""
        self.scam_companies = [
            "QuickCash Solutions", "EasyMoney Corp", "HomeWorkPro", "FastBucks LLC",
            "MoneyMaker Systems", "WorkFromHome Inc", "InstantPay Solutions",
            "CashFlow Enterprises", "EarnFast Company", "ProfitNow LLC"
        ]
        
        self.scam_job_titles = [
            "EASY MONEY WORK FROM HOME!!!",
            "Make $5000/Week Data Entry",
            "Personal Assistant - URGENT HIRING",
            "Envelope Stuffing - Quick Cash",
            "Mystery Shopper - Immediate Start",
            "Crypto Trading Assistant - High Pay",
            "Work From Home - No Experience!",
            "Data Entry Clerk - $50/Hour",
            "Virtual Assistant - HIRING NOW!",
            "Online Survey Taker - Easy Money"
        ]
        
        self.scam_descriptions = [
            "Make $5000 per week working from home! No experience needed! Just pay $99 registration fee and start earning immediately! Contact us on WhatsApp: +1234567890. Send your bank account details to get started.",
            
            "URGENT HIRING! Personal assistant needed ASAP! Earn $4000 weekly! Must pay $50 background check fee upfront. Text us at +1987654321 for immediate employment. Provide SSN for verification.",
            
            "Easy data entry work! $45 per hour! Work flexible schedule from home! Send $75 training fee to training@quickcash-solutions.com to begin. No skills required!",
            
            "Mystery shopper positions available! Get paid to shop! Earn $300 per assignment! Must invest $200 in starter kit. Contact mysteryshopper@gmail.com immediately!",
            
            "Crypto trading opportunity! Make $10000 monthly! No experience necessary! Send $500 investment fee to get started. WhatsApp only: +1555123456. Act fast - limited spots!",
            
            "Envelope stuffing from home! Earn $2000 weekly! Pay $25 processing fee and we'll send materials. Email your bank account info to payments@homeworkpro.net. Start today!",
            
            "Online surveys - easy money! $200 daily! Pay $35 registration fee to unlock high-paying surveys. Send payment to surveys@earnfast.com. Hiring immediately!",
            
            "Virtual assistant - WORK FROM HOME! $60/hour! Must provide social security number and ID scan for background check. Pay $40 administration fee. Contact via Telegram: @VirtualJobs"
        ]
        
        self.legitimate_companies = [
            "Microsoft", "Google", "Apple", "Amazon", "Meta", "Netflix", "Adobe",
            "Salesforce", "Oracle", "IBM", "Intel", "Cisco", "VMware", "Uber"
        ]
        
        self.legitimate_titles = [
            "Software Engineer", "Data Scientist", "Product Manager", "UX Designer",
            "Marketing Specialist", "Sales Representative", "Account Manager",
            "Business Analyst", "Content Writer", "Customer Support Specialist"
        ]
        
        self.legitimate_descriptions = [
            "We are looking for a skilled software engineer with experience in Python, JavaScript, and AWS. You will work on developing scalable web applications and APIs. Strong problem-solving skills required.",
            
            "Join our data science team to build machine learning models and analyze large datasets. Experience with SQL, Python, and statistical analysis required. Competitive salary and benefits.",
            
            "Seeking a product manager to lead cross-functional teams and drive product strategy. MBA preferred. Experience in tech industry required. Excellent communication skills essential.",
            
            "UX Designer needed to create user-centered designs for our mobile applications. Proficiency in Figma, Sketch, and user research methods required. Portfolio required for application.",
            
            "Marketing specialist to develop and execute marketing campaigns across digital channels. Experience with Google Analytics, social media marketing, and content creation required."
        ]
    
    def search_jobs(self, query: str, location: str = "", num_pages: int = 3) -> List[Dict]:
        """
        Mock job search that returns a mix of scam and legitimate jobs.
        Scam jobs are more likely for typical scam queries.
        """
        jobs = []
        
        # Determine scam probability based on query
        scam_queries = [
            "data entry", "easy money", "work from home", "envelope stuffing",
            "mystery shopper", "crypto", "personal assistant", "make money fast"
        ]
        
        is_scam_query = any(scam_term in query.lower() for scam_term in scam_queries)
        scam_probability = 0.7 if is_scam_query else 0.2
        
        jobs_per_page = random.randint(8, 12)
        
        for page in range(num_pages):
            print(f"  Generating page {page + 1} of mock data...")
            
            for _ in range(jobs_per_page):
                if random.random() < scam_probability:
                    # Generate scam job
                    job = self._generate_scam_job()
                else:
                    # Generate legitimate job
                    job = self._generate_legitimate_job()
                
                jobs.append(job)
            
            # Simulate scraping delay
            time.sleep(0.5)
        
        print(f"  Generated {len(jobs)} mock jobs")
        return jobs
    
    def _generate_scam_job(self) -> Dict:
        """Generate a realistic scam job posting."""
        return {
            'job_title': random.choice(self.scam_job_titles),
            'company_name': random.choice(self.scam_companies),
            'job_description': random.choice(self.scam_descriptions),
            'location': random.choice(["Remote", "Work from Home", "Anywhere", "USA"]),
            'salary_range': random.choice([
                "$5000 per week", "$4000 weekly", "$200 daily", "$50 per hour",
                "$300 per assignment", "$10000 monthly", "$2000 weekly"
            ]),
            'post_date': random.choice(["1 day ago", "2 days ago", "3 days ago", "Just posted"]),
            'original_url': f"https://www.indeed.com/viewjob?jk=mock{random.randint(100000, 999999)}",
            'source_platform': 'Indeed'
        }
    
    def _generate_legitimate_job(self) -> Dict:
        """Generate a realistic legitimate job posting."""
        return {
            'job_title': random.choice(self.legitimate_titles),
            'company_name': random.choice(self.legitimate_companies),
            'job_description': random.choice(self.legitimate_descriptions),
            'location': random.choice([
                "San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX",
                "Boston, MA", "Chicago, IL", "Los Angeles, CA", "Remote"
            ]),
            'salary_range': random.choice([
                "$120,000 - $150,000", "$100,000 - $130,000", "$80,000 - $110,000",
                "$150,000 - $200,000", "$90,000 - $120,000", "Competitive salary"
            ]),
            'post_date': random.choice(["1 day ago", "2 days ago", "1 week ago", "5 days ago"]),
            'original_url': f"https://www.indeed.com/viewjob?jk=legit{random.randint(100000, 999999)}",
            'source_platform': 'Indeed'
        }


def main():
    """Test the mock scraper."""
    scraper = MockScraper()
    
    test_queries = ["data entry remote", "software engineer", "easy money online"]
    
    for query in test_queries:
        print(f"\n--- Mock search for: {query} ---")
        jobs = scraper.search_jobs(query, num_pages=1)
        
        print(f"Generated {len(jobs)} jobs:")
        for i, job in enumerate(jobs[:3], 1):
            print(f"{i}. {job['job_title']} at {job['company_name']}")
            print(f"   Salary: {job['salary_range']}")
            print(f"   Description: {job['job_description'][:80]}...")
            print()


if __name__ == "__main__":
    main() 