import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../Components/Spinner';

const VerCliente = () => {

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    const {id} = useParams()

    useEffect(() => {


        const obtenerClienteAPI = async () =>{
            try{
                const url = `http://localhost:4000/clientes/${id}`;
                const response = await fetch(url);
                const datosCliente = await response.json();
                console.log(datosCliente);
                setCliente(datosCliente);

            }catch(error){
                console.log(error);
            }
            setTimeout( ()=>{
                setCargando(!cargando)
            },2000)
        }
        obtenerClienteAPI();
        console.log(cargando);


    }, [])

    return (
        cargando ? <Spinner/>: 
            Object.keys(cliente).length === 0 ? 
            <p>No hay datos en este registro</p> : 
            (

            <div>
                <p className='text-2xl text-gray-600 mt-4'><span className='text-gray-800 uppercase font-bold'>nombre :</span>{cliente.nombre}</p>
                <p className='text-2xl text-gray-600 mt-4'><span className='text-gray-800 uppercase font-bold'>Empresa: </span>{cliente.empresa}</p>
                <p className='text-2xl text-gray-600 mt-4'><span className='text-gray-800 uppercase font-bold'>Correo: </span>{cliente.email}</p>
                <p className='text-2xl text-gray-600 mt-4'><span className='text-gray-800 uppercase font-bold'>Telefono: </span>{cliente.telefono}</p>
                {cliente.notas && (
                    <p className='text-2xl text-gray-600 mt-4'><span className='text-gray-800 uppercase font-bold'>Notas: </span>{cliente.notas}</p>
                )}
            </div>
        )
        
    )
}

export default VerCliente
