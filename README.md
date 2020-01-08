# Dummy Webservice

This Node.js web service implements routes dynamically (based on a config) to serve static JSON content. It is useful for testing applications that rely on other APIs.

## Source Code Layout

The following is a high-level overview of the repository:

* __app.js__ => Main executable for web server.

## Working with the Server

The following section will go over building, testing, and running the web server.

### Running the Server

The steps to build and run the web server are as follows:

* Install all dependencies.
``` npm run install ```
* Run the web server. This assumes that the working directory is the root of the repository.
``` node app.js ```

### The Configuration File

Below is a sample configuration file. There are Express (web server) parameters as well as the routes to listen on. Each route is specified by its URI as well as the file path within the repository to the static JSON file to serve.
```
{
    "express": {
        "port": 6000,
        "headers": [{"name": "Access-Control-Allow-Origin", "value": "*"}]
    },
    "routes": [
        {
            "uri": "/test/more",
            "path": "test/more"
        },
        {
            "uri": "/test/more/:id",
            "path": "/test/more"
        }
    ]
}

```

### Static Files

All static files should be in a directory called "files" at the root of the repository. Each file will be retrieved at:
* files/[path_from_config]/[request_method]/f.json => if there is no "id" parameter in the request.
* files/[path_from_config]/[request_id_param]/[request_method]/f.json => if there is an "id" parameter in the request.

Some sample file paths might look like:
```
files\test\more\POST\f.json
files\test\more\[ID]\GET\f.json
```

All static files have the same high-level JSON structure. There is a "status" parameter which is returned as the status for the response. There is a "body" parameter which contains the JSON body of the response. An example would be:
```
{
    "status": 200,
    "body": {
        "returnData": "Good Job!"
    }
}
```

## Authors

* **Josh Kimmel**