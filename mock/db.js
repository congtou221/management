// mock/db.js

const faker = require('faker')

module.exports = function() {
    let data = {
        "posts": [
            [ '1', '并购', '600462', '2017/06/27', '预案' ],
            [ '2', '增减持', '603227', '2017/06/26', '计划' ]
        ],
        "comments": [
            { "id": 1, "body": "some comment", "postId": 1 }
        ],
        "profile": { "name": "typicode" }
    }


    return data
}
