import {useState} from 'react'

const regCorreo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
const regUser = /^[a-z0-9]+$/
const regPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

export const Validaciones = (input)=>{
    if(input.text == ''){
        input.setError('Esta casilla es obligatoria')
        return true
    }
    if(input.type == 'email'){
        if(!regCorreo.test(input.text.trim())){
            input.setError('Dirección de correo invalida')
            return  true
        }
    }
    if(input.type == 'user'){
        let texto = input.text
        if(!regUser.test(texto.trim())){
            input.setError('Esta casilla no acepta espacios, caracteres especiales o mayúsculas')
            return true
        }   
    }
    if(input.type == 'password'){
        let texto = input.text

        if(!regPassword.test(texto)){
            input.setError('Su contraseña debe contener por lo menos un número, una mayúscula, un caracter especial y 8 caracteres ($-?¡#_)')
            return true
        }  
    }

    return false
}

export const useInputHandles = ({type,required = false})=>{
    const [error,setError] = useState('')
    const [text,setText] = useState('')
    
    
    const handleChange = (text)=>{
        if(error != ''){
            setError('')
        }
        setText(text)
    }

    const handleBlur = ()=>{
        if(!required){
            Validaciones({text,type,setError})
            if(error != '') return setError('')  
        }
           
    }

    const handleFocus = ()=>{
        if(!required){
            if(error != '') return setError('')  
        }     
    }

    return{
       error,
       text,
       handleChange,
       handleBlur,
       handleFocus,
       setError,
       type
    }
}