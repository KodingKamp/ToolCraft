# Backend File Structure
app.js - references each Router

Routes - API routes to hit paired with a method within the Controller.

Controller - Business Logic for each route, takes Request object, reaches out to Repository for DB access & returns DTO object to front-end.

Repository - Reaches out to MongoDB and returns Response to Controller.

<hr>

## Models
Requests - request payload from Front-end

Response - response payload from Database (Could be replaced by DB_X objects)

DTO - Data Transfer Object, reponse payload to be sent back to Front-end

Constants:

Messaging - Centralized location for any text to be displayed

ErrorMessages - Centralized location for any error text to be displayed

