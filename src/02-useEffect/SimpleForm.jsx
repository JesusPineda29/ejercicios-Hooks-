import { useState, useEffect } from 'react';
import { Message } from './Message';


export const SimpleForm = () => {

    const [formState, setFormState] = useState({
        username: 'jesus',
        email: 'correo@correo.com'
    });


    const { username, email } = formState;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }


    useEffect(() => {
        // console.log('El formulario ha cambiado');
    }, []);

    useEffect(() => {
        // console.log('correo ha cambiado');
    }, [email]);

    useEffect(() => {
        // console.log('username ha cambiado');
    }, [username]);






    return (
        <>
            <h1>Formulario Simple</h1>
            <hr />

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username"
                    name="username"
                    value={username}
                    onChange={onInputChange}
                />
            </div>

            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={onInputChange} />
            </div>

            {
                (username === 'jesus') && <Message />
            }
        </>
    )
}
