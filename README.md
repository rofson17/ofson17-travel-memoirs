
## Travel Memoirs

Travel Blog shearing website using mearn stack.


## Features

- Upload, edit , like and delete post
- Sing in, sing up  and sing in using google accont
- Pagination and search posts


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRECT_KEY`
`DATABASE_URL`


## Installation

Setup the `environment variable` and add google client id in 
`client/src/auth/index.js`

Set up loacal environment

**server**
```bash
  cd server 
  npm install
```
**client**
```bash
    cd client 
    npm install
```
## Run
**server** 
```bash
    npm run dev
```
Server will run on port [5000](http://localhost:5000)

**client**
```bash
    npm start
```
Client will run on port [3000](http://loacalhost:3000)
