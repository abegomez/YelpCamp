var express     = require("express"),
 app            = express(),
 bodyParser     = require("body-parser"),
 flash          = require("connect-flash"),
 mongoose       = require("mongoose"),
 Campground     = require("./models/campground"),
 passport       = require("passport"),
 LocalStrategy  = require("passport-local"),
 methodOverride = require("method-override"),
 User           = require("./models/user"),
 seedDB         = require("./seeds"),
 Comment        = require("./models/comment");

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    
// mongoose.connect("mongodb://localhost/yelp_camp_v11");
mongoose.connect("mongodb://admin:adminher1@ds147344.mlab.com:47344/yelpcampv11");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Clear db and add new data for testing
//seedDB();

// Passport config
app.use(require("express-session")({
    secret: "mom",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next()
})

// ROUTES
//++++++++++++++++++++++++++++++++++++++++++++++++++

app.use("/", indexRoutes)
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server running.")
});