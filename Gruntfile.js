'use strict';

module.exports = function(grunt) {

grunt.initConfig({
	nodemon: {
		dev: {
			script: 'src/server.js'
		}
	}
});


/** TODO **/

// -* Legg til less -> css
// -* Legg til minifisering .js -> .min.js
// -* Auto reload av browser
// -* ulike tasks for test og prod



grunt.loadNpmTasks('grunt-nodemon');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['nodemon','watch'])


};