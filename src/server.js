var express = require("express"),
    MjpgStreamer = require("./lib/MStreamer");

var server = express();
server.use(express.static(__dirname + '/public'));

var mjpgStreamer = new MjpgStreamer()
    .setFps(60)
    .setResolution("720p")
    .start();

// Stop mjpg-streamer on exit
process.on('SIGINT', function() {
    mjpgStreamer.stop();
    process.exit();
});

server.listen(8080);



