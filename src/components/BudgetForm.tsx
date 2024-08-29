import { useState } from "react"


export default function BudgetForm() {
//Creamos una variable de estado llamada budget usando el hook useState e inicializamos su valor en 0.
// Esta variable almacenará el valor del presupuesto ingresado por el usuario.
    const [budget,setBudget]=useState(0)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        //console.log(e.target.valueAsNumber)
//Actualizamos el valor de budget con el valor numérico ingresado en el input. e.target.valueAsNumber 
//obtiene el valor del input y lo convierte a un número.
        setBudget(e.target.valueAsNumber)
    }

  return (
    // este space-y-5 solo afecta el primer nivel de hijo de los elementos
    <form className="space-y-5"> 
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
                value={budget}
                onChange={handleChange}//el evento onChange llama a la función handleChange cuando cambia el valor.
            
            />
        </div>

        <input 
            type="submit"
            value='Definir Presupuesto'
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase"
        
        />
    </form>
  )
}
