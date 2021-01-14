'use strict'
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom'
import assert from 'assert';

const sort = (objArr :object[], queryString :string) => {

    const regex = /^\('(.+?)','((asc)|(desc))'\)$/

    assert(regex.test(queryString), Boom.notImplemented('Check function syntax'))

    const [,property, order] = regex.exec(queryString)!

    const sorted = [...objArr].sort((a :any,b :any) => {
        
        const valueA = typeof a[property] === "string" ? a[property].toLowerCase() : a[property]
        const valueB = typeof b[property] === "string" ? b[property].toLowerCase() : b[property]

        if (valueA > valueB) {
            return order === 'asc' ? 1 : -1
        } else if (valueA < valueB) {
            return order === 'asc' ? -1 : 1
        } else {
            return 0
        }

    })


    return sorted
}


const queryFunctions = (request :Hapi.Request, h :Hapi.ResponseToolkit) => {

    const query = request.query
    const functions = Object.keys(query)

    if (functions.length) {

        const source = (h.request.response as Hapi.ResponseObject).source

        if (Array.isArray(source)) {

            let data: object[] = []

            for (const funcName of functions) {

                switch (funcName) {
                    case 'sort':
                        data = sort(source, query[funcName])
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