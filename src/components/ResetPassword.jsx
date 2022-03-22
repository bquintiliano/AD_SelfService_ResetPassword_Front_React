import React, {useState} from 'react';
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
            setText('Password must be more than 6 digits') //change your message here
        }

        if(validatePassword(password) == 2){
            setError(true)
            setText('Password must contain numbers and special characters or contains invalid character') //change your message here
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
            
            label={`Welcome ${fullName}`}
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
        label="New Password"  //change your message here
        variant="outlined" 
        margin='normal'
        required
        fullWidth
        />
        
       <div align='center' hidden={button}>
            <Button variant="contained" color="primary" type='submit'>
                Change Password 
            </Button>
        </div>

        <div align='center' hidden={circle}>
             <CircularProgress />
        </div>  

        <div hidden={chipOk} align="center">
            <Chip
            avatar={<Avatar>OK</Avatar>}
            label="PASSWORD CHANGED SUCCESSFULLY... RETURNING"  //change your message here
            color="primary"
            variant="outlined"
            /> 
        </div>

        <div hidden={chipFail} align="center">
            <Chip
            avatar={<Avatar>X</Avatar>}
            label="UNABLE TO CHANGE YOUR PASSWORD PLEASE CONTACT SUPPORT... RETURNING" //change your message here
            color="secondary"
            variant="outlined"
            /> 
        </div>
            

    </form>

    )
    
}


export default ResetPassword