
import React, { useReducer } from 'react';

// 1. Definir el estado inicial
const initialState = { count: 0 };

// 2. Definir el reducer
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET_VALUE':
      return { count: action.value };
    default:
      throw new Error(`Acción no reconocida: ${action.type}`);
  }
}

export const CounterApp=() => {
  // 3. Usar useReducer
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Contador con useReducer</h2>
      
      <div className="text-center mb-6">
        <span className="text-4xl font-mono bg-gray-100 px-4 py-2 rounded">
          {state.count}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          + Incrementar
        </button>
        
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          - Decrementar
        </button>
        
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
        >
          🔄 Resetear
        </button>
        
        <button
          onClick={() => dispatch({ type: 'SET_VALUE', value: 100 })}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Establecer en 100
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
        <h3 className="font-semibold mb-2">Cómo funciona:</h3>
        <ul className="space-y-1 text-gray-700">
          <li>• Cada botón envía una <strong>acción</strong> diferente</li>
          <li>• El <strong>reducer</strong> decide cómo cambiar el estado</li>
          <li>• El componente se re-renderiza con el nuevo estado</li>
        </ul>
      </div>
    </div>
  );
}