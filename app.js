const express = require("express");
const app = express();

app.use(express.json());

// Import all products CRUD processes from router
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");


// Set base route to "localhost:PORT/products"...
app.use("/products", productRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => console.log(`Server Ready at port http://localhost:3000`));