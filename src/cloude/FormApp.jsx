import { useReducer } from 'react';

// // 1. Definir el estado inicial
const initialState = {
    name: '',             // Campo nombre
    email: '',            // Campo email
    age: '',              // Campo edad
    errors: {},           // Objeto que almacenará los errores por campo
    isSubmitting: false,  // Indica si se está enviando el formulario
    submitted: false      // Indica si el formulario ya fue enviado con éxito
};



// 2. Definir la función reducer
// Esta es la función reducer para useReducer, recibe el estado actual y una acción.
function formReducer(state, action) {
    // Evaluamos el tipo de acción para decidir cómo cambiar el estado
    switch (action.type) {

        // Acción para actualizar un campo del formulario
        case 'SET_FIELD':
            return {
                ...state, // Mantenemos el resto del estado sin cambios
                [action.field]: action.value, // Actualizamos dinámicamente el campo con el nuevo valor
                errors: {
                    ...state.errors, // Mantenemos los errores anteriores
                    [action.field]: null // Limpiamos el error asociado a este campo (si lo había)
                }
            };


        // Acción para establecer un error en un campo específico
        case 'SET_ERROR':
            return {
                ...state, // Conservamos el resto del estado sin cambios
                errors: {
                    ...state.errors, // Copiamos errores existentes
                    [action.field]: action.error // Agregamos o sobrescribimos el error en ese campo
                }
            };




        // Acción para establecer múltiples errores a la vez (usado al validar todo el formulario)
        case 'SET_MULTIPLE_ERRORS':
            return {
                ...state, // Conservamos el estado actual
                errors: action.errors // Reemplazamos todos los errores con el objeto completo de errores
            };


        // Acción que se dispara justo antes de enviar el formulario (inicio del envío)
        case 'START_SUBMIT':
            return {
                ...state, // Conservamos el resto del estado
                isSubmitting: true, // Indicamos que el envío está en progreso
                errors: {} // Limpiamos cualquier error anterior
            };



        // Acción que se dispara cuando el formulario se ha enviado correctamente
        case 'SUBMIT_SUCCESS':
            return {
                ...state, // Conservamos los datos del formulario
                isSubmitting: false, // Ya no se está enviando
                submitted: true, // Marcamos que el formulario ha sido enviado con éxito
                errors: {} // Limpiamos errores (en caso de que hubiera)
            };


        // Acción que se dispara si hubo errores durante el envío
        case 'SUBMIT_ERROR':
            return {
                ...state, // Mantenemos los datos del formulario
                isSubmitting: false, // Detenemos el estado de envío
                errors: action.errors // Establecemos los errores devueltos por el backend (o validación)
            };


        // Acción para reiniciar el formulario por completo a su estado inicial
        case 'RESET_FORM':
            return initialState; // Volvemos al estado inicial definido arriba

        // Si llega una acción desconocida, lanzamos un error para depuración
        default:
            throw new Error(`Acción no reconocida: ${action.type}`);
    }
}





// Función para validar el formulario
function validateForm(state) {


    const errors = {};

    if (!state.name.trim()) {
        errors.name = 'El nombre es requerido';
    }

    if (!state.email.trim()) {
        errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
        errors.email = 'El email no es válido';
    }

    if (!state.age.trim()) {
        errors.age = 'La edad es requerida';
    } else if (isNaN(state.age) || parseInt(state.age) < 1) {
        errors.age = 'La edad debe ser un número válido';
    }

    return errors;
}




// Componente principal
export default function FormApp() {

    // 3. Usar useReducer

    // useReducer recibe:
    //   - reducer que es una función que determina cómo cambiar el estado, función que recibe el estado actual y una acción, y devuelve el nuevo estado
    //   - el estado inicial
    // Devuelve:
    //   - state: el estado actual
    //   - dispatch: una función para enviar acciones al reducer
    const [state, dispatch] = useReducer(formReducer, initialState);


    // Función para manejar cambios en los campos
    const handleFieldChange = (field, value) => {
        dispatch({ type: 'SET_FIELD', field, value });
    };


    // Función para manejar el envío del formulario
    const handleSubmit = async () => {

        // Validar formulario
        const errors = validateForm(state);

        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'SET_MULTIPLE_ERRORS', errors });
            return;
        }

        // Simular envío
        dispatch({ type: 'START_SUBMIT' });

        // Simular una petición async
        setTimeout(() => {
            dispatch({ type: 'SUBMIT_SUCCESS' });
        }, 1500);
    };


    // Si el formulario fue enviado, mostramos un mensaje de éxito
    if (state.submitted) {
        return (
            <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">¡Formulario Enviado!</h2>
                <p className="text-gray-600 mb-4">Datos enviados correctamente:</p>
                <div className="bg-gray-50 p-4 rounded text-left">
                    <div><strong>Nombre:</strong> {state.name}</div>
                    <div><strong>Email:</strong> {state.email}</div>
                    <div><strong>Edad:</strong> {state.age}</div>
                </div>
                <button
                    onClick={() => dispatch({ type: 'RESET_FORM' })}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Nuevo Formulario
                </button>
            </div>
        );
    }



    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Formulario con useReducer</h2>

            <div className="space-y-8">
                {/* Campo Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        value={state.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${state.errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Tu nombre"
                    />
                    {state.errors.name && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
                    )}
                </div>

                {/* Campo Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email:
                    </label>
                    <input
                        type="email"
                        value={state.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${state.errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="tu@email.com"
                    />
                    {state.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
                    )}
                </div>

                {/* Campo Edad */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Edad:
                    </label>
                    <input
                        type="number"
                        value={state.age}
                        onChange={(e) => handleFieldChange('age', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${state.errors.age ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="25"
                    />
                    {state.errors.age && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.age}</p>
                    )}
                </div>



                {/* Botones */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={state.isSubmitting}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded transition-colors flex items-center justify-center"
                    >
                        {state.isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Enviando...
                            </>
                        ) : (
                            'Enviar'
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => dispatch({ type: 'RESET_FORM' })}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                    >
                        Limpiar
                    </button>
                </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
                <h3 className="font-semibold mb-2">Estado actual:</h3>
                <pre className="text-xs overflow-auto">
                    {JSON.stringify(state, null, 2)}
                </pre>
            </div>
        </div>
    );
}