import firebase_admin
from firebase_admin import credentials, firestore
import json

cred = credentials.Certificate("l-menu-database-firebase-adminsdk-fbsvc-aec79dc391.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# db.collection("testCollection").document("testDocument").set({"name": "Test Document", "value": 123})
# print("Document added to Firestore!")

def send_to_firebase(dict, dining_hall):
    for meal_time, stations in dict.items():
        for station_name, menu_items in stations.items():
            station_items = []
            for item in menu_items:
                if item["Menu Item"] is None or item["Menu Item"] == "N/A": # Skip blank menu items
                    continue
                sanitized_item_name = item["Menu Item"].replace("/", "-") # Replace slashes with dashes to avoid Firestore issues

                #save menu item under dining hall
                db.collection("dining_halls")\
                .document(dining_hall.replace("/", "-"))\
                .collection("Menu")\
                .document(sanitized_item_name)\
                .set({
                    "tags": item["Tags"],
                    "image": ""
                })
                station_items.append(sanitized_item_name)

            #Save menu items under menu
            db.collection("menu")\
            .document(dining_hall.replace("/", "-"))\
            .collection(meal_time.replace("/", "-"))\
            .document(station_name.replace("/", "-"))\
            .set({
                "Menu Items": station_items
            })

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
# with open("bruin-plate.json", "r") as f:
#     data = json.load(f)
#     send_to_firebase(data, "bruin-plate")