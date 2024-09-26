import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const { default: jwt_decode } = require("jwt-decode");

// export const AddMessages = async (message) => {
//     const dataToken = localStorage.getItem('token');
//     let info = jwtDecode(dataToken);
//     var idClients=info.IdClients;
//     const {data} = await $host.post( 'api/chats/AddMessages',{idClients, message, rule, dateCreated})
//     return data
// }
// export const createChat = async () => {
//     const dataToken = localStorage.getItem('token');
//     let info = jwtDecode(dataToken);
//     var id=info.IdClients;
//     const {data} = await $host.post( 'api/chats/createChat',{id})
//     return data
// }
// export const getClientsMessages = async (Name) => {
//     const {data} = await $host.get( 'api/chats/getClientsMessages?Name='+Name);
//     return data
// }
// export const getAllClientsMessages = async (id) => {
//     console.log(id)
//     const {data} = await $host.post( 'api/chats/getAllClientsMessages',{id});
//     return data
// }
// export const CategoriesOtherGoodsUpdate = async (id, name) => {
//     console.log(id, name)
//     const {data} = await $host.post( 'api/parameters/CategoriesOtherGoodsUpdate',{id, name});
//     return data
// }
// export const CategoriesOtherGoodsGetAllSearch = async (Name) => {
//     console.log(Name)
//     const {data} = await $host.get( 'api/parameters/CategoriesOtherGoodsGetAllSearch?Name='+Name);
//     return data
// }
// const getIdClientFromToken = () => {
//     const dataToken = localStorage.getItem('token');
//     if (!dataToken) {
//         throw new Error("Token is missing in local storage");
//     }
//     const info = jwtDecode(dataToken);
//     return info.IdClients;
// }

// export const getAllMessages = async (chatId) => {
//     try {
//         console.log('!!!')
//         const { data } = await $host.get(`/api/chats/${chatId}/messages`);
//         return data;
//     } catch (error) {
//         console.error("Error fetching messages:", error);
//         throw error;
//     }
// }

// export const sendMessage = async (chatId, message) => {
//     try {
//         console.log('!!!')
//         const IdClients = getIdClientFromToken();
//         const { data } = await $host.post(`/api/chats/${chatId}/messages`, {
//             IdClients,
//             message
//         });
//         return data;
//     } catch (error) {
//         console.error("Error sending message:", error);
//         throw error;
//     }
// }

// export const createChatIfNotExists = async () => {
//     try {
//         console.log('!!!')
//         const IdClients = getIdClientFromToken();
//         const { data } = await $authHost.post(`/api/chats`, { IdClients });
//         return data;
//     } catch (error) {
//         console.error("Error creating chat:", error);
//         throw error;
//     }
// }
