import express from 'express';
import cartRoutes from './cart-routes';
const app = express();

app.use(express.json());

app.use("/", cartRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port: ${port}.`);
});