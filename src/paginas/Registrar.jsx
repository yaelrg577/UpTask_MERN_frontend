import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const Registrar = () => {

  const [nombre , setNombre] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [repetirPassword , setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})


  //aqui se esta validando un formulario y este se tiene que pasar al "onSubmit que se encuentra en elm form"
  const handleSubmit = async (e) => {
    e.preventDefault()
    if([nombre, email, password, repetirPassword].includes('')){
        setAlerta({
          msg: 'todos los campos son obligatorios',
          error: true
        })
        return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'los password no coinciden',
        error: true
      })
      return
    }

    if(password.length < 6){
      setAlerta({
        msg: 'el password debe tener minimo 6 caracteres',
        error: true
      })
      return 
    }

    setAlerta({})

    // crear usuario en la APi
    try {
      const {data} = await clienteAxios.post(`/usuarios`, {nombre, email, password})
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const { msg } = alerta 

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Inicias sesion y administra tus {' '}
    <span className='text-gray-700 '>Proyectos</span> </h1>
    
    { msg && <Alerta alerta={alerta} />}

    <form
    onSubmit={handleSubmit}
    className='my-10 bg-white p-10 shadow rounded-lg'
    >
      <div className='my-5'>
        <label
        htmlFor='nombre'
        className='uppercase text-gray-600 block text-xl font-bold'
        >Nombre:</label>
        <input
        id='nombre'
        type='text'
        placeholder='Ingresa tu nombre'
        className='w-full mt-3 p-3 border rounded-xl bg-gray-50 shadow '
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div className='my-5'>
        <label
        htmlFor='email'
        className='uppercase text-gray-600 block text-xl font-bold'
        >Email:</label>
        <input
        id='email'
        type='email'
        placeholder='Email de registro'
        className='w-full mt-3 p-3 border rounded-xl bg-gray-50 shadow '
        value={email}
        onChange={ e => setEmail(e.target.value)}
        />
      </div>
      <div className='my-5'>
        <label
        htmlFor='password'
        className='uppercase text-gray-600 block text-xl font-bold'
        >password:</label>
        <input
        id='password'
        type='password'
        placeholder='Password de Registro'
        className='w-full mt-3 p-3 border rounded-xl bg-gray-50 shadow '
        value={password}
        onChange={ e => setPassword(e.target.value)}
        />
      </div>
      <div className='my-5'>
        <label
        htmlFor='password2'
        className='uppercase text-gray-600 block text-xl font-bold'
        >Repetir Password:</label>
        <input
        id='password2'
        type='password'
        placeholder='Repite tu Password'
        className='w-full mt-3 p-3 border rounded-xl bg-gray-50 shadow '
        value={repetirPassword}
        onChange={e => setRepetirPassword(e.target.value)}
        />
      </div>

      <input
      type="submit"
      value="Crear Cuenta"
      className='w-full bg-sky-700 text-white font-bold uppercase rounded-md py-3 hover:cursor-pointer
      hover:bg-sky-800 transition-colors mb-5'
      />

    </form>

    <nav className='lg:flex lg:justify-between'>
      <Link
      to='/'
      className=' block text-center my-5 text-slate-500 uppercase text-sm'
      >
      ¿Ya tienes una cuenta? Inicia sesion
      </Link>

      <Link
      to='olvide-password'
      className=' block text-center my-5 text-slate-500 uppercase text-sm'
      >
      Olvide Password
      </Link>
    </nav>

    </>
  )
}

export default Registrar