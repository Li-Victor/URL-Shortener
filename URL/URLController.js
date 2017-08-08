module.exports = {

    shorten: function (req, res, next) {
        var URL = req.params.URL;

        //regex from https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
        var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

        if(URL.match(regex)) {

            var db = req.app.get('db');
            //run insertURLLinks.sql from db folder
            db.insertURLLink([URL])
                .then((arr) => {
                    return res.status(200).send({
                        original_url: URL,
                        short_url: 'http://localhost:3000/' + arr[0].id
                    });

                })
                .catch((err) => {
                    return res.status(404).send({
                        error: err
                    });
                });

            //Another way to insert
            // db.urllinks.insert({
            //     link: URL
            // }).then(urls => {
            //     return res.status(200).send(urls)
            // }).catch((err) => {
            //     return res.status(404).send({
            //         error: err
            //     })
            // });

        } else {
            return res.status(404).send({
                error: 'wrong url format, make sure you have a valid protocol and real site'
            });
        }

    },

    redirectURL: function (req, res, next) {
        var paramsID = Number(req.params.id);
        if(paramsID) {

            var db = req.app.get('db');
            db.getURL([paramsID])
                .then((arr) => {

                    //checks to see if id is in the database
                    //if arr is empty, then the id is not in the database
                    if(arr.length > 0) {
                        return res.status(200).redirect(arr[0].link);
                    } else {
                        return res.status(404).send({
                            error: 'This url is not on the database'
                        });
                    }

                })
                .catch((err) => {
                    return res.status(404).send({
                        error: err
                    });
                });

        } else {
            return res.status(404).send({
                error: 'This url is not on the database'
            });
        }
    }

}
