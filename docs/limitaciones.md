# Limitaciones y trazabilidad

[Índice](README.md) · Revisión estática: 2026-09-25.

«Observado» indica evidencia de código; «inferencia» indica una consecuencia deducida sin ejecutar; «nota histórica» recoge apuntes previos. Estas observaciones describen este checkout, no otros servidores o versiones del proyecto. El cambio documental no corrige los comportamientos enumerados.

## Conectividad y servidor

| Hallazgo | Evidencia | Efecto y certeza |
| --- | --- | --- |
| URLs literales | [Login](../Alpha%20Ruby/src/screens/loginScreen.tsx), [Register](../Alpha%20Ruby/src/screens/registerScreen.tsx), [Gestor](../Alpha%20Ruby/src/screens/DeckManagementScreen.tsx), [ImageView](../Alpha%20Ruby/src/screens/ImageViewScreen.tsx), [Profile](../Alpha%20Ruby/src/screens/ProfileScreen.tsx) usan comillas simples alrededor de `${API_BASE_URL}` en escrituras. | Observado: no se interpola la base; el destino real depende del entorno, no es la URL pretendida. |
| Base API sin definición/import | [Home](../Alpha%20Ruby/src/screens/homeScreen.tsx), [Gestor](../Alpha%20Ruby/src/screens/DeckManagementScreen.tsx), [ImageView](../Alpha%20Ruby/src/screens/ImageViewScreen.tsx), [Profile](../Alpha%20Ruby/src/screens/ProfileScreen.tsx); búsqueda del símbolo en código/configuración. | Observado: no hay definición local. Inferencia: evaluar esos templates falla si no existe una definición externa al código disponible. Home/Profile además anteponen un espacio. |
| Contrato de registro incompatible | [Register](../Alpha%20Ruby/src/screens/registerScreen.tsx) envía nombre/correo/clave; [servidor](../Alpha%20Ruby/backend/server.js) exige username/email/password. | Observado: si el payload llegara al handler local, faltan sus campos requeridos y respondería 400. |
| API propia incompleta | Los dos [servidores](../Alpha%20Ruby/src/backend/server.js) solo registran POST de registro; [matriz HTTP](api-y-datos.md). | Observado: login, usuario, mazos, asociación y logout no tienen implementación en este checkout. No se concluye que no existan fuera de él. |
| Persistencia y autenticación del servidor | [server.js](../Alpha%20Ruby/backend/server.js): INSERT directo de contraseña, sin middleware de sesión/autorización; configuración MySQL de ejemplo. | Observado: no hay hashing ni sesión implementada; el backend no acredita autenticación del resto de flujos. |
| Esquema ausente | Inventario Git y [consulta SQL](../Alpha%20Ruby/backend/server.js). | Observado: no hay DDL/migraciones. Tipos SQL, restricciones y relaciones no se pueden confirmar. |
| Duplicación de servidor | [backend/server.js](../Alpha%20Ruby/backend/server.js) y [src/backend/server.js](../Alpha%20Ruby/src/backend/server.js), idénticos por hash. | Observado: misma ruta y puerto, no dos servicios complementarios. |
| Estado HTTP ignorado en registro | [Register](../Alpha%20Ruby/src/screens/registerScreen.tsx) decide por `data.error`. | Observado: un JSON sin ese campo activa éxito aunque HTTP no sea OK. Consecuencia inferida, no probada en vivo. |

## Navegación, sesión y mazos

