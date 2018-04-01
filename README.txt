CONTENTS OF THIS FILE
----------------------------------
 * Introduction
 * About File Hierarchy 
 * Requirements
 * Installation
 * Run
 * Troubleshooting


INTRODUCTION
---------------------
* This project is a Nodejs based task, have to create Restful API. 
* Mlab is used as a database as a service platform means all the db pf this project is on mlabs.
* Nodejs Cluster is used. 
* ID is the primary id here apart from _id (Objectid).
* We are using localhost(127.0.0.1) with PORT = 3000 for the node server.
* GET-API = /api/users is to get all registered users and it also support query parameter which are - name,limit,page,sort.
* POST-API = /api/users is to register new user.
* GET-API = /api/users/:id is to get that specific user with that id.
* PUT-API = /api/users/:id is to update that ID users first_name, last_name & age.
* DELETE-API = /api/users/:id is to delete any user with that ID.  


ABOUT FILE HIERARCHY
-----------------------
* I have used express generator for express application generation.
* package.json <= It defines the application dependencies and other information.
* /bin/www <= It is the application entry point! The very first thing this does is require() the "real" application entry point(app.js).
* app.js <= This file creates an express application object (named app, by convention), sets up the application with various settings and middleware, and then exports the app from the module.
* /Routes <= This folder contain all the route files which are imported in the app.js file.
* /Views <= The views (templates) are stored in this directory (as specified in app.js) and are given the file extension .jade ( Jade is a markup language which basically optimizes the .html files by removing ceremony).


REQUIREMENTS
---------------------
* A Machine with the latest version of Node & NPM installed.


INSTALLATIONS
---------------------
* To install node (which include npm) go to 
   https://nodejs.org/en/download/


RUN
-----------------------
* To run the nodejs app in a new terminal go the */datapeace/task* directory and type *npm start*
* Instead of running the *npm start* command you can directly run the app by clicking the /bin/www file.


TROUBLESHOOTING
---------------------------
* While running the app please do look at the log in the terminal to get a better insight of what happening.
* If still there is any issue please do let me know on 007alokranjan@gmail.com or through cal on +91-7838981669.