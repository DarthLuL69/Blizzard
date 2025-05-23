# Guía de solución de problemas

## Errores comunes y sus soluciones

### Error 401 (Unauthorized) al conectar con la API

Este error significa que la autenticación con la API de Battle.net ha fallado.

**Causas posibles:**
- Credenciales de API incorrectas o faltantes
- Client ID o Client Secret mal formateados
- Permisos insuficientes para la aplicación registrada

**Soluciones:**
1. Verifica que hayas copiado correctamente las credenciales de API en `environment.ts`
2. Asegúrate de que tu aplicación tenga los permisos necesarios en el portal de desarrolladores
3. Regenera las credenciales si sospechas que pueden estar comprometidas

### TypeError: Cannot read properties of undefined

Este error ocurre cuando intentas acceder a una propiedad de un objeto que es undefined.

**Causas posibles:**
- Datos incompletos o con formato inesperado de la API
- Intentar renderizar datos antes de que estén disponibles
- Estructura de datos diferente a la esperada

**Soluciones:**
1. Usa el operador de encadenamiento opcional (`?.`) para accesos seguros
2. Añade comprobaciones explícitas (`*ngIf`) antes de usar los datos
3. Utiliza valores predeterminados para casos en que falten datos

### Errores CORS (Cross-Origin Resource Sharing)

Si ves errores relacionados con CORS, significa que hay restricciones de seguridad para acceder a la API desde tu dominio.

**Soluciones:**
1. Para desarrollo local, usa extensiones de navegador que modifiquen los encabezados CORS (solo para pruebas)
2. La API de Battle.net generalmente permite solicitudes desde cualquier origen para APIs públicas con autenticación correcta
3. Verifica que estés usando HTTPS si es necesario

### Límites de tasa (Rate Limits) excedidos

La API de Battle.net tiene límites en el número de solicitudes que puedes hacer en un período.

**Soluciones:**
1. Implementa una estrategia de caché para reducir solicitudes repetidas
2. Añade retrasos entre solicitudes consecutivas
3. Muestra un mensaje amigable al usuario cuando se alcancen los límites

## Herramientas de diagnóstico

### Consola del navegador
La consola del navegador (F12) muestra errores detallados y las respuestas de la API.

### Panel de red (Network)
El panel de red en las herramientas de desarrollo del navegador te permite ver:
- Solicitudes HTTP realizadas
- Códigos de estado de respuesta
- Cuerpos de respuesta completos
- Encabezados de solicitud y respuesta

### Depuración de Angular
Para una depuración más profunda:
1. Usa la extensión "Augury" (para Chrome) o herramientas similares
2. Añade `debugger;` en tu código TypeScript donde quieras pausar la ejecución
3. Usa `console.log()` estratégicamente para ver el estado de variables clave
