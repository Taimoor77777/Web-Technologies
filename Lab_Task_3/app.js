const express = require("express")
const mongoose = require("mongoose")
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();

mongoose.connect("mongodb://localhost:27017/demo",)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(expressLayouts)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const feedbackRoute = require("./routes/feedback")

app.use("/feedback", feedbackRoute)

app.get("/", (req, res)=>{
    res.render("index", {
        title: 'Home',
        css: '/stylesheets/style.css',
        layout: 'layout',
    });
})

// app.get("/feedback", (req, res) => {
//     res.render("feedback", { 
//     title : 'page',
//     css: '/stylesheets/feedback.css',
//     layout: 'layout' });
// });


app.get("/contact", (req, res)=>{
    res.render("contact", { 
        title : 'CONTACT',
        css: '/stylesheets/contact.css',
        layout: 'layout' });
})

app.get("/resources", (req, res)=>{
    res.render("resources",
    { 
        title : 'Resources',
        css: '/stylesheets/resources.css',
        layout: 'layout' });

})


app.get("/*", (req, res) => {
    res.render("404", { 
    title : 'erorr page',
    css: '/stylesheets/404.css',
    layout: 'layout' });
});







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});