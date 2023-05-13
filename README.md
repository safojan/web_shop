# Ecommarce 


> Frontend-> React JS + Material core for ui

> Backend-> Node JS & Express JS 

> Database-> MongoDB [mongoose compass for local host]

## Installation process
1. #### clone the repo

2. #### install npm packages
    1. install backend packages
    ```
    cd web_shop
    npm install
    ```
    2. install frontend packages
    ```
    cd client
    npm install
    ```

    
    ##### Backendend .env should contain this .env file
    ```env
    MONGODB_URI=YOUR_MONGODB_URI
    JWT_SECRET=YOUR_JWT_SECREE
    ```

    ```
    ##### Instructions:
 
    1 you can use any random string as JWTSECRET
    2. for localhost REACT_APP_API_URL is http://localhost:5000/api
    3. #### note: add .env on .gitignore





### User stories  achieved :
    1. user can view all products
    2. user can view single product
    3. user can search products and view products by category and price range
    4. user can add to cart checkout products using credit card info
    5. user can register & sign in
    6. admin can create, edit, update & delete products
    7. admin can create categories
    8. admin can view ordered products
    9. admin can change the status of a product (processing, shipped, delivered, etc.)
### User stories  achieved to achive in future sprint  :
    1. implement payment getway like easypaysa,jazz clash etc
    2. Shipment tracking api implementation like TCS api 
    3.mobile responsive and better ui 
    4.improve speed and working on scaling 
