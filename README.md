marketmuster
====================

##About

###Description
A simple nodejs library to gather stock data.

###Author
Norman Joyner - norman.joyner@gmail.com

##Getting Started

###Installation
```npm install marketmuster```

###Configuration
Simply require the marketmuster module, instantiate a new MarketMuster object, configure it if necessary, and start making calls.

The ```.config(options)``` method is optional. It is used to configure the datasource that marketmuster will pull from. Here is an example:
```javascript
var MarketMuster = require("marketmuster");
var marketmuster = new MarketMuster();

var options = {
    datasource: "markitondemand"
}

marketmuster.config(options);
```

The default datasource is the Yahoo Finance API.

###Supported APIs
* Yahoo Finance
* Markit On Demand

####Yahoo Finance API
The Yahoo Finance API is unauthenticated, so no additional configuration parameters are necessary. This is the default configured API, so no ```.config()``` call is needed. If you like to be explicit, you can use the following config object:
```javascript
var options = {
    datasource: "yahoo"
}
```
####Markit On Demand API
The Markit On Demand API is unauthenticated, so no additional configuration parameters are necessary. To interact with this API, you can use the following config object:
```javascript
var options = {
    datasource: "markitondemand"
}
```

###Examples
Printing a live TSLA quote using the Yahoo Finance API:
```javascript
var MarketMuster = require("marketmuster");
var marketmuster = new MarketMuster();

marketmuster.getQuotes("TSLA", function(quote){
    console.log(quote.TSLA);
});
```

Printing live TSLA / AAPL quotes using the Markit On Demand API:
```javascript
var MarketMuster = require("marketmuster");
var marketmuster = new MarketMuster();

marketmuster.config({
    datasource: "markitondemand"
});

marketmuster.getQuotes(["TSLA", "AAPL"], function(quote){
    console.log(quote.TSLA);
    console.log(quote.AAPL);
});
```
Printing a live TSLA quote using the Yahoo Finance API, returning only the Bid attribute:
```javascript
var MarketMuster = require("marketmuster");
var marketmuster = new MarketMuster();

marketmuster.getQuotes("TSLA", { filter: ["Bid"] }, function(quote){
    console.log(quote.TSLA);
});
```

Printing streaming TSLA / AAPL quotes using the Yahoo Finance API:
```javascript
var MarketMuster = require("marketmuster");
var marketmuster = new MarketMuster();

marketmuster.streamQuotes(["TSLA", "AAPL"], function(stream){
    stream.on("AAPL", function(quote){
        console.log(quote);
    });

    stream.on("TSLA", function(quote){
        console.log(quote);
    });
});
```
