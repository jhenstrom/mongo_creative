var express = require('express');
var router = express.Router();


//setting up interface for mongoDB
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/avatarDB',{ useNewUrlParser: true });

//avatar entry for mongoDB
var avatarSchema = mongoose.Schema({
    Name: String,
    URL: String,
    User: String,
    Votes: Number,
    Comments: [String]
});

var Avatar = mongoose.model('Avatar', avatarSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() 
{
    console.log('Connected');
});


/* GET home page. */
router.get('/', function(req, res, next) 
{
    res.render('index', { title: 'Express' });
});

//POST comment page.
router.post('/avatar', function(req, res, next) 
{
    var new_avatar = new Avatar(req.body); 
    console.log(new_avatar); 
    Avatar.find().where("User", new_avatar.User).exec(function(err, blogs)
    {
        if(blogs.length > 0)
        {
            res.status(200).send('username used');
        }
        else
        {
            new_avatar.save(function(err, post) 
            { 
                if (err) return console.error(err);
                console.log(post);
                res.sendStatus(200);
            });
        }
    });
});

/* GET comments from database */
router.get('/avatar', function(req, res, next) 
{
    console.log("In the GET route");
    Avatar.find(function(err,avatar_list) 
    {
        if (err) return console.error(err);
        else 
        {
            console.log(avatar_list);
            res.json(avatar_list);
        }
    })
});

router.get('/delete', function(req, res, next) {
    console.log("deleting collection")
    db.collection("avatars").deleteOne({User:req.query.q}, function(err, obj) 
    {
        if (err) throw err;
        console.log("1 document deleted");
        res.sendStatus(200);
    });
})

router.get('/query', function(req, res, next) {
    var request  =req.query.q;
    request = String(request)
    console.log(request);
    Avatar.find().where("User", request).exec(function(err, blogs)
    {
        console.log(blogs)
        res.json(blogs);
    });
    
})



module.exports = router;