import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-server';

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p,  --port <number>', 'port to run the server on', '4007')
    .action((filename = 'document.js', options: {port: string}) => {
        const directory = path.join(process.cwd(), path.dirname(filename));
        
        serve(path.basename(filename), directory, parseInt(options.port));
    });