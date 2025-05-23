


export const ShowIncrement = ({increment}) => {
  return (
    <button
        className="btn btn-primary"
        onClick={ () => {
            increment();
        }}
    >
        Incrementar
    </button>
  )
}
