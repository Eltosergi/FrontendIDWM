# 🚀 Frontend de la Aplicación – Next.js

Este repositorio contiene el **frontend** de la aplicación, desarrollado con **Next.js**. A continuación, encontrarás los requisitos, configuración e instrucciones para poner en marcha el proyecto en tu entorno local.

---

## 🧰 Requisitos Previos

* **Node.js** (v18.x o superior)
* **npm** o **Yarn**
* **Backend .NET** en funcionamiento y accesible (ver [AyudantiaWebMovil Backend](https://github.com/FernandoChav/AyudantiaWebMovil)).

---

## 📦 Instalación y Puesta en Marcha

Sigue estos pasos:

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Eltosergi/FrontendIDWM.git
cd FrontendIDWM
git checkout features/admin_functions
```

### 2. Instalar Dependencias

```bash
# Con npm
npm install

# O con Yarn
yarn install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="90gea/J58LWah6QHx83mKS7thasughQaSw60KzLya5E="
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

### 4. Verificar el Backend

Asegúrate de que el backend .NET esté corriendo en `http://localhost:5000` (o ajusta `NEXT_PUBLIC_API_URL` según corresponda).

Repositorio del Backend: [AyudantiaWebMovil Backend](https://github.com/FernandoChav/AyudantiaWebMovil).

### 5. Iniciar el Servidor de Desarrollo

```bash
# Con npm
npm run dev

# O con Yarn
yarn dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000). ¡Deberías ver la aplicación en funcionamiento! 🎉

---

## 🧑‍💻 Autor

Desarrollado por [Sergio Parada](https://github.com/Eltosergi) para la asignatura de Desarrollo Web Móvil.
