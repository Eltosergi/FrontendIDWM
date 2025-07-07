# 🚀 Frontend de la Aplicación – Next.js

Este repositorio contiene el código del **frontend** de la aplicación desarrollado en **Next.js**. A continuación se detallan los pasos necesarios para levantar el entorno local de desarrollo.

---

## 🧰 Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- npm o yarn
- Tener el [backend .NET](https://github.com/FernandoChav/AyudantiaWebMovil) en funcionamiento

---

## 📦 Instalación y Puesta en Marcha

### 1️⃣ Clonar el Repositorio

Ejecuta el siguiente comando para clonar el proyecto:

```bash
git clone https://github.com/Eltosergi/FrontendIDWM.git
cd FrontendIDWM
git checkout features/admin_functions
2️⃣ Instalar Dependencias
Instala las dependencias usando npm o yarn:

bash
Copiar
Editar
# Con npm
npm install

# O con yarn
yarn install
3️⃣ Configurar Variables de Entorno
Crea un archivo llamado .env.local en la raíz del proyecto y copia el siguiente contenido:

env
Copiar
Editar
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="90gea/J58LWah6QHx83mKS7thasughQaSw60KzLya5E="
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
⚠️ Importante: No subas este archivo al repositorio. Ya está incluido en el .gitignore.

4️⃣ Verificar el Backend en Funcionamiento
Este frontend depende de una API creada con .NET. Asegúrate de que el backend esté corriendo en http://localhost:5000 como se especifica en la variable NEXT_PUBLIC_API_URL.

Repositorio del backend:
👉 AyudantiaWebMovil - Backend .NET

5️⃣ Iniciar el Servidor de Desarrollo
Con todo configurado, ejecuta el servidor de desarrollo:

bash
Copiar
Editar
# Con npm
npm run dev

# O con yarn
yarn dev
Luego abre tu navegador en:
🔗 http://localhost:3000

¡Y listo! La aplicación debería estar corriendo correctamente. 🎉

🧑‍💻 Autor
Desarrollado por Sergio Parada
Para la asignatura de Desarrollo Web Móvil

go
Copiar
Editar

¿Deseas que te lo entregue como archivo `.md` descargable también?