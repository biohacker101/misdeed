"""
Scam Analyzer Module
Analyzes job postings and assigns scam scores based on heuristic rules.
"""

import re
import json
from typing import Dict, List, Tuple
from spellchecker import SpellChecker
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ScamAnalyzer:
    def __init__(self):
        """Initialize the scam analyzer with keyword lists and spell checker."""
        self.spell_checker = SpellChecker()
        
        # Vague job description keywords (generic phrases)
        self.vague_keywords = [
            'hard worker', 'flexible schedule', 'great opportunity', 'work from home',
            'no experience necessary', 'easy money', 'quick cash', 'part time',
            'full time', 'motivated individual', 'self starter', 'team player',
            'excellent communication', 'detail oriented', 'fast paced environment'
        ]
        
        # Specific skills that indicate legitimate jobs
        self.specific_skills = [
            'python', 'java', 'sql', 'javascript', 'react', 'node.js', 'aws',
            'machine learning', 'data analysis', 'project management', 'salesforce',
            'excel', 'powerbi', 'tableau', 'photoshop', 'adobe', 'autocad',
            'accounting', 'bookkeeping', 'marketing', 'seo', 'content writing'
        ]
        
        # Payment request keywords
        self.payment_keywords = [
            'fee', 'training cost', 'background check payment', 'investment',
            'startup fee', 'registration fee', 'processing fee', 'deposit',
            'upfront payment', 'pay to work', 'money required', 'cash required'
        ]
        
        # Free email domains
        self.free_email_domains = [
            'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com',
            'icloud.com', 'protonmail.com', 'mail.com', 'yandex.com'
        ]
        
        # Urgency keywords
        self.urgency_keywords = [
            'act fast', 'limited spots', 'hiring immediately', 'urgent',
            'asap', 'right away', 'don\'t wait', 'limited time', 'hurry',
            'quick start', 'immediate start', 'today only'
        ]
        
        # Sensitive info keywords
        self.sensitive_info_keywords = [
            'bank account', 'social security', 'ssn', 'id card', 'passport',
            'credit card', 'bank details', 'routing number', 'account number',
            'personal information', 'financial information'
        ]
        
        # Messaging app keywords
        self.messaging_app_keywords = [
            'whatsapp', 'telegram', 'signal', 'wechat', 'viber', 'kik',
            'text me', 'message me', 'contact via whatsapp'
        ]
    
    def analyze_job(self, job: Dict) -> Dict:
        """
        Analyze a job posting and return it with scam score and reasons.
        
        Args:
            job: Dictionary containing job information
            
        Returns:
            Job dictionary augmented with scam_score and scam_reasons
        """
        scam_score = 0
        scam_reasons = []
        
        job_title = job.get('job_title', '').lower()
        job_description = job.get('job_description', '').lower()
        company_name = job.get('company_name', '').lower()
        salary_range = job.get('salary_range', '').lower()
        
        # Full text for analysis (title + description)
        full_text = f"{job_title} {job_description}"
        
        # 1. Vague Job Description (+2 points)
        vague_score = self._check_vague_description(full_text)
        if vague_score > 0:
            scam_score += 2
            scam_reasons.append("Vague job description with generic phrases")
        
        # 2. Spelling & Grammar Errors (+3 points)
        spelling_score = self._check_spelling_errors(full_text)
        if spelling_score > 0:
            scam_score += 3
            scam_reasons.append(f"High density of spelling errors ({spelling_score} errors)")
        
        # 3. Unprofessional Communication (+2 points)
        unprofessional_score = self._check_unprofessional_communication(full_text)
        if unprofessional_score > 0:
            scam_score += 2
            scam_reasons.append("Unprofessional communication (excessive caps/emojis)")
        
        # 4. Unrealistically High Salary (+3 points)
        high_salary_score = self._check_unrealistic_salary(job_title, salary_range)
        if high_salary_score > 0:
            scam_score += 3
            scam_reasons.append("Unrealistically high salary for the role")
        
        # 5. Request for Payment (+10 points - HIGH)
        payment_score = self._check_payment_request(full_text)
        if payment_score > 0:
            scam_score += 10
            scam_reasons.append("Requests upfront payment or fees")
        
        # 6. Generic Email Address (+2 points)
        email_score = self._check_generic_email(full_text)
        if email_score > 0:
            scam_score += 2
            scam_reasons.append("Uses generic email domains")
        
        # 7. Sense of Urgency (+1 point)
        urgency_score = self._check_urgency(full_text)
        if urgency_score > 0:
            scam_score += 1
            scam_reasons.append("Creates false sense of urgency")
        
        # 8. Asks for Sensitive Info (+5 points)
        sensitive_score = self._check_sensitive_info(full_text)
        if sensitive_score > 0:
            scam_score += 5
            scam_reasons.append("Requests sensitive personal information upfront")
        
        # 9. Contact via Messaging Apps (+4 points)
        messaging_score = self._check_messaging_apps(full_text)
        if messaging_score > 0:
            scam_score += 4
            scam_reasons.append("Requests contact via messaging apps")
        
        # Add scam analysis to job data
        job['scam_score'] = scam_score
        job['scam_reasons'] = scam_reasons
        
        # Log analysis
        if scam_score > 5:
            logger.warning(f"HIGH SCAM SCORE ({scam_score}): {job.get('job_title')} at {job.get('company_name')}")
        
        return job
    
    def _check_vague_description(self, text: str) -> int:
        """Check for vague job description with generic phrases."""
        vague_count = sum(1 for keyword in self.vague_keywords if keyword in text)
        specific_count = sum(1 for skill in self.specific_skills if skill in text)
        
        # If more vague keywords than specific skills, it's suspicious
        if vague_count > specific_count and vague_count >= 3:
            return 1
        return 0
    
    def _check_spelling_errors(self, text: str) -> int:
        """Check for spelling and grammar errors."""
        # Clean text and split into words
        words = re.findall(r'\b[a-zA-Z]+\b', text.lower())
        
        if len(words) < 10:  # Too short to analyze
            return 0
        
        # Count misspelled words
        misspelled = self.spell_checker.unknown(words)
        error_rate = len(misspelled) / len(words)
        
        # Flag if error rate is above 5%
        if error_rate > 0.05:
            return len(misspelled)
        return 0
    
    def _check_unprofessional_communication(self, text: str) -> int:
        """Check for unprofessional communication patterns."""
        # Count excessive capitals (more than 10% of text)
        caps_count = sum(1 for c in text if c.isupper())
        caps_rate = caps_count / len(text) if text else 0
        
        # Count emojis and excessive punctuation
        emoji_pattern = r'[😀-🙏🌀-🗿🚀-🛿🇠-🇿]'
        emojis = len(re.findall(emoji_pattern, text))
        
        excessive_punctuation = len(re.findall(r'[!]{2,}|[?]{2,}', text))
        
        if caps_rate > 0.1 or emojis > 2 or excessive_punctuation > 2:
            return 1
        return 0
    
    def _check_unrealistic_salary(self, job_title: str, salary_range: str) -> int:
        """Check for unrealistically high salaries for simple roles."""
        # Extract salary numbers
        salary_numbers = re.findall(r'\$?(\d{1,3}(?:,\d{3})*)', salary_range)
        
        if not salary_numbers:
            return 0
        
        # Get the highest salary mentioned
        max_salary = max([int(s.replace(',', '')) for s in salary_numbers])
        
        # Simple roles that shouldn't have very high salaries
        simple_roles = [
            'data entry', 'personal assistant', 'envelope stuffing',
            'mystery shopper', 'survey taker', 'virtual assistant'
        ]
        
        # Check if it's a simple role with unrealistic pay
        is_simple_role = any(role in job_title for role in simple_roles)
        
        if is_simple_role and max_salary > 100000:  # $100k+ for simple roles
            return 1
        elif max_salary > 300000:  # $300k+ for any role is suspicious
            return 1
        
        return 0
    
    def _check_payment_request(self, text: str) -> int:
        """Check for requests for upfront payments."""
        payment_mentions = sum(1 for keyword in self.payment_keywords if keyword in text)
        return 1 if payment_mentions > 0 else 0
    
    def _check_generic_email(self, text: str) -> int:
        """Check for generic email domains."""
        # Find email addresses in text
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        
        for email in emails:
            domain = email.split('@')[1].lower()
            if domain in self.free_email_domains:
                return 1
        
        return 0
    
    def _check_urgency(self, text: str) -> int:
        """Check for urgency and pressure tactics."""
        urgency_mentions = sum(1 for keyword in self.urgency_keywords if keyword in text)
        return 1 if urgency_mentions > 0 else 0
    
    def _check_sensitive_info(self, text: str) -> int:
        """Check for requests for sensitive information."""
        sensitive_mentions = sum(1 for keyword in self.sensitive_info_keywords if keyword in text)
        return 1 if sensitive_mentions > 0 else 0
    
    def _check_messaging_apps(self, text: str) -> int:
        """Check for contact via messaging apps."""
        messaging_mentions = sum(1 for keyword in self.messaging_app_keywords if keyword in text)
        return 1 if messaging_mentions > 0 else 0


