/*global module*/

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-bump');

    // Project configuration.
    grunt.initConfig({
        nodeunit : ['test/**/*.js'],
        watch : {
            files : '<config:lint.files>',
            tasks : 'default timestamp'
        },
        jshint : {
            files : ['gruntFile.js', 'app.js', 'routes/*.js', 'test/**/*.js'],
            options : {
                curly : true,
                eqeqeq : true,
                immed : true,
                latedef : true,
                newcap : true,
                noarg : true,
                sub : true,
                undef : true,
                boss : true,
                eqnull : true,
                globals : {
                    require : false,
                    __dirname : false,
                    console : false,
                    module : false,
                    exports : false
                }
            }
        },
        bump : {
            options : {
                files : ["package.json"],
                commit : false,
                commitMessage : 'chore(release): v%VERSION%',
                commitFiles : ["package.json"],
                createTag : false,
                tagName : 'v%VERSION%',
                tagMessage : 'Version %VERSION%',
                push : false,
                pushTo : 'origin'
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit']);

    /**
     * The deploy task is to build, compile and update the version.
     */
    grunt.registerTask('deploy', ['bump']);

    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    grunt.registerTask('supervise', function() {
        this.async();
        require('supervisor').run(['app.js']);
    });
};