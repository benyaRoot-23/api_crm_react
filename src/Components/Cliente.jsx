import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, eliminarCliente}) => {

    const navigate = useNavigate();

    const {nombre, empresa, email, telefono, notas, id} = cliente
    return (
        <tr className='border-b'>
            <td className='p-3'> {nombre}</td>
            <td className='p-3'>
                <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
                <p><span className='text-gray-800 uppercase font-bold'>Telefono: </span>{telefono}</p>
            </td>
            <td className='p-3'> {empresa}</td>
            <td className='p-3'>
                <button
                type='button'
                className='bg-yellow-500 hover:bg-yellow-600 w-full mb-1 p-2 text-xs text-white'
                onClick={() => navigate(`/clientes/${id}`)}
                >Ver</button>

                <button
                type='button'
                className='bg-blue-600 hover:bg-blue-700 w-full mb-1 p-2 text-xs text-white'
                onClick={() => navigate(`/clientes/editar/${id}`)}
                >Editar</button>

                <button
                className='bg-red-500 hover:bg-red-600 w-full mb-1 p-2 text-xs text-white'
                onClick={()=>eliminarCliente(id)}
                >Eliminar</button>
            </td>
        </tr>

    )
}

export default Cliente
