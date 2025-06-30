"""
Main Misdeed Scraper Integration Script
Coordinates scraping, analysis, and backend storage.
"""

import sys
import os
import json
import requests
import time
from typing import List, Dict

# Add module paths
sys.path.append(os.path.join(os.path.dirname(__file__), 'scraper'))
sys.path.append(os.path.join(os.path.dirname(__file__), 'analyzer'))

from indeed_scraper import IndeedScraper
from mock_scraper import MockScraper
from main import ScamAnalyzer

class MisdeedPipeline:
    def __init__(self, backend_url: str = "http://localhost:8000", use_mock: bool = True):
        """Initialize the Misdeed pipeline."""
        self.backend_url = backend_url
        self.use_mock = use_mock
        
        if use_mock:
            self.scraper = MockScraper()
            print("🎭 Using Mock Scraper for testing")
        else:
            self.scraper = IndeedScraper(headless=True)
            print("🌐 Using Real Indeed Scraper")
            
        self.analyzer = ScamAnalyzer()
        
    def run_pipeline(self, queries: List[str], location: str = "Remote", pages_per_query: int = 2):
        """
        Run the complete pipeline: scrape -> analyze -> store
        
        Args:
            queries: List of job search queries (scam-related terms)
            location: Location to search in
            pages_per_query: Number of pages to scrape per query
        """
        all_jobs = []
        misdeeds_found = 0
        
        print(f"🔍 Starting Misdeed Pipeline with {len(queries)} queries...")
        print(f"📍 Location: {location}")
        print(f"📄 Pages per query: {pages_per_query}")
        print("-" * 60)
        
        # Step 1: Scrape jobs for each query
        for i, query in enumerate(queries, 1):
            print(f"\n[{i}/{len(queries)}] Scraping: '{query}'")
            
            try:
                jobs = self.scraper.search_jobs(
                    query=query, 
                    location=location, 
                    num_pages=pages_per_query
                )
                
                print(f"   ✅ Found {len(jobs)} jobs")
                all_jobs.extend(jobs)
                
            except Exception as e:
                print(f"   ❌ Error scraping '{query}': {e}")
                continue
            
            # Add delay between queries to be respectful (only for real scraper)
            if not self.use_mock:
                time.sleep(3)
        
        print(f"\n📊 Total jobs scraped: {len(all_jobs)}")
        
        # Step 2: Analyze each job for scam indicators
        print("\n🔬 Analyzing jobs for scam indicators...")
        analyzed_jobs = []
        
        for job in all_jobs:
            try:
                analyzed_job = self.analyzer.analyze_job(job)
                analyzed_jobs.append(analyzed_job)
                
                # Count misdeeds (jobs with scam score >= 5)
                if analyzed_job['scam_score'] >= 5:
                    misdeeds_found += 1
                    print(f"   🚩 MISDEED: {analyzed_job['job_title']} (Score: {analyzed_job['scam_score']})")
                    print(f"      Reasons: {', '.join(analyzed_job['scam_reasons'])}")
                
            except Exception as e:
                print(f"   ❌ Error analyzing job: {e}")
                continue
        
        print(f"\n📈 Analysis complete:")
        print(f"   Total jobs analyzed: {len(analyzed_jobs)}")
        print(f"   Misdeeds found: {misdeeds_found}")
        print(f"   Legitimate jobs: {len(analyzed_jobs) - misdeeds_found}")
        
        # Step 3: Store misdeeds in backend
        if misdeeds_found > 0:
            print(f"\n💾 Storing {misdeeds_found} misdeeds in backend...")
            stored_count = self._store_misdeeds(analyzed_jobs)
            print(f"   ✅ Successfully stored {stored_count} misdeeds")
        else:
            print("\n✨ No misdeeds found to store")
        
        return analyzed_jobs
    
    def _store_misdeeds(self, jobs: List[Dict]) -> int:
        """Store jobs with high scam scores in the backend."""
        stored_count = 0
        
        for job in jobs:
            if job['scam_score'] >= 5:  # Only store misdeeds
                try:
                    # Prepare job data for API
                    job_data = {
                        "job_title": job.get('job_title', ''),
                        "company_name": job.get('company_name', ''),
                        "description": job.get('job_description', ''),
                        "location": job.get('location', ''),
                        "original_url": job.get('original_url', ''),
                        "source_platform": job.get('source_platform', 'Indeed'),
                        "scam_score": job['scam_score'],
                        "scam_reasons": job['scam_reasons']
                    }
                    
                    # Send to backend API
                    response = requests.post(
                        f"{self.backend_url}/api/jobs",
                        json=job_data,
                        timeout=10
                    )
                    
                    if response.status_code == 200:
                        stored_count += 1
                        print(f"   ✅ Stored: {job_data['job_title']}")
                    else:
                        print(f"   ⚠️  Failed to store job: {response.status_code}")
                        
                except Exception as e:
                    print(f"   ❌ Error storing job: {e}")
        
        return stored_count
    
    def test_backend_connection(self):
        """Test if the backend API is accessible."""
        try:
            response = requests.get(f"{self.backend_url}/", timeout=5)
            if response.status_code == 200:
                print("✅ Backend API is accessible")
                return True
            else:
                print(f"❌ Backend API returned status: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Cannot connect to backend API: {e}")
            return False


