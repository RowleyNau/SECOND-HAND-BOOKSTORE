import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const { default: jwt_decode } = require("jwt-decode");

export const ShoppingcartAdd = async (IdGoods) => {
    try{
    
        const dataToken = localStorage.getItem('token');
        let info = jwtDecode(dataToken);
        var IdClients=info.IdClients;
        console.log(IdClients, IdGoods);
        const {data} = await $host.post( 'api/purchase/shoppingcartAdd',{IdClients, IdGoods})
    return {data}
    }
    catch(e){
        throw e;
    }
}

export const ShoppingcartGetAll = async () => {
    try{
        const dataToken = localStorage.getItem('token');
        let info = jwtDecode(dataToken);
        var IdClients=info.IdClients;
        const {data} = await $host.get( 'api/purchase/shoppingcartGetAll?IdClients='+IdClients);
        return data
    }
    catch(e){
        throw e;
    }
}
export const ReceivingMethodGetAll = async () => {
    try{
        const {data} = await $host.get( 'api/purchase/ReceivingMethodGetAll');
        return data
    }
    catch(e){
        throw e;
    }
}
export const ReceivingMethodGetOne = async (id) => {
    try{
        const {data} = await $host.get( 'api/purchase/ReceivingMethodGetOne?id='+id);
        return data
    }
    catch(e){
        throw e;
    }
}
export const ReceivingStateGetAll = async () => {
    try{
        const {data} = await $host.get( 'api/purchase/ReceivingStateGetAll');
        return data
    }
    catch(e){
        throw e;
    }
}
export const ReceivingStateGetOne = async (id) => {
    try{
        const {data} = await $host.get( 'api/purchase/ReceivingStateGetOne?id='+id);
        return data
    }
    catch(e){
        throw e;
    }
}
export const PaymentMethodGetAll = async () => {
    try{
        const {data} = await $host.get( 'api/purchase/PaymentMethodGetAll');
        return data
    }
    catch(e){
        throw e;
    }
}
export const PaymentMethodGetOne = async (id) => {
    try{
        const {data} = await $host.get( 'api/purchase/PaymentMethodGetOne?id='+id);
        return data
    }
    catch(e){
        throw e;
    }
}
export const PaymentStateGetAll = async () => {
    try{
        const {data} = await $host.get( 'api/purchase/PaymentStateGetAll');
        return data
    }
    catch(e){
        throw e;
    }
}
export const PaymentStateGetOne = async (id) => {
    try{
        const {data} = await $host.get( 'api/purchase/PaymentStateGetOne?id='+id);
        return data
    }
    catch(e){
        throw e;
    }
}
//--------------------------------------------
export const PurchaseClientsAdd = async ( DatePurchase, IdPaymentMethod, IdReceivingMethod, ReceivingLocation, Index) => {
    try{
    
        const dataToken = localStorage.getItem('token');
        let info = jwtDecode(dataToken);
        var IdClients=info.IdClients;
        const {data} = await $host.post( 'api/purchase/PurchaseClientsAdd',{IdClients, DatePurchase, IdPaymentMethod, IdReceivingMethod, ReceivingLocation, Index})
    return {data}
    }
    catch(e){
        throw e;
    }
}
export const PurchaseAdd = async ( IdClients, DatePurchase, IdPaymentMethod,IdPaymentState,IdReceivingState, IdReceivingMethod, ReceivingLocation, Index,Price, goods, DeliveryPrice) => {
    try{
        const dataToken = localStorage.getItem('token');
        let info = jwtDecode(dataToken);
        var IdConsultants=info.IdClients;
        const {data} = await $host.post( 'api/purchase/PurchaseAdd',{IdClients, DatePurchase, IdPaymentMethod,IdPaymentState,IdReceivingState, IdReceivingMethod, ReceivingLocation, Index, IdConsultants,Price, goods, DeliveryPrice })
    return {data}
    }
    catch(e){
        throw e;
    }
}
export const PurchaseClientsGetAll = async () => {
    try{
        const dataToken = localStorage.getItem('token');
        let info = jwtDecode(dataToken);
        var idClients=info.IdClients;
        const {data} = await $host.get( 'api/purchase/PurchaseClientsGetAll?idClients='+idClients);
        return data
    }
    catch(e){
        throw e;
    }
}
export const PurchaseGetAll = async (limit, page) => {
    try{
        const {data} = await $host.get( 'api/purchase/PurchaseGetAll?page='+page);
        return data
    }
    catch(e){
        throw e;
    }
}