# express-typescipt-knex-boilerplate

This is a boilerplate made thinking that you're going to build a REST api.

It's based on knowlage acquired during Rockseat's Next Level Web and influenced by my time using Django.

## Installation

~~~shell
git clone https://github.com/vinibiso/express-typescipt-knex-boilerplate.git
cd express-typescipt-knex-boilerplate
yarn
yarn knex:migrate
yarn knex:seed
yarn dev
~~~

## The stack

- **TypeScript**
- **Express.js** (Server)
- **Knex.js** (ORM) - Managing databases

Aside from that the project also includes the following packages:

- **Bcrypt** - for password encrypting
- **Celebrate/Joi** - for sever side data validation
- **CORS**
- **express-jwt** - for Json Web Token(JWT) validation
- **jsonwebtoken** - makes JWT tokens
- **Multer** - for handling image uploads
- **sqlite3** - database for development

## What you'll find

- Database connection and folder structure with migrations and seeds using Knex
- Preconfigured esling for typescript and express using the airbnb styleguide
- Basic user model with admin
- Basic REST CRUD for the user model
- Image upload example (User Avatar) - Pre-configured Multer
- Pre-configured JWT Authentication
- Pre-configured static file serving

## Folder Structure

## Disclaimer
