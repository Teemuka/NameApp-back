'use strict';
import Hapi from '@hapi/hapi';


const getNameshandler = (request :Hapi.Request, h :Hapi.ResponseToolkit) => {
    return 'names'
}

const postNameshandler = (request :Hapi.Request, h :Hapi.ResponseToolkit) => {
    return 'names'
}

export default {

    registerRoute : (server : Hapi.Server) => {

        server.route([
            {
                method: 'GET',
                path: '/names',
                handler : getNameshandler
            },
            {
                method: 'POST',
                path: '/names',
                handler : postNameshandler
            },

        ]);

    }
}