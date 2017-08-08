module.exports = {

    shorten: function (req, res, next) {
        var URL = req.params.URL;
        var db = req.app.get('db');


        //polyfill for String.prototype.startsWith
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function(searchString, position){
              return this.substr(position || 0, searchString.length) === searchString;
            };
        }


        if(URL.startsWith('http://') || URL.startsWith('https://')) {

            //run insertURLLinks.sql from db folder
            db.insertURLLinks([URL])
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
            return res.status(200).send({
                error: 'wrong url format, make sure you have a valid protocol and real site'
            });
        }

    }

}
