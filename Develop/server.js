// Dependencies
// =============================================================
const express = require('express');
const path = require('path');
const fs = require('fs')

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

//Root index.html
app.get("/", function(req, res) {
    console.log('I AM ROOT')
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

//Route notes.html 
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

//Route db.json working with getNotes function
app.get("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        if (err) {
            console.log("Error");
        } else {
            console.log(data);
            res.json(JSON.parse(data));
        }
    })
});

//Posting saved data from user input 
app.post("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        console.log("POST??", req.body);

        let oldData = res.json(JSON.parse(data));
        

    fs.writeFile('./db/db.json', JSON.stringify(oldData), function(err) {
        console.log(err);
        res.json(oldData);
    })    
    })
});




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
});

