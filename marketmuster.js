var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var api = require([__dirname, "lib", "api"].join("/"));

function MarketMuster(){
    var self = this;
    _.each(api, function(method, name){
        self[name] = method;
    });

    this.datasource = "yahoo"
}

MarketMuster.prototype.config = function(config){
    this.datasource = config.datasource;
}

module.exports = MarketMuster;
