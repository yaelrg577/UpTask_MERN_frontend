import { Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Busqueda from "./Busqueda"
import useAuth from "../hooks/useAuth"

const Header = () => {

  const {handleBuscador, cerrarSesionProyectos} = useProyectos()
  const {cerrarSesionAuth} = useAuth()

  const handleCerrarSesion = ()=>{
    cerrarSesionAuth()
    cerrarSesionProyectos()
    localStorage.removeItem('token')
  }

  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between'>

            <h2 className='text-sky-600 font-black text-4xl text-center mb-5 md:mb-0'>UpTask</h2>


        <div className="flex flex-col md:flex-row items-center gap-4">

            <button
            type="button"
            className="font-bold uppercase "
            onClick={handleBuscador}
            >
              Buscar proyecto
            </button>

            <Link
             to="/proyectos"
             className="font-bold uppercase "
            >Proyectos</Link>


            <button 
            className="bg-sky-600 rounded-md uppercase text-white p-3 font-bold text-sm"
            type="button"
            onClick={handleCerrarSesion}
            >
                Cerrar sesion
            </button>

            <Busqueda />
        </div>
        </div>
     
    </header>
  )
}

export default Header