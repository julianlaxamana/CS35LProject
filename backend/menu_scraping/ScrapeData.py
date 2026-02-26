from MenuScrape import scrape_hall
from NutritionScrape import scrape_nutrition
from FirebaseSend import send_menu_to_firebase

halls = ["de-neve-dining", "bruin-plate", "epicuria-at-covel"]

for hall in halls:
    print(f"Scraping {hall}...")
    data = scrape_hall(hall, save_json=False)
    send_menu_to_firebase(data, hall)