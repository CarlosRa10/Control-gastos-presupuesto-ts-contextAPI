export function formatCurrency(amount:number){
    return new Intl.NumberFormat('en-US',{style:'currency', currency:'USD'}).format(amount)
}

export function formatDate(dateStr:string):string{
    const dateObj = new Date(dateStr)
    const options:Intl.DateTimeFormatOptions = {
        weekday: 'long',//nombre completo
        year:'numeric',
        month:'long',//Nombre completo del mes
        day:'numeric'
    }
    return new Intl.DateTimeFormat('es-ES',options).format(dateObj)
}