import React, {useState} from 'react';
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
           setText('Wrong user or password') //change your message here
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
        label="User"   //change your message here
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
        label="Password"   //change your message here
        variant="outlined" 
        margin='normal'
        required
        fullWidth
        />
        
        <div align='center'>
            <Button variant="contained" color="primary" type='submit' >
                Login
            </Button>
        </div>
        

    </form>

    )
    
}


export default Login