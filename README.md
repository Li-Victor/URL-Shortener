# URL-Shortener

Users can pass a URL as a parameter and will receive a shortened URL in the JSON response.

If the user passes an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

When the user visits the shortened URL, it will redirect them to the original link.

Made with Express.js and Heroku Postgres Datebase.

## Installation
Make sure you have signed up for a free account at [**Heroku**](https://www.heroku.com/) and the following installed:
* NodeJS
* [**Postgres**](https://www.postgresql.org/download/)
* [**Heroku Client**](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) for your terminal

Click on `Create New App` button on the dashboard. Then, specify a name (or leave blank and Heroku will generate a name for you) and click `Create App`.

At this point, you should be in the dashboard of your project. There will either be `Resources` tab or an `icon of three horizontal lines`, depending on your window size. Click on it and you should be in the next screen.

On this screen, type `postgres` in the `Add-ons` search field and select `Heroku Postgres`. Select the `Hobby Dev - Free` option.

Select the `Heroku Postgress :: Datebase` add-on from the list. On the database page, click on the `View Credentials` button. You will then be presented with the credentials to your very own Postgres datebase!

With your terminal open, run the command that is labeled `Heroku CLI`. It should be start with a `heroku pg:sql`. Copy and execute the query in [**createTable.sql**](https://github.com/Li-Victor/URL-Shortener/blob/master/createTable.sql).

Create a new file called secret.js on the root directory of this project, copy the URI labeled `URI` on the Database Credentials.
Inside of secret.js:
```javascript
module.exports = {
    connectionString: YOUR URI TO DATABASE IN QUOTES + '?ssl=true'
}

```

With everything setup, run `npm install` and then `npm start`