def analyze_jobs_from_file(input_file: str, output_file: str, threshold: int = 5):
    """
    Analyze jobs from a JSON file and save results.
    
    Args:
        input_file: Path to input JSON file with job data
        output_file: Path to output JSON file for analyzed jobs
        threshold: Minimum scam score to consider a job as a "misdeed"
    """
    analyzer = ScamAnalyzer()
    
    try:
        # Load jobs from file
        with open(input_file, 'r') as f:
            jobs = json.load(f)
        
        logger.info(f"Analyzing {len(jobs)} jobs from {input_file}")
        
        # Analyze each job
        analyzed_jobs = []
        misdeeds = []
        
        for job in jobs:
            analyzed_job = analyzer.analyze_job(job)
            analyzed_jobs.append(analyzed_job)
            
            # Separate misdeeds (high scam score)
            if analyzed_job['scam_score'] >= threshold:
                misdeeds.append(analyzed_job)
        
        # Save all analyzed jobs
        with open(output_file, 'w') as f:
            json.dump(analyzed_jobs, f, indent=2)
        
        # Save just the misdeeds
        misdeeds_file = output_file.replace('.json', '_misdeeds.json')
        with open(misdeeds_file, 'w') as f:
            json.dump(misdeeds, f, indent=2)
        
        logger.info(f"Analysis complete:")
        logger.info(f"- Total jobs analyzed: {len(analyzed_jobs)}")
        logger.info(f"- Potential misdeeds found: {len(misdeeds)}")
        logger.info(f"- Results saved to: {output_file}")
        logger.info(f"- Misdeeds saved to: {misdeeds_file}")
        
        return analyzed_jobs, misdeeds
        
    except Exception as e:
        logger.error(f"Error analyzing jobs: {e}")
        return [], []


