import { useState } from "react";
import { useCounter } from "../hooks/useCounter"
import { ShowIncrement } from "./ShowIncrement"


export const CallbackHook = () => {

    const {counter, setCounter} = useState(10);

    const increment = () => {
        setCounter(counter + 1);
    }

  return (
    <>
        <h1>useCallback Hook</h1>
        <hr />
        <p>useCallback es un hook que se utiliza para memorizar funciones, evitando que se vuelvan a crear en cada renderizado del componente. Esto es útil para optimizar el rendimiento de la aplicación y evitar renders innecesarios.</p>
        <p>Se utiliza principalmente en componentes que reciben funciones como props, ya que evita que los componentes hijos se vuelvan a renderizar si las funciones no han cambiado.</p>
        <p>useCallback recibe dos argumentos: la función a memorizar y un array de dependencias. Si alguna de las dependencias cambia, la función se volverá a crear.</p>


        <h2>useCallback Hook: {counter}</h2>
        <hr />
        <ShowIncrement increment={increment} />


    </>
  )
}
