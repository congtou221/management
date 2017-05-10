import $ from 'jquery';

const router = require('./router.js');

$("document").ready(function(){
    router.start();
});

// if(module.hot) {
//     module.hot.accept();
// }
