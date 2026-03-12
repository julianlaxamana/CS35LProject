# CS35LProject
UCLA CS35L Project aimed to make a better interface for dining halls.

## Background  
The current interface for UCLA Dining is awkward to use. Users must navigate multiple nested
pages just to get basic data points like menus, hours, and nutrition facts. This wouldn’t be as
significant of an issue if it weren’t for the fact that thousands of students eat at UCLA everyday
and refer to this cumbersome site.

Our app aims to improve UCLA Dining’s website with a unified single-page interface, a rating
system, and additional analytics, helping students be more satisfied with UCLA’s heavenly
dining experience.

# Running the Project
## Frontend
In the `frontend` directory run:
```
npm install
npx vite
```

## Backend
### Initialization
In the `backend` directory run:
`npm install`

### Configuration
This project requires secret files that are not included in the repository. To get the missing `.env` and `key.json` files, contact Vince Domantay to obtain the files.

Drag the two files inside the backend root directory.

### Running the Backend
`node main.js`

## Web Scraping Script
In the `backend/menu_scraping` directory run:

### Initialization
- Create a venv using `python3 -m pip venv .venv` and activate it using `source .venv/bin/activate`
- Install uv: `python3 -m pip install uv`

### Running the script
- To run:
`uv run ScrapeData.py`

