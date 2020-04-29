# DIF Naucalpan

## Estructura del proyecto

El proyecto tiene la siguiente estructura de carpetas:

```
- / 			        # Raíz del proyecto
    - README.md			# Archivo con la información general (este archivo)
    - frontend			# Carpeta con la solución del frontend (Web app)
    - backend			# Carpeta con la solución del backend (API)
```

## Solución

MERN Stack Development

Se trata de tecnologías basadas en JavaScript para desarrollar aplicaciones web en:
- **M** : MongoDB
- **E** : Express JS
- **R** : React JS
- **N** : Node JS

Al usar estas herramientas, es muy fácil construir aplicaciones web, adicionalmente extender a otro tipo de aplicaciónes como móviles o de escritorio.

### Frontend

#### Lenguaje de programación

El lenguaje de programación utilizado es JavaScript

#### Framework

El framework utilizado es el de React, que permite construir la interfaz gráfica de la aplicación, finalmente hace las operaciones lógicas para pedir información al API.

### Backend

Corre sobre el ambiente de Node, express y el framework de Mongoose.

#### Lenguaje de programación

El lenguage de programación utilizado es JavaScript.

#### Framework

https://mongoosejs.com/docs/

Se trata de funciones que ya están optimizadas para el funcionamiento de MongoDB, asegurando consultas rápidas.

### Base de datos

La solución fue implementada sobre ![mongo](https://www.mongodb.com/). Una base de datos no relacional, no obstante gracias al framework de agregación se pueden manejar relaciones. Es una base de datos distribuida, basada en documentos. Lo que permite almacenar grandes cantidades de información, haciendo la aplicación altamente escalable.

## API

### Usuarios

```txt
# Crear usuario
POST: /users/
## Campos
- nombre: No vacío, min: 3, max: 100
- username: No vacío, min: 3, max: 30
- tipo: (admin|medico|juridico|tsocial|psicologo|pedagogo)
- sexo: (m|h)

# Obtener todos los usuarios
GET: /users/:type/:page
## Parámetros
- type: (all|admin|medico|juridico|tsocial|psicologo|pedagogo)
- page: número de la página a mostrar (30 usuarios por página)

# Búscar por nombre con regex
POST: /users/:name
## Parámetros
- name: expresión a buscar, regresa los primeros 30

```

## ToDo

- [ ] min/max lenght for users for pass
- [ ] requiried all for props in format card
- [ ] add is required in forms 
- [ ] pags if one do no show pagination