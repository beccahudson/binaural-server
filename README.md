ID8 by Wesley Rou
=================

Live App: 
Client Repo: https://github.com/thinkful-ei-panda/binaural-client

API Endpoints:
--------------

### Users Endpoints
`/`
- Method: `GET`
- Request Params: nothing, but the user must be an administrator
    - returns a list of all the users in the database
- Response:
    -`200`
    ``` javascript
    {
            [
            {
                id: 1,
                email: 'test1@email.com',
                name: 'Test user 1',
                password: 'Password1!',
                admin: false,
            },
            {
                id: 2,
                email: 'test2@email.com',
                name: 'Test user 2',
                password: 'Password1!',
                admin: false,
            }, //...
        ];
    }
    ```
    - `400` if failed

- Method: `POST`
    - Request Params: 
        - Creates an account
        ``` javascript
        {
            email: 'test1@email.com',
            name: 'Test user 1',
            password: 'Password1!',
        }
        ```

    - Response:
        - `400` if failed
        - `201`
        - `/:id`

        
`/:id`

- Method: `GET`
    - Request Params: 
        - Returns a user by its id
        ``` javascript
        {
            id: 1,
        }
        ```

    - Response:
        - `200`
        
        ``` javascript 
        {
            email: 'test1@email.com',
            name: 'Test user 1',
            password: 'Password1!',
        }
        ```

        - `400` if failed


- Method: `PATCH`
    - Request Params: 
        - Update user password
        ``` javascript
        {
            id: 1,
            user_prefs: "newpassword",
        }
        ```

    - Response:
        - `204`
        - `409` if failed


- Method: `DELETE`
    - Request Params: 
        - Delets a user data
        ``` javascript
        {
            id: 1,
        }
        ```

    - Response:
        - `204`
        - `400` if failed





### Auth Endpoints

POST /api/auth/token
Logs in to an existing account

`/token`

- Method: `POST`
    - Request Params: 
        - Create user JWT 
        ``` javascript
        {
            email: 'test1@email.com',
            password: 'Password1!',
        }
        ```

    - Response:

        ``` javascript 

            jwtToken = "string"
        
        ```
        - `400` if failed

- Method: `PUT`
    - Request Params: 
        - Assigns user JWT 
        ``` javascript
        {
            id: 1,
            email: 'test1@email.com',
            name: test1,
        }
        ```

    - Response:

        ``` javascript 

            jwtToken = "string"
        
        ```

## Technology

Made with the Express framework. Uses postgrator to perform table migrations to SQL database and knex library to write make changes to the tables.