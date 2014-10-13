var _ = require("lodash");
var async = require("async");
var Stream = require([__dirname, "stream"].join("/"));
var datasource = require([__dirname, "datasource"].join("/"));

module.exports = {

    getQuotes: function(symbols, options, fn){
        var self = this;

        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = null;
        }

        if(!_.isArray(symbols))
            symbols = [symbols];

        var quotes = {};
        async.each(symbols, function(symbol, cb){
            datasource[self.datasource].request(symbol, function(err, data){
                if(err)
                    data = null;
                else{
                    data = datasource[self.datasource].parse(data);
                    if(!_.isNull(options) && _.has(options, "filter"))
                        data = _.pick(data, options.filter);
                }

                quotes[symbol] = data;
                cb();
            });
        }, function(err){
            fn(quotes);
        });
    },

    streamQuotes: function(symbols, options, fn){
        if(_.isFunction(options) && _.isUndefined(fn)){
            fn = options;
            options = {};
        }

        options = _.defaults(options, {
            interval: 1000
        });

        if(!_.isArray(symbols))
            symbols = [symbols];

        var stream = new Stream(symbols);
        stream.start(this.datasource, options);
        fn(stream);
    }
}
