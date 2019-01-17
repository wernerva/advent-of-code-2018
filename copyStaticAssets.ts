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

rd('dist/lib/input');
shell.cp('-r', 'src/lib/input', 'dist/lib/input');
rd('dist/public');
shell.cp('-r', 'src/public', 'dist/public');
rd('dist/views');
shell.cp('-r', 'src/views', 'dist/views');
