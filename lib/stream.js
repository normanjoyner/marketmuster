var _ = require("lodash");
var events = require("events");
var datasource = require([__dirname, "datasource"].join("/"));

function Stream(symbols){
    this.symbols = symbols;
    events.EventEmitter.call(this);
}

Stream.super_ = events.EventEmitter;
Stream.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: Stream,
        enumerable: false
    }
});

Stream.prototype.start = function(ds, options){
    var self = this;
    _.each(self.symbols, function(symbol){
        self.intervals[symbol] = setInterval(function(){
            datasource[ds].request(symbol, function(err, data){
                if(err)
                    data = null;
                else{
                    data = datasource[ds].parse(data);
                    if(!_.isNull(options) && _.has(options, "filter"))
                        data = _.pick(data, options.filter);
                }
                self.emit(symbol, data);
            });
        }, options.interval);
    });
}

Stream.prototype.intervals = {};

Stream.prototype.end = function(){
    var self = this;
    _.each(self.symbols, function(symbol){
        clearTimeout(self.intervals[symbol]);
    });
}

module.exports = Stream;
