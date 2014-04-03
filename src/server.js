var express = require("express"),
    MjpgStreamer = require("./lib/MStreamer");

var server = express();
console.log(__dirname);
server.use(express.static(__dirname + "/public"));

var mjpgStreamer = new MjpgStreamer();
mjpgStreamer.setFps(60)
mjpgStreamer.setResolution("720p")
mjpgStreamer.start();

// Stop mjpg-streamer on exit
process.on('SIGINT', function() {
    mjpgStreamer.stop();
    process.exit();
});

server.listen(8080);



