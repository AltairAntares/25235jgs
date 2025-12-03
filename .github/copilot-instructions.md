
## Propósito

Guía concisa y específica del repositorio para agentes de IA (o desarrolladores nuevos) que trabajan en la app React + Vite `25235jgs`. El objetivo es ayudar a ser productivo rápidamente.

## Inicio rápido (comandos que usan los desarrolladores)

- Instalar dependencias: `npm install`
- Levantar el servidor de desarrollo (con HMR): `npm run dev` (Vite)
- Compilar para producción: `npm run build`
- Ejecutar lint: `npm run lint` (ESLint — ver `eslint.config.js`)

## Arquitectura general

- Bundler/Dev: Vite con plugin de React (`@vitejs/plugin-react`). Entrada: `src/main.jsx` que monta `<App />`.
- Enrutamiento en el cliente con `react-router-dom` (rutas definidas en `src/App.jsx`).
- UI construida con `react-bootstrap` y estilos modulares/inline (ej.: `src/Navbar.module.css` y estilos en componentes).
- Iconos: FontAwesome (`@fortawesome/react-fontawesome`).
- Datos: frontend-only. Los productos se obtienen de una API externa (https://fakestoreapi.com) en `src/components/ProductList.jsx`. No hay backend en este repositorio.

## Archivos clave y dónde mirar

- `package.json` — scripts y dependencias.
- `vite.config.js` — configuración de Vite (plugin React activo).
- `eslint.config.js` — reglas de lint (nota: `no-unused-vars` ignora identificadores que empiezan por mayúscula o `_`).
- `src/main.jsx` — punto de entrada que importa estilos globales (`bootstrap`) y monta `<App/>`.
- `src/App.jsx` — composición de la aplicación y rutas (Header, Routes, Footer).
- `src/components/*` — componentes React (funcionales, `.jsx`, exportación por defecto).
- `src/components/ProductList.jsx` — patrón de fetch: `useEffect` -> `fetch()` -> `setState`.
- `src/assets/pictures/` — imágenes estáticas usadas por componentes (p.ej. logo en `Header.jsx`).

## Convenciones y patrones del proyecto

- Extensión `.jsx` para componentes y uso de componentes funcionales con hooks (no clases).
- Cada componente se exporta como `export default`.
- Para añadir páginas: crear el componente en `src/components/`, importarlo en `src/App.jsx` y añadir una ruta en `Routes`.
- Llamadas a red: se usa `fetch()` dentro de `useEffect` (ver `ProductList.jsx`). Si reutilizas llamadas a APIs, considera extraer a un pequeño módulo de servicio.
- Estilos: prefiera clases de Bootstrap; los estilos inline son aceptados para ajustes locales (como en `Header.jsx` y `ProductCard.jsx`).

## Ejemplos rápidos (tareas comunes)

- Añadir una nueva página `src/components/NuevaPagina.jsx` (exportación por defecto). Luego en `src/App.jsx`:

	- `import NuevaPagina from './components/NuevaPagina'`
	- `<Route path="/nueva" element={<NuevaPagina/>} />`
	- Añadir el enlace de navegación en `src/components/Header.jsx`.

- Simular llamadas a la API para pruebas locales: insertar un fixture JSON o mockear `fetch` dentro del `useEffect` del componente durante desarrollo.

## Lint y estilo de código

- Ejecutar `npm run lint` para ver problemas. Reglas importantes: `eslint.config.js` establece que `no-unused-vars` ignora nombres que comienzan con mayúscula o `_` (útil al agregar componentes no usados temporalmente).

## Observaciones y riesgos para cambios automatizados

- No hay código de servidor en el repositorio — evitar cambios que supongan servicios locales sin añadir instrucciones de cómo arrancarlos.
- Rutas de assets: en `Header.jsx` se referencia la imagen con `src="../src/assets/pictures/Logo.png"`; para ser más robusto con el bundler, prefiera importar imágenes:

	- `import Logo from '../assets/pictures/Logo.png'`
	- `<img src={Logo} alt="Logo" />`

- No existen tests automáticos en el repo; añadir pruebas grandes es un cambio mayor — proponga primero la estrategia si desea que las agregue.

## Dónde actualizar este archivo

Si encuentra convenciones adicionales (CI, despliegue, variables de entorno), agregue notas aquí con ejemplos y referencias a los archivos que muestran el patrón.

---
Última comprobación: archivos leídos: `package.json`, `vite.config.js`, `README.md`, `eslint.config.js`, `src/main.jsx`, `src/App.jsx`, `src/components/{Header,Home,Login,ProductList,ProductCard}`
