// Sample data as constants for now, will be fetched from backend later

// Sample data for the dashboard header
const SAMPLE_DASHBOARD_HEADER_DATA = {
  venue_name: "Bruin Plate",
  day: "Thursday",
  is_open: true,
  meal_period: "Lunch",
  aggregate_rating: 2.53,
  occupancy: "75%"
};

// Sample data for a DashboardItem component
const SAMPLE_ITEM_DATA = {
  title: "Korean Crispy Tofu Bowl",
  tags: ["Vegan", "Low-Carbon-Footprint", "Contains Soy", "Contains Gluten", "Contains Wheat", "Contains Sesame"],
  rating: 4.5,
  image: "",
  nutrition_facts: {},
  ingredients: [],
  allergens: []
};

// Sample data for a UserItem component
const SAMPLE_USER_ITEM_DATA = {
  item_data: SAMPLE_ITEM_DATA,
  marked_as_favorite: true,
  rating: null,
  review: null,
}

const SAMPLE_ITEM_COLLECTION = [
  {
    title: "Korean Crispy Tofu Bowl",
    tags: ["Vegan", "Low-Carbon-Footprint", "Contains Soy", "Contains Gluten", "Contains Wheat", "Contains Sesame"],
    rating: 4.52,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    title: "Spaghetti and Meatballs",
    tags: ["Contains Meat", "Contains Gluten", "Contains Wheat", "Contains Dairy"],
    rating: 2.84,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    title: "Garden Salad",
    tags: ["Vegan", "Low-Carbon-Footprint", "Gluten-Free", "Dairy-Free"],
    rating: 3.13,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
]

export { SAMPLE_DASHBOARD_HEADER_DATA, SAMPLE_ITEM_DATA, SAMPLE_USER_ITEM_DATA, SAMPLE_ITEM_COLLECTION };