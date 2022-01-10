const regex = /^(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/

export default function validatePassword(password){
    if(password.length < 6){
        return 1
    }
    if (!regex.exec(password)){
        return 2
    }
    
    return 3
}
