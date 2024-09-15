//componente de registrar gastos--almacenar informacion

// Importamos el hook useState de React para manejar el estado del componente
import { ChangeEvent, useState } from "react";
// Importamos el tipo DraftExpense que define la estructura de un gasto
import type { DraftExpense, Value } from "../types";
// Importamos las categorías de un archivo de datos
import { categories } from "../data/categories";
// Importamos el componente DatePicker para seleccionar fechas
import DatePicker from 'react-date-picker';
// Importamos estilos CSS para el calendario y el selector de fechas
import 'react-calendar/dist/Calendar.css';// npm i react-calendar
import 'react-date-picker/dist/DatePicker.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


// Definimos el componente ExpenseForm como una función
export default function ExpenseForm() {

    // Usamos useState para crear un estado llamado expense, inicializado con un objeto DraftExpense
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',      // Nombre del gasto vacío inicialmente
        amount: 0,            // Cantidad inicial del gasto
        category: '',         // Categoría vacía inicialmente
        date: new Date()      // Fecha inicial establecida como la fecha actual
    });

    const [error, setError]=useState('')
    const {dispatch}=useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLSelectElement>)=>{
        //{name, value}: Utiliza destructuring para extraer las propiedades name y value del objeto e.target.
        //name: Es el nombre del atributo name del elemento HTML, lo que permite identificar qué campo del formulario ha cambiado.
        //value: Es el nuevo valor introducido por el usuario en el elemento.
        const {name, value}=e.target//e.target: Hace referencia al elemento HTML que desencadenó el evento.
        const isAmountField = ['amount'].includes(name)//Comprueba si el valor de name está presente en el array ['amount']. Si el nombre del elemento es "amount", esta expresión devolverá true.
        //console.log(isAmountField)
        setExpense({
            ...expense,
            [name]:isAmountField?+value:value
        })
    }

    const handleChangeDate = (value:Value)=>{
        setExpense({
            ...expense,
            date: value
        })
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //Validar--object es un metodo para objetos-object.values tranforma objetos en arreglos
        //Object.values(expense): Esta parte extrae todos los valores del objeto expense y los convierte en un array.
        //.includes(''): Este método verifica si el array resultante contiene una cadena vacía. Si encuentra al menos un valor vacío, la condición se evalúa como verdadera.
        if(Object.values(expense).includes('')|| Object.values(expense).includes(0)){
            //console.log('error...')
            setError('Todos los Campos son obligatorios')
            return
        }
        //console.log('todo bien...')
        //Agregar un nuevo gasto
        dispatch({type:'add-expense',payload:{expense}})
        
        
        //Reiniciar el state
        setExpense({
            expenseName: '',      
            amount: 0,          
            category: '',        
            date: new Date()     
        })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}> 
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 text-red-500">
                Nuevo Gasto
            </legend>
            {/* //lo que le pasemos al state error lo renderiza el componente */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

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
                    onChange={handleChange}
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
                    value={expense.amount} // Valor del campo ligado al estado -*
                    onChange={handleChange}
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
                    onChange={handleChange}
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
