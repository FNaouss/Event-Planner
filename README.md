# event-planner

event planner is a MERN app for listing upcoming events.

## Overview

![alt overview](https://github.com/FNaouss/Event-Planner/blob/main/overview.JPG)

## Description

This event planner was built by FARDOUS Nacer Eddine with MERN stack and third party API's. This web app enable three different implementations:

1. Admin browses the listed events and organizers
2. Admin manages adding and editing events and organizer
3. Admin manages and controls deleting events and organizers
4. Not done yet : Client Interface

- Features:
  - Node provides the backend environment for this application
  - Express middleware is used to handle requests, routes
  - Mongoose schemas to model the application data
  - React for displaying UI components

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install event-planner.

```bash
$ git clone https://github.com/FNaouss/Event-Planner.git
$ cd project
$ npm install
```

## Setup

```
 Create .env file that include and replace the variables below by your own config:
  * MONGODB_URI=mongodb://localhost:${listening_port}/{$DB_name}
```

## Start development

```
$ npm run dev
```

## Simple build for production

```
$ npm run build
```

## Run build for production

```
$ npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Languages & tools

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [Mongoose](https://mongoosejs.com/)
- [FullCalendar](fullcalendar.io/)
- [Axios](https://axios-http.com/)
- [TailwindCSS](tailwindcss.com/)
- [HeadlessUI](https://headlessui.dev/)
- [Heroicons](https://heroicons.com/)
- [Sweet Alert](https://sweetalert.js.org/)
- [Multer]()

## Todo

- [x] Build Admin Interface
  - [x] Add events CRUD
  - [x] Add organizers CRUD
  - [x] Assign roles
- [ ] Build Client Interface
- [x] Implement "Favourite/Liked events" (test on Admin Interface)
- [ ] Apply sessions
  - [x] Sign up and Sign in
  - [ ] Pass token
  - [ ] Identify logged in user (whether it's admin or client)
- [ ] Contact the admin via a whatsapp form using WHATSAPP CLOUD API

## License

[MIT](https://choosealicense.com/licenses/mit/)
