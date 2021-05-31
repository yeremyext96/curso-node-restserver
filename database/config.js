const mongoose = require('mongoose');
require('colors');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de Datos Online :)'.cyan);

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la Base de datos :( '.red);
    }

}

module.exports = {
    dbConnection
}