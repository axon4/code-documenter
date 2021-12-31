import path from 'path';
import { Command } from 'commander';
import { serve } from 'code-documenter-server';

export const serveCommand = new Command()
	.command('serve [fileName]')
	.description('open file for editing')
	.option('-p,  --port <number>', 'port to listen on with server', '4007')
	.action(async (fileName = 'document.js', { port }: {port: string}) => {
		try {
			const directory = path.join(process.cwd(), path.dirname(fileName));

			await serve(path.basename(fileName), directory, parseInt(port), process.env.NODE_ENV === 'development');

			console.log(`Code-Documenter: File '${fileName}' AvailAble to Edit on: http://localhost:${port}`);
		} catch (error: any) {
			switch (error.code) {
				case 'EADDRINUSE':
					console.log(`Code-Documenter: Port ${port} AlReady in Use`);

					break;

				default:
					console.error(error.message);

					break;
			};

			process.exit(1);
		};
	});