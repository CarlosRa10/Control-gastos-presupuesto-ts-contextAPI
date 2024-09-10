//componente de registrar gastos--almacenar informacion

// Importamos el hook useState de React para manejar el estado del componente
import { useState } from "react";
// Importamos el tipo DraftExpense que define la estructura de un gasto
import type { DraftExpense } from "../types";
// Importamos las categorías de un archivo de datos
import { categories } from "../data/categories";
// Importamos el componente DatePicker para seleccionar fechas
import DatePicker from 'react-date-picker';
// Importamos estilos CSS para el calendario y el selector de fechas
import 'react-calendar/dist/Calendar.css';// npm i react-calendar
import 'react-date-picker/dist/DatePicker.css';


// Definimos el componente ExpenseForm como una función
export default function ExpenseForm() {

    // Usamos useState para crear un estado llamado expense, inicializado con un objeto DraftExpense
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',      // Nombre del gasto vacío inicialmente
        amount: 0,            // Cantidad inicial del gasto
        category: '',         // Categoría vacía inicialmente
        date: new Date()      // Fecha inicial establecida como la fecha actual
    });

    const handleChangeDate = (value)=>{
        console.log(value)
    }

    return (
        <form className="space-y-5"> 
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 text-red-500">
                Nuevo Gasto
            </legend>

            <div className="flex flex-col gap-2">
                <label 
                    htmlFor="expenseName"
                    className="text-xl">
                    Nombre Gasto:
                </label>

                <input 
                    type="text" 
                    id='expenseName'
                    placeholder="Añade el Nombre del gasto"
                    className="bg-slate-100 p-2" // Estilos del campo de entrada
                    name="expenseName"
                    value={expense.expenseName} // Valor del campo ligado al estado
                />
            </div>

            <div
                className="flex flex-col gap-2">
                    <label 
                        htmlFor="amount"
                        className="text-xl"
                        >Cantidad:
                    </label>

                    <input 
                    type="number" 
                    id='amount'
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount} // Valor del campo ligado al estado
                    />
            </div>

            <div
                className="flex flex-col gap-2">
                    <label 
                        htmlFor="amount"
                        className="text-xl"
                        >Categoría:
                    </label>

                    <select 
                    id='category'
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    >
                        <option value="">-- Seleccione --</option>
                        {categories.map(category =>(
                            <option 
                            key={category.id}
                                value={category.id}
                            >{category.name}</option>
                        ))}
                    </select>
                    
            </div>

            <div
                className="flex flex-col gap-2">
                    <label 
                        htmlFor="amount"
                        className="text-xl"
                        >Fecha Gasto:
                    </label>

                    <DatePicker
                        className='bg-slate-100 p-2 border-0'
                        value={expense.date}//como DatePicker es una dependencia que instalamos, acepta el props de value
                        onChange={handleChangeDate}//handleChangeDate como manejador del evento onChange.
                    />
            </div>

            <input 
                type="submit" 
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={'Registrar Gasto'}
                />
    </form>
  )
}
