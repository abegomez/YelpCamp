var express    = require("express");
var router     = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS ROUTES
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, function (err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground}); 
        }
    });
});

// COMMENTS CREATE
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err.message);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    req.flash("error", "Something went wrong!")
                    console.log("err");
                } else {
                    // add user name and id to comment
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    // save comment
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment!")
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

// Edit route
router.get("/:comment_id/edit", middleware.checkCommentOwner, (req, res) => {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    });
    
});

// Update route
router.put("/:comment_id", middleware.checkCommentOwner, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
       if(err) {
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// Delete comment route
router.delete("/:comment_id", middleware.checkCommentOwner, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            req.flash("error", "Unable to delete comment." + err.message)
            res.redirect("back");
        } else {
            req.flash("success", "Comment successfully deleted.")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;