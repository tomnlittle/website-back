# Nodejs Backend

Nodejs backend for managing and demonstrating my projects. Features currently implemeneted include:
- DeepMindAI - Processing of images
- Google Maps, Place Services, autocomplete lookup
- Middleware and Express Routing
- Winston Loggin 

### Todos
 - Write Tests
 - Auth - with express-session, passport and redis
 - Docker integration
 - PostgreSQL integration and database management for users 

### New Features!
  - Soon...

### Tech
Made possible due to the great work by:

* [Google](https://github.com/google) -google map services
* [node.js](https://nodejs.org/) - evented I/O for the backend
* [Express](https://expressjs.com) - fast node.js network app framework [@tjholowaychuk]
* [PassPort](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
* [Redis](https://redis.io/) - In-memory data structures
* [Momentjs](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.
* [Request](https://github.com/request/request) - Http requests
* [Q](https://github.com/kriskowal/q) - Promise library for javascript
* [Winston](https://github.com/winstonjs/winston) - A logger for just about anything
* [DeepAI](https://deepai.org/machine-learning-model/deepdream) - API for accessing Google's Deep Mind API

### Installation

Requires [Node.js](https://nodejs.org/) v8+ to run. Although untested it may run on earlier versions just fine.

1. `npm install`
2. You will need to setup the config file see below for details 
3. Start the server with either:
    - Development Standard: `npm start`
    - Development Auto-reload: `npm run dev`
    - Production: `npm run serve`

#### Config File
Below is a template for the config json, the filename should be config.json and placed in the root directory of the application. For the DeepAI API key please see [DeepAI](https://deepai.org/) and see the [Google Console](https://console.cloud.google.com) for details.
~~~
{
    "GOOGLE": {
        "TEST" : {
            "MAPS" : ""
        }, 
        
        "LIVE" : {
            "MAPS" : ""
        }
    },

    "DEEP_AI" : {
        "KEY": ""
    }
}
~~~
### Docker
--- Still to come

License
----

MIT


