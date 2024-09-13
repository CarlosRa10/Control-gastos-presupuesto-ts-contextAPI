import { PropsWithChildren } from "react"//te permite renderizar string y componentes dentro de otros componentes
//import { ReactNode } from "react"
// type ErrorMessageProps ={
//     children:ReactNode
// }

//{children}}:PropsWithChildren omirte el type
export default function ErrorMessage({children}:PropsWithChildren) {
  return (
    <p className='bg-red-600 p-2 text-white font-bold text-sm text-center '>
        {children}
    </p>
  )
}
