# ExpressJS

## Instructions:

## Assignment 1
* New Git Repo
- Add repo name
- Set owner: Personal
- Set Public
- Add a readme is checked
- Add .gitignore is checked, template: Node
- Create Repository
- Click Green Code button, copy the github link
- 'git clone <githublink.com>' in your project folder

* Express Setup
- run 'npx express-generator -e' in the project folder
- run 'npm i --save-dev nodemon'
- run 'npm i'
- add the files to git
- git commit the files
- git push to origin

* Change the start command to do PORT=4000 before node bin/www
* Create a new GET route /datetime that will send the current date and time as a string to the browser. Hint: The method new Date() will create a new date object that has methods for retrieving the current date and time as strings.
* Create a new GET route /users/myname in the users.js routes file. The route should return your name to the browser.
* Create a new GET route /users/myfavoritemovies in the users.js routes file. The route should return your three favorite movies in an array to the browser. Hint: You may need to use res.json() instead of res.send().
* Stretch goal: Use res.render to render the above routes using the index.ejs template and modify the index.ejs template as needed. Or create your own users.ejs template.

* Create a new base route called /blogs. Copy the sampleBlogs.js file into your project and use require to import blogPosts into your file. Create a new GET route /blogs/all that returns an array of all the blog posts to the browser.
* Create and update GET routes nested under /blogs. /blogs/:blogId should return only a single blog post that matches the id field of the blog post to the blogId route param. Add query param handling to the /blogs/all route. The ?sort param should behave as follows: if ?sort=desc, the blog posts should be sorted by descending order based upon createdAt date; if ?sort=asc, the blog posts should be sorted by ascending order instead. Hint: use the .sort() method to sort the blogs.

## Assignment 2
* Create a new file in /views called postBlog.ejs, copy and paste the provided code into it. Note that jquery is imported, there are user input fields and a button that sends a POST request.
* Create a new route /postblog and use the res.render() method to display this page to the browser.
* Create a new POST route /blogs/submit, it should receive the new blog post information from the browser and add it to the array of blogs in sampleBlogs.js. Note that the createdAt and the id are NOT provided from the front end. You will have to create those two fields yourself server-side and add them to the incoming blog post data before adding it to the blogPosts array. Don't forget to send an "OK" response to the browser after the save!
* Test your new route by adding a blog post via the browser and then retrieving the blog posts. /blogs/all should still work by returning all the posts, and the ?sort param should still work. /blogs/:blogId should be able to retrieve the new blog post by itself by passing in 6 as the blogId.

## Assignment 3
* Build out your blog site by adding the following features
* Create a new file in /views called displayBlogs.ejs, copy and paste the provided code into it
* Create a new GET route /blogs/displayBlogs that will render the displayBlogs page to the browser. Test that the basic functionality of the page is working by clicking the Get Blogs button, your various blog titles should appear in a list. Test that your postBlog page is still working by adding a new blog then go back to displayBlogs and click Get Blogs again. Your new blog title should appear on the page.
* Build out the displayBlogs page functionality by displaying the blog text and author to the page along with the title.
* Implement the ability for the user to sort blogs by ascending and descending. Hint: the easiest way to do this is to add two new <a> tags to the page which redirect the user to "http://localhost:4000/blogs/all?sort=asc" and "http://localhost:4000/blogs/all?sort=desc". 
* Stretch Goal: Instead of the two <a> tag redirects, add a dropdown that has two options "asc" and "desc". Impelment jQuery functionality to modify the $.get "http://localhost:4000/blogs/all" url to send through the user selected sort order as query params when the user clicks the "Get Blogs" button.

# Assignment 4
* Create a new file in /views called displaySingleBlog.ejs, copy and paste the provided code into it
* Create a new GET route /blogs/displaysingleblog that will render the displayBlogs page to the browser. Test that the page and /blogs/singleblog/:blogId route works by entering a blogId into the input field and clicking "Get Single Blog"
* Implement the delete single blog functionality. Hint: you will have to create a new route in the blogs.js file to handle the delete. The route should use a ROUTE PARAM to specify which blog to delete. I.E. /blogs/deleteblog/:blogId.
* Stretch Goal: Implement the PUT route for modifying a single blog. It will be a new route in blogs.js. You can copy much of the html and functionality from postBlog.ejs into displaySingleBlog.ejs. Except now when you make the PUT request, you'll have to send through the blogId you want to modify as a route param (similar to the DELETE route you just created), get the values from the input fields using jQuery, and send those through with the PUT request to update the specified blog.
