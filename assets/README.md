# Assets Folder

Esta carpeta contiene los recursos visuales de la aplicación.

## Iconos y Splash Screens

Expo requiere los siguientes archivos de imagen:

- `icon.png` - Icono de la app (1024x1024 px)
- `splash.png` - Pantalla de carga (1284x2778 px)
- `adaptive-icon.png` - Icono adaptativo para Android (1024x1024 px)
- `favicon.png` - Favicon para web (48x48 px)

## Generar iconos automáticamente

Puedes generar estos iconos rápidamente usando herramientas online:

1. **[App Icon Generator](https://www.appicon.co/)** - Sube una imagen y descarga todos los tamaños
2. **[MakeAppIcon](https://makeappicon.com/)** - Generador gratuito de iconos

## Cómo añadir tus propios iconos

1. Crea o descarga tus imágenes
2. Guárdalas en esta carpeta con los nombres exactos mencionados arriba
3. Asegúrate de que tengan las dimensiones correctas
4. Reinicia el servidor de Expo (`npm start`)

## Imágenes de ejemplo incluidas

Por defecto, Expo usará sus iconos placeholder. Para personalizar, simplemente añade tus archivos aquí.

---

## Audio (Próximamente)

Para agregar música al juego:

1. Coloca tu archivo de audio en esta carpeta (ej: `song.mp3`)
2. Reférencialo en `App.js`:

```javascript
import { Audio } from 'expo-av';

const sound = new Audio.Sound();
await sound.loadAsync(require('./assets/song.mp3'));
await sound.playAsync();
```

3. Sincroniza el beatmap con la duración de la canción
