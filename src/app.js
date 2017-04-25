import $ from 'jquery';

const router = require('./router.js');

$("document").ready(function(){
    router.start();
    $.ajax({
        url: 'api/posts'
    })
});
