# ExpressJS

## Instructions:

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