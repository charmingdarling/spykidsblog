TODO.

make seed data

fix logout in the nav header

profile.handlebars
- Problem: Need to figure out how to generate the newly created title and content 
  - What do I need to do so that once I click on create, that it displays the new content 
  - Sometimes, when I do create a title and content, I am taken back to the login page (often when I try to create something after being idle for a bit or doing a second create post)


TA-DONE.

Move edit button below delete

-----------

After sequelize.sync force true...

1st Visit Ever.
  - localhost:3001 
    - Shows Header+Nav "Spy Kids Blog" Header in H1 and the login button

    ** Should be able to see the seed data on

Click on login 
  -  localhost:3001/login 
    - Shows Header+Nav "Spy Kids Blog" Header in H1 and the login button
    - Be able to go to login-landing page OR
    - Be able to go to the signup-landing page

Click on signup
  - Taken to:
  - http://localhost:3001/profile
  - Welcome, user.username. (test1)
    - Create New Post:
        - Title:
        - Content:

      {
        id: 1,
        username: 'test1',
        email: 'test1@test.com',
        password: '$2b$10$Qt91SydssIX5iLkzTPlnyu46mAi7RL9umICxTcMER3/VRWsI2F4.u',
        Posts: []
      }

  ** Why is my Posts: []? Shouldn't it have something in there? Like the content I created?

  - When I try to click "logout", function doesn't work.


- Comment Submission