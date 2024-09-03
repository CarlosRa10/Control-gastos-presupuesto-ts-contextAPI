import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"
export const useBudget = () => {
//Utiliza el hook useContext para obtener el valor del contexto BudgetContext en el lugar donde se está llamando al hook.
    const context = useContext(BudgetContext)
    if(!context){
        // Comprueba si se ha obtenido un contexto válido. Si no se ha encontrado un proveedor de contexto más cercano, se lanza un error.
        throw new Error('useBudget must be used within a BudgetProvider')
    }
    return context//Devuelve el contexto obtenido, que contiene el estado del presupuesto y la función dispatch.
}