import * as shell from 'shelljs';

function rd(path: string) {
    if (shell.test('-e', path)) {
        const correctedPath = path.replace(/\//g, '\\');
        const cmd = `rd ${correctedPath} /S/Q`;
        // shell.echo(cmd);
        shell.exec(cmd, { silent: true });
    } else {
        shell.echo(`Path not found: '${path}'`);
    }
}

rd('dist/public/stylesheets');
shell.cp('-r', 'src/public/stylesheets', 'dist/public/stylesheets');
rd('dist/views');
shell.cp('-r', 'src/views', 'dist/views');
