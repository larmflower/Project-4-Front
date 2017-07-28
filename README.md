# Project 4 Starter Code

 ## Introduction


Welcome to our repository for WDI-27's final project! We have created an Angular app with a Rails API and external API, News API, called Make News. Make News functions as a  social website that filters in multiple news sources which users can repost and share specific articles with their friends.

## Installation and Setup

 Installation steps are listed below:

 * Download or clone this repo
 * Copy `bundle` into your terminal to install gems for the api
 * Copy `yarn` and `bower` into your terminal to install dependencies for the app
 * Run `rails db:create`, `rails db:migrate`, `rails db:seed` in your terminal to seed your api. Then run `rails s` to 
 * Run `gulp` in your terminal to compile the source code and open in browser for the app
 * _Enjoy_!

### A short description


Make News is an app that allows users to login or register through our website or through instagram and facebook oauth. Users can browse articles from various news sources, repost articles to share on their friends' feed, and request/add/decline friendship.

![Homepage](http://i.imgur.com/jnyOuoI.png)

![About](http://i.imgur.com/iTCgZoy.png)

 The app requires registration or logging in to access website content. Users can choose to login with Instagram, Facebook, or through our app. Additionally, once a user is verified they can post content and start adding friends.

![Login example](http://i.imgur.com/Z6gFoU9.png)

![Profile example](http://i.imgur.com/4wbasi5.png)

 Posting articles is easy. Users can upload images through amazon-web-services and create their own posts, or they can repost articles from the news page.

 ![Friends](http://i.imgur.com/FIv4VTB.png)

 ![News API](http://i.imgur.com/0wGdxuM.png)

 ![Posts](http://i.imgur.com/o40QWaC.png)


### Technologies used

 These are the languages and softwares used in this game:

 - HTML 5
 - SCSS
 - Bootstrap
 - Angular (ngMessages, ui.router, ngAnimate, ngResource)
 - Rails
 - News API
 - Bulma
 - Gulp
 - Yarn
 - NPM
 - JWOT
 - Bcrypt
 - Balsamiq
 - Imgur
 - Satellizer
 - Amazon Web Services
 - Oauth: Instagram
 - Oauth: Facebook
 - Trello
 - Git & github
 - Heroku

 ![Wireframe](http://i.imgur.com/935h6SK.png)

 Oauth and bcrypt are used for user registration and login and Instagram and Google are available as login options. The News API is installed to filter in news sources for users to repost on their feed.

### Challenges faced

The biggest challenges were handling the three major components of our app: a rails API with complex relationships, an angular app, and an external API. It was key to our success to work as a team as we were able to split up work and provide a pair of second eyes to look over bugs and errors.

### Rounding it off

 For improvements we'd like to:

- Add notifications for posts
- Include a page for saved and liked posts
- Include extra interactive icons for the article index page
- Be able to cancel a friend request
- Improve the friendship model for more complicated relationships: mutual friends, blocked, ect.


 Interested in following our future projects? Link with us on Github [alexandriako](https://github.com/alexandriako), [larmflower](https://github.com/larmflower).
