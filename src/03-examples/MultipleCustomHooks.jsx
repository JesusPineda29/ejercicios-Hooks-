import { useFecth } from "../hooks"


export const MultipleCustomHooks = () => {

    const {data, hasError, isLoading} = useFecth('https://pokeapi.co/api/v2/pokemon/6');

  return (
    <>
        <h1>Información de Pokémon</h1>
        <hr />

        {isLoading && <h2>Cargando...</h2>}

        <h2>{data ?.name}</h2>
    </>
  )
}

