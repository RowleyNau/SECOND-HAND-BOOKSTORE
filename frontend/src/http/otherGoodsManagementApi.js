import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const { default: jwt_decode } = require("jwt-decode");

export const OtherGoodsAdd = async (IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto, Photo) => {
    try{
        console.log(IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto, Photo);
    console.log("!!!!!!");
    const data = await OtherGoodsTextAdd(IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook);
    console.log(data.data.IdGoods)
    OtherGoodsPhotoAdd(data.data.IdGoods, MainPhoto, Photo);

    console.log('data');
    return {data}
    }
    catch(e){
        throw e;
    }
    
}

export const OtherGoodsPhotoAdd = async (IdGoods, MainPhoto, Photo) => {
    try{

    console.log("сохранение фото");
    const formData = new FormData();
    formData.append('IdGoods', IdGoods);
    formData.append('MainPhoto', MainPhoto);
    var PhotoStr = '';
    Photo.forEach((photo, index) => {
        // PhotoStr+=photo+' ';
        formData.append(`Photo[${index}]`, photo);
    });
    const {data} = await $host.post( 'api/OtherGoods/OtherGoodsPhotoAdd',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
    console.log('data');
    return {data}
    }
    catch(e){
        throw e;
    }    
}

export const OtherGoodsTextAdd = async (IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook) => {
    try{
    console.log("добавление текста");

    const data = await $host.post( 'api/OtherGoods/OtherGoodsAdd',{IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook})
    console.log(data);
    return data
    }
    catch(e){
        throw e;
    }
    
}

export const OtherGoodsGetAll = async (limit, page) => {
    console.log()
    const {data} = await $host.get( 'api/OtherGoods/OtherGoodsGetAll?page='+page);
    console.log(limit, page, data);
    return data
}
export const OtherGoodsSearchGetAll = async (limit, page, Name) => {
    console.log(limit, page, Name)
    const {data} = await $host.get( 'api/OtherGoods/OtherGoodsSearchGetAll?page='+page+'&Name='+Name);
    console.log(limit, page, data);
    return data
}
export const OtherGoodsDel = async (id) => {
    // console.log(id);
    const {data} = await $host.post( 'api/OtherGoods/OtherGoodsDel',{id})
    return data
}
export const OtherGoodsUpdate = async (IdGoods,IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, AmountPurchased, AmountReserved,IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto, Photo) => {
    // console.log(id);
    const data = await OtherGoodsTextUpdate(IdGoods, IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount,AmountPurchased, AmountReserved, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook);
    // console.log(data.data.IdGoods)
    OtherGoodsPhotoAdd(IdGoods, MainPhoto, Photo);
    return data
}
export const OtherGoodsTextUpdate = async (IdGoods, IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount,AmountPurchased, AmountReserved, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook) => {
    // console.log(id);
    // const {data} = await $host.post( 'api/OtherGoods/OtherGoodsUpdate',{IdGoods, IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook})
    try{
        console.log("добавление текста");
    
        const data = await $host.post( 'api/OtherGoods/OtherGoodsUpdate',{IdGoods, IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount,AmountPurchased, AmountReserved, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook})
        console.log(data);
        return data
        }
        catch(e){
            throw e;
        }
    // return data
}
export const OtherGoodsGet = async (id) => {
    // console.log(typeof id);
    const {data} = await $host.get( 'api/OtherGoods/OtherGoodsGet', { params: { id }})
    console.log(data)
    return data
}