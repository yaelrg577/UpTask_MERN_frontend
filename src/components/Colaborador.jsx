import useProyectos from "../hooks/useProyectos" 

const Colaborador = ({colaborador}) => {

    const{handleModalEliminarColaborador, modalEliminarColaborador} = useProyectos()
    const {nombre, email} = colaborador

  return (
    <div className='border-b p-5 flex justify-between items-center'>
        <div>
            <p className=''>{nombre}</p>
            <p className='text-sm text-gray-600'>{email}</p>
        </div>
        <div>
            <button 
            type='button'
            className='bg-red-600 text-white uppercase font-bold px-4 py-3 rounded-lg text-sm'
            onClick={() => handleModalEliminarColaborador(colaborador)}
            >
                eliminar
            </button>
        </div>

    </div>
  )
}

export default Colaborador