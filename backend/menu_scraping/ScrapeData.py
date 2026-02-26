from MenuScrape import scrape_hall
from NutritionScrape import scrape_nutrition
from FirebaseSend import send_menu_to_firebase, send_hall_info_to_firebase
from ScrapeHallInfo import scrape_hall_info

halls = ["de-neve-dining", "bruin-plate", "epicuria-at-covel"]

# # Scrape menu data and send to Firebase
# for hall in halls:
#     print(f"Scraping {hall}...")
#     data = scrape_hall(hall, save_json=False)
#     send_menu_to_firebase(data, hall)

# Scrape hall info and send to Firebase
for hall in halls:
    print(f"Scraping info for {hall}...")
    hall_info = scrape_hall_info(hall)
    send_hall_info_to_firebase(hall_info, hall)