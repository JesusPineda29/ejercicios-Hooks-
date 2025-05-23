

export const PokemonCard = ({ id, name, sprites = {} }) => {
  return (
    <div className="card text-center shadow-sm mb-4" style={{ width: '18rem', height: 'auto' }}>
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0 text-capitalize">#{id} - {name}</h5>
      </div>

      <div className="card-body d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <img
          src={sprites.front_default}
          alt={name}
          className="img-fluid"
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
      </div>
    </div>
  );
};
