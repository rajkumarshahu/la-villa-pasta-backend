# La Villa Pasta-App-WebServer

- A purchase app (with 2% cash back per order) for an Italian restaurant, where customers can personalize their pastas by choosing the kind of pasta, the kind of sauce and toppings. They can also choose a combo if they are not interested in personalizing their pasta. Salad, drinks and desserts are also on the menu. Before going to the menu it is necessary to sign in or sign up and once logged the user can go to the Menu option or Account Option. On Account option, they can edit their information,see the history of previous orders and check how much money they have saved on cash back. When going to checkout, they can decide if they are going to apply the cash back or not. The admin can sign in and check the orders, accept or deny it , mark as out for delivery and also add more things to the menu.


## Getting Started

- Download and unzip the project.

## Running Server

- Rename `config/config copy.env` to `config/config.env`
- Configure `config/config.env` with your `MONGO_URI`

```--------------------------------------------
    cd la-villa-pasta-backend
    npm install (to install dependencies)
    npm run dev (to start development server)
 ```

## Seeding Data in Database

```--------------------------------------------
    node seeder -d (To delete all data from DB)
    node seeder -i (To import data into DB)
```

## Running Tests

```--------------------------------------------
    npm run test
```

## Technology Used

- nodejs
- express
- MongoDB
- Mongoose
- Swagger
- Mocha and Chai

## Authors

- Juliana de Carvalho
- Abdeali Mody
- Raj Kumar Shahu
- Amar Ambedkar
- Nishakumari Gohil
