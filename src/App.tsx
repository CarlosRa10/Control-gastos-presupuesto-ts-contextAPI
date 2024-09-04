import { useMemo } from "react"//vamos a validar el presupuesto
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTrackers from "./components/BudgetTrackers"
import ExpenseModal from "./components/ExpenseModal"



function App() {

  //const context = useContext(BudgetContext) //Esta es una manera
  //console.log(context)
 
  const {state}= useBudget()//recuperar los datos por medio de state

  const isValidBudget = useMemo(()=>state.budget>0,[state.budget])
 

  return (
    <>
      <header className="bg-blue-600 py-7 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos 
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-10 p-10">
          {isValidBudget ? <BudgetTrackers/> : <BudgetForm />}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">

          <ExpenseModal/>
        </main>
      )}

    </>
  )
}

export default App
