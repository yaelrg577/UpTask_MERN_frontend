import {useState}from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioColaborador = () => {

  const [email, setEmail] = useState('')
  const {mostrarAlerta, alerta, submitColaborador} = useProyectos()


  const handleSubmit = (e) => {
    e.preventDefault()

    if(email === ''){
        mostrarAlerta({
          msg: 'Campo Obligatorio',
          error: true
        })
        return
    }

    submitColaborador(email)

  }

  const {msg} = alerta 



  return (
    <form  
    className='bg-white py-10 px-5 rounded-lg shadow md:w-1/2'
    onSubmit={handleSubmit}
    >

      {msg && <Alerta alerta={alerta}  />}


      <div className='mb-5'>
        <label 
        htmlFor="email"
        className='text-gray-700 uppercase font-bold text-sm'
        >Email Colaborador</label>
         <input
        type='email'
        id='email'
        placeholder='Email del usuario'
        className='border-2 w-full p-2 mt-2 rounded-md placeholder-gray-600'
        value={email}
        onChange={e => setEmail(e.target.value)}
          />
      </div>

      <input
      type='submit'
       className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold transition-colors cursor-pointer rounded text-sm'
      value='Buscar Colaborador'
        />

    </form>
  )
}

export default FormularioColaborador