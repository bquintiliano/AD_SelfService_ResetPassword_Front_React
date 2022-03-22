import React, {useState, useEffect} from 'react';
import Login from './Login'
import ResetPassword from './ResetPassword';


function Home(){
    const [page, setPage] = useState(0)
    const [user, setUser] = useState('')

    const paginas = [
    <Login writeUser={writeUser} nextPage={nextPage}/>, 
    <ResetPassword readUser={readUser} nextPage={nextPage}/> ]

    function writeUser(data){
        
        setUser(data) 
        return user
    }

    function readUser(){
        return user
    }
    
    
    function nextPage(data){
        setPage(data)
    } 


    return(  
 
        <>{
            paginas[page]
          }
        </>
        )
    
}

export default Home