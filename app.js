/*****************************************************************************
* Project: Dummy_WebService v1.0.0
* Description: This file serves as the main entry point for an application
* that serves static JSON responses. Mainly to be used for local testing.
******************************************************************************/
'use strict';

let _ = require('lodash'),
    Express = require('express'),
    fs = require('fs');

//initialize the web service
function Initialize() {
    let app = new Express(),
        config = JSON.parse(fs.readFileSync("config.json"));
    
    //bind default headers to root path
    app.use('/', _.partial(SetHeaders, config.express.headers));
    
    //register all service routes
    _.each(config.routes, function(r) {
       app.use(r.uri, _.partial(ServeRoute, {path: r.path}));    
    });

    app.listen(config.express.port);
    console.log(`The service is now listening on port: ${config.express.port}...`);
}

//apply server headers to all incoming requests
function SetHeaders(headers, req, res, next) {
    _.each(headers, h => res.set(h.name, h.value));
    next();
}

//use provided route to identify JSON file to read and return
function ServeRoute(options, req, res) {
    let method = req.method,
        id = (req.params && req.params.id) ? req.params.id : null,
        targetPath = "./files/" + options.path + "/" + ((id == null) ? "" : "/" + id) + "/" + req.method + "/f.json",
        json = JSON.parse(fs.readFileSync(targetPath));
    
    res.status(json.status).json(json.body);
}

Initialize();