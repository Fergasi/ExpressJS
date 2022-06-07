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
        let authorQuery = req.query.author;
        let findAuthor = {};

        if (authorQuery !== 'All'){
            findAuthor = {author: `${authorQuery}`}
        }

        if (sort === 'asc'){
            sort = 1
        }
        if (sort === 'desc'){
            sort = -1
        }
        console.log(findAuthor)
        const collection = await blogsDB().collection("blogs50");
        const blogs50 = await collection.find(findAuthor).sort({ [sortField]: sort }).toArray();

        res.json(blogs50);

    } catch (e) {
        res.status(500).send("Error fetching posts" + e)
    }

    //Example URL to call this:
    //http://localhost:4000/blogs/all/?sort=asc
    //http://localhost:4000/blogs/all/?sort=desc
});

/* GET blog by ID. */
router.get('/singleBlog/:blogId', async function (req, res) {
    try {
        const blogId = Number(req.params.blogId);

        const collection = await blogsDB().collection("blogs50");
        const foundBlog = await collection.findOne({id: blogId});
        
        if (!foundBlog){
            const noBlog = {
                text: 'This Blog does not exist...'
            }
            res.json(noBlog)
        } else {
            res.json(foundBlog);
        }
        
    } catch (e) {
        res.status(500).send("Error fetching posts" + e)
    }
})

//Post Blogs Router
router.get('/postBlog', (req, res, next) => {
    res.render('postBlog');
})

//Update Blogs Router
router.get('/updateBlog', (req, res, next) => {
    res.render('updateBlog');
})

//Submit Post Blog Router
router.post('/submit', async (req, res) => {
    try {
        const collection = await blogsDB().collection("blogs50");
        const sortedBlogArray =  await collection.find({}).sort({ id: 1 }).toArray();
        const lastBlog = sortedBlogArray[sortedBlogArray.length - 1]

        let blog = {
            createdAt: new Date(),
            title: req.body.title,
            text: req.body.text,
            author: req.body.author,
            lastModified: new Date(),
            category: req.body.category,
            id: Number(lastBlog.id + 1)
        }

        await collection.insertOne(blog);

        res.status(200).send('Successfully posted')

    } catch (e) {
        res.status(500).send("Error fetching posts" + e)
    }
    
    //blogs.blogPosts.push(addBlogPost(newBlog));
})

//Update Blog Router
router.put('/updateBlog/:blogId', async function (req, res) {
    try {
        const collection = await blogsDB().collection('blogs50');
        const blogId = Number(req.params.blogId);
        const originalBlog = await collection.findOne({id: blogId});

        if (!originalBlog){
            res.send('* Blog with ID: ' + blogId + ' does not exist... Please enter a valid Blog ID')
        } else {
            let updateBlog = req.body;
            const blogTitle = updateBlog.title ? updateBlog.title : originalBlog.title;
            const blogText = updateBlog.text ? updateBlog.text : originalBlog.text;
            const blogAuthor = updateBlog.author ? updateBlog.author : originalBlog.author;
            const blogCategory = updateBlog.category ? updateBlog.category : originalBlog.category;
            updateBlog = {
              lastModified: new Date(),
              title: blogTitle,
              text: blogText,
              author: blogAuthor,
              category: blogCategory,
            };
            await collection.updateOne({
               id: blogId
            }, {
               $set: updateBlog
            });
            res.status(200).send('Successfully Updated')
        }
    } catch (error) {
        res.status(500).send("Error updating blog." + error)
    }
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
router.delete('/deleteBlog/:blogId', async (req, res) => {
    try {
        const blogId = Number(req.params.blogId);
        const collection = await blogsDB().collection('blogs50');
        const blogToDelete = await collection.deleteOne({id: blogId})
        if (blogToDelete.deletedCount === 1) {
            res.send('Successfully Deleted').status(200) 
        } else {
           res.send('Could not find Blog ID to delete... Please enter a valid Blog ID').status(404)
        }
        
    } catch (error) {
        res.status(500).send("Error, could not delete blog." + error)
    }
});

//Get Authors Route
router.get('/authors', async function (req, res) {
    try {
        const collection = await blogsDB().collection('blogs50');
        const authors = await collection.distinct('author');
        //console.log(authors);
        res.json(authors);
    } catch (e) {
        res.status(500).send('Error: ' + e);
    }
});

///////// Helper Functions ///////////

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
      createdAt: ISODate(newDate),
      title: body.title,
      text: body.text,
      author: body.author,
      id: Number(id)
    }
    return blog
}

module.exports = router;