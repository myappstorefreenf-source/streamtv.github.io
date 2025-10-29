import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { Play, Pause, FastForward, Rewind, ArrowLeft, Tv, Gamepad, Zap, Volume2, VolumeX } from 'lucide-react';

// Constantes para simular el reproductor
const MOCK_DURATION = 3600; // 1 hora en segundos
const SEEK_AMOUNT = 30; // 30 segundos de avance/retroceso

// Función de formato de tiempo (HH:MM:SS)
const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
};

// Componente principal de la aplicación
const App = () => {
  // Estado del reproductor
  const [showPlayer, setShowPlayer] = useState(false); // true: Reproductor, false: Catálogo
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(MOCK_DURATION);
  const [message, setMessage] = useState(''); // Mensajes temporales
  const [volume, setVolume] = useState(50); // Simulación de volumen (0-100)

  // Función para mostrar un mensaje temporal en la UI
  const showTemporaryMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  // Lógica de avance (Seek Forward)
  const seekForward = () => {
    const newTime = Math.min(currentTime + SEEK_AMOUNT, duration);
    setCurrentTime(newTime);
    showTemporaryMessage(`Avanzar ${SEEK_AMOUNT}s a ${formatTime(newTime)}`);
  };

  // Lógica de retroceso (Seek Rewind)
  const seekBackward = () => {
    const newTime = Math.max(currentTime - SEEK_AMOUNT, 0);
    setCurrentTime(newTime);
    showTemporaryMessage(`Retroceder ${SEEK_AMOUNT}s a ${formatTime(newTime)}`);
  };

  // Lógica de Play/Pause (Botón OK/Enter)
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
    showTemporaryMessage(isPlaying ? 'Pausado (OK)' : 'Reproduciendo (OK)');
  };

  // Lógica de Salir/Volver al Catálogo (Botón Back/Escape)
  const exitPlayer = () => {
    setShowPlayer(false);
    setIsPlaying(false);
    setCurrentTime(0); // Reiniciar al salir
    showTemporaryMessage('Volviendo al Catálogo (Volver)...');
  };

  // Lógica de Volumen (Simulación D-Pad Arriba/Abajo)
  const changeVolume = (delta) => {
    setVolume(prev => {
      const newVolume = Math.min(100, Math.max(0, prev + delta));
      showTemporaryMessage(`Volumen: ${newVolume}%`);
      return newVolume;
    });
  };

  // Manejador de eventos de teclado (Simula el control remoto de Android TV)
  const handleKeyDown = useCallback((event) => {
    // Solo responder si el reproductor está visible
    if (!showPlayer) return;

    // Detener la propagación para evitar acciones del navegador (como scroll)
    event.preventDefault();

    switch (event.key) {
      case 'Enter': // Botón OK/Intro
        togglePlayPause();
        break;
      case 'Escape': // Botón Volver/Atrás
        exitPlayer();
        break;
      case 'ArrowRight': // D-Pad Derecha (Avanzar)
        seekForward();
        break;
      case 'ArrowLeft': // D-Pad Izquierda (Retroceder)
        seekBackward();
        break;
      case 'ArrowUp': // D-Pad Arriba (Simular Subir Volumen)
        changeVolume(10);
        break;
      case 'ArrowDown': // D-Pad Abajo (Simular Bajar Volumen)
        changeVolume(-10);
        break;
      default:
        // Ignorar otras teclas
        break;
    }
  }, [showPlayer, isPlaying, currentTime, duration, changeVolume, togglePlayPause, exitPlayer, seekForward, seekBackward]);

  // useEffect para añadir y limpiar el listener del teclado
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // useEffect para simular el progreso del tiempo
  useEffect(() => {
    let interval;
    if (showPlayer && isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (currentTime >= duration) {
       // Si el video termina
       setIsPlaying(false);
       showTemporaryMessage('Reproducción finalizada.');
    }
    return () => clearInterval(interval);
  }, [showPlayer, isPlaying, currentTime, duration]);

  // -------------------------
  // Vistas de la Aplicación
  // -------------------------

  const CatalogView = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center">
        <Tv className="w-8 h-8 mr-3 text-indigo-500" />
        Catálogo de Contenido para TV
      </h2>
      <p className="text-gray-600 mb-8 max-w-md text-center">
        Haz clic para iniciar la reproducción y prueba los controles del **mando a distancia** (simulados con las teclas del teclado).
      </p>
      <button
        onClick={() => { setShowPlayer(true); setIsPlaying(true); showTemporaryMessage('Reproduciendo (Pulsa Enter para pausar)'); }}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 flex items-center"
      >
        <Play className="w-5 h-5 mr-2" />
        Reproducir Película de Prueba
      </button>

      <div className="mt-12 p-4 bg-gray-200 rounded-xl w-full max-w-sm text-sm">
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
            <Gamepad className="w-4 h-4 mr-1"/> Mapeo del Mando de Android TV (Teclado):
        </h3>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>**Enter (Intro / OK):** Play / Pausa</li>
          <li>**Escape (Esc / Volver):** Volver al Catálogo</li>
          <li>**Flecha Derecha (→):** Avanzar ({SEEK_AMOUNT}s)</li>
          <li>**Flecha Izquierda (←):** Retroceder ({SEEK_AMOUNT}s)</li>
          <li>**Flecha Arriba (↑):** Subir Volumen (Simulado)</li>
          <li>**Flecha Abajo (↓):** Bajar Volumen (Simulado)</li>
        </ul>
      </div>
    </div>
  );

  const VolumeIcon = volume === 0
    ? VolumeX
    : volume < 50
    ? Volume2
    : Volume2; // Se podría usar Volume, pero mantendré Volume2 para claridad

  const PlayerView = () => (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black text-white p-8">
      <div className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Reproduciendo en Modo TV
        </h2>

        {/* Simulación de la pantalla de video */}
        <div className="relative aspect-video bg-gray-800 flex items-center justify-center rounded-lg mb-6 overflow-hidden">
          <div className="text-5xl font-extrabold opacity-30">
            {isPlaying ? '▶️ EN VIVO' : '⏸️ PAUSADO'}
          </div>

          {/* Indicador de Volumen */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-lg flex items-center text-sm">
            <VolumeIcon className="w-4 h-4 mr-1"/>
            Volumen: {volume}%
          </div>
          
          {/* Barra de progreso */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-700">
            <div
              className="h-full bg-indigo-500 transition-all duration-100 ease-linear"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Controles de estado y tiempo */}
        <div className="flex justify-between items-center mb-4 text-sm font-mono">
          <span className="text-green-400">Progreso: {formatTime(currentTime)}</span>
          <span className="text-gray-400">Total: {formatTime(duration)}</span>
        </div>

        {/* Controles visibles para mouse/touch (y confirmación visual del mando) */}
        <div className="flex justify-center space-x-4">
          <button onClick={() => seekBackward()} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-150 flex items-center">
            <Rewind className="w-6 h-6 mr-1" />
            <span className="hidden sm:inline">← Retroceder</span>
          </button>
          <button onClick={togglePlayPause} className="p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 transition duration-150 flex items-center">
            {isPlaying ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
            <span className="hidden sm:inline">{isPlaying ? 'Pausa (OK)' : 'Play (OK)'}</span>
          </button>
          <button onClick={() => seekForward()} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-150 flex items-center">
            <span className="hidden sm:inline">Avanzar →</span>
            <FastForward className="w-6 h-6 ml-1" />
          </button>
          <button onClick={exitPlayer} className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition duration-150 flex items-center space-x-2">
            <ArrowLeft className="w-6 h-6" />
            <span className="text-sm font-semibold hidden sm:inline">Volver (ESC)</span>
          </button>
        </div>
      </div>

      {/* Mensaje de acción temporal */}
      {message && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white text-xl font-bold py-3 px-6 rounded-xl shadow-xl transition-opacity duration-300 z-10">
          {message}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex justify-center items-center">
      <div className="w-full h-screen max-w-6xl flex justify-center items-center">
        {showPlayer ? <PlayerView /> : <CatalogView />}
      </div>
    </div>
  );
};

// --- Configuración de Renderizado de React 18 (Necesario para el entorno) ---
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("No se pudo encontrar el elemento raíz con el ID 'root'.");
}
// --- FIN DE LA CONFIGURACIÓN ---

export default App;
