# Proyecto Blizzard - Búsqueda de Héroes

Esta aplicación web te permite buscar y ver información de héroes de Blizzard Entertainment. Está hecha con Angular y tiene una interfaz fácil de usar.

## Lo que hace la aplicación

- Buscar héroes por su nombre
- Ver los detalles de cada héroe
- Interfaz fácil de usar y que se adapta a cualquier pantalla
- Diseño moderno inspirado en Blizzard

## Lo que he usado para hacerla

- Angular 17
- TypeScript
- SCSS
- HTML5

## Lo que he aprendido y aplicado

1. Componentes
   - Un componente para buscar héroes
   - Un componente para mostrar la lista de héroes

2. Comunicación entre componentes
   - @Input para recibir datos
   - @Output para enviar eventos

3. Directivas de Angular
   - *ngIf para mostrar u ocultar elementos
   - *ngFor para mostrar listas

4. Navegación
   - Rutas configuradas en routing.module
   - Enlaces con routerLink

5. Interfaces
   - Una para definir cómo es un héroe
   - Otra para los resultados de búsqueda

6. Llamadas a la API
   - HttpClient para comunicarse con el servidor
   - Servicios para organizar el código

7. Observables
   - RxJS para manejar los datos
   - Operadores para transformar la información

## Cómo probar la aplicación

1. Instalar lo necesario
   npm install

2. Iniciar la aplicación
   ng serve

3. Abrir en el navegador
   http://localhost:4200

## Cómo está organizado el proyecto

src/
├── app/
│   ├── components/          # Componentes de la aplicación
│   ├── services/           # Servicios para la API
│   └── models/             # Interfaces y tipos
├── assets/                 # Imágenes y recursos
└── styles.scss            # Estilos de la aplicación

## Comandos que he usado

1. Crear el proyecto
   ng new blizzard

2. Crear los componentes
   ng generate component components/hero-search
   ng generate component components/hero-list

3. Crear el servicio
   ng generate service services/hero

4. Compilar para producción
   ng build --configuration production

## Autor

Alexandro Suciu Peici



