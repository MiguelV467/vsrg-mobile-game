import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const COLUMN_WIDTH = width / 4;
const NOTE_HEIGHT = 60;
const HIT_ZONE_HEIGHT = 100;
const SCROLL_SPEED = 5; // pixels per frame
const PERFECT_THRESHOLD = 30;
const GOOD_THRESHOLD = 60;

// Beatmap de prueba: ~30 segundos de notas
// Cada nota: { time: milliseconds, column: 0-3 }
const BEATMAP = [
  // Intro (0-5s)
  { time: 500, column: 0 },
  { time: 1000, column: 1 },
  { time: 1500, column: 2 },
  { time: 2000, column: 3 },
  { time: 2500, column: 1 },
  { time: 3000, column: 2 },
  { time: 3500, column: 0 },
  { time: 4000, column: 3 },
  { time: 4500, column: 1 },
  { time: 5000, column: 2 },
  
  // Sección principal (5-20s)
  { time: 5500, column: 0 },
  { time: 5500, column: 2 },
  { time: 6000, column: 1 },
  { time: 6000, column: 3 },
  { time: 6500, column: 0 },
  { time: 7000, column: 3 },
  { time: 7500, column: 1 },
  { time: 7500, column: 2 },
  { time: 8000, column: 0 },
  { time: 8500, column: 3 },
  { time: 9000, column: 1 },
  { time: 9500, column: 2 },
  { time: 10000, column: 0 },
  { time: 10000, column: 3 },
  { time: 10500, column: 1 },
  { time: 11000, column: 2 },
  { time: 11500, column: 0 },
  { time: 12000, column: 3 },
  { time: 12500, column: 1 },
  { time: 12500, column: 2 },
  { time: 13000, column: 0 },
  { time: 13500, column: 3 },
  { time: 14000, column: 1 },
  { time: 14500, column: 2 },
  { time: 15000, column: 0 },
  { time: 15000, column: 3 },
  { time: 15500, column: 1 },
  { time: 16000, column: 2 },
  { time: 16500, column: 0 },
  { time: 17000, column: 3 },
  { time: 17500, column: 1 },
  { time: 17500, column: 2 },
  { time: 18000, column: 0 },
  { time: 18500, column: 3 },
  { time: 19000, column: 1 },
  { time: 19500, column: 2 },
  { time: 20000, column: 0 },
  { time: 20000, column: 3 },
  
  // Sección rápida (20-25s)
  { time: 20500, column: 1 },
  { time: 20750, column: 2 },
  { time: 21000, column: 0 },
  { time: 21250, column: 3 },
  { time: 21500, column: 1 },
  { time: 21750, column: 2 },
  { time: 22000, column: 0 },
  { time: 22250, column: 3 },
  { time: 22500, column: 1 },
  { time: 22750, column: 2 },
  { time: 23000, column: 0 },
  { time: 23250, column: 3 },
  { time: 23500, column: 1 },
  { time: 23750, column: 2 },
  { time: 24000, column: 0 },
  { time: 24250, column: 3 },
  { time: 24500, column: 1 },
  { time: 24750, column: 2 },
  { time: 25000, column: 0 },
  
  // Final (25-30s)
  { time: 25500, column: 0 },
  { time: 25500, column: 1 },
  { time: 25500, column: 2 },
  { time: 25500, column: 3 },
  { time: 26000, column: 1 },
  { time: 26000, column: 2 },
  { time: 26500, column: 0 },
  { time: 26500, column: 3 },
  { time: 27000, column: 1 },
  { time: 27000, column: 2 },
  { time: 27500, column: 0 },
  { time: 27500, column: 3 },
  { time: 28000, column: 1 },
  { time: 28500, column: 2 },
  { time: 29000, column: 0 },
  { time: 29500, column: 3 },
  { time: 30000, column: 0 },
  { time: 30000, column: 1 },
  { time: 30000, column: 2 },
  { time: 30000, column: 3 },
];

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [judgement, setJudgement] = useState('');
  const [notes, setNotes] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [stats, setStats] = useState({ perfect: 0, good: 0, miss: 0 });
  
  const animationFrame = useRef(null);
  const startTime = useRef(null);
  const spawnedNotes = useRef(new Set());
  const activeNotes = useRef([]);
  const nextNoteIndex = useRef(0);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      startTime.current = Date.now();
      spawnedNotes.current = new Set();
      nextNoteIndex.current = 0;
      gameLoop();
    }
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [gameStarted, gameOver]);

  const gameLoop = () => {
    const currentTime = Date.now() - startTime.current;
    setGameTime(currentTime);

    // Spawn new notes
    while (
      nextNoteIndex.current < BEATMAP.length &&
      BEATMAP[nextNoteIndex.current].time <= currentTime + 2000 // Spawn 2s ahead
    ) {
      const noteData = BEATMAP[nextNoteIndex.current];
      const noteId = `${noteData.time}-${noteData.column}`;
      
      if (!spawnedNotes.current.has(noteId)) {
        const newNote = {
          id: noteId,
          column: noteData.column,
          y: -NOTE_HEIGHT,
          targetTime: noteData.time,
          hit: false,
        };
        activeNotes.current.push(newNote);
        spawnedNotes.current.add(noteId);
      }
      nextNoteIndex.current++;
    }

    // Update note positions
    activeNotes.current = activeNotes.current.filter(note => {
      if (note.hit) return false;
      
      note.y += SCROLL_SPEED;
      
      // Auto-miss if note passes hit zone
      if (note.y > height - HIT_ZONE_HEIGHT + NOTE_HEIGHT + 50) {
        handleMiss();
        return false;
      }
      
      return true;
    });

    setNotes([...activeNotes.current]);

    // Check game over (all notes played)
    if (currentTime > 32000 && activeNotes.current.length === 0) {
      setGameOver(true);
      return;
    }

    animationFrame.current = requestAnimationFrame(gameLoop);
  };

  const handleKeyPress = (column) => {
    if (!gameStarted || gameOver) return;

    const hitZoneTop = height - HIT_ZONE_HEIGHT;
    const hitZoneBottom = height - HIT_ZONE_HEIGHT + NOTE_HEIGHT;

    // Find closest note in this column
    let closestNote = null;
    let closestDistance = Infinity;

    activeNotes.current.forEach(note => {
      if (note.column === column && !note.hit) {
        const noteCenter = note.y + NOTE_HEIGHT / 2;
        const hitZoneCenter = hitZoneTop + NOTE_HEIGHT / 2;
        const distance = Math.abs(noteCenter - hitZoneCenter);
        
        if (distance < closestDistance && note.y >= hitZoneTop - 50 && note.y <= hitZoneBottom + 50) {
          closestDistance = distance;
          closestNote = note;
        }
      }
    });

    if (closestNote) {
      closestNote.hit = true;
      
      if (closestDistance < PERFECT_THRESHOLD) {
        handleHit('PERFECT', 300);
      } else if (closestDistance < GOOD_THRESHOLD) {
        handleHit('GOOD', 100);
      } else {
        handleHit('OK', 50);
      }
    }
  };

  const handleHit = (judgementText, points) => {
    setScore(prev => prev + points);
    setCombo(prev => prev + 1);
    setJudgement(judgementText);
    
    if (judgementText === 'PERFECT') {
      setStats(prev => ({ ...prev, perfect: prev.perfect + 1 }));
    } else if (judgementText === 'GOOD') {
      setStats(prev => ({ ...prev, good: prev.good + 1 }));
    }
    
    setTimeout(() => setJudgement(''), 300);
  };

  const handleMiss = () => {
    setCombo(0);
    setJudgement('MISS');
    setStats(prev => ({ ...prev, miss: prev.miss + 1 }));
    setTimeout(() => setJudgement(''), 300);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCombo(0);
    setGameTime(0);
    setGameOver(false);
    setStats({ perfect: 0, good: 0, miss: 0 });
    activeNotes.current = [];
    spawnedNotes.current = new Set();
    nextNoteIndex.current = 0;
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setCombo(0);
    setGameTime(0);
    setGameOver(false);
    setNotes([]);
    setStats({ perfect: 0, good: 0, miss: 0 });
  };

  if (!gameStarted) {
    return (
      <View style={styles.menuContainer}>
        <StatusBar hidden />
        <Text style={styles.title}>VSRG 4K</Text>
        <Text style={styles.subtitle}>Juego de Ritmo Móvil</Text>
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>INICIAR JUEGO</Text>
        </TouchableOpacity>
        <View style={styles.instructions}>
          <Text style={styles.instructionText}>• 4 columnas, 4 botones</Text>
          <Text style={styles.instructionText}>• Toca cuando la nota llegue abajo</Text>
          <Text style={styles.instructionText}>• Duración: ~30 segundos</Text>
        </View>
      </View>
    );
  }

  if (gameOver) {
    const totalNotes = stats.perfect + stats.good + stats.miss;
    const accuracy = totalNotes > 0 ? ((stats.perfect + stats.good) / totalNotes * 100).toFixed(1) : 0;
    
    return (
      <View style={styles.menuContainer}>
        <StatusBar hidden />
        <Text style={styles.title}>¡JUEGO TERMINADO!</Text>
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>Score: {score}</Text>
          <Text style={styles.resultText}>Precisión: {accuracy}%</Text>
          <Text style={styles.statText}>Perfect: {stats.perfect}</Text>
          <Text style={styles.statText}>Good: {stats.good}</Text>
          <Text style={styles.statText}>Miss: {stats.miss}</Text>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={resetGame}>
          <Text style={styles.startButtonText}>VOLVER AL MENÚ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* HUD */}
      <View style={styles.hud}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.comboText}>Combo: {combo}x</Text>
        <Text style={styles.timeText}>{Math.floor(gameTime / 1000)}s</Text>
      </View>

      {/* Judgement Display */}
      {judgement !== '' && (
        <View style={styles.judgementContainer}>
          <Text style={[
            styles.judgementText,
            judgement === 'PERFECT' && styles.perfectText,
            judgement === 'GOOD' && styles.goodText,
            judgement === 'MISS' && styles.missText,
          ]}>
            {judgement}
          </Text>
        </View>
      )}

      {/* Game Area */}
      <View style={styles.gameArea}>
        {/* Columns */}
        {[0, 1, 2, 3].map(col => (
          <View key={col} style={styles.column}>
            {/* Column separator */}
            <View style={styles.columnBorder} />
          </View>
        ))}

        {/* Notes */}
        {notes.map(note => (
          <View
            key={note.id}
            style={[
              styles.note,
              {
                left: note.column * COLUMN_WIDTH + 5,
                top: note.y,
              },
            ]}
          />
        ))}

        {/* Hit Zone */}
        <View style={styles.hitZone} />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {[0, 1, 2, 3].map(col => (
          <TouchableOpacity
            key={col}
            style={styles.key}
            onPress={() => handleKeyPress(col)}
            activeOpacity={0.6}
          >
            <Text style={styles.keyText}>{col + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 10,
    textShadowColor: '#00ffff',
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  instructions: {
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#aaa',
    marginVertical: 5,
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 40,
  },
  scoreText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  comboText: {
    fontSize: 20,
    color: '#ffff00',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  judgementContainer: {
    position: 'absolute',
    top: height * 0.3,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  judgementText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  perfectText: {
    color: '#00ffff',
    textShadowColor: '#00ffff',
    textShadowRadius: 10,
  },
  goodText: {
    color: '#00ff00',
  },
  missText: {
    color: '#ff0000',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  column: {
    position: 'absolute',
    width: COLUMN_WIDTH,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  columnBorder: {
    position: 'absolute',
    right: 0,
    width: 1,
    height: '100%',
    backgroundColor: '#333',
  },
  note: {
    position: 'absolute',
    width: COLUMN_WIDTH - 10,
    height: NOTE_HEIGHT,
    backgroundColor: '#00ffff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#00aaaa',
  },
  hitZone: {
    position: 'absolute',
    bottom: HIT_ZONE_HEIGHT,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#ff0000',
    opacity: 0.7,
  },
  controls: {
    flexDirection: 'row',
    height: HIT_ZONE_HEIGHT,
    backgroundColor: '#111',
  },
  key: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#222',
  },
  keyText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resultText: {
    fontSize: 28,
    color: '#00ffff',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statText: {
    fontSize: 20,
    color: '#fff',
    marginVertical: 3,
  },
});
