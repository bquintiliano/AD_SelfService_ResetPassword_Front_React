import axios from 'axios'

const url = 'http://localhost:3333'  //Change here to IP from AD_SelfService_ResetPassword_Back

const api = axios.create({
    baseURL: 'http://localhost:3333' //Change here to IP from AD_SelfService_ResetPassword_Back
})


async function loginUser(user,passwordUser){
    try{
      const post = await api.post('/login', {
        user,
        passwordUser
      })
      const {data, status} =  post   
      document.cookie = data

      return status
    }
    catch(err){
      return 401
    }
}

async function getUser(user){
  const options = {
    headers: {"x-access-token": document.cookie}
  }
  try{
    const post = await api.post('/fullname', {
      user
    }, options)
    const {data} =  post   
    const {displayName} = data
    
    return displayName
  }
  catch(err){
    return 401
  }
}


async function resetPassword(user, password){

    const data = {
      "user": user,
      "passwordUser": password
  }
      try{
      const post = await fetch(`${url}/reset`, {
           method: 'post',
           headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               "x-access-token": document.cookie
             },
           body: JSON.stringify(data),
           })

           const {status} = post
           return status

      }catch(error){
        return 401
      }
               
}

export  {loginUser,resetPassword, getUser}
