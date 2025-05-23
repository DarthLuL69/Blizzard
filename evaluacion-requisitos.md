# Evaluación de Requisitos

## Requisitos solicitados y su cumplimiento

### 1. Uso de un mínimo de 2 componentes ✅
El proyecto incluye los siguientes componentes:
- SearchComponent
- HeroListComponent
- HeroCardComponent
- HeroDetailComponent

### 2. Uso de @Inputs y @Outputs ✅
- **@Inputs:** Se utilizan en `HeroCardComponent`:
```typescript
@Input() heroId!: number;
@Input() name!: string;
@Input() heroClass!: string;
@Input() level!: number;
@Input() battleTag!: string;
@Input() region: string = 'eu';
```

- **@Outputs:** En la aplicación actual no se están utilizando @Outputs. Recomendación: Agregar al menos un @Output para cumplir completamente este requisito.

### 3. Uso de directivas (mínimo *ngIf y *ngFor) ✅
- **\*ngIf:** Se usa en múltiples componentes, por ejemplo:
  - `<div *ngIf="loading" class="loading-container">` en HeroDetailComponent
  - `<div *ngIf="error" class="error-message">` en SearchComponent

- **\*ngFor:** Se usa en múltiples componentes, por ejemplo:
  - `<option *ngFor="let reg of regions" [value]="reg.value">` en SearchComponent
  - `<app-hero-card *ngFor="let hero of profile.heroes" ...>` en HeroListComponent

### 4. Uso de navegaciones mediante configuración en routing y routerLink ✅
- **Configuración de routing:**
```typescript
export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent
  },
  { 
    path: 'profile', 
    component: HeroListComponent 
  },
  { 
    path: 'hero', 
    component: HeroDetailComponent 
  },
  { path: '**', redirectTo: 'search' }
];
```

- **Uso de routerLink:**
```html
<a [routerLink]="['/hero']" [queryParams]="{battleTag: battleTag, region: region, heroId: heroId}" class="view-details">Ver detalles</a>
```

### 5. Uso de un mínimo de 2 interfaces ✅
Se definen varias interfaces:
```typescript
export interface DiabloHero { ... }
export interface DiabloProfile { ... }
export interface DiabloHeroSummary { ... }
```

### 6. Llamadas a APIs con la clase Http ✅
Se utiliza HttpClient para realizar llamadas a la API de Battle.net:
```typescript
return this.http.post<any>(tokenUrl, body, { headers });
return this.http.get<T>(url, { headers });
```

### 7. Uso de Observables ✅
Se utilizan Observables de RxJS para manejar las respuestas asíncronas:
```typescript
getMyProfile(): Observable<DiabloProfile> { ... }
this.battleNetService.getDiabloProfile(this.battleTag, this.region).subscribe({ ... })
```

### 8. Todas las llamadas deberán realizarse desde servicios ✅
Se utiliza el servicio BattleNetService para centralizar todas las llamadas a la API:
```typescript
@Injectable({
  providedIn: 'root'
})
export class BattleNetService { ... }
```

### 9. README.md con los comandos utilizados y descripciones ✅
El archivo README.md incluye información sobre:
- Funcionalidades
- Estructura del proyecto
- Configuración
- Comandos para ejecutar el proyecto
- Tecnologías utilizadas

## Resumen

✓ 8 de 9 requisitos completados totalmente.
⚠️ 1 requisito parcialmente completado (falta implementar @Output).

## Recomendación

Para cumplir completamente todos los requisitos, se recomienda agregar al menos un @Output en uno de los componentes, por ejemplo, en HeroCardComponent para notificar cuando se selecciona un héroe.
