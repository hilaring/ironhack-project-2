![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Project #2 | Courses platform

## Description

Description about project!!!!!!!
 
## User Stories

 - **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
 - **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
 - **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
 - **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
 - **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
 - **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
 - **suscribe** - As a user I want to suscribe to a course 
 - **own profile** - As a user I want to see my profile and my courses
 - **course detail** - As a user I want to read the goals and the information about the courses
 - **edit profile** - As a user I want to edit my profile information, like a username
 - **delete suscription** - As a user I want to delete the courses that i'm doing of my profile



## Routes:

Verb | Routes | View | Destination | Private  
:--:|:--:|:--:|:--:|:--:|
GET | / |home|-|No
GET | /auth/signup | auth/sign up |-| No
POST | /auth/signup | auth/sign up | /cursos | No
GET | /auth/login | auth/login |-| No
POST | /auth/login | auth/login | /cursos | No
POST | /auth/logout | - | / | Si
GET | /courses | courses/list | - | Si
GET | /courses/:id | courses/view | - |Si
POST | /courses/:id/add | - | courses/:id | Sí
POST | /courses/:id/remove | - | courses/:id | Si
POST | /courses/:id/complete | - | courses/:id | Si
GET | /profile | user/profile | - | Sí
POST | /profile | - | /profile | Sí 
POST | /profile/:id/remove | - | /profile | Sí (ver verbo delete)


## Models

### Users:
```
- id
- name
- password
- email
- role
- courses []
- timestamps {
    create
    update
}
```

### Courses:
```
- id
- name
- description
- category []
- lessons [{
    id
    name
    description
    url
}]
- timestamps {
    create
    update
}
```


## Links

### Trello

[Project #2](https://trello.com/b/1HlmzB2H/ih-project-2)

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides.com

The url to your presentation slides

[Slides Link](http://slides.com)
