const express = require("express");
const app     = express();
const path    = require("path");
const bodyParser = require('body-parser');

app.use(express.static('docs'));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile(path.resolve('./docs/index.html'));

});

app.all('/api', function (req, res) {
    if(req.body.data)
        set = req.body;
    res.end();
});

app.get('/init', function (req, res) {
    res.send(set);
    res.end();
});

app.listen(3000);