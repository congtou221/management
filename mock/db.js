// mock/db.js

const faker = require('faker')

module.exports = function() {
    let data = {
        "posts": [
          [ '1', '当日完成进展', '计划完成时间', '问题和建议解决方案' ],
          [ '2', '调通了react-redux状态管理流程、熟悉json-server  API', '', '' ]
        ],
        "comments": [
            { "id": 1, "body": "some comment", "postId": 1 }
        ],
        "profile": { "name": "typicode" }
    }


    return data
}

