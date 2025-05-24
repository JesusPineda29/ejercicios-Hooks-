import { useReducer } from 'react';

// 1. Definir el estado inicial
const initialState = { count: 0 };



// 2. Definir la función reducer
// El reducer recibe el estado actual y una acción, y devuelve un nuevo estado
function counterReducer(state, action) { // Acción - es un objeto que describe qué cambio quieres hacer
   
  switch (action.type) { 
    case 'INCREMENT':
      // Si la acción es 'INCREMENT', incrementa el contador en 1
      return { count: state.count + 1 };

    case 'DECREMENT':
      // Si la acción es 'DECREMENT', disminuye el contador en 1
      return { count: state.count - 1 };
    case 'RESET':
      // Si la acción es 'RESET', reinicia el contador a 0
      return { count: 0 };
    case 'SET_VALUE':
      // Si la acción es 'SET_VALUE', establece el contador al valor recibido
      return { count: action.value };
    default:
      // Si no se reconoce el tipo de acción, lanza un error
      throw new Error(`Acción no reconocida: ${action.type}`);
  }
}





// Componente principal
export const CounterApp = () => {
  // 3. Usar useReducer
  
  // useReducer recibe:
  //   - reducer que es una función que determina cómo cambiar el estado, función que recibe el estado actual y una acción, y devuelve el nuevo estado
  //   - el estado inicial
  // Devuelve:
  //   - state: el estado actual
  //   - dispatch: una función para enviar acciones al reducer
  const [state, dispatch] = useReducer(counterReducer, initialState);



  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg mb-10 mt-10">
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