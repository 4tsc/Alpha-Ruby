# Desarrollo local

[Índice](README.md) · Revisión estática: 2026-09-25.

Los comandos siguientes se derivan de los archivos del repositorio. No se ejecutaron instalaciones, Expo ni MySQL durante esta revisión. El cliente y el servidor incluido tienen incompatibilidades que impiden considerar estos pasos como una puesta en marcha integral validada; véanse [limitaciones](limitaciones.md).

## Directorios y prerrequisitos

Abrir una terminal en la raíz Git `Alpha-Ruby`. La aplicación está en `Alpha Ruby`, no en la raíz. Los ejemplos usan PowerShell y rutas entre comillas para conservar el espacio.

Se necesita Node.js y npm para instalar y ejecutar los paquetes. El proyecto no fija una versión de Node con `engines`, `.nvmrc` ni `.node-version` entre los archivos inspeccionados, por lo que no se declara una versión de Node validada. Las plataformas nativas necesitan su entorno de desarrollo correspondiente; el script iOS no demuestra disponibilidad de un simulador iOS en Windows. La compatibilidad del entorno debe comprobarse antes de atribuir un fallo a la aplicación.

Para el servidor se necesita MySQL accesible y una base/tabla compatibles. El repositorio no proporciona un esquema SQL, migraciones ni datos iniciales. La configuración actual es de ejemplo y no basta para reconstruir la base original.

## Cliente Expo

Desde la raíz Git:

```powershell
Set-Location -LiteralPath '.\Alpha Ruby'
npm ci
npm start
```

La instalación usa el lockfile de esa carpeta. Los scripts existentes, como alternativas al último comando, son:

| Comando | Script definido en package.json |
| --- | --- |
| `npm start` | `expo start` |
| `npm run android` | `expo start --android` |
| `npm run ios` | `expo start --ios` |
| `npm run web` | `expo start --web` |

El punto de entrada declarado es `expo/AppEntry.js`, que carga la aplicación definida en [App.js](../Alpha%20Ruby/App.js). No hay scripts propios de build, lint ni test en el [manifiesto cliente](../Alpha%20Ruby/package.json).

### Dependencias declaradas

| Grupo | Paquetes/rangos relevantes |
| --- | --- |
| Base | `expo ~51.0.28`, `react 18.2.0`, `react-native 0.74.5` |
| Web | `react-dom 18.2.0`, `react-native-web ~0.19.10`, `@expo/metro-runtime ~3.2.3` |
| Navegación | `@react-navigation/native ^6.1.18`, `stack ^6.4.1`, `bottom-tabs ^6.6.1`, `native-stack ^6.11.0` |
| UI nativa | Gesture Handler `~2.16.1`, Reanimated `~3.10.1`, Safe Area Context `4.10.5`, Screens `^3.31.1`, Vector Icons `^10.1.0`, Masked View `^0.1.11` |
| Herramientas | TypeScript `~5.3.3`, `@types/react ~18.2.79`, `@babel/core ^7.20.0` |

La lista completa, incluido `expo-status-bar`, está en el manifiesto. Un rango declarado no identifica una instalación actual. Los tres lockfiles —[cliente](../Alpha%20Ruby/package-lock.json), [backend](../Alpha%20Ruby/backend/package-lock.json), [copia backend](../Alpha%20Ruby/src/backend/package-lock.json)— registran versiones resueltas y dependencias transitivas de sus respectivos paquetes. Mantener el manifiesto y lockfile correspondiente juntos; la presencia de una copia no convierte el proyecto en un workspace npm.

### Configuración del cliente

- [app.json](../Alpha%20Ruby/app.json): nombre/slug `MagicardUCT`, versión 1.0.0, orientación vertical, iconos, splash, soporte de tablet iOS y favicon web.
- [babel.config.js](../Alpha%20Ruby/babel.config.js): usa `babel-preset-expo`.
- [tsconfig.json](../Alpha%20Ruby/tsconfig.json): extiende `expo/tsconfig.base` con opciones locales vacías.
- [.gitignore](../Alpha%20Ruby/.gitignore): excluye `node_modules`, `.expo`, salidas de build y otros archivos locales.

**No existe un mecanismo operativo de configuración de `API_BASE_URL` en el código inspeccionado.** Crear un `.env` por sí solo no resuelve las referencias sin declarar ni los strings con interpolación literal. Se necesita un cambio de código separado para conectar el cliente a una API compatible.

## Servidor de registro

En una segunda terminal, desde la raíz Git:

```powershell
Set-Location -LiteralPath '.\Alpha Ruby\backend'
npm ci
node server.js
```

El [manifiesto backend](../Alpha%20Ruby/backend/package.json) declara `main: index.js`, pero ese archivo no está incluido. El archivo existente para iniciar es [server.js](../Alpha%20Ruby/backend/server.js). No hay script `start`; `npm test` es un marcador que imprime «Error: no test specified» y termina con código 1, no una suite de pruebas.

El servidor usa Express `^4.19.2`, MySQL `^2.18.1`, CORS `^2.8.5` y body-parser `^1.20.2`. Escucha en el puerto 3000 y configura la base directamente en `server.js`:

| Campo | Valor observado |
| --- | --- |
| host | `localhost` |
| user | `root` |
| password | Cadena vacía |
| database | `nombre_de_tu_base_de_datos` |

Estos valores son placeholders locales, no una configuración validada. La única evidencia de estructura es el INSERT descrito en [API y datos](api-y-datos.md); no alcanza para recuperar tipos, claves o relaciones. La contraseña del usuario registrado se guarda sin hashing en este handler.

La [segunda copia del servidor](../Alpha%20Ruby/src/backend/server.js), con su [manifiesto](../Alpha%20Ruby/src/backend/package.json), implementa lo mismo y usa el mismo puerto. Para estudiar esa copia se podría trabajar desde `Alpha Ruby/src/backend`, pero no deben arrancarse ambos procesos simultáneamente en el puerto 3000. No hay un orquestador de servicios incluido.

El mensaje de escucha HTTP no garantiza conexión MySQL: el callback de conexión registra el error y retorna, pero `app.listen` se invoca fuera de ese callback.

## Qué falta para una validación integral

1. Definir el entorno Node/Expo y plataforma de prueba, e instalar sus dependencias.
2. Obtener o definir el esquema MySQL y sustituir la configuración de ejemplo.
3. Obtener la implementación de la API propia esperada o implementarla, y conciliar el contrato de registro.
4. Resolver URLs y discrepancias de navegación/datos del cliente.
5. Ejecutar y verificar los flujos de registro, login, búsqueda, mazos y asociación.

Estos puntos son condiciones pendientes del producto, no tareas ejecutadas por este cambio documental. La relación exacta entre código, efecto y certeza está en [limitaciones](limitaciones.md).

## Verificación de la documentación

Desde la raíz Git:

```powershell
openspec validate documentar-arquitectura-alpha-ruby --strict
git diff --check
```

Además de esos comandos, se revisan enlaces locales, cobertura del inventario, todos los destinos HTTP y los cinco bloques Mermaid. El estado de esa revisión queda registrado en el [índice](README.md). `git diff --check` por sí solo no comprueba el contenido de archivos nuevos sin seguimiento. No se agregaron dependencias de renderizado al producto.
