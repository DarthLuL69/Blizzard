# Endpoints útiles de la API de Diablo 3

## APIs de Perfil
Estas APIs proporcionan datos sobre perfiles de jugadores y sus héroes.

### Perfil de Cuenta
`GET /d3/profile/{battleTag}/`
- Obtiene información sobre la cuenta, incluyendo la lista de héroes

### Información del Héroe
`GET /d3/profile/{battleTag}/hero/{heroId}`
- Obtiene información detallada sobre un héroe específico

### Elementos del Héroe
`GET /d3/profile/{battleTag}/hero/{heroId}/items`
- Obtiene los elementos equipados por un héroe

### Seguidores del Héroe
`GET /d3/profile/{battleTag}/hero/{heroId}/followers`
- Obtiene información sobre los seguidores del héroe

## APIs de Datos del Juego
Estas APIs proporcionan datos generales del juego.

### Índice de Temporadas
`GET /data/d3/season/`
- Obtiene la lista de temporadas disponibles

### Tablas de Clasificación de Temporada
`GET /data/d3/season/{seasonId}/leaderboard/{leaderboardId}`
- Obtiene los rankings de una temporada específica

### Datos de Eras
`GET /data/d3/era/{eraId}`
- Obtiene información sobre una era específica

### Elementos
`GET /data/d3/item/{itemSlugAndId}`
- Obtiene información sobre un elemento específico

### Habilidades de Clases
`GET /data/d3/hero/{classSlug}/skill/{skillSlug}`
- Obtiene información sobre una habilidad específica

## Parámetros Comunes
- `locale` - Especifica el idioma de la respuesta (ej: "es_ES")
- `region` - Especifica la región del servidor (ej: "eu" para Europa)

## Más Información
Para más detalles, consulta la [Documentación Oficial de la API de Diablo 3](https://develop.battle.net/documentation/diablo-3).
