#!/usr/bin/env python3
"""
Coherent Mock Data Generator for Misdeed - Unorthodox Job Board
Generates realistic mock job postings using job archetype templates to ensure 
logical consistency between titles, descriptions, and payment details.
"""

import json
import random
from faker import Faker

# Initialize Faker
faker = Faker()

# Job Archetypes - Each archetype ensures coherent data combinations
JOB_ARCHETYPES = [
    # Events & Gigs
    {
        "category": "Events & Gigs",
        "templates": [
            {
                "title": "Need a 'Fake' Date for a Company Holiday Party",
                "description": "My company's holiday party is next Friday and I need a presentable and witty date to avoid questions from my boss. Must be good at small talk. We will meet beforehand to align on our 'story'."
            },
            {
                "title": "Seeking a Plus-One for a Friend's Wedding",
                "description": "Need a reliable and fun wedding date for my college friend's wedding. The event is black-tie. You'll need to be comfortable dancing (or at least pretending to). Open bar!"
            },
            {
                "title": "Professional Applauder for Comedy Show",
                "description": "Local comedy club needs someone with genuine-sounding laughter and good timing to help new comedians feel more confident. Must have infectious enthusiasm and be able to encourage audience participation."
            },
            {
                "title": "Stand-in Family Member for Holiday Photos",
                "description": "My family photo this year has an awkward gap where my brother used to be. Need someone roughly his height/build to fill the space. No face shots required, just need someone for the group composition."
            },
            {
                "title": "Professional Line Waiter for Concert Tickets",
                "description": "Major concert going on sale tomorrow morning and I can't skip work. Need someone to wait in line starting at 6 AM to secure tickets. Will pay hourly plus ticket costs if successful."
            },
            {
                "title": "Camera Operator for Urban Livestream",
                "description": "I'm a content creator planning a live 'man on the street' segment downtown. Need someone to follow me with camera equipment for about 3 hours. Must have steady hands and be comfortable walking around."
            }
        ],
        "pay_type": "Flat Rate",
        "pay_range": (150, 300)
    },
    
    # Creative & Design
    {
        "category": "Creative & Design",
        "templates": [
            {
                "title": "Looking for a Paparazzi-for-a-Day",
                "description": "I want to feel famous for a day. I need someone to follow me around downtown and take 'paparazzi-style' photos of me while I'm out shopping and having lunch. Discretion and a good camera are a must."
            },
            {
                "title": "Personal Photographer for Instagram Content",
                "description": "I'm an aspiring influencer and need a batch of high-quality photos for my Instagram feed. We'll spend an afternoon at 3-4 scenic locations. Looking for a creative eye."
            },
            {
                "title": "Voice Actor for Deliberately Weird Commercial",
                "description": "Local business needs voice actor for intentionally memorable radio commercial. Must be comfortable with unusual scripts and sound effects. The weirder the better - we want people to remember us."
            },
            {
                "title": "Custom Portrait Artist for Pet Renaissance Paintings",
                "description": "Need digital portraits of my three cats in classical Renaissance style. Must be skilled in traditional painting techniques but work in digital format. Will provide high-resolution reference photos."
            },
            {
                "title": "Logo Designer for Imaginary Company",
                "description": "Creating a fictional company for my creative writing project. Need a professional logo that looks completely real but for a made-up business. Must understand corporate design principles."
            },
            {
                "title": "Hand Model for Product Photography",
                "description": "Product photographer needs elegant hands for close-up jewelry shots. Must have well-manicured nails and be comfortable with multiple takes. Experience with hand modeling preferred but not required."
            }
        ],
        "pay_type": "Hourly",
        "pay_range": (25, 50)
    },
    
    # Home & Labor
    {
        "category": "Home & Labor",
        "templates": [
            {
                "title": "Expert needed to assemble complex IKEA furniture",
                "description": "I have a new 'PAX' wardrobe system from IKEA and the instruction manual looks like an ancient scroll. I need a patient and skilled person to assemble it without any leftover screws."
            },
            {
                "title": "Someone to help me organize my comic book collection",
                "description": "My collection of 1,000+ comics is in chaos. I need a fellow nerd to help me sort, bag, and board them alphabetically. Knowledge of Marvel vs. DC is a plus. Pizza will be provided."
            },
            {
                "title": "Professional LEGO Builder for Complex Sets",
                "description": "I bought the LEGO Millennium Falcon (75192) and don't have the patience to build it. Looking for a LEGO enthusiast to assemble it perfectly. I have the kit, instructions, and will provide snacks."
            },
            {
                "title": "Plant Whisperer for Dying Houseplants",
                "description": "My houseplants are dying and I travel frequently. Need someone who understands plant care and can nurse my green babies back to health. Must believe in talking to plants."
            },
            {
                "title": "Professional Closet Organization Expert",
                "description": "My closet is absolute chaos and I need someone with Marie Kondo-level skills to organize it by color, season, and frequency of use. Must have patience for decision-making process."
            },
            {
                "title": "Christmas Light Installation Artist",
                "description": "Need an elaborate Christmas light display installed on my house that will be the envy of the neighborhood. Must be comfortable with heights and have creative vision for holiday magic."
            }
        ],
        "pay_type": "Flat Rate",
        "pay_range": (100, 250)
    },
    
    # Tech & Digital
    {
        "category": "Tech & Digital",
        "templates": [
            {
                "title": "Social Media Background Check Specialist",
                "description": "Need someone to research potential dates' social media presence before I meet them. Must be thorough but discrete, with excellent report-writing skills. Confidentiality essential."
            },
            {
                "title": "Professional Password Security Consultant",
                "description": "All my passwords are 'password123' and I need professional help creating secure but memorable passwords for 50+ accounts. Must understand cybersecurity best practices."
            },
            {
                "title": "Digital Minimalism Life Coach",
                "description": "Overwhelmed by digital clutter and need a coach to help minimize apps, files, and digital commitments. Must understand the psychology of technology addiction and have practical solutions."
            },
            {
                "title": "Email Organization and Cleanup Specialist",
                "description": "Gmail inbox has 47,000 unread emails from 2019-present. Need systematic approach to email organization, filtering setup, and digital decluttering. Must have incredible patience."
            },
            {
                "title": "Professional Spotify Playlist Curator",
                "description": "Looking for music expert to create themed playlists for different moods and activities. Must have diverse musical knowledge and understand playlist flow and energy management."
            },
            {
                "title": "Tech Support for Elderly Parents",
                "description": "My parents need patient tech support for basic smartphone and computer issues. Must have saint-like patience, excellent teaching skills, and ability to explain things multiple times."
            }
        ],
        "pay_type": "Hourly",
        "pay_range": (20, 40)
    },
    
    # Quirky & Miscellaneous
    {
        "category": "Quirky & Miscellaneous",
        "templates": [
            {
                "title": "Need someone to stand in line for a new sneaker release",
                "description": "The new 'Air Jordans X' drop this Saturday and I can't wait in line myself. I need someone to wait for me at the Nike store and purchase the shoes (I will provide the money). Must be reliable."
            },
            {
                "title": "Seeking a questing partner for an online video game",
                "description": "I'm looking for a skilled player to help me beat a difficult raid boss in Final Fantasy XIV. We'll coordinate over Discord. Must be a team player and have a high-level character."
            },
            {
                "title": "Professional Cuddler for Anxiety Relief",
                "description": "Dealing with severe anxiety and need non-romantic physical comfort. Looking for certified professional cuddler with proper boundaries and therapeutic training. Must be understanding and patient."
            },
            {
                "title": "Personal Food Taster for Recipe Development",
                "description": "Developing new recipes but have COVID-related taste issues. Need someone with refined palate to test flavors and provide detailed feedback. Must be adventurous eater with descriptive vocabulary."
            },
            {
                "title": "Professional Conversation Starter for Networking Events",
                "description": "Terrible at small talk and need someone to help me start conversations at business networking events. Must be naturally charismatic and understand professional social dynamics."
            },
            {
                "title": "Mystery Shopper for Unusual Local Businesses",
                "description": "Have a list of weird local businesses that need mystery shopping evaluation. Looking for someone comfortable visiting strange places and writing detailed reports. Open mind required."
            },
            {
                "title": "Rent-a-Friend for Board Game Nights",
                "description": "New to town and need friends for weekly board game sessions. Must enjoy strategy games, light competitive banter, and be available Tuesday evenings. Snacks provided."
            },
            {
                "title": "Human Alarm Clock Service",
                "description": "Cannot wake up to traditional alarms and need reliable human to call/text me awake at specific times. Must be dependable early riser with backup alarm systems."
            }
        ],
        "pay_type": "Flat Rate",
        "pay_range": (50, 150)
    }
]

