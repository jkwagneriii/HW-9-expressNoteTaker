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

        let oldData = JSON.parse(data);
        req.body.id = oldData.length + 1;
        oldData.push(req.body);
        

        fs.writeFile('./db/db.json', JSON.stringify(oldData), function(err) {
            console.log(err);
            res.json(oldData);
        })    
    })
});

// DELETE `/api/notes/:id` 
app.delete("/api/notes/:id", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        console.log('this is the ID we wanna delete',req.params);
        let oldData = JSON.parse(data);
        console.log('OG data to delete something from', oldData)
        // blank array 
        var newData = []
        // do a for loop and fill blank array up with the stuff want
        for (let i = 0; i < oldData.length; i++) {
           // console.log(oldData[i]);
            if (parseInt(req.params.id) !== oldData[i].id) {
                newData.push(oldData[i]);
            }
        }
    console.log('new array !! minus dude we wanted to delete!!',newData);

    fs.writeFile('./db/db.json', JSON.stringify(newData), function(err) {
        console.log(err);
        res.json(newData);
    })

    })
})




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
});

