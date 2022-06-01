var express = require('express');
var router = express.Router(); 

var blogs = require("../public/sampleBlogs");
const blogPosts = blogs.blogPosts;

const { blogsDB } = require('../mongo');

//Alternatively: var blogsImport = require("../public/sampleBlogs");
//Then use blogsImport.blogPosts to access blogs

/* GET blog page. */
router.get('/', async function (req, res, next) {
    try {
        const collection = await blogsDB().collection("blogs50");
        const blogs50 = await collection.find({}).sort({ id: 1 }).toArray();
        res.json(blogs50);
    } catch (e) {
        res.status(500).send("Error fetching posts" + e)
    }
});

/* GET all sorted blog posts. */
router.get('/all', async function(req, res){
    try {
        let sortField = req.query.field;
        let sort = req.query.order;

        if (sort === 'asc'){
            sort = 1
        }
        if (sort === 'desc'){
            sort = -1
        }

        const collection = await blogsDB().collection("blogs50");
        const blogs50 = await collection.find({}).sort({ [sortField]: sort }).toArray();

        res.json(blogs50);

    } catch (e) {
        res.status(500).send("Error fetching posts" + e)
    }

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

//Post Blogs Router
router.get('/postBlog', (req, res, next) => {
    res.render('postBlog');
})

//Submit Post Blog Router
router.post('/submit', (req, res) => {
    res.status(201);
    let newBlog = req.body;
    blogs.blogPosts.push(addBlogPost(newBlog));
})

//Display Blogs Router
router.get('/displayBlogs', (req, res, next) => {
    res.render('displayBlogs');
})

//Display Single Blog Router
router.get('/displaySingleBlog', (req, res, next) => {
    res.render('displaySingleBlog');
})

//Delete Single Blog Router
router.delete('/deleteBlog/:blogId', (req, res, next) => {
    const blogToDelete = req.params.blogId;
    
    for (let i = 0; i < blogPosts.length; i++){
        let blog = blogPosts[i];
        if (blog.id === blogToDelete){
            blogPosts.splice(i,1);
        }
    }

   res.send('successfully deleted');
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