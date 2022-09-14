import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

const Tarea = ({tarea}) => {

    const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos()
    const {descripcion,nombre,fechaEntrega, prioridad,estado, _id} = tarea

    const admin = useAdmin()


  return (
    <div className="border-b p-5 flex justify-between items-center">
        <div className="flex flex-col items-start">
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm uppercase text-gray-500">{descripcion}</p>
            <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-gray-600 ">Prioridad: {prioridad}</p>

            {estado&& <p className="bg-green-500 text-white p-1 uppercase font-bold rounded-lg text-xs"
            >Completada por: {tarea.completado.nombre}</p>}
        </div>

        <div className="flex flex-col lg:flex-row gap-2">

            {admin && (
            <button 
            className="bg-indigo-600 text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditarTarea(tarea)}
            >
                Editar
            </button>
            )}

            
                 
             <button
              className={`${estado ? 'bg-sky-600' : 'bg-gray-600'}
               text-white px-4 py-3 uppercase font-bold text-sm rounded-lg`}
              onClick={() => completarTarea(_id)}
              >
             {estado ? 'Completa' : 'Incompleta'}
             </button>

             
             {admin && (
            <button
             className="bg-red-600 text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
             onClick={() => handleModalEliminarTarea(tarea)}
             >
                 Eliminar
             </button>
             )}
           

        </div>
    </div>
  )
}

export default Tarea