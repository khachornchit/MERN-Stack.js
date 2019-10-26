[![Build Status](https://travis-ci.org/khachornchit/MERN-stack.svg?branch=master)](https://travis-ci.org/khachornchit/MERN-Stack)

# MERN stack
It is a full stack development project using MERN stack consisting of MongoDB, Express.js, React.js, and Node.js. And using docker container.

## Technology Stack
* Node.js, Express.js
* React, React Boostrap
* MongoDB
* Docker

## Pre-requires
* Install [Docker](https://www.docker.com/)

## Getting started
* Clone the repository
```
git clone https://github.com/Khachornchit/mern-stack-development
```
* Build the project
```
cd mern-stack-development
docker-compose build
docker-compose up -d
```

## URLs
* [Frontend](http://localhost:8081/)
* [API Endpoint](http://localhost:8082/api)

## CRUD
```
POST /scanresults
GET /scanresults
GET /scanresults/{id}
PUT /scanresults/{id}
DELETE /scanresults/{id}
```

## DATA
```
{
    "status":"In Progress",
    "repositoryName":"Repository Name # 1",
    "findings":[
       {
          "type":"sast1",
          "ruleId":"G402",
          "location":{
             "path":"connectors/apigateway.go",
             "positions":{
                "begin":{
                   "line":60
                }
             }
          },
          "metadata":{
             "description":"TLS InsecureSkipVerify set true.",
             "severity":"HIGH"
          }
       },
       {
          "type":"sast",
          "ruleId":"G404",
          "location":{
             "path":"util/util.go",
             "positions":{
                "begin":{
                   "line":32
                }
             }
          },
          "metadata":{
             "description":"Use of weak random number generator (math/rand instead of crypto/rand)",
             "severity":"HIGH"
          }
       }
    ]
}
```
