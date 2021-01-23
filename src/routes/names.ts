'use strict';
import Hapi from '@hapi/hapi';
import { Connection, Repository } from 'typeorm';
import { Name } from '../entity/Name';

let repository :Repository<Name>;

const getNameshandler = async (request :Hapi.Request, h :Hapi.ResponseToolkit) => {

    return await repository.find()
}

const postNameshandler = async (request :Hapi.Request, h :Hapi.ResponseToolkit) => {


    try {
        const names =  (request.payload as {names : Name[]}).names
        console.log(names)
        return await repository.save(names)

    } catch(err) {
        console.log(err)
        return "Payload error: must be in form {name :string, amount :number}"
    }
}

export default {

    registerRoute : (server : Hapi.Server, connection: Connection) => {

        repository = connection.getRepository(Name)

        server.route([
            {
                method: 'GET',
                path: '/api/names',
                handler : getNameshandler
            },
            {
                method: 'POST',
                path: '/api/names',
                handler : postNameshandler
            },

        ]);

    }
}