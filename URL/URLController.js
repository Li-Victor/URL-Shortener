var URLModel = require('./URLModel');

module.exports = {

    shorten: function (req, res, next) {
        var URL = req.params.URL;
        var URLObject = URLModel(URL);

        return res.status(200).send(URLObject);

    }

}
