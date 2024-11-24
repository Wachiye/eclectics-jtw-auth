
# Eclectics API

This is the backend API for the Eclectics interview project, built with Node.js and Express.js. The API provides user authentication and management functionalities.


## Features

- Create User Account
- JWT Credentials Login
- Get All Users
- Get User By Id
- User Input Validation with Joi
- Used NodeJs, ExpressJs and MongoDB


## API Reference
#### Error Response
```json
{
  "message": "error message",
  "success": false
}
```
#### Success Response
```json
{
  "message": "succes message",
  "success": true,
  "key":"key is any other field from api. can be array or object"
}
```

#### Create Acount
Create a new a user account.
```http
  POST /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your unique Username eg. `sirah` |
| `password` | `string` | **Required**. Your strong password  eg `password`|
| `name` | `string` | **Required**. Your Full name eg `Wachiye Siranjofu` |
| `nationality` | `string` | **Required**. Your Nationality. eg Kenyan |
| `marital_status` | `enum("single", "married", "divorced", "engaged")` | **Required**. Your Marital status. eg married |
| `age` | `integer` | **Required**. Your Age. eg 25 |

##### Request Body
```json
{
  "username":"sirah",
  "password":"123456",
  "name":"Wachiye siranjofu",
  "nationality":"Kenyan",
  "age": 24,
  "marital_status":"married"
}
```

##### Success Response
```json
{
  "message": "succes message",
  "success": true,
}
```
##### Error Response
```json
{
  "message": "error message",
  "success": false,
}
```

#### Login
 Authenticates a user and returns a JWT token.
```http
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your unique Username eg. `sirah` |
| `password` | `string` | **Required**. Your strong password  eg `password`|

##### Request Body
```json
{
  "username":"sirah",
  "password":"123456",
}
```
##### Success Response
```json
{
  "message": "succes message",
  "success": true,
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2RhZjM3NTQ0MThiOTkxNjA5ZjE5NiIsImlhdCI6MTczMjA5NjA2NiwibmJmIjoxNzMyMDk2MDY2LCJleHAiOjE3MzIwOTYzNjYsImF1ZCI8InNvbWUtY2xpZW50IiwiaXNzIjoic29tZS1hcGkifQ.dP6r5kdQ3uF2eTvWKng6BE63J6zUyWAncrUGRPbjq4M",
}
```
##### Error Response
```json
{
  "message": "error message",
  "success": false,
}
```

#### Get All Users
Retrieves all Users from Database
```http
  GET /users
```
##### Headers
```http
Authorization: Bearer <your-jwt-token>
```
##### Success Response
```json
{
  "data": [
      {
          "_id": "673daf3754418b991609f196",
          "name": "Wachiye siranjofu",
          "username": "sira",
          "nationality": "Kenyan",
          "marital_status": "married",
          "age": 25,
          "createdAt": "2024-11-20T09:43:19.321Z",
          "updatedAt": "2024-11-20T09:43:19.321Z",
          "__v": 0
      }
  ],
  "message": "success",
  "success": true
}
```
##### Error Response
```json
{
  "message": "error message",
  "success": false,
}
```


#### Get User BY Id
Retrieves a single user of given id
```http
  GET /users/:id
```
##### Headers
```http
Authorization: Bearer <your-jwt-token>
```
##### Success Response
```json
{
  "data": 
      {
          "_id": "673daf3754418b991609f196",
          "name": "Wachiye siranjofu",
          "username": "sira",
          "nationality": "Kenyan",
          "marital_status": "married",
          "age": 25,
          "createdAt": "2024-11-20T09:43:19.321Z",
          "updatedAt": "2024-11-20T09:43:19.321Z",
          "__v": 0
      }
  ,
  "message": "success",
  "success": true
}
```
##### Error Response
```json
{
  "message": "error message",
  "success": false,
}
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file at the root folder of the project

`DB_URI`: The connection string for your MONGO DB database

`JWT_SECRET`:The secret key used for signing and verifying JWT tokens

`JWT_ISSUER`:The name of the issuer for the JWT tokens, typically the application's name or domain

`JWT_AUDIENCE`:The intended audience of the JWT tokens, often the application’s domain or client



## Installation

### Requirements
- [Node js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) (this projected used version `20.16.0`)
- [GIT](https://github.com/git-guides/install-git)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)

### Clone the project

```bash
  git clone https://github.com/Wachiye/eclectics-jtw-auth.git
  cd eclectics-jtw-auth
```
### Project Structure

```graphql
eclectics-jtw-auth/
├── config/
│   ├── app-env.js          # Environment configuration
│   ├── database.js         # Database configuration
├── controllers/
│   ├── create-user-controller.js    # Handle user creation
│   ├── get-single-user-controller.js# Handle retrieving a single user
│   ├── get-users-controller.js      # Handle retrieving all users
│   ├── login-controller.js          # Handle user login
├── middlewares/
│   ├── check-auth.js        # Middleware for authentication checks
├── models/
│   ├── user-model.js        # User schema/model definition
├── routes/
│   ├── auth-routes.js       # Authentication routes
│   ├── user-routes.js       # User-related routes
├── utils/
│   ├── validate-joi-schema.js # Joi schema validation utility
├── .env                     # Environment Variables Files (create this file manualy)
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Lock file for npm dependencies
├── server.js                # Main application entry point
```
### Setup Environment Variables

```bash
  git clone https://github.com/Wachiye/eclectics-jtw-auth.git
  cd eclectics-jtw-auth
```
    
### Install Dependencies

```bash
  npm install
```

### Run
The project runs on port 4000. You can change the port by adding `PORT` variable to your `.env` file.
```bash
  npm start
```
If successful, your see the folowing on the termnial
```bash
> api@1.0.0 start
> node server.js

Mongodb Connected
Server listening on port 4000
```
You can test the api by navigation to http://localhost:4000 on your brower. If successful you get following json responce
```json
{
  "success": true,
  "message": "It is working"
}
```
