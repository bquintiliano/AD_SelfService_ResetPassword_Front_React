import React, {useState, useEffect} from 'react';
import {Button, TextField, CircularProgress,Chip, Avatar } from '@material-ui/core'
import logo from '../img/logo.jpg'
import validatePassword from '../api/validate';
import {resetPassword, getUser} from '../api/api'

function ResetPassword({readUser, nextPage}){
    const [password, setPassword] = useState("")
    const [button, setButton] = useState(false)
    const [chipOk, setChipOk] = useState(true)
    const [chipFail, setChipFail] = useState(true)
    const [circle, setCircle] = useState(true)
    const [error, setError] = useState(false)
    const [text, setText] = useState('')
    const [fullName, setFullName] = useState(``)

    getUser(readUser()).then((res) => {
        setFullName(res)
    })

    return(   
     
    <form onSubmit={(event) => {
        event.preventDefault()
        
        if(validatePassword(password) == 1){
            setError(true)
            setText('Senha precisa ter mais que 6 digitos')
        }

        if(validatePassword(password) == 2){
            setError(true)
            setText('Senha precisa conter números e caracteres especiais')
        }

        if(validatePassword(password) == 3){
            setError(false)
            setText('')

            setButton(true)
            setCircle(false)

            resetPassword(readUser(),password).then(res => {
            
                if(res != 200){
                    setCircle(true)
                    setChipFail(false)
                    setTimeout(() =>{
                        nextPage(0)
                    } , 8000)
                   
                }else{
                    setCircle(true)
                    setChipOk(false)
                    setTimeout(() =>{
                        nextPage(0)
                    } , 6000) 
                }
            })
        }  
        
    }}>

        <div align='center'>
            <img src={logo} alt="logo" />
        </div>

        <div align="center">
            <Chip
            
            label={`Seja bem vindo(a) ${fullName}`}
            color="primary"
            
            /> 
        </div>      
        
        <TextField 
        id="password"
        name="password"
        value={password}
            onChange={(event)=> {
                setPassword(event.target.value)
        }} 
        type='password'
        error={error}
        helperText={text}  
        label="Nova Senha" 
        variant="outlined" 
        margin='normal'
        required
        fullWidth
        />
        
       <div align='center' hidden={button}>
            <Button variant="contained" color="primary" type='submit'>
                Alterar Senha
            </Button>
        </div>

        <div align='center' hidden={circle}>
             <CircularProgress />
        </div>  

        <div hidden={chipOk} align="center">
            <Chip
            avatar={<Avatar>OK</Avatar>}
            label="SENHA ALTERADA COM SUCESSO... VOLTANDO"
            color="primary"
            variant="outlined"
            /> 
        </div>

        <div hidden={chipFail} align="center">
            <Chip
            avatar={<Avatar>X</Avatar>}
            label="NÃO FOI POSSÍVEL ALTERAR SUA SENHA FAVOR ENTRAR EM CONTATO COM O SUPORTE... VOLTANDO"
            color="secondary"
            variant="outlined"
            /> 
        </div>
            

    </form>

    )
    
}


export default ResetPassword