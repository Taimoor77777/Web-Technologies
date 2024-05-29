const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const Product = require('./models/products');
const session = require('express-session');

const app = express();

mongoose.connect("mongodb://localhost:27017/demo",)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

const feedbackRoute = require("./routes/feedback");
app.use("/feedback", feedbackRoute);

app.get("/", async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).limit(5);
        res.render("index", {
            title: 'Home',
            css: '/stylesheets/style.css',
            layout: 'layout',
            featuredProducts
        });
    } catch (error) {
        console.error('Error fetching featured products:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/contact", (req, res)=>{
    res.render("contact", { 
        title : 'CONTACT',
        css: '/stylesheets/contact.css',
        layout: 'layout' });
});

app.get("/resources", (req, res)=>{
    res.render("resources",
    { 
        title : 'Resources',
        css: '/stylesheets/resources.css',
        layout: 'layout' });

});

app.get('/add-sample-products', async (req, res) => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            const sampleProducts = [
                {
                    name: 'Product 1',
                    description: 'Description for Product 1',
                    price: 10.99,
                    category: 'Category 1',
                    isFeatured: true
                },
                {
                    name: 'Product 2',
                    description: 'Description for Product 2',
                    price: 15.99,
                    category: 'Category 1',
                    isFeatured: false
                },
                {
                    name: 'Product 3',
                    description: 'Description for Product 3',
                    price: 20.99,
                    category: 'Category 2',
                    isFeatured: true
                },
                {
                    name: 'Product 4',
                    description: 'Description for Product 4',
                    price: 25.99,
                    category: 'Category 2',
                    isFeatured: true
                },
                {
                    name: 'Product 5',
                    description: 'Description for Product 5',
                    price: 30.99,
                    category: 'Category 3',
                    isFeatured: false
                },
                {
                    name: 'Product 6',
                    description: 'Description for Product 6',
                    price: 35.99,
                    category: 'Category 3',
                    isFeatured: true
                }
            ];
            await Product.insertMany(sampleProducts);
            res.send('Sample products inserted');
        } else {
            res.send('Sample products already exist');
        }
    } catch (error) {
        console.error('Error adding sample products:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Retrieve or initialize visitedProducts array in session
        req.session.visitedProducts = req.session.visitedProducts || [];

        // Add the product ID to the visitedProducts array
        req.session.visitedProducts.push(productId);

        res.render("product", {
            title: 'Product Details',
            css: '/stylesheets/style.css',
            layout: 'layout',
            product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/visited-products", async (req, res) => {
    try {
        // Retrieve visitedProducts array from session
        const visitedProducts = req.session.visitedProducts || [];

        // Find products by visited product IDs
        const products = await Product.find({ _id: { $in: visitedProducts } });

        res.render("viewproducts", {
            title: "Visited Products",
            css: "/stylesheets/style.css",
            layout: "layout",
            products: products
        });
    } catch (error) {
        console.error('Error fetching visited products:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/*", (req, res) => {
    res.render("404", { 
    title : 'error page',
    css: '/stylesheets/404.css',
    layout: 'layout' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
