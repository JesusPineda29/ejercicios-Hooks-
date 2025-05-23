


export const PokemonCard = ({id, name, sprites = []}) => {
  return (
    <section style={{height: 200}}>
        <h2 className="text-capitalize">#{id} - {name}</h2>


        <div>
            <img 
                src={sprites.front_default} 
                alt={name} 
                className="img-fluid"
            />
        </div>



    </section>
  )
}
