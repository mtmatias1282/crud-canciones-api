// 1. Importaciones
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Carga las variables de entorno del archivo .env
const Song = require("./song.model"); // <-- AÑADIR ESTA LÍNEA

// 2. Inicialización
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middlewares
app.use(express.json()); // <-- AÑADIR ESTA LÍNEA. Permite que Express entienda peticiones con body en formato JSON.

// 4. Conexión a la Base de Datos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado exitosamente a MongoDB Atlas"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// 5. Rutas (Endpoints) -
app.get("/", (req, res) => {
  res.send("¡El microservicio está vivo y conectado a la base de datos!");
});

// --- OPERACIONES CRUD ---

// CREATE - Crear una nueva canción
// Método: POST, Ruta: /songs
app.post("/songs", async (req, res) => {
  try {
    // req.body contiene la información JSON enviada por el cliente (Postman)
    // Creamos una nueva instancia del modelo Song con esa información
    const newSong = new Song(req.body);

    // Guardamos la nueva canción en la base de datos
    await newSong.save();

    // Respondemos al cliente con el código 201 (Created) y la canción creada
    res.status(201).json(newSong);
  } catch (error) {
    // Si hay un error (ej. campos requeridos faltantes), respondemos con un error 400
    res.status(400).json({ message: error.message });
  }
});

// READ - Obtener todas las canciones
// Método: GET, Ruta: /songs
app.get("/songs", async (req, res) => {
  try {
    // Usamos el método find() del modelo para buscar todos los documentos
    // Un objeto vacío {} como filtro significa "traer todo"
    const songs = await Song.find();

    // Respondemos con el código 200 (OK) y la lista de canciones en formato JSON
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - Actualizar una canción por su ID
// Método: PUT, Ruta: /songs/:id
app.put("/songs/:id", async (req, res) => {
  try {
    // :id es un parámetro dinámico en la URL
    const { id } = req.params;

    // Buscamos la canción por su ID y la actualizamos con el req.body
    // { new: true } hace que nos devuelva el documento ya actualizado
    const updatedSong = await Song.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedSong) {
      // Si no se encuentra la canción, devolvemos un error 404
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar una canción por su ID
// Método: DELETE, Ruta: /songs/:id
app.delete("/songs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos la canción por su ID y la eliminamos
    const deletedSong = await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    // Respondemos con un mensaje de confirmación
    res.status(200).json({ message: "Canción eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
