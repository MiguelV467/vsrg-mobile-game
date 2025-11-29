# 🎮 VSRG Mobile Game - Guía Rápida

## ¿Qué es esto?

Un juego de ritmo vertical estilo osu!mania 4k, completamente funcional y listo para usar en Android. Simple, rápido y divertido.

## 🚀 Inicio Rápido (3 pasos)

### 1. Clonar e instalar

```bash
git clone https://github.com/MiguelV467/vsrg-mobile-game.git
cd vsrg-mobile-game
npm install
```

### 2. Iniciar

```bash
npm start
```

### 3. Correr en tu móvil

**Método 1: Expo Go (Recomendado - Más fácil)**

1. Descarga [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) en tu Android
2. Escanea el código QR que aparece en la terminal
3. ¡Listo! El juego se abrirá automáticamente

**Método 2: Build completo**

```bash
npm run android
```

(Requiere Android Studio y emulador/dispositivo conectado)

---

## 🔧 Personalización Rápida

### Cambiar velocidad de las notas

Abre `App.js` y modifica:

```javascript
const SCROLL_SPEED = 5; // Incrementa para más velocidad (ej: 7, 10)
```

### Agregar más notas al beatmap

Al final del array `BEATMAP` en `App.js`:

```javascript
const BEATMAP = [
  // ... notas existentes
  { time: 31000, column: 0 }, // Nota en columna 1 a los 31s
  { time: 31500, column: 2 }, // Nota en columna 3 a los 31.5s
];
```

### Cambiar colores

Busca `styles` en `App.js` y cambia:

```javascript
note: {
  backgroundColor: '#00ffff', // Color de las notas (cyan)
  // ... cambia a '#ff00ff' para magenta, '#ffff00' para amarillo, etc.
}
```

---

## 🐛 Solución de Problemas

### Error: "Expo CLI not found"

```bash
npm install -g expo-cli
```

### Error: "Metro bundler failed"

```bash
npm start -- --reset-cache
```

### El juego se ve cortado en mi móvil

Las dimensiones se ajustan automáticamente, pero si tienes problemas, modifica en `App.js`:

```javascript
const HIT_ZONE_HEIGHT = 100; // Incrementa si los botones son muy pequeños
```

---

## 📱 Requisitos del Dispositivo

- Android 5.0 o superior
- 50 MB de espacio libre
- Pantalla táctil (obviamente 😄)

---

## 📚 Recursos Útiles

- [Documentación de Expo](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Crear beatmaps personalizados](https://osu.ppy.sh/wiki/en/Client/File_formats/osu_%28file_format%29)

---

## ❓ Preguntas Frecuentes

**¿Puedo agregar mi propia música?**

Sí! Necesitas:
1. Agregar el archivo de audio a la carpeta `assets/`
2. Usar `expo-av` para reproducirlo
3. Sincronizar el beatmap con la canción

(Próximamente tutorial completo en el README principal)

**¿Funciona en iOS?**

Sí, el código es compatible con iOS. Solo necesitas:
```bash
npm run ios
```

**¿Puedo hacer 7k en vez de 4k?**

Sí! Cambia:
```javascript
const COLUMN_WIDTH = width / 7; // en vez de / 4
// Y actualiza los botones y columnas en el JSX
```

---

¡Disfruta y comparte tus mejores scores! 🎶
