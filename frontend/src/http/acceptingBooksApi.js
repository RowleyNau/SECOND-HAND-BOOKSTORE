import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const { default: jwt_decode } = require("jwt-decode");

export const AcceptingBooksAdd = async (Comment, TransportAssistance, RequestDate, Photo) => {
    try{
    
        const dataToken = localStorage.getItem('token');
    let info = jwtDecode(dataToken);
    var IdClients=info.IdClients;
    console.log(info.IdClients)
    console.log("!!!!!!");
    var data;
    if (Photo=='' || Photo.length==0){
    data = await AcceptingBooksTextAdd(IdClients, Comment, TransportAssistance, RequestDate, false);
    }
    else {
        
    data = await AcceptingBooksTextAdd(IdClients, Comment, TransportAssistance, RequestDate, true);
    }
    console.log(data.data.IdReceptionOfGoods)
    if(!(Photo==''||Photo.length==0))
    {AcceptingBooksPhotoAdd(data.data.IdReceptionOfGoods, Photo);}

    console.log('data');
    return {data}
    }
    catch(e){
        throw e;
    }
}
export const AcceptingBooksPhotoAdd = async (IdReceptionOfGoods, Photo) => {
    try{

        console.log("сохранение фото");
        const formData = new FormData();
        formData.append('IdReceptionOfGoods', IdReceptionOfGoods);
        var PhotoStr = '';
        Photo.forEach((photo, index) => {
            // PhotoStr+=photo+' ';
            formData.append(`Photo[${index}]`, photo);
        });
        const {data} = await $host.post( 'api/acceptingBooks/AcceptingBooksPhotoAdd',formData,{
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
export const AcceptingBooksTextAdd = async (IdClients, Comment, TransportAssistance, RequestDate, Photo) => {
    try{
        console.log("добавление текста");
        console.log(IdClients, Comment, TransportAssistance, RequestDate, Photo);
        const {data} = await $host.post( 'api/acceptingBooks/AcceptingBooksAdd',{IdClients, Comment, TransportAssistance, RequestDate, Photo})
        return {data}
    }
    catch(e){
        throw e;
    } 
}
// limit, 
export const AcceptingBooksGetAll = async () => {
    const {data} = await $host.get( 'api/acceptingBooks/AcceptingBooksGetAll');
    return data
}
export const AcceptingBooksClientsGetAll = async () => {
    const dataToken = localStorage.getItem('token');
    const {data} = await $host.get( 'api/acceptingBooks/AcceptingBooksClientsGetAll?dataToken='+dataToken);
    return data
}
export const AcceptingBooksGetOne = async (id) => {
    const {data} = await $host.get( 'api/acceptingBooks/AcceptingBooksGetOne?id='+id);
    return data
}
// export const BookSearchGetAll = async (limit, page, Name) => {
//     console.log(limit, page, Name)
//     const {data} = await $host.get( 'api/Books/BookSearchGetAll?limit='+limit+'&page='+page+'&Name='+Name);
//     console.log(limit, page, data);
//     return data
// }
// export const BookDel = async (idGoods) => {
//     const {data} = await $host.post( 'api/Books/BookDel',{idGoods});
//     // return data
// }

export const ResponseToRequestToAcceptBookAdd = async (Response, IdReceptionOfBooks) => {
    try{
    
        const dataToken = localStorage.getItem('token');
        const data = await $host.post( 'api/acceptingBooks/ResponseToRequestToAcceptBookAdd',{Response, IdReceptionOfBooks, dataToken})
        return {data}
    }
    catch(e){
        throw e;
    }
}

