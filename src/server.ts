'use strict';
import Hapi from '@hapi/hapi';
import { Connection } from 'typeorm';

const init = async (connection :Connection) => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

export default {
    init
}