def generate_coherent_job():
    """Generate a single coherent job posting from an archetype."""
    # Randomly select an archetype
    archetype = random.choice(JOB_ARCHETYPES)
    
    # Randomly select a template from within that archetype
    template = random.choice(archetype["templates"])
    
    # Generate pay amount within the archetype's realistic range
    pay_amount = round(random.uniform(archetype["pay_range"][0], archetype["pay_range"][1]), 2)
    
    # Use Faker only for non-critical fields that don't affect coherence
    location_options = [
        f"{faker.city()}, {faker.state_abbr()}",
        f"Downtown {faker.city()}",
        f"{faker.city()} Metro Area",
        "Remote/Online",
        f"Near {faker.street_name()} District"
    ]
    location = random.choice(location_options)
    
    # Generate creative but realistic username
    username_styles = [
        faker.user_name(),
        f"{faker.word().capitalize()}{faker.random_int(10, 99)}",
        f"{faker.city()}{faker.word().capitalize()}",
        f"{faker.word().capitalize()}{faker.word().capitalize()}",
    ]
    username = random.choice(username_styles)
    
    # Generate appropriate contact method
    contact_methods = [
        "Message me on the platform to apply",
        "Email me for details",
        "DM for more info",
        "Contact through platform messaging",
        "Send a message to discuss details",
        f"Email at {faker.user_name()}@example.com",
        "Message me directly",
        "Reach out via platform chat"
    ]
    contact_method = random.choice(contact_methods)
    
    return {
        "title": template["title"],
        "description": template["description"],
        "category": archetype["category"],
        "location": location,
        "pay_amount": pay_amount,
        "pay_type": archetype["pay_type"],
        "contact_method": contact_method,
        "username": username
    }

def generate_coherent_mock_data(num_jobs=100):
    """Generate the complete mock dataset using coherent job archetypes."""
    jobs = []
    
    for _ in range(num_jobs):
        job = generate_coherent_job()
        jobs.append(job)
    
    return jobs

if __name__ == "__main__":
    print("Generating coherent mock data for Misdeed job board...")
    
    # Generate 100 coherent mock job postings
    mock_jobs = generate_coherent_mock_data(100)
    
    # Save to JSON file
    with open('mock_data.json', 'w', encoding='utf-8') as f:
        json.dump(mock_jobs, f, indent=2, ensure_ascii=False)
    
    print(f"Generated {len(mock_jobs)} coherent job postings")
    print("Categories distribution:")
    
    category_counts = {}
    for job in mock_jobs:
        category = job['category']
        category_counts[category] = category_counts.get(category, 0) + 1
    
    for category, count in category_counts.items():
        print(f"  {category}: {count} jobs")
    
    print("\nMock data saved to mock_data.json")
    print("Sample coherent job posting:")
    print(json.dumps(mock_jobs[0], indent=2)) 