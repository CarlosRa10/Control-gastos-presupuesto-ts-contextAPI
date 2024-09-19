import {v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions = 
    { type:'add-budget', payload:{budget:number} }|
    { type:'show-modal'}|
    { type:'close-modal'}|
    { type:'add-expense', payload:{expense:DraftExpense} }|
    { type:'remove-expense', payload:{id:Expense['id']} }|
    { type:'get-expense-by-id', payload:{id:Expense['id']} }//esta opcion se dispara y va a escribir en el state editingId:''



export type BudgetState = {
    budget:number
    modal:boolean
    expenses:Expense[]
    editingId:Expense['id']
}

export const initialState : BudgetState = {
    budget:0,
    modal:false,
    expenses:[],
    editingId:''
}

const createExpense = (draftExpense:DraftExpense):Expense => {
    return{
        ...draftExpense,
        id:uuidv4()
    }
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
        //otra opcion seria un toggle-modal como 1 solo action y solo este codigo modal: !state.modal
        if(action.type==='show-modal'){

            return{
                ...state,
                modal:true
            }
        }

        if(action.type==='close-modal'){

            return{
                ...state,
                modal:false
            }
        }

        if(action.type==='add-expense'){
            const expense = createExpense(action.payload.expense)

            return{
                ...state,
                expenses:[...state.expenses,expense],
                modal:false
            }
        }
        if(action.type==='remove-expense'){

            return{
                ...state,
                expenses:state.expenses.filter(expense=>expense.id !== action.payload.id)//traete todo slo que son diferente al payload que le estamos pasando 
            }
        }
        if(action.type==='get-expense-by-id'){
            return{
                ...state,
                editingId:action.payload.id,
                modal:true
            }
        }

        return state
}