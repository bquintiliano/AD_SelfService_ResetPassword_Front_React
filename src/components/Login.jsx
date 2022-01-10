import React, {useState, useEffect} from 'react';
import {Button, TextField } from '@material-ui/core'
import logo from '../img/logo.jpg'
import {loginUser} from '../api/api'

function Login({writeUser, nextPage}){
    const [user, setUserd] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [text, setText] = useState('')

    return(   
        
    <form onSubmit={(event) => {
        event.preventDefault()
        
        
     loginUser(user,password).then(res => {	
        if( res != 200){
           setError(true)
           setText('Usuário ou senha incorreta')
        }else{
            nextPage(1)
            writeUser(user)
        }
        
    })
        
    }}>
        
        <div align='center' >
            <img src={logo} alt="logo" />
        </div>
        
        <TextField 
        id="user"
        name="user"
        value={user}
            onChange={(event)=> {
                setUserd(event.target.value)
        }} 
        type='text'
        error={error}
        label="Usuário" 
        variant="outlined"
        margin='normal'
        required
        fullWidth
        />

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
        label="senha" 
        variant="outlined" 
        margin='normal'
        required
        fullWidth
        />
        
        <div align='center'>
            <Button variant="contained" color="primary" type='submit' >
                Logar
            </Button>
        </div>
        

    </form>

    )
    
}


export default Login