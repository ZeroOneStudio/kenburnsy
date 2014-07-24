module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON("kenburnsy.jquery.json"),

    // Banner definitions
    meta: {
      banner: "/*\n" +
        " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
        " *  <%= pkg.description %>\n" +
        " *  <%= pkg.homepage %>\n" +
        " *\n" +
        " *  Made by <%= pkg.author.name %>\n" +
        " *  Under <%= pkg.licenses[0].type %> License\n" +
        " */\n"
    },

    // Concat definitions
    concat: {
      dist_js: {
        src: ["src/jquery.kenburnsy.js"],
        dest: "dist/jquery.kenburnsy.js"
      },
      dist_css: {
        src: ["src/jquery.kenburnsy.css"],
        dest: "dist/jquery.kenburnsy.css"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    },

    // Lint definitions
    jshint: {
      files: ["src/jquery.kenburnsy.js"],
      options: {
        "boss": true,
        "curly": true,
        "eqeqeq": true,
        "eqnull": true,
        "expr": true,
        "immed": true,
        "noarg": true,
        "onevar": true,
        "quotmark": "single",
        "smarttabs": true,
        "trailing": true,
        "unused": true,
        "node": true
      }
    },

    // Minify definitions
    uglify: {
      my_target: {
        src: ["dist/jquery.kenburnsy.js"],
        dest: "dist/jquery.kenburnsy.min.js"
      },
      options: {
        banner: "<%= meta.banner %>"
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-coffee");

  grunt.registerTask("default", ["jshint", "concat", "uglify"]);
  grunt.registerTask("travis", ["jshint"]);

};
