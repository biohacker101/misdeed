"""
Misdeed API Backend
FastAPI service for unorthodox job postings platform.
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
    description="API for unorthodox job postings platform",
    version="1.0.0"
)

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database configuration
DATABASE_PATH = "misdeeds.db"

# Pydantic models for the new job board
class JobCreate(BaseModel):
    title: str
    description: str
    category: str
    location: str
    pay_amount: float
    pay_type: str
    contact_method: str
    username: str

class Job(BaseModel):
    id: int
    title: str
    description: str
    category: str
    location: str
    pay_amount: float
    pay_type: str
    contact_method: str
    username: str
    created_at: str

class User(BaseModel):
    id: int
    username: str
    email: str
    created_at: str

# Database functions
def init_database():
    """Initialize the SQLite database with the jobs and users tables."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create jobs table (replacing the old misdeeds table)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            location TEXT NOT NULL,
            pay_amount REAL NOT NULL,
            pay_type TEXT NOT NULL,
            contact_method TEXT NOT NULL,
            username TEXT NOT NULL,
            user_id INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
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

def seed_database_if_empty():
    """Seed the database with mock data if it's empty."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if jobs table is empty
    cursor.execute("SELECT COUNT(*) FROM jobs")
    count = cursor.fetchone()[0]
    
    if count == 0:
        logger.info("Database is empty, seeding with mock data...")
        try:
            # Try to load mock data from file
            with open('mock_data.json', 'r') as f:
                mock_jobs = json.load(f)
                
            for job_data in mock_jobs:
                cursor.execute('''
                    INSERT INTO jobs (
                        title, description, category, location,
                        pay_amount, pay_type, contact_method, username
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    job_data['title'], job_data['description'], job_data['category'],
                    job_data['location'], job_data['pay_amount'], job_data['pay_type'],
                    job_data['contact_method'], job_data['username']
                ))
            
            conn.commit()
            logger.info(f"Seeded database with {len(mock_jobs)} mock jobs")
            
        except FileNotFoundError:
            logger.warning("mock_data.json not found, database will remain empty")
        except Exception as e:
            logger.error(f"Error seeding database: {e}")
    
    conn.close()

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_database()
    seed_database_if_empty()

# API Endpoints

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Misdeed API - Unorthodox Job Board Platform",
        "version": "1.0.0",
        "endpoints": {
            "GET /api/jobs": "Get all job postings",
            "GET /api/jobs/{job_id}": "Get a specific job posting",
            "POST /api/jobs": "Create a new job posting"
        }
    }

@app.get("/api/jobs", response_model=List[Job])
async def get_jobs(
    limit: Optional[int] = 100,
    category: Optional[str] = None
):
    """
    Get all job postings, optionally filtered by category.
    Ordered from most recent to oldest.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if category:
            cursor.execute('''
                SELECT * FROM jobs 
                WHERE category = ? 
                ORDER BY created_at DESC 
                LIMIT ?
            ''', (category, limit))
        else:
            cursor.execute('''
                SELECT * FROM jobs 
                ORDER BY created_at DESC 
                LIMIT ?
            ''', (limit,))
        
        rows = cursor.fetchall()
        conn.close()
        
        # Convert rows to Job objects
        jobs = []
        for row in rows:
            job = Job(
                id=row['id'],
                title=row['title'],
                description=row['description'],
                category=row['category'],
                location=row['location'],
                pay_amount=row['pay_amount'],
                pay_type=row['pay_type'],
                contact_method=row['contact_method'],
                username=row['username'],
                created_at=row['created_at']
            )
            jobs.append(job)
        
        logger.info(f"Retrieved {len(jobs)} jobs")
        return jobs
        
    except Exception as e:
        logger.error(f"Error retrieving jobs: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving jobs")

@app.get("/api/jobs/{job_id}", response_model=Job)
async def get_job(job_id: int):
    """Get the details of a single job posting by its ID."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM jobs WHERE id = ?', (job_id,))
        row = cursor.fetchone()
        conn.close()
        
        if not row:
            raise HTTPException(status_code=404, detail="Job not found")
        
        job = Job(
            id=row['id'],
            title=row['title'],
            description=row['description'],
            category=row['category'],
            location=row['location'],
            pay_amount=row['pay_amount'],
            pay_type=row['pay_type'],
            contact_method=row['contact_method'],
            username=row['username'],
            created_at=row['created_at']
        )
        
        return job
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving job {job_id}: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving job")

@app.post("/api/jobs", response_model=dict)
async def create_job(job: JobCreate):
    """
    Create a new job posting.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO jobs (
                title, description, category, location,
                pay_amount, pay_type, contact_method, username
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            job.title, job.description, job.category, job.location,
            job.pay_amount, job.pay_type, job.contact_method, job.username
        ))
        
        job_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        logger.info(f"Job created with ID {job_id}: {job.title}")
        
        return {
            "message": "Job created successfully",
            "job_id": job_id
        }
        
    except Exception as e:
        logger.error(f"Error creating job: {e}")
        raise HTTPException(status_code=500, detail="Error creating job")

# Keep the old misdeeds endpoint for backward compatibility during transition
@app.get("/api/misdeeds", response_model=List[Job])
async def get_misdeeds_compatibility(
    limit: Optional[int] = 100,
    min_score: Optional[int] = None
):
    """Backward compatibility endpoint - redirects to jobs."""
    return await get_jobs(limit=limit)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 