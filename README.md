# School API 🏫
A simple REST API for data consumption.

To run the project make sure you have MySQL/MariaDB installed and copy the .env.example file to .env.

You'll also need to add a secret key to the .env file:
TOKEN_SECRET='your_secret_key_here'

After adding all environment variables, run the following commands:

```bash
npm i # install all packages
npx sequelize db:migrate # create database metadata e.g. drop/create tables
npx sequelize db:seed:all # insert initial dummy data
npm run dev
```

At this point, your API should be running at http://127.0.0.1:3001/.

To test the api, you can send a request to the `/tokens` endpoint, with a body like this:
```json
{
    "email": "tombraider@gmail.com",
    "password": "Lara1#"
}
```
You should get a response with a jwt token, now you just need to set the Authorization header:
`Authorization: Bearer ${token}`

## :memo: License
This project is licensed under the MIT license. See the [LICENSE](./LICENSE.md) file for more details.
