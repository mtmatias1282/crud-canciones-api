# ---- Fase 1: Definir la imagen base ----
# Usamos una imagen oficial de Node.js. '18-alpine' es una versión ligera y segura.
FROM node:18-alpine

# ---- Fase 2: Establecer el entorno de trabajo ----
# Creamos un directorio dentro del contenedor donde vivirá nuestra aplicación.
WORKDIR /app

# ---- Fase 3: Instalar dependencias ----
# Copiamos solo el package.json y package-lock.json.
# Esto aprovecha el caché de Docker. Si estos archivos no cambian,
# Docker no volverá a instalar las dependencias, haciendo la construcción más rápida.
COPY package*.json ./
RUN npm install

# ---- Fase 4: Copiar el código de la aplicación ----
# Ahora copiamos el resto de los archivos de nuestro proyecto al contenedor.
COPY . .

# ---- Fase 5: Exponer el puerto ----
# Le informamos a Docker que nuestra aplicación escucha en el puerto 3000.
EXPOSE 3000

# ---- Fase 6: Definir el comando de inicio ----
# Este es el comando que se ejecutará cuando se inicie un contenedor desde esta imagen.
CMD ["node", "index.js"]