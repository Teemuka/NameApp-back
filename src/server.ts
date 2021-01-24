'use strict';
import Hapi from '@hapi/hapi'
import Inert from "@hapi/inert"
import { Connection, In } from 'typeorm';
import namesRoute from './routes/names'
import queryFunctions from './extensions/loadQueryFunctions'

const init = async (connection :Connection) => {

    const server = Hapi.server({
        port: process.env.PORT ? +process.env.PORT : 3001,
        host: process.env.DEV === 'true' ? 'localhost' : '0.0.0.0'
    });

    await server.register(Inert as any)

    namesRoute.registerRoute(server, connection)
    queryFunctions.onPostHandler(server)

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: 'client/build',
            }
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
