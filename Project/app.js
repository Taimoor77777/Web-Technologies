const express = require("express")
const mongoose = require("mongoose")
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express()
// const indexRouter = require('./routes/index');
const feedbackRouter = require('./routes/feedback');

mongoose.connect("mongodb://localhost:27017/demo",)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.render("index")
    
})

app.get("/contact", (req, res)=>{
    res.render("contact")
})

app.get("/resources", (req, res)=>{
    res.render("resources")
})

app.listen("3000")

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/feedback', feedbackRouter);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });