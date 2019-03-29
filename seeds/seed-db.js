const db = require("../models");

const items = [
  {
    product_name: "Blood on the Tracks by Bob Dylan",
    department_name: "music",
    price: 15.99,
    stock_quantity: 25
  },
  {
    product_name: "Either/Or by Elliot Smith",
    department_name: "music",
    price: 22.99,
    stock_quantity: 37
  },
  {
    product_name: "Rubber Soul by The Beatles",
    department_name: "music",
    price: 20.99,
    stock_quantity: 99
  },
  {
    product_name: "Aeroplane over the Sea by Neutral Milk Hotel",
    department_name: "music",
    price: 18.99,
    stock_quantity: 24
  },
  {
    product_name: "The Big Lebowski",
    department_name: "movies",
    price: 14.99,
    stock_quantity: 11
  },
  {
    product_name: "Eternal Sunshine of the Spotless Mind",
    department_name: "movies",
    price: 14.99,
    stock_quantity: 42
  },
  {
    product_name: "Pulp Fiction",
    department_name: "movies",
    price: 22.01,
    stock_quantity: 7
  },
  {
    product_name: "Coffee and Cigarettes",
    department_name: "movies",
    price: 24.75,
    stock_quantity: 15
  },
  {
    product_name: "City of God",
    department_name: "movies",
    price: 25.99,
    stock_quantity: 3
  },
  {
    product_name: "The Name of the Wind by Patrick Rothfuss",
    department_name: "books",
    price: 26.59,
    stock_quantity: 11
  },
  {
    product_name: "Starship Troopers by Robert Heinlein",
    department_name: "books",
    price: 22.75,
    stock_quantity: 14
  },
  {
    product_name: "Dune by Frank Herbert",
    department_name: "books",
    price: 13.99,
    stock_quantity: 99
  },
  {
    product_name: "The Eye of the World by Robert Jordan",
    department_name: "books",
    price: 22.7,
    stock_quantity: 53
  },
  {
    product_name: "World of Warcraft",
    department_name: "games",
    price: 48.99,
    stock_quantity: 49
  },
  {
    product_name: "Fallout 4",
    department_name: "games",
    price: 45.99,
    stock_quantity: 58
  },
  {
    product_name: "Black Desert Online",
    department_name: "games",
    price: 39.99,
    stock_quantity: 29
  },
  {
    product_name: "Mario Soccer",
    department_name: "games",
    price: 12.0,
    stock_quantity: 3
  }
];

db.sequelize
  .sync({
    force: true
  })
  .then(function() {
    db.Product.bulkCreate(items)
      .then(function() {
        db.sequelize.close();
      })
      .catch(function(err) {
        console.log("/n/nError: ", err);
      });
  });
