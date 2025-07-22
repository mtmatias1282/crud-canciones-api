// song.model.js
const mongoose = require('mongoose');

// Un esquema define la estructura de los documentos dentro de una colección.
const songSchema = new mongoose.Schema({
    // Name (nombre de la canción), tipo String, es obligatorio.
    Name: {
        type: String,
        required: true
    },
    // Path (ruta o URL), tipo String, es obligatorio.
    Path: {
        type: String,
        required: true
    },
    // Plays (número de reproducciones), tipo Number, por defecto será 0.
    Plays: {
        type: Number,
        default: 0
    }
});
// El campo Id (identificador único) es añadido automáticamente por Mongoose como _id.

// Creamos un Modelo a partir del esquema.
// El modelo es la herramienta para interactuar con la colección de la base de datos.
// mongoose.model('NombreDelModelo', esquema, 'nombreDeLaColeccionEnDB')
module.exports = mongoose.model('Song', songSchema, 'TBL_SONG');