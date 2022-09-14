import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const NuevoPassword = () => {

  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')

  const params = useParams()

  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
        try {
           await clienteAxios(`/usuarios/olvide-password/${token}`)
            setTokenValido(true)
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }
    }
    comprobarToken()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if( password.length < 6){
      setAlerta({
        msg: 'el password debe contener minimo 6 caracteres', 
        error: true
      })
    return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password})
      setAlerta({
        msg: data.msg, 
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

 

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Restablece tu password y no pierdas acceso a tus  {' '}
    <span className='text-gray-700 '>Proyectos</span> </h1>

    {msg && <Alerta alerta={alerta} />}
    
    {tokenValido && (

      <form 
      className='my-10 bg-white p-10 shadow rounded-lg'
      onSubmit={handleSubmit}
      >
      
      <div className='my-5'>
        <label
        htmlFor='password'
        className='uppercase text-gray-600 block text-xl font-bold'
        >Nuevo password:</label>
        <input
        id='password'
        type='password'
        placeholder='Escribe tu nuevo password'
        className='w-full mt-3 p-3 border rounded-xl bg-gray-50 shadow '
        value={password}
        onChange = { e => setPassword(e.target.value)}
        />
      </div>
    

      <input
      type="submit"
      value="Guardar Nuevo Password"
      className='w-full bg-sky-700 text-white font-bold uppercase rounded-md py-3 hover:cursor-pointer
      hover:bg-sky-800 transition-colors mb-5'
      />

    </form>
    )}

      {passwordModificado && (
        <Link
        to='/'
        className=' block text-center my-5 text-slate-500 uppercase text-sm'
        >
        Inicia sesion
        </Link>
      )}
    
    </>
  )
}

export default NuevoPassword