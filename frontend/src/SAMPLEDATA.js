// Sample data as constants for now, will be fetched from backend later

// Sample data for the dashboard header
const SAMPLE_DASHBOARD_HEADER_DATA = {
  day: "Thursday",
  meal_period: "Lunch",
};

// Sample data for a DashboardItem component
const SAMPLE_ITEM_COLLECTION = [
  {
    name: "Korean Crispy Tofu Bowl",
    tags: ["Vegan", "Low-Carbon-Footprint", "Contains Soy", "Contains Gluten", "Contains Wheat", "Contains Sesame"],
    rating: 4.52,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    name: "Spaghetti and Meatballs",
    tags: ["Contains Gluten", "Contains Wheat", "Customizable"],
    rating: 2.84,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    name: "Garden Salad",
    tags: ["Vegan", "Low-Carbon-Footprint", "Gluten-Free", "Dairy-Free"],
    rating: 3.13,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    name: "Tag Soup",
    tags: ["alcohol", "contains shellfish", "customizable", "contains dairy", "contains eggs", "contains fish", "contains gluten", "halal", "high carbon footprint", "low carbon footprint", "contains peanuts", "contains sesame", "contains soy", "contains tree nuts", "vegan", "vegetarian", "contains wheat"],
    rating: 0.01,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    name: "Grilled Chicken Sandwich",
    tags: ["Halal", "Contains Gluten", "Contains Wheat"],
    rating: 3.97,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    name: "Very Long Menu Item Name That Should Be Handled Correctly In The UI To Prevent Overflow Issues",
    tags: ["Vegan", "Low-Carbon-Footprint", "Gluten-Free", "Dairy-Free", "Contains Soy", "Contains Gluten", "Contains Wheat", "Contains Sesame", "Contains Peanuts", "Contains Tree Nuts", "Halal", "Alcohol"],
    rating: 5.00,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
]

// Sample data for a UserItem component
const SAMPLE_USER_ITEM_DATA = {
  item_data: SAMPLE_ITEM_COLLECTION[0],
  marked_as_favorite: true,
  rating: null,
  review: null,
}

const SAMPLE_DINING_VENUES = [
  { 
    name: "Feast at Rieber", 
    aggregate_rating: 5.0, 
    occupancy: 100, 
    status: "Open" 
  },
  { 
    name: "Rendezvous", 
    aggregate_rating: 2.49, 
    occupancy: 73, 
    status: "Open" 
  },
  { 
    name: "Bruin Cafe", 
    aggregate_rating: 4.1, 
    occupancy: 26, 
    status: "Open" 
  },
  { 
    name: "Bruin Plate", 
    aggregate_rating: 2.05, 
    occupancy: 89, 
    status: "Open" 
  },
  { 
    name: "De Neve Dining", 
    aggregate_rating: 1.27, 
    occupancy: 47, 
    status: "Open" 
  },
  { 
    name: "Epicuria at Ackerman", 
    aggregate_rating: null, 
    occupancy: null, 
    status: "Closed" 
  },
  { 
    name: "Epicuria at Covel", 
    aggregate_rating: 4.38, 
    occupancy: 100, 
    status: "Open" 
  },
  { 
    name: "Food Trucks", 
    aggregate_rating: null, 
    occupancy: null, 
    status: "Closed" 
  },
  { 
    name: "The Study at Hedrick", 
    aggregate_rating: 0.1, 
    occupancy: 58, 
    status: "Open" 
  },
];

export { 
  SAMPLE_DASHBOARD_HEADER_DATA, 
  SAMPLE_ITEM_COLLECTION,
  SAMPLE_USER_ITEM_DATA, 
  SAMPLE_DINING_VENUES,
};