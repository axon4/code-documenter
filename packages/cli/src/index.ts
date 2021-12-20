import { program as programme } from 'commander';
import { serveCommand } from './commands/serve';

programme
    .addCommand(serveCommand);

programme.parse(process.argv);