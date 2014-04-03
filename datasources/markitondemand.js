var request = require("request");

var api = {
    base_url: "http://dev.markitondemand.com/Api/v2/Quote/json",
    generate: function(symbol){
        return [this.base_url, "?symbol=", symbol].join("");
    }
}

module.exports = {

    request: function(symbol, fn){
        var options = {
            uri: api.generate(symbol),
            method: "GET"
        }
        request(options, function(err, res){
            if(err)
                fn(err);
            else if(res.statusCode != 200){
                fn(new Error(["Received non 200 status code", res.statusCode].join(" ")));
            }
            else{
                try{
                    body = JSON.parse(res.body);
                    fn(null, body);
                }
                catch(e){
                    fn(e);
                }
            }
        });
    },

    parse: function(data){
        return data;
    }

}
