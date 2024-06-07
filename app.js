const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const mongoose = require("mongoose");
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(cookieParser('CookingBlogSecure'));

// / Making a connection to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('💾 connected...');
    // Listening for connections on the defined PORT
    app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err.message));

app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


const routes = require('./server/routes/recipeRoutes.js')
app.use('/', routes);
