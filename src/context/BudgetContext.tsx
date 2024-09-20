import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
//useReducer: un hook para manejar el estado complejo.
//createContext: una función para crear un contexto.
//Dispatch: un tipo que se utiliza para definir funciones de despacho de acciones.
//ReactNode: un tipo que representa cualquier nodo que se puede renderizar en React.
import { BudgetActions, budgetReducer,BudgetState,initialState } from "../reducers/budget-reducer"//nuestro reducer toma el state inicial y nuetsro reducer asi que importamos esas dos
//Context API - ya viene integrado con react - Nos permite manejar un estado global sin instalar dependencias 
//Context API permite tener un estado global en tu app, esto quiere decir que solo tiene una instancia del state que se puede acceder desde cualquier componente vía props. 
//el hook a utilizar es useContext
//alternativas a Context API
//Context API no requiere dependencias pero su boilerplate para configurarlo
//otras alternativas son Zustand o Redux Toolkit

//Crear el Contexto: Es como crear una caja mágica.

//Proveer el Contexto: Usamos un proveedor para envolver nuestros componentes y compartir la información.

//Consumir el Contexto: Dentro de los componentes, usamos el consumidor para acceder a la información de la caja mágica.

//Envolver la Aplicación: Finalmente, envolvemos nuestra aplicación o componentes con el proveedor para que puedan usar el contexto.





//aqui se conecta el context como el provider - context es la accion de tener el estado global - provider va a hacer los datos que va a tener ese context
//Define el tipo de los valores que se proporcionarán al contexto. En este caso, incluye el estado actual del presupuesto (state) y una función para despachar acciones (dispatch).
//Aquí se define un tipo BudgetContextProps que describe la forma de los valores que se compartirán a través del contexto:
//state: el estado actual del presupuesto (de tipo BudgetState).
//dispatch: una función para despachar acciones (de tipo Dispatch<BudgetActions>).
type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget:number
}


//Se define otro tipo BudgetProviderProps, que describe las props esperadas por el BudgetProvider. 
//En este caso, espera un children, que es cualquier nodo que se puede renderizar en React.
type BudgetProviderProps = {
    children : ReactNode
}


//Aquí se crea el contexto BudgetContext utilizando createContext, especificando que el valor que contendrá seguirá la forma de BudgetContextProps. 
//El null! se usa para indicar que el valor no será null en tiempo de uso.
export const BudgetContext = createContext<BudgetContextProps>(null!)


//Provider - Es de donde vienen los datos -mayormente de nuestro reducer
//siempre es un arrow function y siempre retorna algo - el context es tsx por la sintaxis 
//Esta línea define el componente funcional BudgetProvider, que recibe las props children, siguiendo el tipo BudgetProviderProps.
// El null! indica que el valor no será null en tiempo de uso, gracias a TypeScript.
export const BudgetProvider = ({children}: BudgetProviderProps ) => {


    
    //instanciar - Poner en memoria un objeto, crearlo.
    const [state,dispatch]=useReducer(budgetReducer,initialState)//value
    const totalExpenses = useMemo(()=> state.expenses.reduce((total,expense)=>expense.amount+total,0),[state.expenses])
    const remainingBudget = state.budget - totalExpenses
    return(
        //Aquí, valor es la información que estamos compartiendo y children son los componentes que estarán envueltos por el proveedor.
        //Esta estructura permite que cualquier componente dentro de BudgetProvider tenga acceso al estado y a la función de despacho para actualizar ese estado, facilitando la gestión del estado global en la aplicación.
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}

