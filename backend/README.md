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
`POST /create`

**Example User Payload**:
```
{
  "id": 'Test_User',
  "password": 'password123'
}
```

All passwords are encrypted using bcrypt's hashing function. The backend returns a JWT token and sends it as a cookie in res.

#### Authenticating a user

