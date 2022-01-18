import React from 'react'
import Formulario from '../Components/Formulario'

const NuevoCliente = () => {


    return (
        <>
            <h1 className='font-black text-4xl text-blue-900 p-10'>Nuevo cliente</h1>
            <p>Llena lo sgtes. campos para registrar un cliente</p>
            <Formulario
                titulo="Agregar Cliente"
            />
        </>
    )
}

export default NuevoCliente
