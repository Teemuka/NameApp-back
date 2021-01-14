import assert from "assert"
import Boom from '@hapi/boom'

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

const functions :{[key :string] : (objArr :object[], queryString :string) => object[]} = {
    sort
}

export default functions