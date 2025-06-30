#!/usr/bin/env python3
"""
Populate Database with Mock Data
Script to generate extensive mock data and populate the database via the API.
"""

import sys
import os
sys.path.append('scraper')
sys.path.append('analyzer')

from enhanced_mock_scraper import EnhancedMockScraper
from main import ScamAnalyzer
import requests
import json
from typing import List, Dict

def analyze_and_submit_jobs(jobs: List[Dict], backend_url: str = "http://localhost:8000"):
    """Analyze jobs and submit them to the backend API."""
    analyzer = ScamAnalyzer()
    
    print(f"Analyzing and submitting {len(jobs)} jobs to {backend_url}")
    
    successful_submissions = 0
    failed_submissions = 0
    
    for i, job in enumerate(jobs):
        try:
            if i % 50 == 0:
                print(f"Processing job {i+1}/{len(jobs)}...")
            
            # Analyze the job for scam indicators
            analysis = analyzer.analyze_job(job)
            
            # Prepare job data for API submission
            job_data = {
                "job_title": job['job_title'],
                "company_name": job['company_name'],
                "description": job['job_description'],
                "location": job['location'],
                "original_url": job['original_url'],
                "source_platform": job['source_platform'],
                "scam_score": analysis['scam_score'],
                "scam_reasons": analysis['scam_reasons']
            }
            
            # Submit to API
            response = requests.post(f"{backend_url}/api/jobs", json=job_data, timeout=10)
            
            if response.status_code == 200:
                successful_submissions += 1
            else:
                print(f"Failed to submit job {i+1}: {response.status_code} - {response.text}")
                failed_submissions += 1
                
        except Exception as e:
            print(f"Error processing job {i+1}: {e}")
            failed_submissions += 1
    
    print(f"\nSubmission Results:")
    print(f"✅ Successful: {successful_submissions}")
    print(f"❌ Failed: {failed_submissions}")
    print(f"📊 Total: {len(jobs)}")
    
    return successful_submissions, failed_submissions

def main():
    """Main function to generate and populate mock data."""
    print("🚀 Starting Mock Data Population...")
    
    # Initialize the enhanced mock scraper
    scraper = EnhancedMockScraper()
    
    # Generate extensive mock data
    print("\n📝 Generating mock data...")
    jobs = scraper.generate_extensive_mock_data(num_jobs=300)
    
    # Save raw data to file for backup
    print("\n💾 Saving raw data...")
    with open('generated_mock_jobs.json', 'w', encoding='utf-8') as f:
        json.dump(jobs, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(jobs)} raw jobs to generated_mock_jobs.json")
    
    # Analyze and submit to backend
    print("\n🔍 Analyzing and submitting jobs...")
    try:
        successful, failed = analyze_and_submit_jobs(jobs)
        
        if successful > 0:
            print(f"\n🎉 Successfully populated database with {successful} analyzed jobs!")
        else:
            print(f"\n❌ Failed to populate database. Check if backend is running on http://localhost:8000")
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Connection Error: Backend API is not running!")
        print("Please start the backend first with: cd backend && python api.py")
        return False
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        return False
    
    print("\n✅ Mock data population completed!")
    return True

if __name__ == "__main__":
    success = main()
    if not success:
        sys.exit(1) 