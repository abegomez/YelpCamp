var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis venenatis nisl eu vestibulum. Aliquam in ligula quis odio luctus elementum. Donec vel mi interdum diam pharetra faucibus eget quis metus. Nullam elementum odio pellentesque sollicitudin feugiat. Morbi at convallis nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ligula nec orci venenatis consequat et nec ante. Sed in molestie ante, id sodales nisi. Nulla dui dolor, pulvinar eget eros nec, iaculis maximus nibh."
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis venenatis nisl eu vestibulum. Aliquam in ligula quis odio luctus elementum. Donec vel mi interdum diam pharetra faucibus eget quis metus. Nullam elementum odio pellentesque sollicitudin feugiat. Morbi at convallis nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ligula nec orci venenatis consequat et nec ante. Sed in molestie ante, id sodales nisi. Nulla dui dolor, pulvinar eget eros nec, iaculis maximus nibh."
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis venenatis nisl eu vestibulum. Aliquam in ligula quis odio luctus elementum. Donec vel mi interdum diam pharetra faucibus eget quis metus. Nullam elementum odio pellentesque sollicitudin feugiat. Morbi at convallis nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ligula nec orci venenatis consequat et nec ante. Sed in molestie ante, id sodales nisi. Nulla dui dolor, pulvinar eget eros nec, iaculis maximus nibh."
    }
]

function seedDB() {
    Campground.remove({}, function(err) {
        // if(err) {
        //     console.log(err);
        // }
        // console.log("Removed campgrounds!");
        // // Comment.remove({}, function(err) {
        // //     if(err){
        // //         console.log(err);
        // //     }
        // //     console.log("Removed comments!");
        // //     //add a few campgrounds
        //     data.forEach(function(seed) {
        //         Campground.create(seed, function(err, campground) {
        //             if(err) {
        //                 console.log(err);
        //             } else {
        //                 console.log("added a campground");
                        
        //                 Comment.create(
        //                     {
        //                         text:"This place is great, but I wish I was there was internet.",
        //                         author:"Homer"
        //                     }, function(err, comment) {
        //                         if(err) {
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment._id);
        //                             campground.save();
        //                             console.log("Created new comment.");
        //                         }
        //                     }
        //                 );
        //             }
        //         });
        //     });
        // });
    });
}

module.exports = seedDB;