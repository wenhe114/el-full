const shell = require('shelljs');
shell.rm('-rf', './demo');
shell.mkdir('-p','./demo');
shell.cp("-Rf",'./example/*','./demo')