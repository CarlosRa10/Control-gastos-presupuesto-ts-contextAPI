// Definimos un tipo 'Expense' que representa un gasto
export type Expense = {
    id: string;                // Identificador único del gasto (tipo string)
    expenseName: string;      // Nombre del gasto (tipo string)
    amount: number;           // Monto del gasto (tipo number)
    category: string;         // Categoría del gasto (tipo string)
    date: Value;              // Fecha del gasto, que será de tipo 'Value'
}

// Definimos un tipo 'DraftExpense' que omite el campo 'id' del tipo 'Expense'---este es gasto temporal uno que no requiere id
export type DraftExpense = Omit<Expense, 'id'>;


// Definimos un tipo 'ValuePiece' que puede ser una fecha o nulo
type ValuePiece = Date | null;
// Definimos un tipo 'Value' que puede ser un único ValuePiece o un arreglo de dos ValuePiece
export type Value = ValuePiece | [ValuePiece, ValuePiece];

// Definimos un tipo 'Category' que representa una categoría de gasto
export type Category = {
    id: string;               // Identificador único de la categoría (tipo string)
    name: string;             // Nombre de la categoría (tipo string)
    icon: string;             // Icono asociado a la categoría (tipo string)
}