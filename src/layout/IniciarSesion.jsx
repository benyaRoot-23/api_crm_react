import React from 'react'
import { Outlet } from 'react-router-dom'

const IniciarSesion = () => {
    return (
        <div>
            <h1>Desde iniciar sesion jsx</h1>
            <p>Cabiandopo</p>
            <p>OUTLET</p>
            <Outlet/>
        </div>
    )
}

export default IniciarSesion
