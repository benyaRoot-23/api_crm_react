import React from 'react'

const ErrorFormulario = ({children}) => {
    return (
        <div className='bg-red-600 uppercase text-center font-bold text-white py-2 mt-2'>
            {children}
        </div>
    )
}

export default ErrorFormulario
