var request = require("request");

var api = {
    base_url: "http://query.yahooapis.com/v1/public/yql",
    query: function(symbol){
        return encodeURIComponent(["select * from yahoo.finance.quotes where symbol in (", symbol, ")"].join('"'));
    },
    env: encodeURIComponent("http://datatables.org/alltables.env"),
    format: "json",
    generate: function(symbol){
        return [this.base_url, "?q=", this.query(symbol), "&env=",this.env, "&format=", this.format].join("");
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
                    if(body.query.results.quote.ErrorIndicationreturnedforsymbolchangedinvalid)
                        fn(new Error("Could not fetch quote"));
                    else
                        fn(null, body);
                }
                catch(e){
                    fn(e);
                }
            }
        });
    },

    parse: function(data){
        return data['query']['results']['quote'];
    }

}
