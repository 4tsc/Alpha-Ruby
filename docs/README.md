# Documentación técnica de Alpha Ruby

Análisis estático del repositorio, revisado el **25 de septiembre de 2026**. Alpha Ruby es un prototipo de aplicación para buscar cartas de Magic y gestionar mazos. El código permite reconstruir la navegación y los contratos pretendidos, pero el backend incluido solo implementa registro y no satisface los flujos completos del cliente.

## Guía de lectura

| Documento | Contenido |
| --- | --- |
| [Arquitectura](arquitectura.md) | Inventario, tecnologías, pantallas, estado y diagramas de componentes y navegación. |
| [API y datos](api-y-datos.md) | Todos los destinos HTTP del código, payloads, respuestas y modelo conceptual. |
| [Flujos](flujos.md) | Registro/login y búsqueda/asociación de cartas con diagramas de secuencia. |
| [Desarrollo](desarrollo.md) | Directorios, comandos existentes, configuración y requisitos pendientes. |
| [Limitaciones](limitaciones.md) | Hallazgos con fuentes, impacto y grado de certeza. |

## Cómo interpretar esta documentación

- **Observado:** se desprende directamente de archivos locales enlazados.
- **Esperado por el cliente:** una petición o formato que el cliente intenta utilizar; no prueba que exista un servidor compatible.
- **Inferido:** relación conceptual deducida de los contratos; no equivale a un esquema físico de base de datos.
- **No verificado:** requiere ejecución, infraestructura o recursos externos que no se comprobaron en este análisis.

Los cinco diagramas están escritos en bloques `mermaid` editables: dos en arquitectura, uno en API y datos y dos en flujos. Su lectura requiere un visor Markdown con soporte Mermaid. El texto que acompaña cada diagrama explica sus límites.

## Alcance de la revisión

Se contrastaron inventario versionado, imports, navegación, handlers, llamadas `fetch`, rutas Express, manifiestos y configuración. Se incluyeron respaldos, código desconectado, estilos, recursos, lockfiles y archivos de OpenSpec. No se ejecutaron Expo, MySQL ni llamadas a Scryfall; no se verificó un despliegue ni una API alojada fuera del repositorio.

La [propuesta](../openspec/changes/documentar-arquitectura-alpha-ruby/proposal.md) y el [diseño](../openspec/changes/documentar-arquitectura-alpha-ruby/design.md) explican el alcance de este cambio documental. Para mantener estos documentos, actualizar contratos junto a cambios de `fetch` o rutas, navegación junto a `App.js`, y limitaciones cuando una corrección haya sido comprobada.

## Resultado de verificación documental

- Se comprobaron los destinos de los enlaces locales de los siete archivos Markdown publicados, los bloques de código y la ausencia de caracteres de sustitución y espacios finales.
- La matriz cubre los once destinos HTTP distintos encontrados, incluidos los de la pantalla de perfil desconectada. Los nueve módulos de `src/screens/` están referenciados en arquitectura.
- Se revisaron los cinco diagramas Mermaid: tipos de diagrama, cierre de bloques de secuencia, participantes, flechas y correspondencia con los handlers. No se dispone de `mmdc`, Mermaid ni Mermaid CLI instalados localmente: **no se renderizaron ni se validaron con un parser Mermaid**. La comprobación fue estructural y manual, no visual.
- `openspec validate documentar-arquitectura-alpha-ruby --strict` y `git diff --check` finalizaron correctamente. Los cambios de producto se limitan a README y documentación; no se modificaron fuentes, manifiestos ni configuración de ejecución.
- No se ejecutaron pruebas del producto; el alcance fue documental y el repositorio no incluye una suite operativa.

[Volver al README del proyecto](../README.md).
