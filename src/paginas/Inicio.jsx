import React,{useEffect, useState} from 'react'
import Cliente from '../Components/Cliente';

const Inicio = () => {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        
        const obtenerClientesAPI = async () =>{
            try{
                const url = "http://localhost:4000/clientes";
                const respuesta = await fetch(url);
                const datosAPI = await respuesta.json();
                console.log(datosAPI);
                setClientes(datosAPI);
            }catch(error){
                console.log(error);
            }
        }

        obtenerClientesAPI();
    }, [])

    const eliminarCliente = async id =>{
        const confirmar = confirm('¿deseas eliminar este cliente?');
        if(confirmar){
            try {
                //delete en el API
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url,{
                    method:"DELETE",
                })
                await respuesta.json();
                //DELETE en el state
                const clientesActuales = clientes.filter((element)=> element.id !== id);
                setClientes(clientesActuales);
            } catch (error) {
                console.log(error.message);
            }

        }
    }

    return (
        <div>
            <h1 className='font-black text-4xl text-blue-900 p-10'>Inicio</h1>
            <p>Administra tus clientes</p>
            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-blue-500 '>
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {clientes.map( (element)=>(
       
                        <Cliente
                            key={element.id}
                            cliente={element}
                            eliminarCliente={eliminarCliente}
    
                        />
 
                ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default Inicio
