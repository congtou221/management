#!/bin/bash
webpack --config webpack.dev.config.js && NODE_ENV='local' PORT='3000' supervisor -w server -e node,js,html server/http.js