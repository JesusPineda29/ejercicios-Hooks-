import React, { useReducer, useState } from 'react';

// PASO 1: Estado inicial - una lista vacía de tareas
const estadoInicial = {
  tareas: [],           // Array que contendrá todas las tareas
  siguienteId: 1        // Para asignar IDs únicos a cada tarea
};

// PASO 2: El reducer - nuestro "asistente" para manejar las tareas
function reducerTareas(estado, accion) {
  // Revisamos qué tipo de acción queremos hacer
  switch (accion.tipo) {
    
    case 'AGREGAR_TAREA':
      // Crear una nueva tarea con la información que nos enviaron
      const nuevaTarea = {
        id: estado.siguienteId,           // ID único
        texto: accion.textoTarea,         // El texto que escribió el usuario
        completada: false,                // Empieza como no completada
        fechaCreada: new Date().toLocaleTimeString() // Hora actual
      };
      
      // Devolver el nuevo estado con la tarea agregada
      return {
        ...estado,                        // Copiar todo lo anterior
        tareas: [...estado.tareas, nuevaTarea], // Agregar la nueva tarea al final
        siguienteId: estado.siguienteId + 1     // Incrementar el ID para la próxima
      };

    case 'COMPLETAR_TAREA':
      // Marcar una tarea como completada o no completada
      return {
        ...estado,                        // Copiar todo lo anterior
        tareas: estado.tareas.map(tarea => {
          // Si encontramos la tarea que queremos cambiar
          if (tarea.id === accion.idTarea) {
            return {
              ...tarea,                   // Copiar toda la tarea
              completada: !tarea.completada // Cambiar solo si está completada
            };
          }
          // Si no es la tarea que buscamos, devolverla sin cambios
          return tarea;
        })
      };

    case 'ELIMINAR_TAREA':
      // Quitar una tarea de la lista
      return {
        ...estado,                        // Copiar todo lo anterior
        tareas: estado.tareas.filter(tarea => tarea.id !== accion.idTarea)
      };

    case 'LIMPIAR_COMPLETADAS':
      // Eliminar todas las tareas que estén marcadas como completadas
      return {
        ...estado,                        // Copiar todo lo anterior
        tareas: estado.tareas.filter(tarea => !tarea.completada)
      };

    default:
      // Si no reconocemos la acción, devolver el estado sin cambios
      return estado;
  }
}

// PASO 3: Nuestro componente principal
export default function ListaTareas() {
  // Usar useReducer para manejar el estado de las tareas
  const [estado, dispatch] = useReducer(reducerTareas, estadoInicial);
  
  // useState simple para el texto que está escribiendo el usuario
  const [textoNuevo, setTextoNuevo] = useState('');

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    // Solo agregar si hay texto
    if (textoNuevo.trim()) {
      // Enviar acción para agregar tarea
      dispatch({
        tipo: 'AGREGAR_TAREA',
        textoTarea: textoNuevo.trim()
      });
      // Limpiar el campo de texto
      setTextoNuevo('');
    }
  };

  // Calcular estadísticas
  const totalTareas = estado.tareas.length;
  const tareasCompletadas = estado.tareas.filter(t => t.completada).length;
  const tareasPendientes = totalTareas - tareasCompletadas;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      {/* Título */}
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
        📝 Mi Lista de Tareas
      </h1>

      {/* Estadísticas */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{totalTareas}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{tareasCompletadas}</div>
            <div className="text-sm text-gray-600">Completadas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">{tareasPendientes}</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </div>
        </div>
      </div>

      {/* Campo para agregar nueva tarea */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={textoNuevo}
            onChange={(e) => setTextoNuevo(e.target.value)}
            onKeyPress={(e) => {
              // Si presiona Enter, agregar la tarea
              if (e.key === 'Enter') {
                agregarTarea();
              }
            }}
            placeholder="¿Qué necesitas hacer?"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={agregarTarea}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
          >
            ➕ Agregar
          </button>
        </div>
      </div>

      {/* Lista de tareas */}
      <div className="space-y-3 mb-6">
        {estado.tareas.length === 0 ? (
          // Si no hay tareas, mostrar mensaje
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p>No tienes tareas aún. ¡Agrega una!</p>
          </div>
        ) : (
          // Mostrar cada tarea
          estado.tareas.map(tarea => (
            <div
              key={tarea.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                tarea.completada 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {/* Checkbox para marcar como completada */}
                  <button
                    onClick={() => dispatch({
                      tipo: 'COMPLETAR_TAREA',
                      idTarea: tarea.id
                    })}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      tarea.completada
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    {tarea.completada && '✓'}
                  </button>
                  
                  {/* Texto de la tarea */}
                  <div className="flex-1">
                    <div className={`${
                      tarea.completada 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-800'
                    }`}>
                      {tarea.texto}
                    </div>
                    <div className="text-xs text-gray-400">
                      Creada: {tarea.fechaCreada}
                    </div>
                  </div>
                </div>
                
                {/* Botón para eliminar */}
                <button
                  onClick={() => dispatch({
                    tipo: 'ELIMINAR_TAREA',
                    idTarea: tarea.id
                  })}
                  className="text-red-500 hover:text-red-700 transition-colors p-1"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Botones de acciones */}
      {estado.tareas.length > 0 && (
        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ tipo: 'LIMPIAR_COMPLETADAS' })}
            disabled={tareasCompletadas === 0}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg transition-colors"
          >
            🧹 Limpiar Completadas ({tareasCompletadas})
          </button>
        </div>
      )}

      {/* Explicación de lo que está pasando */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
        <h3 className="font-bold text-blue-800 mb-2">¿Cómo funciona useReducer aquí?</h3>
        <ul className="list-disc list-inside space-y-1 text-blue-700">
          <li><strong>Estado:</strong> Array de tareas + contador de IDs</li>
          <li><strong>Acciones:</strong> AGREGAR, COMPLETAR, ELIMINAR, LIMPIAR</li>
          <li><strong>Reducer:</strong> Decide cómo modificar la lista según la acción</li>
          <li><strong>Beneficio:</strong> Toda la lógica de tareas está organizada en un lugar</li>
        </ul>
      </div>
    </div>
  );
}