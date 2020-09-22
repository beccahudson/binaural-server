ID8 by Wesley Rou
=================

Live App: 
Client Repo: https://github.com/thinkful-ei-panda/binaural-client

API Endpoints:
--------------

### Users Endpoints

GET /api/user
Admin gets all user data

POST /api/user
Creates an account

PATCH /api/user/:id
Updates user data

DELETE /api/user/:id
Delete user data

### Auth Endpoints

POST /api/auth/token
Logs in to an existing account

## Technology

Made with the Express framework. Uses postgrator to perform table migrations to SQL database and knex library to write make changes to the tables.