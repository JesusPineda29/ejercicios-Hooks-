
import React, { useReducer } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, Repeat } from 'lucide-react';

// Estado inicial del reproductor
const initialState = {
  songs: [
    { id: 1, title: "Bohemian Rhapsody", artist: "Queen", duration: "5:55" },
    { id: 2, title: "Imagine", artist: "John Lennon", duration: "3:07" },
    { id: 3, title: "Hotel California", artist: "Eagles", duration: "6:31" },
    { id: 4, title: "Billie Jean", artist: "Michael Jackson", duration: "4:54" },
    { id: 5, title: "Sweet Child O' Mine", artist: "Guns N' Roses", duration: "5:03" }
  ],
  currentSong: null,
  status: 'stopped', // 'playing', 'paused', 'stopped'
  volume: 50,
  repeatMode: 'off' // 'off', 'one', 'all'
};

// Reducer: maneja todas las acciones del reproductor
function musicReducer(state, action) {
  switch (action.type) {
    case 'REPRODUCIR':
      return {
        ...state,
        currentSong: action.song,
        status: 'playing'
      };

    case 'PAUSAR':
      return {
        ...state,
        status: 'paused'
      };

    case 'REANUDAR':
      return {
        ...state,
        status: 'playing'
      };

    case 'DETENER':
      return {
        ...state,
        status: 'stopped',
        currentSong: null
      };

    case 'SIGUIENTE':
      if (!state.currentSong) return state;
      
      const currentIndex = state.songs.findIndex(song => song.id === state.currentSong.id);
      let nextIndex;
      
      if (currentIndex === state.songs.length - 1) {
        // Estamos en la última canción
        if (state.repeatMode === 'all') {
          nextIndex = 0; // Volver al inicio
        } else {
          return { ...state, status: 'stopped', currentSong: null }; // Parar
        }
      } else {
        nextIndex = currentIndex + 1;
      }
      
      return {
        ...state,
        currentSong: state.songs[nextIndex],
        status: 'playing'
      };

    case 'ANTERIOR':
      if (!state.currentSong) return state;
      
      const currentIdx = state.songs.findIndex(song => song.id === state.currentSong.id);
      let prevIndex;
      
      if (currentIdx === 0) {
        // Estamos en la primera canción
        if (state.repeatMode === 'all') {
          prevIndex = state.songs.length - 1; // Ir a la última
        } else {
          return state; // No hacer nada
        }
      } else {
        prevIndex = currentIdx - 1;
      }
      
      return {
        ...state,
        currentSong: state.songs[prevIndex],
        status: 'playing'
      };

    case 'CAMBIAR_VOLUMEN':
      return {
        ...state,
        volume: action.volume
      };

    case 'CAMBIAR_REPEAT':
      const modes = ['off', 'one', 'all'];
      const currentModeIndex = modes.indexOf(state.repeatMode);
      const nextMode = modes[(currentModeIndex + 1) % modes.length];
      
      return {
        ...state,
        repeatMode: nextMode
      };

    default:
      return state;
  }
}

export default function MusicPlayer() {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  // Funciones para disparar las acciones
  const reproducir = (song) => {
    dispatch({ type: 'REPRODUCIR', song });
  };

  const pausar = () => {
    dispatch({ type: 'PAUSAR' });
  };

  const reanudar = () => {
    dispatch({ type: 'REANUDAR' });
  };

  const detener = () => {
    dispatch({ type: 'DETENER' });
  };

  const siguiente = () => {
    dispatch({ type: 'SIGUIENTE' });
  };

  const anterior = () => {
    dispatch({ type: 'ANTERIOR' });
  };

  const cambiarVolumen = (volume) => {
    dispatch({ type: 'CAMBIAR_VOLUMEN', volume: parseInt(volume) });
  };

  const cambiarRepeat = () => {
    dispatch({ type: 'CAMBIAR_REPEAT' });
  };

  // Función para obtener el color del botón repeat según el modo
  const getRepeatColor = () => {
    switch (state.repeatMode) {
      case 'one': return 'text-yellow-500';
      case 'all': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        🎵 Reproductor de Música
      </h1>

      {/* Pantalla de canción actual */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
        {state.currentSong ? (
          <div>
            <h3 className="font-semibold text-lg">{state.currentSong.title}</h3>
            <p className="text-gray-600">{state.currentSong.artist}</p>
            <p className="text-sm text-gray-500">{state.currentSong.duration}</p>
            <div className="mt-2">
              <span className={`px-2 py-1 rounded text-sm ${
                state.status === 'playing' ? 'bg-green-200 text-green-800' :
                state.status === 'paused' ? 'bg-yellow-200 text-yellow-800' :
                'bg-gray-200 text-gray-800'
              }`}>
                {state.status === 'playing' ? '▶️ Reproduciendo' :
                 state.status === 'paused' ? '⏸️ Pausado' : '⏹️ Detenido'}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-gray-500">
            <p>No hay canción seleccionada</p>
            <p className="text-sm">Elige una canción para empezar</p>
          </div>
        )}
      </div>

      {/* Controles principales */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={anterior}
          disabled={!state.currentSong}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <SkipBack size={20} />
        </button>

        {state.status === 'playing' ? (
          <button
            onClick={pausar}
            className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Pause size={24} />
          </button>
        ) : (
          <button
            onClick={state.status === 'paused' ? reanudar : () => {}}
            disabled={!state.currentSong && state.status !== 'paused'}
            className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
          >
            <Play size={24} />
          </button>
        )}

        <button
          onClick={detener}
          disabled={!state.currentSong}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <Square size={20} />
        </button>

        <button
          onClick={siguiente}
          disabled={!state.currentSong}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Controles de volumen y repeat */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Volume2 size={16} />
          <input
            type="range"
            min="0"
            max="100"
            value={state.volume}
            onChange={(e) => cambiarVolumen(e.target.value)}
            className="w-20"
          />
          <span className="text-sm text-gray-600">{state.volume}</span>
        </div>

        <button
          onClick={cambiarRepeat}
          className={`p-2 rounded ${getRepeatColor()}`}
          title={`Repeat: ${state.repeatMode}`}
        >
          <Repeat size={16} />
          <span className="text-xs ml-1">
            {state.repeatMode === 'one' ? '1' : state.repeatMode === 'all' ? '∞' : ''}
          </span>
        </button>
      </div>

      {/* Lista de canciones */}
      <div>
        <h3 className="font-semibold mb-3 text-gray-700">Lista de reproducción</h3>
        <div className="space-y-2">
          {state.songs.map((song) => (
            <div
              key={song.id}
              className={`flex items-center justify-between p-3 rounded ${
                state.currentSong?.id === song.id
                  ? 'bg-blue-100 border-l-4 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{song.title}</p>
                <p className="text-xs text-gray-600">{song.artist} • {song.duration}</p>
              </div>
              <button
                onClick={() => reproducir(song)}
                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Play size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}