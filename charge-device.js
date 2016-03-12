var five = require("johnny-five");
var Firebase = require("firebase");

var assetsRef = new Firebase("https://myjarvis.firebaseio.com/assets/");

var isOn = false;

var board = new five.Board();

board.once('ready', function() {

  var ee1_led13 = new five.Led(13);

  assetsRef.child('EE1').child('batteryStatus').on("value", function(snapshot) {
    var ee1BatteryLevel = snapshot.child('level').val();
    var isDocked = snapshot.child('isDocked').val();
    isOn = (isDocked && ee1BatteryLevel<=20) ? true : false;
    isOn ? ee1_led13.on() : ee1_led13.off();
    console.log('At End ' + isOn);
  });

  this.repl.inject({
    led: ee1_led13
  });
});
