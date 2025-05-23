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

## Comandos usados

```bash
ng new Blizzard --standalone --routing
ng generate component components/search --standalone
ng generate component components/hero-list --standalone
ng generate component components/hero-card --standalone
ng generate component components/hero-detail --standalone
ng generate service services/battle-net
ng generate interface interfaces/game-interfaces
ng serve
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
npm install
ng serve
```

Abre http://localhost:4200/
