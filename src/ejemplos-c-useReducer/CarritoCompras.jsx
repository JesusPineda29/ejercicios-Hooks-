
import React, { useReducer } from 'react';

// PASO 1: Productos disponibles en nuestra "tienda"
const productosDisponibles = [
  { id: 1, nombre: '🍎 Manzana', precio: 1.50 },
  { id: 2, nombre: '🍌 Plátano', precio: 0.80 },
  { id: 3, nombre: '🥕 Zanahoria', precio: 1.20 },
  { id: 4, nombre: '🥛 Leche', precio: 2.50 },
  { id: 5, nombre: '🍞 Pan', precio: 1.80 }
];

// PASO 2: Estado inicial del carrito
const estadoInicialCarrito = {
  productos: [],        // Array de productos en el carrito
  total: 0,            // Precio total
  descuentoAplicado: false, // Si se aplicó descuento
  porcentajeDescuento: 0    // Porcentaje de descuento
};

// PASO 3: Reducer para manejar el carrito
function reducerCarrito(estado, accion) {
  switch (accion.tipo) {
    
    case 'AGREGAR_PRODUCTO':
      // Buscar si el producto ya está en el carrito
      const productoExistente = estado.productos.find(
        item => item.id === accion.producto.id
      );

      let nuevosProductos;
      if (productoExistente) {
        // Si ya existe, aumentar la cantidad
        nuevosProductos = estado.productos.map(item =>
          item.id === accion.producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        nuevosProductos = [
          ...estado.productos,
          { ...accion.producto, cantidad: 1 }
        ];
      }

      // Calcular nuevo total
      const nuevoTotal = nuevosProductos.reduce(
        (suma, item) => suma + (item.precio * item.cantidad), 0
      );

      return {
        ...estado,
        productos: nuevosProductos,
        total: nuevoTotal
      };



    case 'QUITAR_PRODUCTO':
      // Encontrar el producto y reducir su cantidad
      const productosActualizados = estado.productos.map(item => {
        if (item.id === accion.idProducto && item.cantidad > 1) {
          // Si tiene más de 1, reducir cantidad
          return { ...item, cantidad: item.cantidad - 1 };
        } else if (item.id === accion.idProducto && item.cantidad === 1) {
          // Si tiene 1, se marcará para eliminar
          return null;
        }
        return item;
      }).filter(item => item !== null); // Eliminar los null

      // Recalcular total
      const totalActualizado = productosActualizados.reduce(
        (suma, item) => suma + (item.precio * item.cantidad), 0
      );

      return {
        ...estado,
        productos: productosActualizados,
        total: totalActualizado
      };



    case 'ELIMINAR_PRODUCTO_COMPLETO':
      // Eliminar completamente un producto del carrito
      const productosFiltrados = estado.productos.filter(
        item => item.id !== accion.idProducto
      );

      const totalFiltrado = productosFiltrados.reduce(
        (suma, item) => suma + (item.precio * item.cantidad), 0
      );

      return {
        ...estado,
        productos: productosFiltrados,
        total: totalFiltrado
      };



    case 'APLICAR_DESCUENTO':
      // Aplicar descuento del 10%
      return {
        ...estado,
        descuentoAplicado: true,
        porcentajeDescuento: 10
      };



    case 'QUITAR_DESCUENTO':
      // Quitar descuento
      return {
        ...estado,
        descuentoAplicado: false,
        porcentajeDescuento: 0
      };



    case 'VACIAR_CARRITO':
      // Volver al estado inicial
      return estadoInicialCarrito;

    default:
      return estado;
  }
}

// PASO 4: Componente principal
export default function CarritoCompras() {
  // Usar useReducer para manejar el estado del carrito
  const [carrito, dispatch] = useReducer(reducerCarrito, estadoInicialCarrito);

  // Calcular precio final con descuento
  const precioFinal = carrito.descuentoAplicado 
    ? carrito.total * (1 - carrito.porcentajeDescuento / 100)
    : carrito.total;

  // Calcular cantidad total de productos
  const cantidadTotalProductos = carrito.productos.reduce(
    (suma, item) => suma + item.cantidad, 0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg mb-6">
      {/* Título */}
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
        🛒 Mi Carrito de Compras
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LADO IZQUIERDO: Productos disponibles */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            🏪 Productos Disponibles
          </h2>
          
          <div className="space-y-3">
            {productosDisponibles.map(producto => (
              <div key={producto.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-semibold">{producto.nombre}</div>
                  <div className="text-green-600 font-bold">${producto.precio.toFixed(2)}</div>
                </div>
                <button
                  onClick={() => dispatch({
                    tipo: 'AGREGAR_PRODUCTO',
                    producto: producto
                  })}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  ➕ Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* LADO DERECHO: Carrito actual */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            🛒 Tu Carrito ({cantidadTotalProductos} productos)
          </h2>

          {carrito.productos.length === 0 ? (
            // Carrito vacío
            <div className="text-center text-gray-500 py-8">
              <div className="text-6xl mb-4">🛒</div>
              <p>Tu carrito está vacío</p>
              <p className="text-sm">¡Agrega algunos productos!</p>
            </div>
          ) : (
            // Productos en el carrito
            <div className="space-y-3 mb-6">
              {carrito.productos.map(item => (
                <div key={item.id} className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{item.nombre}</div>
                      <div className="text-sm text-gray-600">
                        ${item.precio.toFixed(2)} × {item.cantidad} = 
                        <span className="font-bold text-green-600 ml-1">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Botón para quitar una unidad */}
                      <button
                        onClick={() => dispatch({
                          tipo: 'QUITAR_PRODUCTO',
                          idProducto: item.id
                        })}
                        className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full transition-colors"
                      >
                        ➖
                      </button>
                      
                      {/* Mostrar cantidad */}
                      <span className="mx-2 font-bold text-lg">{item.cantidad}</span>
                      
                      {/* Botón para agregar una unidad */}
                      <button
                        onClick={() => dispatch({
                          tipo: 'AGREGAR_PRODUCTO',
                          producto: item
                        })}
                        className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full transition-colors"
                      >
                        ➕
                      </button>
                      
                      {/* Botón para eliminar completamente */}
                      <button
                        onClick={() => dispatch({
                          tipo: 'ELIMINAR_PRODUCTO_COMPLETO',
                          idProducto: item.id
                        })}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors ml-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Resumen de precios */}
              <div className="bg-gray-100 p-4 rounded-lg mt-6">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span className="font-bold">${carrito.total.toFixed(2)}</span>
                </div>
                
                {carrito.descuentoAplicado && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Descuento ({carrito.porcentajeDescuento}%):</span>
                    <span className="font-bold">
                      -${(carrito.total * carrito.porcentajeDescuento / 100).toFixed(2)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Total Final:</span>
                  <span className="text-purple-600">${precioFinal.toFixed(2)}</span>
                </div>
              </div>

              {/* Botones de acciones */}
              <div className="space-y-2 mt-4">
                {/* Descuento */}
                {!carrito.descuentoAplicado ? (
                  <button
                    onClick={() => dispatch({ tipo: 'APLICAR_DESCUENTO' })}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    🎉 Aplicar Descuento 10%
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch({ tipo: 'QUITAR_DESCUENTO' })}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    ❌ Quitar Descuento
                  </button>
                )}
                
                {/* Vaciar carrito */}
                <button
                  onClick={() => dispatch({ tipo: 'VACIAR_CARRITO' })}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  🗑️ Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Explicación */}
      <div className="mt-8 p-4 bg-purple-50 rounded-lg text-sm">
        <h3 className="font-bold text-purple-800 mb-2">¿Qué hace useReducer aquí?</h3>
        <ul className="list-disc list-inside space-y-1 text-purple-700">
          <li><strong>Estado complejo:</strong> Productos, cantidades, totales, descuentos</li>
          <li><strong>Múltiples acciones:</strong> Agregar, quitar, eliminar, aplicar descuento</li>
          <li><strong>Cálculos automáticos:</strong> El reducer recalcula totales automáticamente</li>
          <li><strong>Lógica centralizada:</strong> Todas las reglas del carrito en un lugar</li>
        </ul>
      </div>
    </div>
  );
}