const devConf = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "common",
    "password": "common",
    "database": "nameapp",
    "synchronize": true,
    "logging": false,
    "entities": [
       "src/entity/*.ts"
    ]
 }

 const distConf = {
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "common",
   "password": "common",
   "database": "nameapp",
   "synchronize": true,
   "logging": false,
   "entities": [
      "dist/src/entity/*.js"
   ]
 }

 module.exports = process.env.DEV === 'true' ? devConf : distConf