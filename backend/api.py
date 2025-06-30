"""
Misdeed API Backend
FastAPI service for storing and serving scam job postings.
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import json
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Misdeed API",
    description="API for detecting and serving scam job postings",
    version="1.0.0"
)

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database configuration
DATABASE_PATH = "misdeeds.db"

# Pydantic models
class JobCreate(BaseModel):
    job_title: str
    company_name: str
    description: str
    location: str
    original_url: str
    source_platform: str
    scam_score: int
    scam_reasons: List[str]

class Job(BaseModel):
    id: int
    job_title: str
    company_name: str
    description: str
    location: str
    original_url: str
    source_platform: str
    scam_score: int
    scam_reasons: List[str]
    date_scraped: str

# Database functions
def init_database():
    """Initialize the SQLite database with the misdeeds table."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS misdeeds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_title TEXT NOT NULL,
            company_name TEXT NOT NULL,
            description TEXT NOT NULL,
            location TEXT,
            original_url TEXT,
            source_platform TEXT,
            scam_score INTEGER NOT NULL,
            scam_reasons TEXT NOT NULL,
            date_scraped TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    logger.info("Database initialized successfully")

def get_db_connection():
    """Get a database connection."""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row  # Enable column access by name
    return conn

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_database()

# API Endpoints

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Misdeed API - Scam Job Detection Service",
        "version": "1.0.0",
        "endpoints": {
            "GET /api/misdeeds": "Get all scam job postings",
            "GET /api/misdeeds/search": "Search scam job postings",
            "POST /api/jobs": "Submit a job for analysis and storage"
        }
    }

@app.post("/api/jobs", response_model=dict)
async def submit_job(job: JobCreate):
    """
    Submit a job for analysis and storage.
    Internal endpoint used by the scraper.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Convert scam_reasons list to JSON string
        scam_reasons_json = json.dumps(job.scam_reasons)
        
        cursor.execute('''
            INSERT INTO misdeeds (
                job_title, company_name, description, location,
                original_url, source_platform, scam_score, scam_reasons
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            job.job_title, job.company_name, job.description, job.location,
            job.original_url, job.source_platform, job.scam_score, scam_reasons_json
        ))
        
        job_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        logger.info(f"Job stored with ID {job_id}: {job.job_title} (Score: {job.scam_score})")
        
        return {
            "message": "Job submitted successfully",
            "job_id": job_id,
            "scam_score": job.scam_score
        }
        
    except Exception as e:
        logger.error(f"Error storing job: {e}")
        raise HTTPException(status_code=500, detail="Error storing job")

@app.get("/api/misdeeds", response_model=List[Job])
async def get_misdeeds(
    limit: Optional[int] = 100,
    min_score: Optional[int] = 5
):
    """
    Get all scam job postings above the minimum score threshold.
    Ordered from highest scam score to lowest.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM misdeeds 
            WHERE scam_score >= ? 
            ORDER BY scam_score DESC, date_scraped DESC 
            LIMIT ?
        ''', (min_score, limit))
        
        rows = cursor.fetchall()
        conn.close()
        
        # Convert rows to Job objects
        misdeeds = []
        for row in rows:
            scam_reasons = json.loads(row['scam_reasons'])
            job = Job(
                id=row['id'],
                job_title=row['job_title'],
                company_name=row['company_name'],
                description=row['description'],
                location=row['location'],
                original_url=row['original_url'],
                source_platform=row['source_platform'],
                scam_score=row['scam_score'],
                scam_reasons=scam_reasons,
                date_scraped=row['date_scraped']
            )
            misdeeds.append(job)
        
        logger.info(f"Retrieved {len(misdeeds)} misdeeds")
        return misdeeds
        
    except Exception as e:
        logger.error(f"Error retrieving misdeeds: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving misdeeds")

@app.get("/api/misdeeds/search", response_model=List[Job])
async def search_misdeeds(
    q: str,
    limit: Optional[int] = 50,
    min_score: Optional[int] = 5
):
    """
    Search for scam job postings by query string.
    Searches in job title, company name, and description.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        search_query = f"%{q}%"
        cursor.execute('''
            SELECT * FROM misdeeds 
            WHERE scam_score >= ? 
            AND (
                job_title LIKE ? OR 
                company_name LIKE ? OR 
                description LIKE ?
            )
            ORDER BY scam_score DESC, date_scraped DESC 
            LIMIT ?
        ''', (min_score, search_query, search_query, search_query, limit))
        
        rows = cursor.fetchall()
        conn.close()
        
        # Convert rows to Job objects
        misdeeds = []
        for row in rows:
            scam_reasons = json.loads(row['scam_reasons'])
            job = Job(
                id=row['id'],
                job_title=row['job_title'],
                company_name=row['company_name'],
                description=row['description'],
                location=row['location'],
                original_url=row['original_url'],
                source_platform=row['source_platform'],
                scam_score=row['scam_score'],
                scam_reasons=scam_reasons,
                date_scraped=row['date_scraped']
            )
            misdeeds.append(job)
        
        logger.info(f"Search for '{q}' returned {len(misdeeds)} misdeeds")
        return misdeeds
        
    except Exception as e:
        logger.error(f"Error searching misdeeds: {e}")
        raise HTTPException(status_code=500, detail="Error searching misdeeds")

@app.get("/api/stats")
async def get_stats():
    """Get statistics about the misdeeds database."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Total misdeeds
        cursor.execute('SELECT COUNT(*) as total FROM misdeeds')
        total = cursor.fetchone()['total']
        
        # High-score misdeeds (>= 10)
        cursor.execute('SELECT COUNT(*) as high_score FROM misdeeds WHERE scam_score >= 10')
        high_score = cursor.fetchone()['high_score']
        
        # Recent misdeeds (last 24 hours)
        cursor.execute('''
            SELECT COUNT(*) as recent 
            FROM misdeeds 
            WHERE date_scraped >= datetime('now', '-1 day')
        ''')
        recent = cursor.fetchone()['recent']
        
        # Top scam reasons
        cursor.execute('SELECT scam_reasons FROM misdeeds')
        all_reasons = cursor.fetchall()
        
        reason_counts = {}
        for row in all_reasons:
            reasons = json.loads(row['scam_reasons'])
            for reason in reasons:
                reason_counts[reason] = reason_counts.get(reason, 0) + 1
        
        top_reasons = sorted(reason_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        
        conn.close()
        
        return {
            "total_misdeeds": total,
            "high_score_misdeeds": high_score,
            "recent_misdeeds": recent,
            "top_scam_reasons": [{"reason": reason, "count": count} for reason, count in top_reasons]
        }
        
    except Exception as e:
        logger.error(f"Error getting stats: {e}")
        raise HTTPException(status_code=500, detail="Error getting statistics")

@app.delete("/api/misdeeds/{job_id}")
async def delete_misdeed(job_id: int):
    """Delete a specific misdeed by ID."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM misdeeds WHERE id = ?', (job_id,))
        
        if cursor.rowcount == 0:
            conn.close()
            raise HTTPException(status_code=404, detail="Misdeed not found")
        
        conn.commit()
        conn.close()
        
        logger.info(f"Deleted misdeed with ID {job_id}")
        return {"message": "Misdeed deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting misdeed: {e}")
        raise HTTPException(status_code=500, detail="Error deleting misdeed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 