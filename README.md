# COMP3123 Assignment 1 — User & Employee REST API

**Student:** Sofiia Beliak  
**Student ID:** 101469384  
**Course:** COMP3123 – Full-Stack Development

---

## Overview
Simple REST API built with **Node.js + Express** using **MongoDB** (Docker) and **Mongoose**.

### Tech
- Express, Mongoose, bcryptjs, express-validator, cors, dotenv, morgan
- Nodemon for dev

## Setup
- npm install
- Create a .env in the root
- run the bash
- Mongo conected

## API endpoits
User
POST /api/v1/user/signup → Register
POST /api/v1/user/login → Login

Employees
POST /api/v1/emp/employees → Add employee
GET /api/v1/emp/employees → List employees
GET /api/v1/emp/employees/:id → Get by ID
PUT /api/v1/emp/employees/:id → Update
DELETE /api/v1/emp/employees?eid=:id → Delete

## Testing:
All endpoints tested in Postman with screenshots attached:
User signup/login 
Employee create/get/update/delete 
MongoDB documents visible in mongosh