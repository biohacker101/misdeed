"""
Indeed Job Scraper Module
A robust scraper for extracting job postings from Indeed with anti-blocking measures.
"""

import time
import random
import json
import requests
from urllib.parse import urlencode
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class IndeedScraper:
    def __init__(self, headless: bool = True, debug: bool = False):
        """Initialize the Indeed scraper with anti-blocking measures."""
        self.user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0'
        ]
        self.headless = headless
        self.debug = debug
        self.driver = None
        
    def setup_driver(self) -> webdriver.Chrome:
        """Set up Chrome driver with anti-detection options."""
        chrome_options = Options()
        
        if self.headless:
            chrome_options.add_argument('--headless')
        
        # Anti-detection measures
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument('--disable-web-security')
        chrome_options.add_argument('--allow-running-insecure-content')
        
        # Random user agent
        user_agent = random.choice(self.user_agents)
        chrome_options.add_argument(f'--user-agent={user_agent}')
        
        # Set up driver
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # Set window size
        driver.set_window_size(1920, 1080)
        
        # Execute script to remove webdriver property
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        
        return driver
    
    def random_delay(self, min_seconds: float = 2.0, max_seconds: float = 5.0):
        """Add random delay to mimic human behavior."""
        delay = random.uniform(min_seconds, max_seconds)
        time.sleep(delay)
    
    def search_jobs(self, query: str, location: str = "", num_pages: int = 3) -> List[Dict]:
        """
        Search for jobs on Indeed and return job data.
        
        Args:
            query: Job search query (e.g., "data entry", "personal assistant")
            location: Location to search in
            num_pages: Number of pages to scrape
            
        Returns:
            List of job dictionaries with extracted data
        """
        jobs = []
        
        try:
            self.driver = self.setup_driver()
            logger.info(f"Starting Indeed search for: {query} in {location}")
            
            for page in range(num_pages):
                start = page * 10  # Indeed shows 10 jobs per page
                url = self._build_search_url(query, location, start)
                
                logger.info(f"Scraping page {page + 1}: {url}")
                self.driver.get(url)
                self.random_delay(3, 6)
                
                # Debug: Take screenshot if enabled
                if self.debug:
                    self.driver.save_screenshot(f'debug_page_{page + 1}.png')
                    logger.info(f"Screenshot saved: debug_page_{page + 1}.png")
                
                # Try multiple selectors for job cards
                job_cards = self._find_job_cards()
                
                if not job_cards:
                    logger.warning(f"No job cards found on page {page + 1}")
                    if self.debug:
                        logger.info(f"Page source length: {len(self.driver.page_source)}")
                        logger.info(f"Page title: {self.driver.title}")
                    continue
                
                logger.info(f"Found {len(job_cards)} job cards on page {page + 1}")
                
                # Extract job data with simpler approach
                page_jobs = self._extract_jobs_from_page()
                jobs.extend(page_jobs)
                
                # Random delay between pages
                self.random_delay(5, 8)
                
        except Exception as e:
            logger.error(f"Error during scraping: {e}")
            if self.debug:
                import traceback
                traceback.print_exc()
        finally:
            if self.driver:
                self.driver.quit()
        
        logger.info(f"Scraped {len(jobs)} jobs total")
        return jobs
    
    def _find_job_cards(self):
        """Try multiple selectors to find job cards."""
        selectors = [
            '[data-jk]',
            '.job_seen_beacon',
            '.jobsearch-SerpJobCard',
            '.slider_container .slider_item',
            '[data-testid="job-card"]',
            '.jobsearch-ResultsList .result'
        ]
        
        for selector in selectors:
            try:
                elements = self.driver.find_elements(By.CSS_SELECTOR, selector)
                if elements:
                    logger.info(f"Found {len(elements)} job cards using selector: {selector}")
                    return elements
            except Exception as e:
                logger.debug(f"Selector {selector} failed: {e}")
                continue
        
        return []
    
    def _extract_jobs_from_page(self) -> List[Dict]:
        """Extract job information from the current page using a simpler approach."""
        jobs = []
        
        try:
            # Get page source and parse with BeautifulSoup
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            
            # Try to find job cards in the HTML
            job_elements = []
            
            # Try different selectors
            selectors = [
                '[data-jk]',
                '.jobsearch-SerpJobCard',
                '.job_seen_beacon'
            ]
            
            for selector in selectors:
                elements = soup.select(selector)
                if elements:
                    job_elements = elements
                    logger.info(f"Found {len(elements)} jobs using BeautifulSoup selector: {selector}")
                    break
            
            for element in job_elements[:10]:  # Limit to 10 jobs per page
                try:
                    job_data = self._extract_job_from_soup_element(element)
                    if job_data and job_data.get('job_title'):
                        jobs.append(job_data)
                except Exception as e:
                    logger.debug(f"Error extracting job: {e}")
                    continue
            
        except Exception as e:
            logger.error(f"Error extracting jobs from page: {e}")
        
        return jobs
    
    def _extract_job_from_soup_element(self, element) -> Optional[Dict]:
        """Extract job information from a BeautifulSoup element."""
        try:
            # Extract job title
            job_title = ""
            title_selectors = [
                'h2 a span[title]',
                'h2 a span',
                'h2.jobTitle a span',
                '.jobTitle a span',
                '[data-testid="job-title"] a span'
            ]
            
            for selector in title_selectors:
                title_elem = element.select_one(selector)
                if title_elem:
                    job_title = title_elem.get('title') or title_elem.get_text(strip=True)
                    break
            
            # Extract company name
            company_name = ""
            company_selectors = [
                '[data-testid="company-name"]',
                '.companyName',
                'span.companyName a',
                'span.companyName'
            ]
            
            for selector in company_selectors:
                company_elem = element.select_one(selector)
                if company_elem:
                    company_name = company_elem.get_text(strip=True)
                    break
            
            # Extract location
            location = ""
            location_selectors = [
                '[data-testid="job-location"]',
                '.companyLocation',
                '.locationsContainer'
            ]
            
            for selector in location_selectors:
                location_elem = element.select_one(selector)
                if location_elem:
                    location = location_elem.get_text(strip=True)
                    break
            
            # Extract salary if available
            salary = ""
            salary_selectors = [
                '.salary-snippet-container',
                '.salaryText',
                '[data-testid="job-salary"]'
            ]
            
            for selector in salary_selectors:
                salary_elem = element.select_one(selector)
                if salary_elem:
                    salary = salary_elem.get_text(strip=True)
                    break
            
            # Extract job description/summary
            description = ""
            desc_selectors = [
                '.summary ul',
                '.summary',
                '.jobSnippet'
            ]
            
            for selector in desc_selectors:
                desc_elem = element.select_one(selector)
                if desc_elem:
                    description = desc_elem.get_text(strip=True)
                    break
            
            # Get job ID and URL
            job_id = element.get('data-jk') or ""
            original_url = f"https://www.indeed.com/viewjob?jk={job_id}" if job_id else ""
            
            # Get post date
            post_date = ""
            date_elem = element.select_one('.date')
            if date_elem:
                post_date = date_elem.get_text(strip=True)
            
            if not job_title:  # Skip if no title found
                return None
            
            job_data = {
                'job_title': job_title,
                'company_name': company_name,
                'job_description': description,
                'location': location,
                'salary_range': salary,
                'post_date': post_date,
                'original_url': original_url,
                'source_platform': 'Indeed'
            }
            
            logger.debug(f"Extracted job: {job_title} at {company_name}")
            return job_data
            
        except Exception as e:
            logger.debug(f"Error extracting job from element: {e}")
            return None
    
    def _build_search_url(self, query: str, location: str, start: int = 0) -> str:
        """Build Indeed search URL with parameters."""
        base_url = "https://www.indeed.com/jobs"
        params = {
            'q': query,
            'l': location,
            'start': start
        }
        
        # Remove empty parameters
        params = {k: v for k, v in params.items() if v}
        
        url = base_url + '?' + urlencode(params)
        return url


def main():
    """Test the scraper with common scam job queries."""
    scraper = IndeedScraper(headless=False, debug=True)  # Enable debugging
    
    # Test with a simple query first
    test_queries = ["data entry"]
    
    all_jobs = []
    
    for query in test_queries:
        print(f"\n--- Searching for: {query} ---")
        jobs = scraper.search_jobs(query, location="", num_pages=1)
        all_jobs.extend(jobs)
        
        print(f"Found {len(jobs)} jobs for '{query}'")
        for job in jobs[:3]:  # Show first 3 jobs
            print(f"- {job['job_title']} at {job['company_name']}")
            print(f"  Location: {job['location']}")
            print(f"  Description: {job['job_description'][:100]}...")
            print()
    
    # Save results to JSON
    with open('indeed_jobs.json', 'w') as f:
        json.dump(all_jobs, f, indent=2)
    
    print(f"\nTotal jobs scraped: {len(all_jobs)}")
    print("Results saved to indeed_jobs.json")


if __name__ == "__main__":
    main() 