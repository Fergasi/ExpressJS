var express = require('express');
var router = express.Router(); 

var blogs = require("../public/sampleBlogs");
const blogPosts = blogs.blogPosts;

//Alternatively: var blogsImport = require("../public/sampleBlogs");
//Then use blogsImport.blogPosts to access blogs

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
router.get('/singleBlog/:blogId', function (req, res) {
    const blogId = req.params.blogId;

    res.json(findBlogId(blogId))
    //Example URL to call this:
    //http://localhost:4000/blogs/blogsbyid/5
    //http://localhost:4000/blogs/blogsbyid/1
})

router.get('/postblog', (req, res, next) => {
    res.render('postBlog');
})

router.post('/submit', (req, res) => {
    res.status(201);
    let newBlog = req.body;
    blogs.blogPosts.push(addBlogPost(newBlog));
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

//Alternatively method using array.find
// const findBlogId2 = (blogID) => {
//     const foundBlog = blogPosts.find((blog) => {
//         return blog.id === blogId;
//     });
//     return foundBlog;
// };

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

//Alternative Sort Asc & Dsc syntax
// blogs.sort((a, b) => {
//     const aCreatedAt = a.createdAt;
//     const bCreatedAt = b.createdAt;
//     let sort = req.query.sort;
//     if (sort === 'asc') {
//         if (aCreatedAt < bCreatedAt) {
//             return -1;
//         }
//         if (aCreatedAt > bCreatedAt) {
//             return 1;
//         }
//     }
//     if (sort === 'desc') {
//         if (aCreatedAt > bCreatedAt) {
//             return -1;
//         }
//         if (aCreatedAt < bCreatedAt) {
//             return 1;
//         }
//     }
//     return 0
// })

//Construct object for blog post entry
let addBlogPost = (body) => {
    let id = blogPosts.length + 1;
    newDate = new Date();
    let blog = {
      createdAt: newDate.toISOString(),
      title: body.title,
      text: body.text,
      author: body.author,
      id: id.toString()
    }
    return blog
}