def main():
    """Main function to run the Misdeed pipeline."""
    print("🚀 Welcome to Misdeed - Scam Job Detection System")
    print("=" * 60)
    
    # Initialize pipeline with mock scraper for testing
    pipeline = MisdeedPipeline(use_mock=True)
    
    # Test backend connection
    print("🔗 Testing backend connection...")
    backend_available = pipeline.test_backend_connection()
    if not backend_available:
        print("⚠️  Backend not available. Jobs will be analyzed but not stored.")
        print("   To start the backend, run: cd backend && python api.py")
    
    # Common scam job queries (from design spec)
    scam_queries = [
        "data entry remote",
        "personal assistant work from home", 
        "easy money online",
        "envelope stuffing",
        "mystery shopper",
        "crypto trading remote",
        "work from home no experience",
        "make money fast"
    ]
    
    # For testing, let's use fewer queries
    test_queries = scam_queries[:3]
    
    print(f"\n🎯 Target queries: {test_queries}")
    
    # Run the pipeline
    try:
        results = pipeline.run_pipeline(
            queries=test_queries,
            location="Remote", 
            pages_per_query=1  # Start with 1 page for testing
        )
        
        # Save results to file for inspection
        output_file = "misdeed_results.json"
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2)
        
        print(f"\n💾 Results saved to {output_file}")
        
        # Show summary statistics
        misdeeds = [job for job in results if job['scam_score'] >= 5]
        legitimate = [job for job in results if job['scam_score'] < 5]
        
        print(f"\n📊 FINAL SUMMARY:")
        print(f"   Total jobs processed: {len(results)}")
        print(f"   Misdeeds detected: {len(misdeeds)}")
        print(f"   Legitimate jobs: {len(legitimate)}")
        
        if misdeeds:
            print(f"\n🔥 TOP MISDEEDS:")
            sorted_misdeeds = sorted(misdeeds, key=lambda x: x['scam_score'], reverse=True)
            for i, job in enumerate(sorted_misdeeds[:3], 1):
                print(f"   {i}. {job['job_title']} (Score: {job['scam_score']})")
                print(f"      Company: {job['company_name']}")
                print(f"      Reasons: {', '.join(job['scam_reasons'][:2])}...")
        
        print("\n🎉 Pipeline completed successfully!")
        
        if backend_available:
            print("\n🌐 View results at: http://localhost:8000/api/misdeeds")
        
    except KeyboardInterrupt:
        print("\n⏹️  Pipeline stopped by user")
    except Exception as e:
        print(f"\n❌ Pipeline failed: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main() 