import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {
//Creamos una variable de estado llamada budget usando el hook useState e inicializamos su valor en 0.
// Esta variable almacenará el valor del presupuesto ingresado por el usuario.-mi state local para validar el formulario
    const [budget,setBudget]=useState(0)

    const {dispatch}=useBudget()//custom hook es con llaves


//e: Representa el evento que se produce cuando el valor del input cambia.
//React.ChangeEvent<HTMLInputElement>: Especifica que el evento es un evento de cambio en un elemento de tipo input (HTMLInputElement).
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        //console.log(e.target.valueAsNumber)
//Actualizamos el valor de budget con el valor numérico ingresado en el input. e.target.valueAsNumber 
//obtiene el valor del input y lo convierte a un número.
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(()=>{
        //console.log(budget)
        //console.log(isNaN(budget))
        return isNaN(budget) || budget <= 0
    },[budget]) //cuado el usuario escriba queremos ejecutar esta función


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Añadir o definir presupuesto')

        dispatch({type:'add-budget', payload:{budget}})
    }

  return (
    // este space-y-5 solo afecta el primer nivel de hijo de los elementos
    <form className="space-y-5" onSubmit={handleSubmit}> 
        {/* flex-col para que se vaya hacia abajo tipo columna */}
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text center">
                Definir Presupuesto
            </label>

            <input
                id="budget" 
                type="number"
                className="w-full bg-white border border-gray-200 p-2"
                placeholder="Define tu presupuesto"
                name="budget"
                value={budget}//de esta forma inicializa en 0 el formulario
                
                onChange={handleChange}//el evento onChange llama a la función handleChange cuando cambia el valor.
            
            />
        </div>

        <input 
            type="submit"
            value='Definir Presupuesto'
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
            disabled={isValid}
        
        />
    </form>
  )
}
