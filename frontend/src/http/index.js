import axios from "axios"

const $host = axios.create({
    baseURL: 'http://localhost:5000/'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:5000/'

})
const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    console.log(config.headers.authorization)
    return config
}
$authHost.interceptors.request.use(authInterceptor)
export {
$host,
$authHost}