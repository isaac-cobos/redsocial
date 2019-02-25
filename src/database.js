const mongoose = require ('mongoose');

const { database } = require ('./keys.js');

//conexion a la bbdd
mongoose.connect(database.URI,{
    useNewUrlParser: true
}) 
//promesa de cuando se conecte y si no se conecta error
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));