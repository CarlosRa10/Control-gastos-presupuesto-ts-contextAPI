// Instalación de react-date-picker
// npm i react-date-picker
import { Fragment } from 'react' // Importamos Fragment de React, que permite agrupar elementos sin agregar un nodo extra al DOM
import { PlusCircleIcon } from '@heroicons/react/24/solid' // Importamos un icono de Heroicons
// npm i @heroicons/react
import { Dialog, Transition, DialogPanel, TransitionChild } from '@headlessui/react' // Importamos componentes de Headless UI para crear modales
// npm i @headlessui/react  
import { useBudget } from '../hooks/useBudget' // Importamos un hook personalizado para manejar el estado del presupuesto
import ExpenseForm from './ExpenseForm' // Importamos el componente ExpenseForm, que contiene el formulario para gastos


// Definimos el componente ExpenseModal como una función
export default function ExpenseModal() {
  // Usamos el hook useBudget para obtener el estado y la función dispatch
  const { state, dispatch } = useBudget();

  return (
    <>
      <div className="fixed right-5 bottom-5 flex items-center justify-center">
        <button
          type="button"
          onClick={()=> dispatch({type:'show-modal'})}
        >
          <PlusCircleIcon className='w-16 h-16 text-blue-600 rounded-full' />
        </button>
      </div>

      <Transition appear show={state.modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => dispatch({type:'close-modal'}) }>
          <TransitionChild 
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </TransitionChild >

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild 
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
    

                  <ExpenseForm/>
                  
                </DialogPanel>
              </TransitionChild >
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}