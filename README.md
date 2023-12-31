# Taller 3 Web Movil `MobileHub`
Estudiante: Nicolas Henriquez Pedraza
Rut: 202135919
## Consideraciones

ES IMPORTANTE TENER INSTALADO:
### Backend

Node.js: Entorno de ejecución para JavaScript en el lado del servidor.
    Descargar Node.js

npm (Node Package Manager): Gestor de paquetes para instalar bibliotecas y dependencias.
    Viene con Node.js.

MongoDB:
    Descargar MongoDB

Editor de Código (opcional):
    Puedes usar Visual Studio Code, Sublime Text, Atom, o cualquier editor de código de tu elección.

Git:
    Descargar Git

### Frontend

Node.js: (Si aún no está instalado desde el backend).
    Descargar Node.js

npm (Node Package Manager): (Si aún no está instalado desde el backend).

Editor de Código (opcional):
    Puedes usar Visual Studio Code, Sublime Text, Atom, o cualquier editor de código de tu elección.

Postman:
    Descargar Postman

Android Estudio:
 con emulador de android33 version tiramisu con x86 64

## Backend
Clona este repositorio:
```bash
git clone https://github.com/Bharragan/workshop3_Web.git
```
Navega a la carpeta del backend:
```bash
cd backend
```
Copia el .env.example y rellenalo con lo que pide.
```bash
copy .env.example .env
```
```bash
PORT= Tu puerto favorito
MONGODB_URI= tu url de mongo
JWT_SECRET= tu secreto
GIT_SECRET= tu token de git
```
Instala las dependencias:
```bash
npm install
```
Inicia el servidor:
```bash
npm start
```

## Frontend
Abre una nueva terminal teniendo el backend corriendo
```bash
cd frontend
```
Copia el .env.example y rellenalo con lo que pide, en este caso si usas emulador te pedira tu ip y el puerto de tu backend. 
```bash
cp .env.example .env
```
Ahora bien deberias tener algo como esto, lo primero es la ip de tu pc y lo otro es la parte del puerto de tu backend, para conseguir la ip de tu pc puedes usar varios comandos.
```
REACT_APP_API_URL="http://#########:PPPP"
donde ######## es la ip de tu pc y las PPPP el puerto
```
Instala las dependencias:
```bash
npm install
```
Inicia el servidor:
```bash
npm start
```
Ahora tienes 2 opciones puedes apretar la "a" de android o irte a otra consola (Manteniendo la del npm start abierta y corriendo) y usar
```
npm run android 
```
## Postman
Respecto a postman dejo adjunto la coleccion de request en la raiz del proyecto