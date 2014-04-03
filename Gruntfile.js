'use strict';

module.exports = function(grunt) {

grunt.initConfig({
    concurrent: {
        dev: ['watch', 'nodemon:dev']
    },
	nodemon: {
		prod: {
			script: 'src/server.js'
		},
        dev: {
            script: 'src/server-dev.js'
        }
	},
    less : {
        prod: {
            options: {
                compress : true
            },
            files: {
                'src/public/css/main.css' : 'src/assets/less/main.less'
            }
        },
        dev: {
            options: {
                compress: false
            },
            files: {
                "src/public/css/main.css" : "src/assets/less/main.less"
            }
        }
    },
    watch: {
        options : {
            livereload : 35729
        },
        files: "src/assets/less/*.less",
        tasks: ["less:dev"]
    }
});


/** TODO **/

// -* Legg til minifisering .js -> .min.js
// -* Auto reload av browser
// -* ulike tasks for test og prod



grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-concurrent');

grunt.registerTask('default', ['concurrent:dev'])


};