import requests
from bs4 import BeautifulSoup

link = "https://dining.ucla.edu/menu-item/?recipe=5436"

def scrape_nutrition(link):
    response = requests.get(link)
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the main nutrition div
    nutrition_div = soup.find("div", id="nutrition")

    nutrition_data = {}

    # Serving Size
    serving_strong = nutrition_div.find("strong")
    if serving_strong:
        serving_size = serving_strong.next_sibling.strip()
        nutrition_data["Serving Size"] = serving_size

    # Calories
    calories_tag = nutrition_div.find("p", class_="single-calories")
    if calories_tag:
        calories_value = calories_tag.get_text(strip=True).replace("Calories", "")
        nutrition_data["Calories"] = calories_value

    # First Nutrition Table
    tables = nutrition_div.find_all("table")

    for table in tables:
        rows = table.find_all("tr")
        
        for row in rows:
            cells = row.find_all("td")
            
            if len(cells) == 2:
                # Standard row
                name = cells[0].find("span")
                if name:
                    nutrient_name = name.get_text(strip=True)
                    nutrient_value = cells[0].get_text(strip=True).replace(nutrient_name, "")
                    daily_value = cells[1].get_text(strip=True)
                    
                    nutrition_data[nutrient_name] = {
                        "Amount": nutrient_value,
                        "Daily Value": daily_value
                    }

            elif len(cells) == 4:
                # Two-column row (second table)
                for i in [0, 2]:
                    name = cells[i].find("span")
                    if name:
                        nutrient_name = name.get_text(strip=True)
                        nutrient_value = cells[i].get_text(strip=True).replace(nutrient_name, "")
                        daily_value = cells[i+1].get_text(strip=True)

                        nutrition_data[nutrient_name] = {
                            "Amount": nutrient_value,
                            "Daily Value": daily_value
                        }

    # Return results
    return nutrition_data

if __name__ == "__main__":
    print(scrape_nutrition(link))