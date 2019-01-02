var express  = require("express")
var router   = express.Router()
var passport = require("passport")
var User     = require("../models/user")


router.get("/", (req, res) => {
    res.render("landing")
})

// Authentication Routes
router.get("/register", (req, res) =>{
    res.render("register");
})

// Handling user sign up
router.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), 
    req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Thank you for registering," + user.username)
            res.redirect("/campgrounds")
        })
    })
})

// LOG IN
router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", passport.authenticate("local",
    {  
        successFlash: 'Welcome!',
        failureFlash: true,
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), (req, res) => {
        req.flash("success", "Login successful!");
        
        console.log("Login in successful.");
    })

// Log out
router.get("/logout", (req, res) => {
    req.logout()
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds")
})

module.exports = router