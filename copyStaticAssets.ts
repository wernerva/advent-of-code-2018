import * as shell from 'shelljs';

shell.mkdir('-p', 'dist/public');
shell.cp('-r', 'src/public/stylesheets', 'dist/public/stylesheets');
shell.cp('-r', 'src/views', 'dist/views');
