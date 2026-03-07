from MenuScrape import scrape_hall
from NutritionScrape import scrape_nutrition
from FirebaseSend import send_menu_to_firebase, send_hall_info_to_firebase
from ScrapeHallInfo import scrape_hall_info
from datetime import datetime, timedelta


def get_weekdays():
    today = datetime.today()

    # Find Monday of the current week
    monday = today - timedelta(days=today.weekday())

    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    week_dates = {}

    for i, day in enumerate(days):
        date = monday + timedelta(days=i)
        week_dates[day] = date.strftime("%Y-%m-%d")

    return week_dates

halls = ["de-neve-dining", "bruin-plate", "epicuria-at-covel"]

# Scrape menu data and send to Firebase
for hall in halls:
    print(f"Scraping {hall}...")
    for day, date in get_weekdays().items():
        data = scrape_hall(hall, date, save_json=False)
        send_menu_to_firebase(data, hall, day, force_get_details=True)

# Scrape hall info and send to Firebase
for hall in halls:
    print(f"Scraping info for {hall}...")
    hall_info = scrape_hall_info(hall)
    send_hall_info_to_firebase(hall_info, hall)