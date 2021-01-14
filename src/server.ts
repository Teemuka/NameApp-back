'use strict';
import Hapi from '@hapi/hapi';
import { Connection } from 'typeorm';
import namesRoute from './routes/names'
import queryFunctions from './extensions/loadQueryFunctions'

const init = async (connection :Connection) => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });

    namesRoute.registerRoute(server, connection)
    queryFunctions.onPostHandler(server)

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
