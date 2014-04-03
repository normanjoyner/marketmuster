var fs = require("fs");
var _ = require("lodash");
var path = require("path");
var datasources = fs.readdirSync([__dirname, "..", "datasources"].join("/"));

_.each(datasources, function(datasource){
    if(/\.js$/.test(datasource)){
        datasource = path.basename(datasource, ".js");
        exports[datasource] = require([__dirname, "..", "datasources", datasource].join("/"));
    }
});
