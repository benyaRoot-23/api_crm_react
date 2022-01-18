import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ErrorFormulario from './ErrorFormulario'
import Spinner from './Spinner'
import * as Yup from 'yup'

const Formulario = ({cliente, titulo, cargando}) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre:Yup.string()
                    .min(3,'el nombre es muy corto')
                    .max(20,'el nombre es muy largo')
                    .required('El nombre es obligatorio'),
        empresa:Yup.string()
                        .required('La empresa es obligatorio'),
        email:Yup.string()
                    .email('email no valido')
                    .required('El email es obligatorio'),
        telefono:Yup.number()
                    .positive('Debe ser positivo')
                    .integer('numero no valido')
                    .typeError('El numero no es valido'),
        notas:'',
    })

    const enviarDatosForm = async (values) =>{
        //recuerda que 'values' son los valores del input
        try{
            //en vez de repetir la var 'respuesta' en put o post, lo declaro global scope y lo uso en las condiciones
            //segun la que cumpla
            let respuesta;
            if(cliente.id){
                const id_put = cliente.id;
                console.log('editando....');
                const url_put =  `http://localhost:4000/clientes/${id_put}`;
                respuesta = await fetch(url_put,{
                    method:'PUT',
                    body:JSON.stringify(values),
                    headers:{
                        'Content-Type': 'application/json',
                    }
                });

            }
            else{
                console.log('registrando!');
                const url = "http://localhost:4000/clientes";
            
                respuesta = await fetch(url, {
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json",                
                    },
                    body:JSON.stringify(values),

                })

            }
            console.log(respuesta);
            const resultado_json = await respuesta.json();
            console.log(resultado_json);
            navigate('/clientes');

        }catch(error){
            console.error(error);
        }
    }

    return (
        <>
        {cargando ? <Spinner/> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-center text-xl uppercase'>{titulo}</h1>

                <Formik
                initialValues={{
                    //cliente?.nombre ?? "" (si 'cliente.nombre' no existe, o es undefined, agregas el "")
                    nombre:cliente?.nombre ?? "",
                    empresa:cliente?.empresa ?? "",
                    email:cliente?.email ?? "",
                    telefono:cliente?.telefono ?? "",
                    notas:cliente?.notas ?? "",
                }}
                //enableReinitialize={false} -- es 'false' por defecto
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm})=>{
                    await enviarDatosForm(values);
                    //resetForm() es propio de Formik
                    resetForm();
                } }
                validationSchema={nuevoClienteSchema}
                >

                    {({errors, touched}) =>{
                        //console.log(errors);
                        //console.log(touched);
                        return(

                    <Form
                    className='mt-10'
                    >
                        <div className='mb-4'>
                            <label 
                            className='text-gray-800'
                            htmlFor="nombre"
                            >Nombre:</label>
                            <Field
                                id="nombre"
                                name="nombre"
                                type="text"
                                className="mt-2 w-full block p-3 bg-gray-200"
                                placeholder="Nombre del Cliente"
                            />
                            {errors.nombre && touched.nombre ? <ErrorFormulario>{errors.nombre}</ErrorFormulario> : null}
                        </div>
                        <div className='mb-4'>
                            <label 
                            className='text-gray-800'
                            htmlFor="empresa"
                            >Empresa:</label>
                            <Field
                                id="empresa"
                                name="empresa"
                                type="text"
                                className="mt-2 w-full block p-3 bg-gray-200"
                                placeholder="empresa del Cliente"
                            />
                            <ErrorMessage name='empresa' component="div" className='text-red-400'/>
                        </div>
                        <div className='mb-4'>
                            <label 
                            className='text-gray-800'
                            htmlFor="email"
                            >Email:</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                className="mt-2 w-full block p-3 bg-gray-200"
                                placeholder="Email del Cliente"
                            />
                            {errors.email && touched.email ? <ErrorFormulario>{errors.email}</ErrorFormulario> : null}
                        </div>
                        <div className='mb-4'>
                            <label 
                            className='text-gray-800'
                            htmlFor="telefono"
                            >Telefono:</label>
                            <Field
                                id="telefono"
                                name="telefono"
                                type="tel"
                                className="mt-2 w-full block p-3 bg-gray-200"
                                placeholder="Telefono del Cliente"
                            />
                            {errors.telefono && touched.telefono ? <ErrorFormulario>{errors.telefono}</ErrorFormulario> : null}
                        </div>
                        <div className='mb-4'>
                            <label 
                            className='text-gray-800'
                            htmlFor="notas"
                            >Notas:</label>
                            <Field
                                as='textarea'
                                id="notas"
                                name="notas"
                                type="text"
                                className="mt-2 w-full block p-3 bg-gray-200"
                                placeholder="Notas del Cliente"
                            />
                        </div>
                        <input type="submit"
                        value="Agregar cliente"
                        className='mt-5 w-full bg-blue-500 text-white uppercase p-3 font-bold'
                        />
                    </Form>
                )}}
                </Formik>
            </div>
        )}
        </>
    )
    
}

//colocar variables por defecto, si no hay estos, ya toma los de arriba

Formulario.defaultProps = {
 cliente:{}   
}


export default Formulario
