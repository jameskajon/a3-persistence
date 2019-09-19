# The Forums

http://a3-jameskajon.glitch.me

## Goal
My project is a forum which is creatively named "The Forums". Users can post, edit, or delete any message on the forum.

This project aims to helps people communicate big ideas in an simple way. The challenges are giving people the space to write everything they want while still having it not appear daunting to read. The design of the website is colorful yet rather minimalistic. This helps the users focus on the content.

## Authentication Strategy / Database
I used Google's Firebase for both my database and authentication. I handled all database interaction on the backend as directed to by the professor using Firestore (the newer database option in Firebase). I also handled native sign ups on the backend. But any logout or login (including oAuth login/sign ups) is done on the front end. I used Google and GitHub for oAuth logins. One limitation is that you cannot currently use multiple account which have the same email address but I thing that's actually good since the same having multiple logins for the same page is pretty confusing to the user. There is a descriptive error message when trying to login if the user tries to sign in with the same email again.

### Testing accounts
There are three accounts below that can be used to login using each of the three login methods. These three account all have posted messages. You are also welcome to make new accounts by clicking on the sign up button or to login with any other GitHub or Google account.

#### Native (sign in with username and password)
    testdevww@wpi.edu
    testdevww
    
#### Google
    testdevacc10
    testwebware10

#### GitHub
    testdevacc11
    testwebware11

## CSS Framework
I used Bootstrap since I have experience with it. I have a minimal amount of css in my style.css file. I resorted to using style tags in only one situation.

## Middleware
- Firebase admin auth: allows authentication on backend including sessions
- Firebase admin db: allows interaction with the cloud database I'm using
- morgan: logs http requests and responses
- body-parser: parses the body of incoming http post requests into json
- express-handlebars: is a template engine. allows me to write more readable and maintainable code


## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub and Google strategy
- **Tech Achievement 2**: I used Firebase for authentication, making database and user info (such as a name) easy to link. This also allowed me to maintain multiple user accounts with ease.

### Design/Evaluation Achievements
- **Design Achievement 1**: I tested my application using screen Mac's VoiceOver. I found it surprisingly easy to use with my eyes closed after following half of the VoiceOver tutorial. I helps that I wrote the website, but also I I think my choise of elements really worked out. All messages are in one column of a table with metadata about that message in the column before. Is's easy to read the entire forum conversation as well as to read a message and it poster. I did, however, find that I could not select the add thread and add message buttons so I redesigned to fix that. I also found that the edit and delete buttons didn't say a description but I fixed that with an extra title attribute.
- **Design Achievement 2**: I tested the application with www.webfx.com finding that my UI can be understood by people 7-8 years old and up.
