# My Social App
This is a simple MERN social media application with a fake REST API (json-server) containing posts and a MongoDB authentication server. Authentication is done with Passport.js, with users stored in a Mongo database. 

Posts are stored in a fake REST API (json-server) which refreshes whenever the app sleeps or about every 24 hours. Uses Redux for state management. The application contains post, delete, like and reply functionalities. 

Hosted by Heroku. Styled with Material UI.

## Signing up

Sign up with a unique username and strong password (no email required!). Passwords are encrypted in the MongoDB database. You can sign back in with these credentials at any point, given your account hasn't been deleted.

## Posting

Feel free to create a new post, or explore and interact with the existing posts by clicking on them. Clicking on a post will show all of its direct comments.

#### Note: due to the nature of Heroku, the fake posts API will reset whenever the app sleeps, or about every 24 hours.
#### Another note: loading up the site initially may take a while--this is just Heroku waking upp the app.
