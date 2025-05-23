# Cómo obtener tus credenciales de API de Battle.net

Sigue estos pasos para obtener tus credenciales y configurar la aplicación para usar tus datos reales de Diablo 3:

## 1. Crear una cuenta de desarrollador

1. Ve a [https://develop.battle.net/](https://develop.battle.net/)
2. Inicia sesión con tu cuenta de Battle.net (la misma que usas para jugar)
3. Si es tu primera vez en el portal, acepta los términos del servicio

## 2. Crear una aplicación cliente

1. Una vez que inicies sesión, haz clic en "API Clients" en el menú superior
2. Haz clic en el botón "Create New Client"
3. Completa el formulario con estos datos:
   - **Name**: Diablo 3 Profile Viewer (o cualquier nombre descriptivo)
   - **Redirect URIs**: http://localhost:4200 (si estás en desarrollo local)
   - **Service URL**: (opcional) Puedes dejarlo en blanco para pruebas
   - **Description**: Aplicación personal para ver mis personajes de Diablo 3

## 3. Obtener tus credenciales

1. Después de crear el cliente, verás tus credenciales:
   - **Client ID**: Copia este valor
   - **Client Secret**: Haz clic en "Show" para verlo y copiarlo

## 4. Configurar la aplicación

1. Abre src/environments/environment.ts y environment.prod.ts
2. Reemplaza los valores de battleNetClientId y battleNetClientSecret con tus credenciales

## 5. Configurar tu BattleTag

1. Abre src/app/services/diablo.service.ts
2. Encuentra la variable `yourBattleTag` y reemplázala con tu BattleTag real (incluye el # y el número)
3. Encuentra la variable `region` y configúrala según tu región (eu, us, kr, tw)

## 6. Reiniciar la aplicación

Si la aplicación ya está en ejecución, reiníciala para aplicar los cambios:

```bash
ng serve
```

Ahora deberías ver tus personajes reales de Diablo 3 en la aplicación.

## Solución de problemas

Si obtienes errores 401 después de configurar tus credenciales:
- Verifica que hayas copiado correctamente el Client ID y Client Secret
- Asegúrate de que tu BattleTag esté escrito exactamente como aparece en el juego
- Verifica que hayas seleccionado la región correcta
