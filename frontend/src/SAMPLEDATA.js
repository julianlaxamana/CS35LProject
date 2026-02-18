// Sample data as constants for now, will be fetched from backend later
import BCafe from "./assets/ucla-venue-thumbnails/ucladiningbcafe.png";
import BPlate from "./assets/ucla-venue-thumbnails/ucladiningbplate.png";
import DeNeve from "./assets/ucla-venue-thumbnails/ucladiningdeneve.png";
import EpicA from "./assets/ucla-venue-thumbnails/ucladiningepicatack.png";
import EpicC from "./assets/ucla-venue-thumbnails/ucladiningepicatcov.png";
import Rende from "./assets/ucla-venue-thumbnails/ucladiningrende.png";
import Study from "./assets/ucla-venue-thumbnails/ucladiningstuhedrick.png";
import Feast from "./assets/ucla-venue-thumbnails/uclafeastatreiber.png";
import Default from "./assets/placeholder-thumbnail.jpg";

// Sample data for the dashboard header
const SAMPLE_DASHBOARD_HEADER_DATA = {
  day: "Thursday",
  meal_period: "Lunch",
};

// Sample data for a DashboardItem component
const SAMPLE_ITEM_COLLECTION = [
  {
    id: 1,
    name: "Korean Crispy Tofu Bowl",
    tags: ["Vegan", "Low-Carbon-Footprint", "Contains Soy", "Contains Gluten", "Contains Wheat", "Contains Sesame"],
    rating: 4.52,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    id: 2,
    name: "Spaghetti and Meatballs",
    tags: ["Contains Gluten", "Contains Wheat", "Customizable"],
    rating: 2.84,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    id: 3,
    name: "Garden Salad",
    tags: ["Vegan", "Low-Carbon-Footprint", "Gluten-Free", "Dairy-Free"],
    rating: 3.13,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    id: 4,
    name: "Tag Soup",
    tags: ["alcohol", "contains shellfish", "customizable", "contains dairy", "contains eggs", "contains fish", "contains gluten", "halal", "high carbon footprint", "low carbon footprint", "contains peanuts", "contains sesame", "contains soy", "contains tree nuts", "vegan", "vegetarian", "contains wheat"],
    rating: 0.01,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    id: 5,
    name: "Grilled Chicken Sandwich",
    tags: ["Halal", "Contains Gluten", "Contains Wheat"],
    rating: 3.97,
    image: "",
    nutrition_facts: {},
    ingredients: [],
    allergens: []
  },
  {
    id: 6,
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
  id: 1,
  item_id: 1,
  marked_as_favorite: true,
  rating: null,
  review: null,
}

const SAMPLE_DINING_VENUES = [
  { 
    id: 1,
    name: "Bruin Plate", 
    aggregate_rating: 2.05, // Placeholder rating for testing, NOT ACTUALLY TO BE STORED IN THE BACKEND, will be calculated on the frontend based on user ratings in the future.
    occupancy: 89, 
    status: "Open",
    image: BPlate,
  },
  { 
    id: 2,
    name: "Bruin Cafe", 
    aggregate_rating: 4.1, 
    occupancy: 26, 
    status: "Open",
    image: BCafe,
  },
  { 
    id: 3,
    name: "Feast at Rieber", 
    aggregate_rating: 5.0, 
    occupancy: 100, 
    status: "Open",
    image: Feast,
  },
  { 
    id: 4,
    name: "De Neve Dining", 
    aggregate_rating: 1.27, 
    occupancy: 47, 
    status: "Open",
    image: DeNeve,
  },
  { 
    id: 5,
    name: "Rendezvous", 
    aggregate_rating: 2.49, 
    occupancy: 73, 
    status: "Open",
    image: Rende,
  },
  { 
    id: 6,
    name: "Epicuria at Ackerman", 
    aggregate_rating: null, 
    occupancy: null, 
    status: "Closed",
    image: EpicA,
  },
  { 
    id: 7,
    name: "Epicuria at Covel", 
    aggregate_rating: 4.38, 
    occupancy: 100, 
    status: "Open",
    image: EpicC,
  },
  { 
    id: 8,
    name: "Food Trucks", 
    aggregate_rating: null, 
    occupancy: null, 
    status: "Closed",
    image: Default,
  },
  { 
    id: 9,
    name: "The Study at Hedrick", 
    aggregate_rating: 0.1, 
    occupancy: 58, 
    status: "Open",
    image: Study,
  },
  {
    id: 10,
    name: "A Place with an Exceptionally Long Name From the Future That Will Test Text Wrapping and Layout in the UI", 
    aggregate_rating: 5.00,
    occupancy: 100,
    status: "Open",
    image: Default,
  }
];

// Sample data for user's favorite dining venues, represented as an array of venue IDs for now. 
const SAMPLE_USER_FAVORITE_DINING_VENUES = [3, 5];

export { 
  SAMPLE_DASHBOARD_HEADER_DATA, 
  SAMPLE_ITEM_COLLECTION,
  SAMPLE_USER_ITEM_DATA, 
  SAMPLE_DINING_VENUES,
  SAMPLE_USER_FAVORITE_DINING_VENUES,
};