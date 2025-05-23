import { useLayoutEffect, useRef } from 'react';

export const PokemonCard = ({ id, name, sprites = {} }) => {

  const h2Ref = useRef();

  useLayoutEffect(() => {

    const { height, width } = h2Ref.current.getBoundingClientRect();
    console.log(height, width);
  }
  , []);


  return (
    <div className="card text-center shadow-sm mb-4" style={{ display: 'flex', width: '18rem', height: '200', flexDirection: 'row' }}>
      <div className="card-header bg-primary text-white">
        <h2 ref={h2Ref} className="mb-0 text-capitalize">#{id} - {name}</h2>
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
