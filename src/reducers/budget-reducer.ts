//Context API - ya viene integrado con react - Nos permite manejar un estado global sin instalar dependencias 
//Context API permite tener un estado global en tu app, esto quiere decir que solo tiene una instancia del state que se puede acceder desde cualquier componente vía props. 
//el hook a utilizar es useContext
//alternativas a Context API
//Context API no requiere dependencias pero su boilerplate para configurarlo
 //otras alternativas son Zustand o Redux Toolkit



export type BudgetActions = 
    { type:'add-budget', payload:{budget:number} }



export type BudgetState = {
    budget:number     
}

export const initialState : BudgetState = {
    budget:0
}

export const budgetReducer = (
        state:BudgetState=initialState,//En esta línea, estás explícitamente indicando que el tipo de state es BudgetState
        action:BudgetActions
    ) => {
        if(action.type==='add-budget'){
            return{
                ...state,//iinmutabilidad
//budget: Este es el nombre de la propiedad que se está actualizando en el estado. En este caso, se está modificando la propiedad budget del estado.
//action: Representa la acción que se está procesando.
//.payload: Es una propiedad común en las acciones de Redux que contiene datos adicionales necesarios para realizar la actualización.
//.budget: Esta propiedad dentro del payload contiene el nuevo valor de presupuesto que se desea asignar a la propiedad budget del estado.
                budget:action.payload.budget//Actualiza la propiedad budget del estado con el nuevo valor de presupuesto proporcionado en la acción.
//Esta línea de código esencialmente está diciendo: "Actualiza la propiedad budget del estado con el nuevo valor de presupuesto que se encuentra en la propiedad budget del payload de la acción actual".
            }
        }

        return state
}