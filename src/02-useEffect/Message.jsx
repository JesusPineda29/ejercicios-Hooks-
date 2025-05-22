import { useEffect } from 'react';

export const Message = () => {


    useEffect(() => {
      console.log('Message component mounted');
    
      return () => {
        console.log('Message component unmounted');
      }
    }, [])
    



  return (
    <>
        <h3>Usuario ya existe</h3>
    </>
  )
}
