import firebase_admin
from firebase_admin import credentials, firestore
import json
from NutritionScrape import scrape_nutrition, scrape_ingredients

#initialize firebase access
cred = credentials.Certificate("l-menu-database-firebase-adminsdk-fbsvc-aec79dc391.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def send_menu_to_firebase(dict, dining_hall, day_of_week, force_get_details=False):
    menu_data = {}
    for meal_time, stations in dict.items():
        menu_data[meal_time] = {}
        for station_name, menu_items in stations.items():
            station_items = []
            for item in menu_items:
                if item["Menu Item"] is None or item["Menu Item"] == "N/A": # Skip blank menu items
                    continue
                sanitized_item_name = item["Menu Item"].replace("/", "-") # Replace slashes with dashes to avoid Firestore issues

                #save menu item under dining hall if it doesn't already exist
                if not db.collection("dining_halls")\
                    .document(dining_hall.replace("/", "-"))\
                    .collection("Menu")\
                    .document(sanitized_item_name).get().exists or force_get_details:
                    
                    nutrition = scrape_nutrition("https://dining.ucla.edu" + item["details_link"]) if "details_link" in item and item["details_link"] != "" else {}
                    ingredients_data = scrape_ingredients("https://dining.ucla.edu" + item["details_link"]) if "details_link" in item and item["details_link"] != "" else {}
                    data = {
                        "tags": item["Tags"],
                        "image": "",
                        "nutrition": nutrition,
                    }

                    db.collection("dining_halls")\
                    .document(dining_hall.replace("/", "-"))\
                    .collection("Menu")\
                    .document(sanitized_item_name)\
                    .set({**data, **ingredients_data})

                station_items.append(sanitized_item_name)

            #Save menu items under menu
            menu_data[meal_time][station_name] = station_items
    db.collection("menu")\
    .document(dining_hall.replace("/", "-"))\
    .collection("current_week")\
    .document(day_of_week)\
    .set(menu_data)

def send_hall_info_to_firebase(dict, dining_hall):
    db.collection("dining_halls")\
    .document(dining_hall.replace("/", "-"))\
    .set(dict)

if __name__ == "__main__":
    with open("epicuria-at-covel.json", "r") as f:
        data = json.load(f)
        send_menu_to_firebase(data, "epicuria-at-covel", "Test")