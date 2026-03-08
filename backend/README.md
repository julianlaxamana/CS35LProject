# CS 35L Backend  
Contributors:
- Julian Laxamana
- Vince Domantay
- Yit-Meng Chin

# Installation

### Initialization
`npm install`

### Running the Backend
`node main.js`

# API Documentation
The API uses express's JSON middleware. All payloads will be formatted in the JSON format.

### Users

#### Creating a user
`POST /api/auth/create`

**Example User Payload**:
```
{
  "id": 'Test_User',
  "password": 'password123'
}
```

All passwords are encrypted using bcrypt's hashing function. The backend returns a JWT token and sends it as a cookie in res.

#### Authenticating a user
`POST /api/auth/auth`

### Ratings and Reviews

All rating and review routes require a user to be authenticated. All requests must include a JWT token as a cookie by either creating a user or authenticating a user.

#### Add or modify a review/rating for a user
`POST /api/ratings/add_review`

Adds or updates a user's rating and/or review for a specific menu item at a specific dining hall. A `diningHallID` and `foodID` must be provided, and at least one of `rating` or `review` must be provided.

**Example Request Body**:
```
{
  "diningHallID": "bruin-plate",
  "foodID": "Almond Butter",
  "rating": 4.5,
  "review": "Tastes great"
}
```
| Key | Value Type | Description |
|---|---|---|
| `diningHallID` | string | ID of the dining hall |
| `foodID` | string | ID of the food menu item |
| `rating` | double | Numbered rating for the food item on a scale of 0.0 to 5.0 |
| `review` | string | User written review for the food item |

#### Mark/unmark food item as favorite
`PATCH /api/ratings/toggle_favorite`

Marks or unmarks a food item as a favorite for an authenticated user. If a user has not rated or written a review yet for the food item, a new one is created with `marked_fav: true`. If it exists, `marked_fav` toggles between true/false.

`diningHallID` and `foodID` must be provided.
**Example Request Body**:
```
{
  "diningHallID": "bruin-plate",
  "foodID": "Almond Butter"
}
```
| Key | Value Type | Description |
|---|---|---|
| `diningHallID` | string | ID of the dining hall |
| `foodID` | string | ID of the food menu item |