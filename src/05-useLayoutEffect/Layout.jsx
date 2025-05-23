
import { useFecth } from "../hooks"
import { useCounter } from "../hooks/useCounter";
import { LoadingMessage } from "../03-examples/LoadingMessage";
import { PokemonCard } from "../03-examples/PokemonCard";


export const Layout = () => {

  const { counter, decrement, increment } = useCounter(1);

  const { data, hasError, isLoading } = useFecth(`https://pokeapi.co/api/v2/pokemon/${counter}`);

  return (
    <>
      <h1>Información de Pokémon</h1>
      <hr />

      {isLoading ? <LoadingMessage /> : (<PokemonCard id={counter} name={data?.name} sprites={data?.sprites}/>)}






      <button 
        className="btn btn-primary mt2"
        onClick={ () => counter > 1 ? decrement() : null}
      >
        Anterior
      </button>

      <button
        className="btn btn-primary mt2"
        onClick={() => increment()}
      >
        Siguiente
      </button>
    </>
  )
}


