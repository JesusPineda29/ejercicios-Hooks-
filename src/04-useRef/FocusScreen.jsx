import { useRef } from 'react';


export const FocusScreen = () => {

    const inputRef = useRef();



  return (
    <>
        <h1>Focus Screen</h1>
        <hr />
    
        <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Ingrese su nombre"
        />
    
        <button
            className="btn btn-primary mt-2"
            onClick={() => { }}
        >
            Set Focus
        </button>
    </>
  )
}
