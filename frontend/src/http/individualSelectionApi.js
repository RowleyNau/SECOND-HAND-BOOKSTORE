import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const { default: jwt_decode } = require("jwt-decode");

export const IndividualSelectionAdd = async (Author, Category, Genre, Comment, RequestDate) => {
    try{
    
        const dataToken = localStorage.getItem('token');
        let info = jwtDecode(dataToken);
        var IdClients=info.IdClients;
        console.log(IdClients, Author, Category, Genre, Comment, RequestDate);
        const {data} = await $host.post( 'api/individualSelection/IndividualSelectionAdd',{IdClients, Author, Category, Genre, Comment, RequestDate})
    return {data}
    }
    catch(e){
        throw e;
    }
} 
export const IndividualSelectionGetAll = async () => {
    const {data} = await $host.get( 'api/individualSelection/IndividualSelectionGetAll');
    return data
} 
export const IndividualSelectionGetOne = async (id) => {
    const {data} = await $host.get( 'api/individualSelection/IndividualSelectionGetOne?id='+id);
    return data
} 
export const IndividualSelectionClientsGetAll = async () => {
    const dataToken = localStorage.getItem('token');
    const {data} = await $host.get( 'api/individualSelection/IndividualSelectionClientsGetAll?dataToken='+dataToken);
    return data
}
export const ResultBySelectionOfGoodsAdd = async (goods, idIndividualSelectionOfBooks, comment) => {
    try{
        console.log(goods, idIndividualSelectionOfBooks, comment)
        const dataToken = localStorage.getItem('token');
        // console.log(IdClients, Author, Category, Genre, Comment, RequestDate);
        const {data} = await $host.post( 'api/individualSelection/ResultBySelectionOfGoodsAdd',{goods, idIndividualSelectionOfBooks, comment,dataToken})
    return {data}
    }
    catch(e){
        throw e;
    }
}