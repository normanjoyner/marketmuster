var _ = require("lodash");
var MarketMuster = require([__dirname, "marketmuster"].join("/"));
var pkg = require([__dirname, "package"].join("/"));

exports = module.exports = function(){
    var marketmuster = new MarketMuster();
    marketmuster.version = pkg.version;
    return marketmuster;
}
