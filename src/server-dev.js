var express = require("express"),
    MjpgStreamer = require("./lib/MStreamer");

var server = express();
server.use(express.static(__dirname + '/public'));


server.listen(8080);



