import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../Components/Formulario'

const EditarCliente = () => {

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const {id} = useParams();

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
        <div>
            <h1 className='font-black text-4xl text-blue-900 p-10'>Editar cliente</h1>
            <p>Llena lo sgtes. campos para editar datos de este cliente</p>

            {cliente?.empresa ? (
                <Formulario
                cliente = {cliente}
                titulo = "Editar cliente"
                cargando = {cargando}
                />
            ) : (
                <div className='mt-2 text-white uppercase text-center p-2 bg-blue-400 font-bold'>No se encuentra registrado ese cliente</div>
            )
            }
        </div>
    )
}

export default EditarCliente
