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
username: { type: String, required: true, unique: true },
name: String,
lastname: String, 
password: { type: String, required: true },
email: { type: String, required: true, unique: true },
phone: { type: Number, unique: true },
stats: {
  cuourses: { type: String, enum: [{ type: Schema.Types.ObjectId, ref: 'Courses' }] },
  checked: { type: Boolean, default: false }
}, {
timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
}
```

### Courses:
```
name: {type: String, require: true}
description: {type: String}
category: {type: String, enum: ['Desarrollo web', *por hacer*], required: true],
lessons: {type: String, enum: [
	{
		name: {type: String, require: true}
		description: {type: String}
		url: {type: String, require: true}
	}
], required: true}
timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
```

## Backlog

- Connect API of Facebook
- Upload profile image
- Search form about courses
- Payment with PayPal or Stripe
- Recommended courses 
- Footer with about us page
- Rating about courses
- Role studend and teacher (Teacher can create courses, obviously xD)
- Order and filter by category
- Order by price
- Create fauvorites
- Certificate when the course is finished



## Links

### Trello

[Project #2](https://trello.com/b/1HlmzB2H/ih-project-2)

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/laurarojeda/ironhack-project-2)

[Deploy Link](http://heroku.com)

### Slides.com

The url to your presentation slides

[Slides Link](http://slides.com)
