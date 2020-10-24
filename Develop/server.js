// Dependencies
// =============================================================
const express = require('express');
const path = require('path');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up the Express app to work properly with static files
// =============================================================
app.use(express.static('public'));

// Routes
// =============================================================

//Root 
app.get("/", function(req, res) {
    console.log('I AM ROOT')
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
});

