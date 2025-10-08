# 📰 Bloglist Backend

> API RESTful para la gestión de blogs — Parte 4 del curso [Full Stack Open](https://fullstackopen.com/en/)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-FFCA28?style=for-the-badge&logo=testing-library&logoColor=black)

---

## 🧩 Descripción

Este proyecto implementa una **API backend** para gestionar una lista de blogs.  
Permite **crear, leer, actualizar y eliminar** blogs, además de realizar pruebas automatizadas y validaciones con Mongoose.  

Es parte del aprendizaje de desarrollo **Full Stack con Node.js, Express y MongoDB**.

---

## ⚙️ Tecnologías principales

| Tecnología | Descripción |
|-------------|--------------|
| **Node.js** | Entorno de ejecución del servidor |
| **Express** | Framework para crear APIs |
| **MongoDB + Mongoose** | Base de datos NoSQL y modelado de datos |
| **Jest + Supertest** | Testing automatizado |
| **ESLint** | Control de estilo y buenas prácticas |
| **dotenv** | Configuración de variables de entorno |
| **Nodemon** | Recarga automática durante el desarrollo |

---

## 🗂️ Estructura del proyecto

```
bloglist-backend/
│
├── controllers/        # Controladores de las rutas
├── models/             # Modelos de Mongoose
├── tests/              # Tests con Jest y Supertest
├── utils/              # Configuración y middlewares
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
│
├── app.js              # Configuración de Express
├── index.js            # Punto de entrada principal
├── package.json
├── .eslintrc.json      # Configuración del linter
└── .env                # Variables de entorno (no se sube al repo)
```

---

## 🚀 Instalación y uso

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/bloglist-backend.git
cd bloglist-backend
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con lo siguiente:

```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>/<nombre_bd>
TEST_MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>/<nombre_test_bd>
PORT=3003
```

### 4️⃣ Ejecutar en modo desarrollo
```bash
npm run dev
```

### 5️⃣ Ejecutar tests
```bash
npm test
```

---

## 🌐 Endpoints principales

| Método | Endpoint | Descripción |
|---------|-----------|-------------|
| **GET** | `/api/blogs` | Obtener todos los blogs |
| **POST** | `/api/blogs` | Crear un nuevo blog |
| **PUT** | `/api/blogs/:id` | Actualizar un blog existente |
| **DELETE** | `/api/blogs/:id` | Eliminar un blog |

---

## ✅ Buenas prácticas aplicadas

- Arquitectura modular (controladores, modelos, middlewares, utils)
- Validaciones con Mongoose
- Manejo centralizado de errores
- Pruebas automatizadas (unitarias e integración)
- ESLint configurado con reglas estrictas:
  ```json
  {
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "no-console": 0
  }
  ```

---

## 💡 Aprendizajes clave

📚 Durante el desarrollo de este proyecto aprendí:
- A estructurar un backend profesional con Express y MongoDB  
- Cómo crear endpoints RESTful limpios y mantenibles  
- A usar Jest y Supertest para pruebas automáticas  
- A implementar middlewares personalizados  
- A aplicar ESLint y mantener un código limpio  

---

## 👨‍💻 Autor

**Kevin Rojas**  
📧 [@kenanrojas](https://github.com/kenanrojas)  
💻 Proyecto desarrollado como parte del curso [Full Stack Open](https://fullstackopen.com/en/)
