import requests
from bs4 import BeautifulSoup

def scrape_hall_info(hall):
    url = f"https://dining.ucla.edu/{hall}/"
    response = requests.get(url)
    html = response.text

    schudule_info = scrape_schedule(html)
    availability = scrape_hall_availability(hall)
    address = scrape_hall_address(html)

    combined_info = {**schudule_info, **address, "Availability": availability}

    return combined_info

def scrape_schedule(html):
    soup = BeautifulSoup(html, "html.parser")
    data = {}

    # Dining Hours
    data["Dining Hours"] = []

    meal_items = soup.find_all("div", class_="dining-hours-item")

    for item in meal_items:
        meal_name = item.find("span", class_="meal-name")
        meal_time = item.find("span", class_="meal-time")

        if meal_name and meal_time:
            # Handle nested "Closed" span
            closed_text = meal_time.find("span", class_="closed-text")
            if closed_text:
                time_text = closed_text.get_text(strip=True)
            else:
                time_text = meal_time.get_text(strip=True)

            data["Dining Hours"].append({
                "Meal": meal_name.get_text(strip=True),
                "Time": time_text
            })

    # Weekly Schedule 
    data["Weekly Schedule"] = []

    schedule_header = soup.find("p", class_="has-small-font-size")

    if schedule_header and "Weekly Meal Service Schedule" in schedule_header.get_text():
        # Get all following sibling <p> tags
        for sibling in schedule_header.find_next_siblings("p"):
            text = sibling.get_text(strip=True)
            if text:  # skip empty paragraphs
                data["Weekly Schedule"].append(text)

    return data

def scrape_hall_address(html):
    soup = BeautifulSoup(html, "html.parser")

    address_data = {}

    # Find the heading that says "Address"
    address_heading = None
    for tag in soup.find_all("strong"):
        if tag.get_text(strip=True).lower() == "address":
            address_heading = tag
            break

    if address_heading:
        # Find the next <p> tag after the heading
        parent = address_heading.find_parent()
        address_paragraph = None
        if parent:
            address_paragraph = parent.find_next("p")

        if address_paragraph:
            # Convert <br> to newline and clean text
            address_text = address_paragraph.get_text(separator="\n", strip=True)
            address_data["Address"] = address_text

    return address_data

def scrape_hall_availability(hall):
    url = f"https://dining.ucla.edu/{hall}/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    print(soup.find("div", id="activemon")) # Debugging line to check if the tag is found

    # Find availability information
    availability_tag = soup.find_all("span", id="activity-level")
    if availability_tag:
        return availability_tag[0].text.strip()
    return "N/A"

if __name__ == "__main__":
    result = scrape_hall_availability("epicuria-at-covel")
    # result = scrape_hall_info("de-neve-dining")
    print(result)