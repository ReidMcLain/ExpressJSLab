const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

let arr = [];

app.post('/formsubmissions', (req, res) => {
 
    fs.readFile('log.json', (err, data) => {
        if (err) console.log(err);
        let info = JSON.parse(data);
        if (Array.isArray(info)) {
            info.forEach(element => arr.push(element))
        } else {
            arr.push(info)
        } arr.push(req.body);
        fs.writeFile("log.json", JSON.stringify(arr), (err) => console.log(err))
    })

    res.send('Thank you for submitting your contact form!');
    
});

// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
// });


// app.get('/', (req, res) => {
//     res.send("Hello from the web server side...");
// });

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, () => console.log("Hello from the web server side..."));