def main():
    """Test the analyzer with sample job data."""
    # Sample job data for testing
    test_jobs = [
        {
            "job_title": "EASY MONEY WORK FROM HOME!!!",
            "company_name": "QuickCash Solutions",
            "job_description": "Make $5000 per week working from home! No experience needed! Just pay $99 registration fee and start earning immediately! Contact us on WhatsApp for more details. Provide your bank account details to get started.",
            "location": "Remote",
            "salary_range": "$5000 per week",
            "post_date": "1 day ago",
            "original_url": "https://example.com/job1",
            "source_platform": "Indeed"
        },
        {
            "job_title": "Software Engineer",
            "company_name": "Tech Corp",
            "job_description": "We are looking for a skilled software engineer with experience in Python, JavaScript, and AWS. You will work on developing scalable web applications and APIs. Strong problem-solving skills required.",
            "location": "San Francisco, CA",
            "salary_range": "$120,000 - $150,000",
            "post_date": "2 days ago",
            "original_url": "https://example.com/job2",
            "source_platform": "Indeed"
        }
    ]
    
    analyzer = ScamAnalyzer()
    
    print("=== SCAM ANALYZER TEST ===\n")
    
    for i, job in enumerate(test_jobs, 1):
        print(f"Job {i}: {job['job_title']}")
        analyzed_job = analyzer.analyze_job(job)
        
        print(f"Scam Score: {analyzed_job['scam_score']}")
        print(f"Scam Reasons: {analyzed_job['scam_reasons']}")
        print(f"Classification: {'MISDEED' if analyzed_job['scam_score'] >= 5 else 'LEGITIMATE'}")
        print("-" * 50)


if __name__ == "__main__":
    main() 