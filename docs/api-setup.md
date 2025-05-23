# Cómo obtener las claves de la API de Battle.net

Para que la aplicación funcione correctamente, necesitas obtener credenciales de desarrollador de Battle.net:

## Pasos para obtener las claves de API

1. **Crear una cuenta de desarrollador**:
   - Visita [https://develop.battle.net/](https://develop.battle.net/)
   - Inicia sesión con tu cuenta de Blizzard (o crea una si no tienes)

2. **Crear un cliente de API**:
   - Una vez dentro del portal de desarrolladores, haz clic en "API Clients" en el menú superior
   - Haz clic en "Create New Client"
   - Completa la información requerida:
     * Nombre del Cliente: "Blizzard API Explorer" (o el nombre que prefieras)
     * Tipo de servicio: selecciona "API" 
     * Redirect URLs: Para desarrollo local puedes usar `http://localhost:4200/` (opcional si no usas OAuth)
     * Web Site: URL de tu proyecto o deja en blanco para desarrollo
     * Describe brevemente el propósito de tu aplicación

3. **Obtener las credenciales**:
   - Después de crear el cliente, se te proporcionará:
     * Un **Client ID** 
     * Un **Client Secret**

4. **Configurar la aplicación**:
   - Copia estas credenciales en los archivos de entorno:
     * `src/environments/environment.ts` (para desarrollo)
     * `src/environments/environment.prod.ts` (para producción)

## Ejemplo de configuración

Actualiza los archivos de entorno con tus credenciales:

```typescript
export const environment = {
  production: false, // o true para environment.prod.ts
  battleNetClientId: 'TU_CLIENT_ID_AQUÍ',
  battleNetClientSecret: 'TU_CLIENT_SECRET_AQUÍ'
};
```

## Limitaciones y consideraciones

- La API de Blizzard tiene límites de tasa (rate limits). Para aplicaciones de producción, considera implementar caché.
- Mantén tu Client Secret seguro y nunca lo expongas en código del lado del cliente.
- Para una aplicación en producción, deberías manejar estas credenciales desde un backend seguro.

## Recursos adicionales

- [Documentación oficial de la API de Battle.net](https://develop.battle.net/documentation)
- [Guía de autenticación](https://develop.battle.net/documentation/guides/getting-started)
