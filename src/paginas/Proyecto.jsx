import { useParams, Link } from "react-router-dom"
import { useEffect} from "react"
import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import Tarea from "../components/Tarea"
import Alerta from "../components/Alerta"
import Colaborador from "../components/Colaborador"
import ModalEliminarColaborador from "../components/modalEliminarColaborador"
import useAdmin from "../hooks/useAdmin"
import io from "socket.io-client"

let socket 

const Proyecto = () => {

  const {obtenerProyecto, proyecto, cargando, handleModalTarea, alerta, 
    submitTareasProyecto, eliminarTareaProyecto, actualizarTareaProyecto, cambiarEstadoTarea} = useProyectos()
  
  const admin = useAdmin()
  console.log(admin)

  const params = useParams()
 
  useEffect(() => {
    obtenerProyecto(params.id)
  },[])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('abrir proyecto', params.id)
  },[])

  useEffect(() => {
    socket.on('tarea agregada', (tareaNueva) => {
      if(tareaNueva.proyecto === proyecto._id){
        submitTareasProyecto(tareaNueva)
      }
    })

    socket.on('tarea eliminada', (tareaEliminada) =>{
      if(tareaEliminada.proyecto === proyecto._id){
        eliminarTareaProyecto(tareaEliminada)
      }
    })

    socket.on('tarea actualizada', (tareaActualizada) => {
      if(tareaActualizada.proyecto._id === proyecto._id){
        actualizarTareaProyecto(tareaActualizada)
      }
    })

    socket.on('nuevo estado', (estadoNuevo) => {
      if(estadoNuevo.proyecto._id === proyecto._id){
        cambiarEstadoTarea(estadoNuevo)
      }
    })
  })

  const {nombre} = proyecto 
  console.log(proyecto)
  
  const {msg} = alerta

  if(cargando) return 'Cargando...'


  return (

    

    <>
      <div className="flex justify-between">
      <h1 className="font-black text-4xl">{nombre}</h1>


      {admin && (
      <div className="flex items-center gap-2 text-gray-400 hover:text-black">
      <svg className="w-6 h-6" fill="none"
       stroke="currentColor" 
       viewBox="0 0 24 24" 
       xmlns="http://www.w3.org/2000/svg"
       >
        <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
        />
        </svg>

        <Link
        to={`/proyectos/editar/${params.id}`}
        className = "font-bold uppercase"
        >
        Editar
        </Link>

        
      </div>
      )}
    </div>

        {admin && (
        <button
        onClick={handleModalTarea}
         type="button"
         className="text-sm px-5 py-3 w-full md:w-auto text-white rounded-lg uppercase font-bold
           bg-sky-400 text-center mt-5 flex gap-2 items-center justify-center"
         >
          <svg
           className="w-6 h-6" 
           fill="none" 
           stroke="currentColor" 
           viewBox="0 0 24 24" 
           xmlns="http://www.w3.org/2000/svg"
           >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
            </svg>
          Nueva Tarea
        </button>
        )}

      <p className="text-xl font-bold mt-10">Tareas del Proyecto</p>


      <div className="bg-white rounded-lg mt-10 shadow">
        {proyecto.tareas?.length ?
         proyecto.tareas?.map(tarea => (
          <Tarea 
          key={tarea._id}
          tarea= {tarea}
          />
         )): 
         <p className="text-center my-5 p-10">No hay tareas en este Proyecto</p>}
      </div>

      
          {admin && (
            <>
          <div className="flex items-center justify-between mt-10">
          <p className="text-xl font-bold">Colaboradores</p>
          <Link
          to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
          className= 'text-gray-400 hover:text-black font-bold uppercase'
          >
          Añadir
          </Link>
          </div>

          <div className="bg-white rounded-lg mt-10 shadow">
        {proyecto.colaboradores?.length ?
         proyecto.colaboradores?.map(colaborador => (
          <Colaborador
          key={colaborador._id}
          colaborador = {colaborador}
          />
         )): 
         <p className="text-center my-5 p-10">No hay colaboradores en este Proyecto</p>}
      </div>

      </>
      )}

        <ModalFormularioTarea />
        <ModalEliminarTarea />
        <ModalEliminarColaborador />

        </>
    
  )
}

export default Proyecto