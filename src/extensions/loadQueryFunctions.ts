'use strict'
import Hapi from '@hapi/hapi';
import queryFunctions from './queryFunctions'


const checkQuery = (request :Hapi.Request, h :Hapi.ResponseToolkit) => {

    const query = request.query
    const keys = Object.keys(query)

    if (keys.length) {

        const source = (h.request.response as Hapi.ResponseObject).source

        if (Array.isArray(source)) {

            let data: object[] | object = source

            for (const key of keys) {
                if (query[key] && !Array.isArray(query[key])) {

                    if (queryFunctions.hasOwnProperty(key)) {
                        data = queryFunctions[key](source, query[key])
                    } else if ((source[0] as {[key :string] : any})[key]) {
                        data = queryFunctions.filter(source, `${key}<>${query[key]}`)
                    }
                }
            }

            return h.response(data)

        } 
    }

    return h.continue

}

export default {
    
    onPostHandler : (server : Hapi.Server) => {
        server.ext('onPostHandler', checkQuery)
    }
}