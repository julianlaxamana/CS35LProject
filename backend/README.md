# CS 35L Backend  
# Contributors

| Name | Email |
| --- | --- |
| Julian Laxamana | julianlaxamana@ucla.edu |
| Vince Domantay | vdomantay@ucla.edu |
| Yit-Men Chin | yitmengchin@gmail.com |

# Installation

### Initialization
`npm install`

### Configuration
This project requires secret files that are not included in the repository. To get the missing `.env` and `key.json` files, contact Vince Domantay to obtain the files.

Drag the two files inside the backend root directory.

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

All rating and review routes, except get_reviews, require a user to be authenticated. All requests must include a JWT token as a cookie by either creating a user or authenticating a user.

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

#### Get all reviews for one food item
`GET /api/ratings/get_reviews`

Fetches all ratings of a specific menu item from database and sends them to the client.

Does not need JWT token or user authentication.

`diningHallID` and `foodID` must be provided in request body.

#### Remove a user written review
`DELETE /api/ratings/remove_review`

Permanently removes only the text review from a user's rating entry. The numeric rating and favorite status are not removed.

`diningHallID` and `foodID` must be provided in request body.

#### Delete all user ratings
`DELETE /api/ratings/delete_user`

Permanently deletes all ratings, reviews, and favorites of an authenticated user. Intended for use when a user deletes their account.

No request body needed. Only the JWT token is needed.