// 1. Importar la librería express
const express = require('express');

// 2. Crear una instancia de la aplicación express
const app = express();

// 3. Definir el puerto en el que escuchará el servidor
// Usamos 3000 como estándar para desarrollo local, pero puede ser cualquiera.
const PORT = 3000;

// 4. Crear nuestra primera ruta (endpoint)
// Cuando alguien visite la raíz de nuestro sitio ('/'), se ejecutará esta función.
app.get('/', (req, res) => {
  // req = request (petición del cliente), res = response (nuestra respuesta)
  res.send('¡Mi primer microservicio está vivo!');
});

// 5. Iniciar el servidor para que empiece a escuchar peticiones
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});