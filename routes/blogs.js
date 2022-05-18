var express = require('express');
var router = express.Router(); 

var blogs = require("../public/sampleBlogs");
const blogPosts = blogs.blogPosts;

/* GET blog page. */
router.get('/', function(req, res, next) {
    res.json(blogPosts);
});

/* GET all sorted blog posts. */
router.get('/all', function(req, res){
    let sort = req.query.sort;

    res.json(sortBlogs(sort));
    //Example URL to call this:
    //http://localhost:4000/blogs/all/?sort=asc
    //http://localhost:4000/blogs/all/?sort=desc
});

/* GET blog by ID. */
router.get('/blogsbyid/:blogId', function (req, res) {
    const blogId = req.params.blogId;

    res.json(findBlogId(blogId))
    //Example URL to call this:
    //http://localhost:4000/blogs/blogsbyid/5
    //http://localhost:4000/blogs/blogsbyid/1
})

module.exports = router;

//Helper Functions

//Find by ID
let findBlogId = (id) => {
    for (let i = 0; i < blogPosts.length; i++){
        let blog = blogPosts[i];
        if (blog.id === id){
            return blog;
        }
    }
}

//Sort Asc & Dsc
let sortBlogs = (order) => {
    let posts = blogPosts;
    if (order === 'asc'){
        return posts.sort(function(a,b) {return new Date(a.createdAt) - new Date(b.createdAt)});
    } else if (order === 'desc'){
        return posts.sort(function(a,b) {return new Date(b.createdAt) - new Date(a.createdAt)});
    } else {
        return posts;
    }
}