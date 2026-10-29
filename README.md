# Devlogs+ Frontend

This is the code for the frontend of Devlogs+

> The frontend needs the backend to function, without it nothing works

## Stack

The frontend was made using Vite and React in JavaScript.

## File Structure

All the important files are in the /src folder

**Folders:**
* /api: api routes (made with axios)
* /components: components and pages sorted into folders 
* /hooks: all the hooks sorted into folders
* /routes: callback routes
* /styles: global and theme css files

**Files:**
* App.jsx: has all the routes made with react-router
* helperFunctions.js: some helper functions
* main.jsx: main file

## Developing

When developing the frontend it is recommended to use docker compose. This is recommended because without the backend it returns a network error.

To start the docker-compose run this command
```shell
docker compose -f docker-compose.yaml up --build
```

the docker compose will expose the frontend on localhost port 8080 [http://localhost:8080](http://localhost8080).

To make your code changes reflect what is going on you can restart just the frontend service via docker desktop or this command:
```shell
docker compose restart frontend
```