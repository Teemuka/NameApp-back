'use strict'
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom'

const sort = (objArr :object[], queryString :string) => {



    return objArr
}


const queryFunctions = (request :Hapi.Request, h :Hapi.ResponseToolkit) => {

    const query = request.query

    if (query) {

        const functions = Object.keys(query)
        const source = (h.request.response as Hapi.ResponseObject).source

        if (Array.isArray(source)) {

            let data = [...source]

            for (const funcName of functions) {

                switch (funcName) {
                    case 'sort':
                        data = sort(data, query[funcName])
                        break;
                
                    default:
                        return Boom.notImplemented(`Function ${funcName} does not found`)
                }
            }

            return h.response(data)

        } else {
            return Boom.notImplemented(`Query functions are supported for multi-values only`)
        }
    }

    return h.continue

}

export default {
    
    onPostHandler : (server : Hapi.Server) => {
        server.ext('onPostHandler', queryFunctions)
    }
}