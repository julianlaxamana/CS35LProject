import firebase_admin
from firebase_admin import credentials, firestore
import json
from NutritionScrape import scrape_nutrition

cred = credentials.Certificate("l-menu-database-firebase-adminsdk-fbsvc-aec79dc391.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# db.collection("testCollection").document("testDocument").set({"name": "Test Document", "value": 123})
# print("Document added to Firestore!")

def send_menu_to_firebase(dict, dining_hall):
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
                    .document(sanitized_item_name).get().exists:
                    
                    nutrition = scrape_nutrition("https://dining.ucla.edu" + item["details_link"]) if "details_link" in item and item["details_link"] != "" else {}
                    db.collection("dining_halls")\
                    .document(dining_hall.replace("/", "-"))\
                    .collection("Menu")\
                    .document(sanitized_item_name)\
                    .set({
                        "tags": item["Tags"],
                        "image": "",
                        "nutrition": nutrition
                    })

                station_items.append(sanitized_item_name)

            #Save menu items under menu
            menu_data[meal_time][station_name] = station_items
    db.collection("menu")\
    .document(dining_hall.replace("/", "-"))\
    .set({
        "Day of Week": menu_data
    })

def send_hall_info_to_firebase(dict, dining_hall):
    db.collection("dining_halls")\
    .document(dining_hall.replace("/", "-"))\
    .set(dict)
# Idea of how to structure the database:
# db.collection("DiningHalls").document("B-Plate").set({
#   "Rating": 5,
#   "Occupancy": "High",
#   "Location": "Covel Commons",
#   "ActiveHours": {
#     "Breakfast": "7:00 - 9:00",
#     "Lunch": "11:00 - 14:00",
#     "Dinner": "17:00 - 20:00"
#   }
# })
# db.collection("DiningHalls").document("B-Plate").collection("Menu").document("GrilledSalmon").set({
#     "Tags": ["Healthy", "Gluten-Free"],
#     "image": "https://storage.link/salmon.jpg"
#   })
if __name__ == "__main__":
    with open("epicuria-at-covel.json", "r") as f:
        data = json.load(f)
        send_menu_to_firebase(data, "epicuria-at-covel")