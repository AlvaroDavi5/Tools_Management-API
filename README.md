
# UNID Challenge Backend


## Install dependencies
To install the dependencies, run the following command:  
```sh
# after install Yarn package manager
yarn install
```
---
<br>

## How run the application in container
To create and run the application in `Docker` containers, run the following command on the root of the project:  
```sh
# after install Docker and Docker Compose
docker-compose up -d
```
___
<br>

## How to start the application
To start the application, run the following command:  
```sh
# after install Sequelize
yarn run db_config
# after install Node.js
node src/app.js
```
___
<br>

### Technologies
 - [Node.js](https://nodejs.org/)
 - [Express.js](https://expressjs.com/)
 - [PostgreSQL](https://www.postgresql.org/)
 - [Sequelize ORM](https://sequelize.org/)
 - [JWT](https://jwt.io/)
 - [Docker](https://www.docker.com/)
 - [Docker Compose](https://docs.docker.com/compose/)
 - [API Blueprint](https://apiblueprint.org/)


---

#### TODO

- [x] Database
- [x] Models
- [x] Migrations
- [x] Seeders
- [x] User Controllers
- [x] Tools Controllers
- [x] API
  - [x] HTTP Status Codes
	- [x] REST Architecture
- [x] API Routes
- [x] API Documentation (Blueprint)
- [x] JWT/OAuth Authentication
- [x] Database Containerization
- [x] API Containerization
