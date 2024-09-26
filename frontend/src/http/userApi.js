import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (Name, Mail, Password) => {
    console.log(Name, Mail, Password)
    const {data} = await $host.post( 'api/user/registration',{Name, Mail, Password})    
    console.log(data)
    if (data.token){ 
        localStorage.setItem('token', data.token)
        console.log(data.token)
        return jwtDecode(data.token)
    }
    else {
        return data.clients
    }
}
export const login = async (Mail, Password) => {
    const {data} = await $host.post( 'api/user/login',{Mail, Password})
    localStorage.setItem('token', data.token)
    console.log(data.token)
    console.log(jwtDecode(data.token))
    return jwtDecode (data.token)
}
export const check = async () => {
    try{
        if (localStorage.getItem('token')!==null)
        {
            const dataToken = localStorage.getItem('token');
            let b = jwtDecode(dataToken);
            console.log(b)
            const {data} = await $host.get('api/user/auth?dataToken='+dataToken )
            let myData = jwtDecode(data)
            console.log(myData)
            if(myData.IdClients&&myData.Mail){    
                localStorage.setItem('token', data)
                // console.log(jwtDecode(data))
                return jwtDecode(data)
            }
        }
        else{
            return false
        }   
    }
    catch(e){
        console.log(e)
    }
}
export const personalInfo = async () => {
    const dataToken = localStorage.getItem('token');
    const data = await $host.get('api/user/UserGetOne?dataToken='+dataToken )
    return data
}
export const UserGetOne = async (id) => {
    const {data} = await $host.get('api/user/UserGetOneId?id='+id)
    return data
}
export const UserDel = async (id) => {
    const data = await $host.post('api/user/UserDel',{id})
    return data
}
export const UserGetAll = async (limit, page) => {
    const {data} = await $host.get('api/user/UserGetAll?limit='+limit+'&page='+page)
    return data
}
export const UserSearchGetAll = async (Name, limit, page) => {
    const {data} = await $host.get('api/user/UserSearchGetAll?limit='+limit+'&page='+page+'&Name='+Name)
    return data
}




const authInterceptor = config =>{
    const a = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${a}`
    console.log(config.headers.authorization)
    return config
}