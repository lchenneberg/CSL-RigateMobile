// Set the require.js configuration for your application.
require.config({
  
  paths: {
    // libs
    jquery:      '../assets/js/libs/jquery-1.7.2',
    underscore: '../assets/js/libs/underscore-1.3.1',
    backbone:   '../assets/js/libs/backbone-0.9.2',
    energize:   '../assets/js/libs/energize',
    text:       '../assets/js/plugins/text-1.0.7',
    order:      '../assets/js/plugins/order-1.0.5',
    tokenFix:   '../app/core/token_fix',
    //cordova:   '../assets/js/libs/cordova-1.7.0',

    // helpers
    core:       'core/'
  }
});

require(['app']);
