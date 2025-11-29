# VSRG Mobile Game 🎵

Juego de ritmo vertical (VSRG) estilo osu!mania 4k hecho en Expo/React Native para Android.

## 🎮 Características

- 4 columnas verticales
- Sistema de timing y puntuación
- Beatmap de prueba de ~30 segundos
- Detección de golpes (Perfect, Good, Miss)
- Sistema de combos
- Controles táctiles optimizados para móvil

## 🛠️ Tecnologías

- React Native
- Expo SDK 52
- Expo AV (audio)
- React Native Gesture Handler

## 🚀 Instalación y Ejecución

### Requisitos previos

- Node.js 18 o superior
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Para Android: Expo Go app o Android Studio

### Pasos para correr el proyecto

1. **Clonar el repositorio:**

```bash
git clone https://github.com/MiguelV467/vsrg-mobile-game.git
cd vsrg-mobile-game
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo:**

```bash
npm start
```

4. **Correr en Android:**

**Opción A - Expo Go (Más rápido):**
- Instala [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) en tu Android
- Escanea el QR que aparece en la terminal

**Opción B - Android Studio (Compilación completa):**
```bash
npm run android
```

## 🎮 Cómo jugar

1. Presiona **INICIAR JUEGO** en el menú principal
2. Las notas caerán por las 4 columnas
3. Toca el botón correspondiente cuando la nota llegue a la línea roja
4. Intenta conseguir el mejor timing para obtener **PERFECT**
5. Mantén tu combo para maximizar el puntaje

### Sistema de puntuación
- **PERFECT**: 300 puntos (timing < 30px)
- **GOOD**: 100 puntos (timing < 60px)
- **OK**: 50 puntos
- **MISS**: 0 puntos y se pierde el combo

## 📝 Estructura del proyecto

```
vsrg-mobile-game/
├── App.js              # Código principal del juego
├── app.json            # Configuración de Expo
├── package.json        # Dependencias
├── assets/             # Imágenes y recursos (próximamente)
└── README.md           # Este archivo
```

## ⚙️ Personalización

### Modificar el beatmap

Edita el array `BEATMAP` en `App.js`:

```javascript
const BEATMAP = [
  { time: 500, column: 0 },   // tiempo en ms, columna 0-3
  { time: 1000, column: 1 },
  // ... añade más notas
];
```

### Ajustar dificultad

Modifica las constantes en `App.js`:

```javascript
const SCROLL_SPEED = 5;           // Velocidad de las notas
const PERFECT_THRESHOLD = 30;      // Tolerancia para PERFECT
const GOOD_THRESHOLD = 60;         // Tolerancia para GOOD
```

## 🛣️ Roadmap

- [ ] Soporte para audio/música de fondo
- [ ] Parser de archivos .osu
- [ ] Modos 6k y 7k
- [ ] Sistema de skins personalizable
- [ ] Tabla de puntuaciones
- [ ] Efectos visuales mejorados
- [ ] Calibración de offset

## 👤 Autor

MiguelV467

## 📜 Licencia

MIT License - libre de usar y modificar

---

¡Disfruta jugando! 🎶🎵
