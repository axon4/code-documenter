import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-server';

const isInProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
    .command('serve [filename]')
    .description('open a file for editing')
    .option('-p,  --port <number>', 'port to run the server on', '4007')
    .action(async (filename = 'document.js', { port }: {port: string}) => {
        try {
            const directory = path.join(process.cwd(), path.dirname(filename));

            await serve(path.basename(filename), directory, parseInt(port), !isInProduction);
            console.log(`opened ${filename}. navigate to http://localhost:${port} to edit the file.`)
        } catch (error: any) {
            switch (error.code) {
                case 'EADDRINUSE':
                    console.log(`port ${port} is already in use. please try another port.`);

                    break;
                default:
                    console.log(error.message);

                    break;
            };

            process.exit(1);
        };
    });