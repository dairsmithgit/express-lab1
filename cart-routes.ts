import express from 'express';
import Cart from './model/Cart';
const routes = express.Router();

const carts: Cart[] = [
    { id: 1, product: "skateboard", price: 50, quantity: 4 },
    { id: 2, product: "book", price: 15, quantity: 10 },
    { id: 3, product: "vinyl record", price: 20, quantity: 8 },
    { id: 4, product: "shoes", price: 80, quantity: 4 },
    { id: 5, product: "trading cards", price: 4, quantity: 20 },
    { id: 6, product: "water bottle", price: 10, quantity: 5 }
];
let nextId: number = 7;

routes.get("/carts", (req, res) => {
    res.json(carts);
});

