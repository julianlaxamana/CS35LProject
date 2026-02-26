import requests
from bs4 import BeautifulSoup
import re
import json
from FirebaseSend import send_menu_to_firebase

halls = ["de-neve-dining", "bruin-plate", "epicuria-at-covel"]

def scrape_hall(hall, save_json=False):
    # Send an HTTP GET request to the webpage
    url = f"https://dining.ucla.edu/{hall}/"
    response = requests.get(url)

    # Parse the HTML content
    soup = BeautifulSoup(response.text, "html.parser")

    # Function to scrape a station
    def scrape_station(station):
        raw_items = station.find_all("section", class_=re.compile("recipe-card"))
        menu_items = [scrape_menu_item(card) for card in raw_items]
        return menu_items

    # Function to scrape a menu item
    def scrape_menu_item(section):
        try: #in case there is an blank menu item (IDK it happened before)
            name = section.find("div", class_ = "menu-item-title").find("h3").text
            raw_tags = section.find("div", class_ = "menu-item-meta-data").find_all("img")
            tags = [str(tag["alt"]) for tag in raw_tags]
            link = section.find("a", class_="recipe-detail-link")["href"] if section.find("a", class_="recipe-detail-link") else ""
            return {"Menu Item": name, "Tags": tags, "details_link": link}
        except:
            return {"Menu Item": "N/A", "Tags": [], "details_link": ""}


    scraped_data = {}

    # Find all stations
    stations = soup.find_all("div", class_=re.compile("meal-station"))
    station_names = [station["id"] for station in stations]

    meal_times = ["breakfast", "lunch", "dinner"]
    for name, station in zip(station_names, stations):
        split_names = name.split("-")
        if split_names[0].lower() in meal_times:
            meal_time = split_names.pop(0).lower()
            if meal_time not in scraped_data.keys():
                scraped_data[meal_time] = {}

        station_name = station.find("h2").text.strip()
        station_items = scrape_station(station)
        scraped_data[meal_time][station_name] = station_items

    if save_json:
        with open(f"{hall}.json", "w") as f:
            json.dump(scraped_data, f, indent=4)
    
    return scraped_data

if __name__ == "__main__":
    for hall in halls:
        print(f"Scraping {hall}...")
        data = scrape_hall(hall, save_json=True)
        #send_menu_to_firebase(data, hall)
