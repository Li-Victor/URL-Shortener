module.exports = function URLModel(URL) {

    //polyfill for startsWith
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
          return this.substr(position || 0, searchString.length) === searchString;
        };
    }


    if(URL.startsWith('http://') || URL.startsWith('https://')) {

        
        return {
            original_url: 'original_url',
            short_url: 'short_url'
        };
    }

    return {
        error: 'Wrong url format, make sure you have a valid protocol and real site'
    }
};
