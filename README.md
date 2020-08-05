# My Social App 
#### See the deployed application [here](https://fathomless-hollows-55304.herokuapp.com/).

<p align="center">
  <img width="100" height="100" src="https://raw.githubusercontent.com/tomierino/deployed-social-app/master/client/src/images/octopus.svg">
</p>

This is a simple MERN social media application with a fake REST API (json-server) containing posts and a MongoDB authentication server. Authentication is done with Passport.js, with users stored in a Mongo database. Posts are stored in a fake REST API (json-server) which refreshes whenever the app sleeps or about every 24 hours. 

Uses Redux for state management. The application contains post, delete, like and reply functionalities. Hosted by Heroku. Styled using Material UI, with a responsive and **mobile-friendly** design.

## Signing up

Sign up with a unique username and strong password (no email required!). Passwords are encrypted in the database. You can sign back in with these credentials at any point, given your account hasn't been deleted.

## Posting

Feel free to create a new post/comment or explore and interact with the existing posts by clicking on them. Clicking on a post will show all of its direct comments.

*__Note:__ loading up the site initially may take a while--this is just Heroku waking up the app.*
