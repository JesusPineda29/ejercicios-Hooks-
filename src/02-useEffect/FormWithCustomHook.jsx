import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';

export const FormWithCustomHook = () => {

    const {formState, onInputChange, username, email, password, onResetForm} = useForm({
        username: '',
        email: '',
        password: ''
    })

    // const { username, email, password } = formState;



    return (
        <>
            <h1>Formulario con custom Hook</h1>
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

            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={onInputChange} />
            </div>

            <button onClick={onResetForm} className='btn btn-primary'>Borrar</button>

        </>
    )
}
