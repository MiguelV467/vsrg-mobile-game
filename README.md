# VSRG Mobile Game 🎵

<div align="center">

![Status](https://img.shields.io/badge/status-functional-success?style=flat-square)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?style=flat-square&logo=react)
![Expo](https://img.shields.io/badge/Expo-52-000020?style=flat-square&logo=expo)

Juego de ritmo vertical (VSRG) estilo **osu!mania 4k** hecho en Expo/React Native para dispositivos móviles.

[🚀 Inicio Rápido](#-instalación-y-ejecución) •
[🎮 Cómo Jugar](#-cómo-jugar) •
[⚙️ Personalizar](#%EF%B8%8F-personalización) •
[🔧 Roadmap](#%EF%B8%8F-roadmap)

</div>

---

## 🎮 Características

✅ **4 columnas verticales** con notas descendentes  
✅ **Sistema de timing** preciso (Perfect, Good, OK, Miss)  
✅ **Beatmap de prueba** de ~30 segundos con 90+ notas  
✅ **Sistema de combos** y puntuación dinámica  
✅ **Controles táctiles** optimizados para móvil  
✅ **Estadísticas finales** con precisión y desglose  
✅ **Totalmente funcional** - sin TODOs ni placeholders  

---

## 🛠️ Tecnologías

- **React Native** 0.76.5
- **Expo SDK** 52
- **Expo AV** (para audio futuro)
- **React Native Gesture Handler**

---

## 🚀 Instalación y Ejecución
### Requisitos previos

- Node.js 18+ 
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- **Android**: [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) o Android Studio
- **iOS**: [Expo Go](https://apps.apple.com/app/expo-go/id982107779) o Xcode

### Pasos de instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/MiguelV467/vsrg-mobile-game.git
cd vsrg-mobile-game

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start
```

### Ejecutar en dispositivo

#### 📱 Opción A: Expo Go (Recomendado)

1. Instala **Expo Go** en tu móvil ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))
2. Escanea el **código QR** que aparece en la terminal
3. ¡El juego se abrirá automáticamente!

#### 🔨 Opción B: Build nativo

```bash
# Android (requiere Android Studio)
npm run android

# iOS (requiere Xcode, solo macOS)
npm run ios
```

---

## 🎮 Cómo jugar

1. 🎮 Presiona **INICIAR JUEGO** en el menú principal
2. 🔽 Las notas caerán por las **4 columnas**
3. 👆 Toca el botón correspondiente cuando la nota llegue a la **línea roja**
4. 🎯 Intenta conseguir el mejor timing para obtener **PERFECT**
5. 🔥 Mantén tu **combo** para maximizar el puntaje

### Sistema de puntuación

| Juicio | Puntos | Tolerancia |
|--------|--------|------------|
| 💙 **PERFECT** | 300 | < 30px |
| 💚 **GOOD** | 100 | < 60px |
| 🟡 **OK** | 50 | > 60px |
| ❌ **MISS** | 0 | Combo perdido |

---

## 📋 Estructura del proyecto

```
vsrg-mobile-game/
├── App.js              # 🎮 Código principal del juego
├── app.json            # ⚙️ Configuración de Expo
├── package.json        # 📦 Dependencias
├── babel.config.js     # 🔧 Config de Babel
├── assets/             # 🇮Images y recursos
│   └── README.md       # Guía de assets
├── QUICKSTART.md       # 🚀 Guía rápida
└── README.md           # 📖 Este archivo
```

---

## ⚙️ Personalización

### 🎼 Modificar el beatmap

Edita el array `BEATMAP` en `App.js`:

```javascript
const BEATMAP = [
  { time: 500, column: 0 },   // Tiempo en ms, columna 0-3
  { time: 1000, column: 1 },
  { time: 1500, column: 2 },  // Añade más notas aquí
];
```

### ⚡ Ajustar dificultad

Modifica las constantes en `App.js`:

```javascript
const SCROLL_SPEED = 5;           // ⬆️ Velocidad de las notas (prueba con 7 o 10)
const PERFECT_THRESHOLD = 30;      // 🎯 Tolerancia para PERFECT
const GOOD_THRESHOLD = 60;         // 💚 Tolerancia para GOOD
```

### 🎨 Cambiar colores

En el objeto `styles` de `App.js`:

```javascript
note: {
  backgroundColor: '#00ffff', // Color de las notas
  // Prueba: '#ff00ff' (magenta), '#ffff00' (amarillo), '#ff0000' (rojo)
}
```

### 🎵 Agregar música

1. Coloca tu archivo de audio en `assets/` (ej: `song.mp3`)
2. En `App.js`, agrega:

```javascript
import { Audio } from 'expo-av';

// Dentro de startGame():
const { sound } = await Audio.Sound.createAsync(
  require('./assets/song.mp3')
);
await sound.playAsync();
```

---

## 🔧 Roadmap

### Versión 1.1 (Próximamente)
- [ ] 🎵 Soporte para audio/música de fondo sincronizada
- [ ] 📊 Tabla de mejores puntuaciones (local)
- [ ] ✨ Efectos de partículas para PERFECT hits
- [ ] 🔊 Efectos de sonido (hitsounds)

### Versión 1.2
- [ ] 📂 Parser de archivos `.osu` (importar beatmaps de osu!mania)
- [ ] 🎹 Modos 6k y 7k
- [ ] 🎨 Sistema de skins personalizable
- [ ] ⚙️ Calibración de offset de audio

### Versión 2.0
- [ ] ☁️ Subida de puntuaciones online
- [ ] 🏆 Sistema de logros
- [ ] 📈 Historial de progreso
- [ ] 👥 Modo multijugador

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
Modifica en `App.js`:
```javascript
const HIT_ZONE_HEIGHT = 120; // Incrementa si los botones son pequeños
```

### Las notas van muy rápido/lento
```javascript
const SCROLL_SPEED = 3; // Reduce para más lento, aumenta para más rápido
```

---

## 📚 Recursos Útiles

- [Documentación de Expo](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Formato de archivos .osu](https://osu.ppy.sh/wiki/en/Client/File_formats/osu_%28file_format%29)
- [Guía de mapping de osu!mania](https://osu.ppy.sh/wiki/es/Guides/osu!mania_mapping_guide)

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas o mejoras:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 👤 Autor

**MiguelV467**

- GitHub: [@MiguelV467](https://github.com/MiguelV467)
- Proyecto: [vsrg-mobile-game](https://github.com/MiguelV467/vsrg-mobile-game)

---

## 📜 Licencia

MIT License - Libre de usar, modificar y distribuir.

Ver [LICENSE](LICENSE) para más detalles.

---

<div align="center">

### ¡Disfruta jugando! 🎶🎵

Si te gusta el proyecto, ¡dale una ⭐️ en GitHub!

[Reportar Bug](https://github.com/MiguelV467/vsrg-mobile-game/issues) •
[Solicitar Feature](https://github.com/MiguelV467/vsrg-mobile-game/issues) •
[Ver Roadmap](#-roadmap)

</div>
