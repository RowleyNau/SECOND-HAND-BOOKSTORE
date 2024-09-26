import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const { default: jwt_decode } = require("jwt-decode");


export const GoodsTimeGet = async (startDate, endDate) => {
    try{
        const {data} = await $host.get( 'api/goods/GoodsTimeGet?startDate='+startDate+'&endDate='+endDate);
        return data
    }
    catch(e){
        throw e;
    }
}