| Hallazgo | Evidencia | Efecto y certeza |
| --- | --- | --- |
| Sesión solo en memoria | [UserContext](../Alpha%20Ruby/src/screens/UserContext.tsx), [Login](../Alpha%20Ruby/src/screens/loginScreen.tsx). | Observado: ID inicialmente nulo, sin persistencia ni token. Login no valida que exista `result.userId` antes de navegar. |
| Sin guarda de rutas | [App.js](../Alpha%20Ruby/App.js) registra todas las pantallas incondicionalmente. | Observado: navegar no implica autorización comprobada. |
| Perfil/logout desconectados | [Profile](../Alpha%20Ruby/src/screens/ProfileScreen.tsx) no se importa/registra en [App.js](../Alpha%20Ruby/App.js). | Observado: no existe acceso por el navegador declarado. La rama de icono Settings tampoco crea una ruta. |
| IDs de mazos inconsistentes | [Gestor](../Alpha%20Ruby/src/screens/DeckManagementScreen.tsx) usa `index + 1`; [ImageView](../Alpha%20Ruby/src/screens/ImageViewScreen.tsx) usa `idbarajas`. | Observado: identidad local distinta según pantalla; no representa siempre el ID persistido. |
| Parámetro incorrecto al editor | [Gestor](../Alpha%20Ruby/src/screens/DeckManagementScreen.tsx) manda `deck: item.id`; [Editor](../Alpha%20Ruby/src/screens/deckEditorScreen.tsx) espera objeto. | Observado: contrato de navegación incompatible. Inferencia: `deckName` puede quedar indefinido y `.trim()` fallar. |
| Editor sin persistencia | [Editor](../Alpha%20Ruby/src/screens/deckEditorScreen.tsx): `saveDeckChanges` solo loguea y vuelve; `removeCard` filtra estado. | Observado: no hay escritura remota ni actualización del gestor. El modal de agregar no tiene apertura conectada; el botón principal navega a Buscar. |
| Mazo de origen perdido | [Editor](../Alpha%20Ruby/src/screens/deckEditorScreen.tsx) envía `deckId`; [Buscar](../Alpha%20Ruby/src/screens/Buscar.tsx) no lo consume. | Observado: no preselecciona el mazo para la asociación. Navegar al nombre de una pestaña anidada requiere prueba de ejecución. |
| Eliminación por nombre | [Gestor](../Alpha%20Ruby/src/screens/DeckManagementScreen.tsx) incluye nombre sin codificar y filtra coincidencias locales. | Observado; inferencia: caracteres de URL y nombres repetidos pueden producir resultados ambiguos. |
| Carga solo al montar | [Gestor](../Alpha%20Ruby/src/screens/DeckManagementScreen.tsx) e [ImageView](../Alpha%20Ruby/src/screens/ImageViewScreen.tsx) usan efecto con `[]`. | Observado: no hay recarga declarada por cambio de usuario o foco. La lista podría quedar desactualizada. |
| Contenido de ejemplo y formulario alternativo | [Home](../Alpha%20Ruby/src/screens/homeScreen.tsx) tiene Card 1/News 1; [RegisterForm](../Alpha%20Ruby/src/RegisterForm.tsx) solo alerta. | Observado: no son historial/noticias reales ni otro registro operativo. |

## Búsqueda y recursos

Fuente principal: [Buscar.tsx](../Alpha%20Ruby/src/screens/Buscar.tsx).

| Hallazgo | Evidencia concreta | Efecto y certeza |
| --- | --- | --- |
| Legalidad desconectada | Selector cambia `selectedLegality`; query usa `filter.legality`, que no se actualiza. | Observado: seleccionar legalidad no añade el filtro esperado. |
| Tipo fuera de dependencias | Query lee `selectedType`; efecto depende de texto y `filter`. | Observado: cambiar solo el tipo no dispara consulta; se incorporaría al siguiente disparo por otra dependencia. |
| Texto de carta, maná y colores sin conexión | Inputs mantienen estados separados, botones Añadir carecen de handler y colores son imágenes. | Observado: controles visibles que no actualizan la query correspondiente. |
| Lupa y petición desacopladas | El efecto busca al escribir; la lupa solo cambia `searchInitiated`. | Observado: no es una búsqueda iniciada exclusivamente por botón. |
| Sin debounce/cancelación/paginación | `fetchCards` consume `data.data`, sin temporizador, abort ni uso de `next_page`. | Observado; inferencia: peticiones frecuentes, posibles resultados fuera de orden y solo primera página. |
| Resultados al vaciar el texto | `fetchCards` retorna antes de limpiar resultados; `searchInitiated` no vuelve a false. | Observado: se pueden conservar resultados previos al borrar la consulta. |
| Tratamiento limitado de error HTTP | Buscar no evalúa `response.ok`; JSON sin `data` produce lista vacía. | Observado: errores pueden presentarse como ausencia de resultados. |
| Imágenes de cartas limitadas | Condición `image_uris.small`, sin rama `card_faces`; detalle recibe `art_crop`. | Observado: no hay representación alternativa implementada para todas las caras/imágenes. |
| SVG en Image | Símbolos cargados con `require('../images/*.svg')`; [Babel](../Alpha%20Ruby/babel.config.js) no declara transformador SVG específico. | Observado en código. Compatibilidad visual por plataforma no verificada; no se afirma fallo universal. |
| Problemas previos de imágenes/editor | [apuntes.txt](../Alpha%20Ruby/apuntes.txt). | Nota histórica: el autor registró dificultades con imágenes en su navegador y ajustes pendientes. No es una prueba actual. |

## Límites de verificación

No hay suite de pruebas del producto ni CI versionada. Los [scripts backend](../Alpha%20Ruby/backend/package.json) de test son placeholders que fallan y el [cliente](../Alpha%20Ruby/package.json) no define test/lint/build propios. El nombre de entrada backend `index.js` no corresponde al `server.js` existente. La versión Node no está fijada.

No se comprobaron servicios externos, una base real, representación SVG en plataformas ni arranque Expo. Esas incertidumbres se mantienen explícitas en [desarrollo](desarrollo.md); no son evidencia de fallo en todos los entornos. Los arreglos funcionales deben verificarse en cambios separados antes de retirar estos hallazgos.
