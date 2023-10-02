# Books Microservice

## Download Postman Collection

[Download file](books_microservice.postman_collection.json)

## To View Docs

```
  cd docs-swagger-server/
  npm i
  node server.js
```

### Go to http://localhost:3000/api-docs  in browser

## Database Design
Microservice: content-Service
Database: contentdb

Collections:
1. Content
   - _id (ObjectID)
   - title (String)
   - story (String)
   - date_published (Date)
   - user_id (ObjectID, references Users collection in userdb)     

Microservice 2: interaction-service
Database: interactiondb

Collections:
1. Interactions
   - _id (ObjectID)
   - user_id (ObjectID, references Users collection in userdb)
   - content_id ObjectID,references Content collection in contentdb
   - event (String) enum: ['like','read']
   - interaction_date (Date)

Microservice 3: user-service
Database: userdb

Collections:
1. User
   - _id (ObjectID)
   - first_name (String)
   - last_name (String)
   - email (String)
   - phone_number (String)


## HLD / Architecture of the Project 
![IMG-0006](https://github.com/Naman15032001/books-microservice/assets/71309281/ecdebb13-e5fd-4b8d-a076-b972411ec4d7)

## Running in local 

### Requirements

- Node.js 
- Docker and Docker compose

```
  docker compose up --build
```


