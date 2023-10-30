TODO.

make seed data

After signing up - it makes me create a new post
Toggle? 


Questions for Erik: 

- I think I need to make a helper function. 
     - toLocaleString for post.date_created
	- I am not quite sure where I need to add it in. 

- In my api/postRoutes, I am having issues with formatting the date right in my views for singlepost/:id. 

Am I not referring to the time correctly? {{post.date_created}} or should it be ...?

---------------------------------------------

THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created 

WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post

WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard

WHEN I click on the logout option in the navigation
THEN I am signed out of the site

WHEN I am idle on the site for more than a set time
THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts

TA-DONE.
