# MERN Stack Development
Full stack development with DevOps, Backend, and Front-end using docker container, Node.js, Express.js, MongoDB, and React.js.

## Setup Guide
* git clone https://github.com/Khachornchit/mern-stack-development
* cd mern-stack-development
* docker-compose build
* docker-compose up -d
* frontend URL http://localhost:8081/
* backend URL http://localhost:8082/

## DevOps
The directory layout

```bash
├── api
├── dashboard
├── docker-compose.yml
└── README.md
```

## Backend
* Use Node.js, Express.js, and MongoDB
* Endpoint      : http://localhost:8082/api
* RESTful API CRUD for Scan Result data
    * POST http://localhost:8082/api/scanresults
    * GET http://localhost:8082/api/scanresults
    * GET http://localhost:8082/api/scanresults/{id}
    * PUT http://localhost:8082/api/scanresults/{id}
    * DELETE http://localhost:8082/api/scanresults/{id}

## Frontend
* Use ReactJS and React Bootstrap framework
* Frontend URL http://localhost:8081/