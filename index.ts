import server from './src/server'
import {createConnection} from 'typeorm'

createConnection().then(server.init).catch((err) => {
    console.log(err);
    process.exit(1);
})

