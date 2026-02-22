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

// Sample data for the dashboard header and current venue details in the drawer.
const SAMPLE_DASHBOARD_DAY_DATA = {
  day: "Thursday",
  meal_period: "Lunch",
};

// Sample data for a DashboardItem component
const SAMPLE_ITEM_COLLECTION = [
  {
    id: 1,
    name: "Korean Crispy Tofu Bowl",
    tags: ["Vegan", "Low-Carbon-Footprint", "Contains Soy", "Contains Gluten", "Contains Wheat", "Contains Sesame"],
    rating: 4.52,  // Placeholder rating for testing, NOT ACTUALLY TO BE STORED IN THE BACKEND, will be calculated on the frontend based on user ratings in the future.
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
  user_id: 1,
  marked_as_favorite: true,
  rating: null,
  review: null,
}

// Sample data for dining venues. Will be fetched from backend later, but defined here for ease of development and testing of the frontend.
// Object Structure Guide (Because we forgot to set up the project with Typescript...)
/*
interface VenueData {
  id: number;
  name: string;
  aggregate_rating: number | null;
  occupancy: number | null;
  status: "Open" | "Closed";
  image: string; // URL or path to the venue's image

  // Additional details for the venue details section in the drawer
  location: string;
  phone: string;

  notices: string[]; // Array of important notices or announcements related to the venue

  hours: {
    [day: string]: {
      breakfast: string;
      lunch: string;
      dinner: string;
      extended_dinner: string;
    };
  };

  about: string; // Use text instead of string in the database
}
*/

// Internal, used for SAMPLE_DINING_VENUES, not exported
const INTERNAL_SAMPLE_VENUE_LOCATION = "456 University Ave, Frontend City, XX 12345";
const INTERNAL_SAMPLE_VENUE_PHONE = "(987) 654-3210";
const INTERNAL_SAMPLE_VENUE_NOTICES = [
  "Notice 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Notice 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
];
const INTERNAL_SAMPLE_VENUE_HOURS = {  
  sunday: {
    breakfast: "7:00 a.m. - 9:00 a.m.",
    lunch: "11:00 a.m. - 3:00 p.m.",
    dinner: "5:00 p.m. - 9:00 p.m.",
    extended_dinner: "Closed",
  },
  monday: {
    breakfast: "7:00 a.m. - 9:00 a.m.",
    lunch: "11:00 a.m. - 2:00 p.m.",
    dinner: "5:00 p.m. - 9:00 p.m.",
    extended_dinner: "Closed",
  },
  tuesday: {
    breakfast: "7:00 a.m. - 9:00 a.m.",
    lunch: "11:00 a.m. - 2:00 p.m.",
    dinner: "5:00 p.m. - 9:00 p.m.",
    extended_dinner: "Closed",
  },
  wednesday: {
    breakfast: "7:00 a.m. - 9:00 a.m.",
    lunch: "11:00 a.m. - 2:00 p.m.",
    dinner: "5:00 p.m. - 9:00 p.m.",
    extended_dinner: "Closed",
  },
  thursday: {
    breakfast: "7:00 a.m. - 9:00 a.m.",
    lunch: "11:00 a.m. - 2:00 p.m.",
    dinner: "5:00 p.m. - 9:00 p.m.",
    extended_dinner: "Closed",
  },
  friday: {
    breakfast: "Closed",
    lunch: "Closed",
    dinner: "Closed",
    extended_dinner: "Closed",
  },
  saturday: {
    breakfast: "7:00 a.m. - 9:00 a.m.",
    lunch: "11:00 a.m. - 3:00 p.m.",
    dinner: "5:00 p.m. - 9:00 p.m.",
    extended_dinner: "Closed",
  },
}
const INTERNAL_SAMPLE_VENUE_ABOUT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

// Sample data for dining venues. Will be fetched from backend later, but defined here for ease of development and testing of the frontend.
const SAMPLE_DINING_VENUES = [
  { 
    id: 1,
    name: "Bruin Plate", 
    aggregate_rating: 2.05, // Placeholder rating for testing, NOT ACTUALLY TO BE STORED IN THE BACKEND, will be calculated on the frontend based on user ratings in the future.
    occupancy: 89, 
    status: "Open",   // Placeholder status for testing, NOT ACTUALLY TO BE STORED IN THE BACKEND, will be determined on the frontend based on hours and current time in the future.
    image: BPlate,

    location: "350 Charles E. Young Drive, West Los Angeles, CA 90095",
    phone: "(310) 825-1234",

    notices: [
      "Grab & Go Menu Available Monday - Friday from 7:00 a.m. - 10:00 a.m.",
      "Now serving breakfast all day!",
    ],

    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  },
  { 
    id: 2,
    name: "Bruin Cafe", 
    aggregate_rating: 4.1, 
    occupancy: 26, 
    status: "Open",
    image: BCafe,

    location: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    phone: "(123) 456-7890",

    notices: [
      "Notice 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Notice 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],

    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  },
  { 
    id: 3,
    name: "Feast at Rieber", 
    aggregate_rating: 5.0, 
    occupancy: 100, 
    status: "Open",
    image: Feast,
    location: INTERNAL_SAMPLE_VENUE_LOCATION,
    phone: INTERNAL_SAMPLE_VENUE_PHONE,
    notices: INTERNAL_SAMPLE_VENUE_NOTICES,
    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  },
  { 
    id: 4,
    name: "De Neve Dining", 
    aggregate_rating: 1.27, 
    occupancy: 47, 
    status: "Open",
    image: DeNeve,
    location: INTERNAL_SAMPLE_VENUE_LOCATION,
    phone: INTERNAL_SAMPLE_VENUE_PHONE,
    notices: INTERNAL_SAMPLE_VENUE_NOTICES,
    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  },
  { 
    id: 5,
    name: "Rendezvous", 
    aggregate_rating: 2.49, 
    occupancy: 73, 
    status: "Open",
    image: Rende,
    location: INTERNAL_SAMPLE_VENUE_LOCATION,
    phone: INTERNAL_SAMPLE_VENUE_PHONE,
    notices: INTERNAL_SAMPLE_VENUE_NOTICES,
    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  },
  { 
    id: 6,
    name: "Epicuria at Ackerman", 
    aggregate_rating: null, 
    occupancy: null, 
    status: "Closed",
    image: EpicA,
    location: INTERNAL_SAMPLE_VENUE_LOCATION,
    phone: INTERNAL_SAMPLE_VENUE_PHONE,
    notices: INTERNAL_SAMPLE_VENUE_NOTICES,
    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  },
  { 
    id: 7,
    name: "Epicuria at Covel", 
    aggregate_rating: 4.38, 
    occupancy: 100, 
    status: "Open",
    image: EpicC,
    location: INTERNAL_SAMPLE_VENUE_LOCATION,
    phone: INTERNAL_SAMPLE_VENUE_PHONE,
    notices: INTERNAL_SAMPLE_VENUE_NOTICES,
    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  },
  { 
    id: 8,
    name: "Food Trucks", 
    aggregate_rating: null, 
    occupancy: null, 
    status: "Closed",
    image: Default,
    location: INTERNAL_SAMPLE_VENUE_LOCATION,
    phone: INTERNAL_SAMPLE_VENUE_PHONE,
    notices: INTERNAL_SAMPLE_VENUE_NOTICES,
    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  },
  { 
    id: 9,
    name: "The Study at Hedrick", 
    aggregate_rating: 0.1, 
    occupancy: 58, 
    status: "Open",
    image: Study,
    location: INTERNAL_SAMPLE_VENUE_LOCATION,
    phone: INTERNAL_SAMPLE_VENUE_PHONE,
    notices: INTERNAL_SAMPLE_VENUE_NOTICES,
    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  },
  {
    id: 10,
    name: "A Place with an Exceptionally Long Name From the Future That Will Test Text Wrapping and Layout in the UI", 
    aggregate_rating: 5.00,
    occupancy: 100,
    status: "Open",
    image: Default,
    location: INTERNAL_SAMPLE_VENUE_LOCATION,
    phone: INTERNAL_SAMPLE_VENUE_PHONE,
    notices: INTERNAL_SAMPLE_VENUE_NOTICES,
    hours: INTERNAL_SAMPLE_VENUE_HOURS,
    about: INTERNAL_SAMPLE_VENUE_ABOUT,
  }
];

// Sample data for user's favorite dining venues, represented as an array of venue IDs for now. 
const SAMPLE_USER_FAVORITE_DINING_VENUES = [3, 5];

export { 
  SAMPLE_DASHBOARD_DAY_DATA, 
  SAMPLE_ITEM_COLLECTION,
  SAMPLE_USER_ITEM_DATA, 
  SAMPLE_DINING_VENUES,
  SAMPLE_USER_FAVORITE_DINING_VENUES,
};