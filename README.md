



# Plan It
![android-chrome-192x192](https://user-images.githubusercontent.com/113474295/226087227-a2f23b12-8470-4c57-886e-5312d8b7e5a8.png)

A web application for event planners who want to organize, plan, and schedule events, invite guests, and set tasks within the event.

## Why I Built This

As an individual that loves planning and scheduling things ahead of time and getting organized, I wanted to build an application that would make it easy to organize events and keep track of all details in a simple, organized manner. Rather than using a group chat that can get cluttered with messages and irrelevant information, I wanted a brief overview of all details of an event.

Inspired by my good friend, Ryan, who helped me think of the practical need for this idea through his engagement party where he was sending information in 5 group chats across 40 people to keep track of directions, location, and time.

## Live Demo

https://plan-it.herokuapp.com/

## Preview

https://user-images.githubusercontent.com/113474295/224580667-273dbb8a-b1b7-4609-a030-bf32dd457347.mp4

## Technologies Used

- React
- Node
- Express
- PostgreSQL
- HTML
- JavaScript
- CSS
- Tailwind
- [Google Maps API](https://developers.google.com/maps)
- [React DateTime NPM](https://www.npmjs.com/package/react-datetime)
- [Twilio API](https://www.twilio.com/docs)

## Features

- User can create an event
- User can choose a date and time using react datetime
- User can add a location with Google Maps API
- User can upload an image and view a preview of it
- User can view event details and all events created
- User can create task items for their event
- User can invite guests and send an SMS message

### System Requirements

- Node.js 14 or higher
- NPM 6 or higher
- PostgreSQL 13 or higer

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/matt-cha/plan-it
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install --legacy-peer-deps
    ```

1. Import the database to PostgreSQL.

    ```shell
    createdb planIt
    sudo service postgresql start
    pgweb --db=planIt
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
