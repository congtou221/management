// mock/db.js
'use strict'
const faker = require('faker')

module.exports = function() {
    let data = {
        "posts": [
            { "id": 1, "title": "json-server", "author": "typicode" }
        ],
        "comments": [
            { "id": 1, "body": "some comment", "postId": 1 }
        ],
        "profile": { "name": "typicode" }
    }

    
    return data
}