import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const { default: jwt_decode } = require("jwt-decode");

export const registration = async (LastName, Name,  MiddleName, Phone, Mail, Password) => {
    console.log("Яттуууууууууууууууууууууууууууууууууууууут",LastName, Name,  MiddleName, Phone, Mail, Password)
    const {data} = await $host.post( 'api/user/registration',{LastName, Name,  MiddleName, Phone, Mail, Password})
    
    localStorage.setItem('token', data.token)
    
    return jwtDecode(data.token)
}
export const login = async (Phone, Mail, Password) => {
    const {data} = await $host.post( 'api/user/login',{Phone, Mail, Password})
    localStorage.setItem('token', data.token)
    return jwtDecode (data.token)
}
export const check = async () => {
    // const {data} = await $authHost.get('api/user/auth' )
    // localStorage.setItem('token', data.token)
    const cat = localStorage.getItem('token');
    // return jwtDecode(data.token)
    return cat
}