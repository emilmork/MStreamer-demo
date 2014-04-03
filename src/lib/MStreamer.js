
var spawn = require('child_process').spawn;
var fs = require('fs');
var request = require('request');

var isCapturing = false;
var process;

//default options
var options = {
    device : '/dev/video0',
    resolution : 'SVGA',
    framerate : 15,
    port : 8090,
    fileFolder : '/usr/local/mjpg-streamer/'
  };

var cmd = options.fileFolder + "mjpg_streamer";
//Constructor
var MStreamer = function(args){
	if(args) {
		this.setOptions(args);
	}
};

// Returns mjpeg-streamer arguments
var getArgs = function() {
	return [ '-i' ,
              options.fileFolder +'input_uvc.so -r ' + options.resolution + ' -f ' + options.framerate,
              '-o',
              options.fileFolder + 'output_http.so -p ' + options.port + ' -w ./www'
            ];
};

// Set resolution
MStreamer.prototype.setResolution = function(resolution) {
    switch (resolution) {
        case "480p" :
            options.resolution = "640×480";
            break;
        case "720p":
            options.resolution = "1280x720";
            break;
        case "1080p" :
            options.resolution = "1920x1080";
            break;
    }
};

// Set fps
MStreamer.prototype.setFps = function(fps) {
    options.framerate = fps;
}


//Set mjpeg-streamer options
MStreamer.prototype.setOptions = function(args) {
	for(var key in args) {
		if(args.hasOwnProperty(key)) {
			if(!options.hasOwnProperty(key)) {
				print(key + " is not a valid property");
				continue;
			}
			options[key] = args[key];
			print(key + " set to: " + args[key]);
		}
	}
};

// Take current image from mjpg-streamer and saves it to a folder
MStreamer.prototype.takeSnapshot = function(path, callback) {
    if (!isCapturing) return;

    fs.exists(path, function(exists) {
        // Create directory if it not exists
        if(!exists)fs.mkdirSync(path);

        var filename = path + '/snap'+ new Date().getTime() +'.jpg';

        request('http://localhost:' + options.port +'/?action=snapshot').pipe(fs.createWriteStream(filename));

        print("snapshot taken: " + filename);

        if(callback)callback(filename);
    });
};

// Start mjpeg-streamer process
MStreamer.prototype.start = function(callback) {
    var _this = this;

    console.log(getArgs());

	if(isCapturing) {
		console.log("already capturing");
		return;
	}

	fs.exists(options.device, function(exists) {
		if(!exists) {
			print("device location not found: " + options.device);
			return;
		}

		process = spawn(cmd, getArgs());
		isCapturing = true;

	    process.stdout.on('data', function (data) {
	    	print("stdout: " + data);
	    });
	  
	    process.stderr.on('data', function (data) {
	    	print("stderr: " + data);
	    });
	  
	    process.on('exit', function (code) {
            _this.stop();
	    	print('child process exited with code ' + code);
	    }); 

	    print("started streaming on port: " + options.port);
	});
};

// Stop mjpeg-streamer process
MStreamer.prototype.stop = function() {
	if(!isCapturing)  {
		print("not capturing");
		return;
	}
	process.kill(process.pid, 'SIGHUP');
	isCapturing = false;
	
	print("stopped");
};

var print = function(msg) {
	console.log(cmd + ": " + msg);
}

module.exports = MStreamer;
