import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const { default: jwt_decode } = require("jwt-decode");

export const BookAdd = async (IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN, IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto, Photo) => {
    try{
        console.log(IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto, Photo);
    console.log("!!!!!!");
    var data;
    if (MainPhoto=='' || MainPhoto.length==0){
    data = await BookTextAdd(IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN, IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, false);
    }
    else {
        
    data = await BookTextAdd(IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN, IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, true);
    }
    console.log(data.data.IdGoods)
    BookPhotoAdd(data.data.IdGoods, MainPhoto, Photo);

    console.log('data');
    return {data}
    }
    catch(e){
        throw e;
    }
}
export const BookPhotoAdd = async (IdGoods, MainPhoto, Photo) => {
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
export const BookTextAdd = async (IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN, IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto) => {
    try{
        console.log("добавление текста");
        console.log(IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN, IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto);
        const {data} = await $host.post( 'api/Books/BookAdd',{IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN, IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto})
        return {data}
    }
    catch(e){
        throw e;
    } 
}
// limit, 
export const BookGetAll = async (limit, page) => {
    const {data} = await $host.get( 'api/Books/BookGetAll?page='+page);
    return data
}
export const BookCharacteristicsGetAll = async (ch) => {
    const {data} = await $host.get( 'api/Books/BookCharacteristicsGetAll?ch='+ch);
    return data
}
export const BookSearchGetAll = async (limit, page, Name) => {
    console.log(limit, page, Name)
    const {data} = await $host.get( 'api/Books/BookSearchGetAll?limit='+limit+'&page='+page+'&Name='+Name);
    console.log(limit, page, data);
    return data
}
// export const BookDel = async (idGoods) => {
//     const {data} = await $host.post( 'api/Books/BookDel',{idGoods});
//     // return data
// }

export const BookDel = async (id) => {
    // console.log(id);
    const {data} = await $host.post( 'api/Books/BookDel',{id})
    return data
}
export const BookUpdate = async (IdGoods,IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount,AmountPurchased, AmountReserved, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN,  IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto, Photo) => {

    try{
        console.log(Author);
    console.log("!!!!!!");
    var data;
    if (MainPhoto=='' || MainPhoto.length==0){
    data = await BookTextUpdate(IdGoods,IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount,AmountPurchased, AmountReserved, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN,  IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, false);
    }
    else {
        
    data = await BookTextUpdate(IdGoods,IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount,AmountPurchased, AmountReserved, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN,  IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, true);
    }
    BookPhotoAdd(IdGoods, MainPhoto, Photo);

    console.log('data');
    return {data}
    }
    catch(e){
        throw e;
    }
}
export const BookTextUpdate = async (IdGoods,IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, AmountPurchased, AmountReserved,IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN,  IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto) => {
    // console.log(id);\
    try{
        const {data} = await $host.post( 'api/Books/BookUpdate',{IdGoods, IdCities, Price, OZON, VK, Instagram, IdStates, Weight, Amount, AmountPurchased, AmountReserved, IdLocations, IdAvailability, ReceiptDate, IdConnections, Name, YearOfPublication,NumberOfPages, IdBindingType, ISBN, IdAgeRestriction, Description, Notes, IdPublishers, Author, Category, Genre, Parametr1, Parametr2, Parametr3, OwnerBook, MainPhoto})
    return data
    }
    catch(e){
        throw e;
    }
}
export const BookGet = async (id) => {
    console.log(typeof id);
    const {data} = await $host.get( 'api/Books/BookGet', { params: { id }})
    return data
}