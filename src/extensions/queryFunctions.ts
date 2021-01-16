import assert from "assert"
import Boom from '@hapi/boom'

const sort = (objArr :{[key :string] : any}[], queryString :string) => {

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

const filter = (objArr :{[key :string] : any}[], queryString :string) => { 

    const [queryVariable, queryValue] = queryString.split("<>")


    return objArr.filter((obj) => obj[queryVariable].toLowerCase() == queryValue.toLocaleLowerCase())


}

const sum = (objArr :{[key :string] : any}[], queryString :string) => { 

    if (!isNaN(objArr[0][queryString])) {

        return objArr.reduce((prev, curr) => {

            prev[`sumOf_${queryString}`] += curr[queryString]

            return prev
        }, {[`sumOf_${queryString}`] : 0})


    } else {
        throw Boom.conflict('Sum is supported for numeric values only')
    }
}


const functions :{[key :string] : (objArr :{[key :string] : any}[], queryString :string) => object[] | object} = {
    sort,
    filter,
    sum
}

export default functions