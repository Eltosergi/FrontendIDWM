# 🚀 Frontend de la Aplicación – Next.js

Este repositorio contiene el código del **frontend** de la aplicación, desarrollado con **Next.js**. A continuación, se detallan los pasos necesarios para levantar el entorno local de desarrollo.

---

## 🧰 Requisitos Previos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

* **Node.js**: Se recomienda la versión 18.x o superior.
* **npm o yarn**: Un gestor de paquetes para JavaScript.
* **Backend .NET**: La [aplicación backend](https://github.com/FernandoChav/AyudantiaWebMovil) debe estar en funcionamiento y accesible.

---

## 📦 Instalación y Puesta en Marcha

Sigue estos pasos para que la aplicación funcione localmente:

### 1️⃣ Clonar el Repositorio

Abre tu terminal y ejecuta los siguientes comandos para clonar el proyecto y navegar a su directorio:

```bash
git clone [https://github.com/Eltosergi/FrontendIDWM.git](https://github.com/Eltosergi/FrontendIDWM.git)
cd FrontendIDWM
git checkout features/admin_functions
### 2️⃣ Instalar Dependencias

Instala las dependencias necesarias del proyecto utilizando tu gestor de paquetes preferido:

```bash
# Con npm
npm install

# O con yarn
yarn install


### 3️⃣ Configurar Variables de Entorno

Crea un nuevo archivo llamado `.env.local` en la raíz de tu proyecto. Copia y pega el siguiente contenido en este archivo:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="90gea/J58LWah6QHx83mKS7thasughQaSw60KzLya5E="
NEXT_PUBLIC_API_URL="http://localhost:5000/api"



### 4️⃣ Verificar el Estado del Backend

Esta aplicación frontend depende de una API de .NET. Asegúrate de que el backend esté ejecutándose y accesible en `http://localhost:5000`, como se especifica en la variable de entorno `NEXT_PUBLIC_API_URL`.

* **Repositorio del Backend**: 👉 [AyudantiaWebMovil - Backend .NET](https://github.com/FernandoChav/AyudantiaWebMovil)

5️⃣ Iniciar el Servidor de Desarrollo
Una vez configurado todo, inicia el servidor de desarrollo:

Bash

# Con npm
npm run dev

# O con yarn
yarn dev
Después de que el servidor se inicie, abre tu navegador web y navega a:
🔗 http://localhost:3000

¡La aplicación debería estar funcionando correctamente! 🎉


## 🧑‍💻 Autor

Desarrollado por [Sergio Parada](https://github.com/Eltosergi) para la asignatura de Desarrollo Web Móvil.