# Buscador de perfiles de Diablo III

App en Angular para buscar perfiles y héroes de Diablo III usando la API de Battle.net.

## Funcionalidades

- Busca perfiles por BattleTag
- Ve héroes de un jugador
- Detalles de cada héroe (stats, skills)
- Soporta varias regiones (EU, US, KR, TW)

## Requisitos cumplidos

- 4 componentes: Search, HeroList, HeroCard, HeroDetail
- @Input y @Output en HeroCard
- Directivas *ngIf y *ngFor
- Routing y routerLink
- Interfaces: DiabloHero, DiabloProfile, DiabloHeroSummary
- HTTP con HttpClient
- Observables de RxJS
- Servicios para API calls

## Comandos utilizados y descripción

```bash
# Crear un nuevo proyecto Angular con soporte standalone y routing
# --standalone: Usa componentes independientes en lugar de módulos
# --routing: Configura el enrutamiento automáticamente
ng new Blizzard --standalone --routing

# Generar componente de búsqueda como standalone
# Este comando crea archivos .ts, .html y .scss para el componente
# El componente maneja la interfaz de búsqueda por BattleTag
ng generate component components/search --standalone

# Generar componente de lista de héroes
# Este componente muestra todos los héroes de un perfil
ng generate component components/hero-list --standalone

# Generar componente de tarjeta de héroe
# Este componente muestra la información resumida de cada héroe
ng generate component components/hero-card --standalone

# Generar componente de detalle de héroe
# Este componente muestra la información completa de un héroe seleccionado
ng generate component components/hero-detail --standalone

# Generar servicio para comunicación con la API de Battle.net
# Los servicios en Angular permiten compartir lógica entre componentes
# Este servicio maneja autenticación y peticiones a la API
ng generate service services/battle-net

# Generar interfaces para tipar correctamente los datos
# Las interfaces definen la estructura de los datos que recibimos de la API
ng generate interface interfaces/game-interfaces

# Ejecutar servidor de desarrollo en http://localhost:4200
# Con recompilación automática al guardar cambios
ng serve

# Construir la aplicación para producción con optimizaciones
# Los archivos generados estarán en la carpeta dist/
ng build --prod
```

## Estructura

- **SearchComponent**: Buscador de perfiles
- **HeroListComponent**: Lista de héroes
- **HeroCardComponent**: Tarjeta individual
- **HeroDetailComponent**: Detalles de un héroe
- **BattleNetService**: Para hablar con la API

## Configurar

Necesitas credenciales de Battle.net:

```typescript
// environment.ts
export const environment = {
  production: false,
  battleNetClientId: 'TU_CLIENT_ID',
  battleNetClientSecret: 'TU_CLIENT_SECRET'
};
```

Para conseguir credenciales:
1. Ve a [https://develop.battle.net/](https://develop.battle.net/)
2. Crea cuenta de dev
3. Registra una app
4. Copia el Client ID y Secret

## Uso

```bash
# Instalar dependencias del proyecto
npm install

# Iniciar servidor de desarrollo
ng serve
```

Abre http://localhost:4200/

## Tecnologías utilizadas

- **Angular 16+**: Framework principal
- **TypeScript**: Lenguaje de programación tipado
- **RxJS**: Biblioteca para programación reactiva
- **SCSS**: Preprocesador CSS para estilos
- **API de Battle.net**: Para obtener datos de Diablo III
