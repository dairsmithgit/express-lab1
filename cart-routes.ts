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
    let maxPrice: number = parseInt(req.query.maxPrice as string);
    let prefix: string = req.query.prefix as string;
    let pageSize: number = parseInt(req.query.pageSize as string);

    let results = carts;
    if (maxPrice) {
        results = results.filter(cart => cart.price <= maxPrice);
    }
    if (prefix) {
        results = results.filter(cart => cart.product.toLowerCase().includes(prefix));
    }
    if (pageSize) {
        results = results.slice(0, pageSize);
    }

    res.status(200);
    res.json(results);
});

routes.get("/carts/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const item:Cart|undefined = carts.find(item => item.id === id);
    if (item) {
        res.status(200);
        res.json(item);
    } else {
        res.status(404);
        res.send(`ID Not Found`);
    }
});

routes.post("/carts", (req, res) => {
    let newItem: Cart = req.body;
    newItem.id = nextId;
    nextId++;
    carts.push(newItem);
    res.status(201);
    res.json(newItem);
});

routes.put("/carts/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    let item: Cart = req.body;
    item.id = id;
    const index: number = carts.findIndex(cart => cart.id === id);
    if (index !== -1) {
        carts[index] = item;
        res.status(200);
        res.json(item);
    }
});

routes.delete("/carts/:id", (req, res) => {
    const id: number = parseInt(req.params.id);
    const index: number = carts.findIndex(cart => cart.id === id);
    if (index !== -1) {
        carts.splice(index, 1);
    }
    res.status(204);
    res.send();
});