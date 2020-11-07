# LCFC - Leicester City - API REST

## API Rest created with TypeScript, NodeJS, Express, MongoDB make to get information about The Leicester City "Foxes"

## How to use in Local

    Clone this repo on your PC
    Go to your terminal and search the folder
    Run `$npm install` to install all dependencies.
    Make you sure mongodb is running.
    Run `$npm run dev` to start a dev server
    1. The command run a scraper to get all information from an external API and save all to a database called test
    2. The command run the server.
    3. You are ready yo make request with a POSTMAN or INSOMNIA REST

## Or you can use this url

    The server is hosted on heroku

---

## Auth Routes

Routes to authenticate an user and get authtoken to make private request.

**POST**: **_`api/auth/signup`_**

    this route receives a body on json. An object with the followings values.
    {
        "username": "example"
        "email": "example@example.com"
        "password": "password123"
    }
    and response with an authtoken in the headers

**POST**: **_`api/auth/signin`_**

    this route receives a body on json. An object with the followings values.
    {
        "email": "example@example.com"
        "password": "password123"
    }
    if the email and password are valid, response with an authtoken in the headers

---

## Match Routes

Private routes to get information about Leicester City. **_You need to be authenticate_**.

**GET**: **_`api/match/last`_**

    this route response with the last Match of Leicester City.

**GET**: **_`api/match/betteropponent`_**

    This route responds with the data of the team that scored the most goals against Leicester City

**GET**: **_`api/match/points`_**

    This route needs two queries "from" and "to" the values from this queries have to be timestamps.
    if you want to get the points of Leicester City between "2020/8/15" and "2020/11/5"
    you have to sent to the api the following queries.
    "api/auth/points?from=1597460400000&to=1604545200000"

**POST**: **_`api/match/create`_**

    To create a new Match and save in the database, you need to send a body request in json to this route with the following values.
    {
        "date": "1604718000000", // Timestamp for "2020/11/7"
        "result: {
            "equip1": 2, // score
            "equip2": 1
        }
    }

**GET**: **_`api/match/search/:id?`_**

    With this endpoint you can search by id, passing an id as param, like this:
    'api/match/search/51651c65648c98494'

    but you can use this same endpoint to search by date using a query, like this:
    'api/match/search?from=1597460400000' // search a match with date "2020/8/15"

    or you can get an array of matches between diferent dates, like this:
    'api/match/search?from=1597460400000&to=1604545200000' // response with an array of matches between "2020/8/15" and "2020/11/5"

### Technologies

-   [bcryptjs](https://www.npmjs.com/package/bcryptjs)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [express](https://expressjs.com/)
-   [jsonwebtoken](https://jwt.io/)
-   [mongoose](https://mongoosejs.com/)
-   [morgan](https://www.npmjs.com/package/morgan)
-   [node-fetch](https://www.npmjs.com/package/node-fetch)
-   [concurrently](https://www.npmjs.com/package/concurrently)
-   [nodemon](https://nodemon.io/)
-   [ts-node](https://www.npmjs.com/package/ts-node)
-   [typescript](https://www.typescriptlang.org/)
