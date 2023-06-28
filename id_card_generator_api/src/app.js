import yargs from 'yargs';

import {bootstrap} from './cli';

yargs.strict().command(
    'runserver [port] [host]',
    'Run server',
    (setup) => {
      setup
          .positional('port', {type: 'number', describe: 'Port', default: 8000})
          .positional('host', {
            type: 'string',
            describe: 'Host',
            default: '127.0.0.1',
          });
    },
    async (args) => {
      await bootstrap(Number(args.port), args.host);
    },
).argv;
