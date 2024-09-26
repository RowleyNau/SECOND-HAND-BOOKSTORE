import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
// const { default: jwt_decode } = require("jwt-decode");

export const CategoriesOtherGoodsAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/CategoriesOtherGoodsAdd',{Name})
    return data
}
export const CategoriesOtherGoodsGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/CategoriesOtherGoodsGetAll');
    return data
}
export const CategoriesOtherGoodsDel = async (id) => {
    console.log(id)
    const {data} = await $host.post( 'api/parameters/CategoriesOtherGoodsDel',{id});
    return data
}
export const CategoriesOtherGoodsUpdate = async (id, name) => {
    console.log(id, name)
    const {data} = await $host.post( 'api/parameters/CategoriesOtherGoodsUpdate',{id, name});
    return data
}
export const CategoriesOtherGoodsGetAllSearch = async (Name) => {
    console.log(Name)
    const {data} = await $host.get( 'api/parameters/CategoriesOtherGoodsGetAllSearch?Name='+Name);
    return data
}
// ------------------------------------------------------------------
export const GenreAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/genreAdd',{Name})
    return data
}
export const GenreGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/genreGetAll');
    return data
}
export const GenreDel = async (id) => {
    console.log(id)
    const {data} = await $host.post( 'api/parameters/genreDel',{id});
    return data
}
export const GenreUpdate = async (id, name) => {
    console.log(id, name)
    const {data} = await $host.post( 'api/parameters/genreUpdate',{id, name});
    return data
}
export const GenreGetAllSearch = async (Name) => {
    console.log(Name)
    const {data} = await $host.get( 'api/parameters/genreGetAllSearch?Name='+Name);
    return data
}
// ------------------------------------------------------------------
export const AuthorsAdd = async (LastName, Name, MiddleName) => {
    const {data} = await $host.post( 'api/parameters/authorsAdd',{LastName, Name, MiddleName});
    return data
}
export const AuthorsGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/authorsGetAll');
    return data
}
export const AuthorsDel = async (id) => {
    console.log(typeof id)
    const data = await $host.post( 'api/parameters/authorsDel',{id});
    return data
}
export const AuthorsUpdate = async (id, LastName, Name, MiddleName) => {
    console.log(id, LastName, Name, MiddleName)
    const data = await $host.post( 'api/parameters/authorsUpdate',{id, LastName, Name, MiddleName});
    return data
}
export const AuthorsGetAllSearch = async (Name) => {
    console.log(Name)
    const {data} = await $host.get( 'api/parameters/authorsGetAllSearch?Name='+Name);
    return data
}
// ------------------------------------------------------------------
export const CategoriesAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/categoriesAdd',{Name})
    return data
}
export const CategoriesGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/categoriesGetAll');
    return data
}
export const CategoriesDel = async (id) => {
    console.log(id)
    const {data} = await $host.post( 'api/parameters/categoriesDel',{id});
    return data
}
export const CategoriesUpdate = async (id, name) => {
    console.log(id, name)
    const {data} = await $host.post( 'api/parameters/categoriesUpdate',{id, name});
    return data
}
export const CategoriesGetAllSearch = async (Name) => {
    console.log(Name)
    const {data} = await $host.get( 'api/parameters/categoriesGetAllSearch?Name='+Name);
    return data
}
// ------------------------------------------------------------------
export const PublishersAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/publishersAdd',{Name})
    return data
}
export const PublishersGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/publishersGetAll');
    return data
}
export const PublishersDel = async (id) => {
    console.log(id)
    const {data} = await $host.post( 'api/parameters/publishersDel',{id});
    return data
}
export const PublishersUpdate = async (id, name) => {
    console.log(id, name)
    const {data} = await $host.post( 'api/parameters/publishersUpdate',{id, name});
    return data
}
export const PublishersGetAllSearch = async (Name) => {
    console.log(Name)
    const {data} = await $host.get( 'api/parameters/publishersGetAllSearch?Name='+Name);
    return data
}
// ------------------------------------------------------------------
export const BindingtypeAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/bindingtypeAdd',{Name})
    return data
}
export const BindingtypeGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/bindingtypeGetAll');
    return data
}
export const BindingtypeDel = async (id) => {
    console.log(id)
    const {data} = await $host.post( 'api/parameters/bindingtypeDel',{id});
    return data
}
export const BindingtypeUpdate = async (id, name) => {
    console.log(id, name)
    const {data} = await $host.post( 'api/parameters/bindingtypeUpdate',{id, name});
    return data
}
export const BindingtypeGetAllSearch = async (Name) => {
    console.log(Name)
    const {data} = await $host.get( 'api/parameters/bindingtypeGetAllSearch?Name='+Name);
    return data
}
// ------------------------------------------------------------------
export const AgerestrictionAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/agerestrictionAdd',{Name})
    return data
}
export const AgerestrictionGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/agerestrictionGetAll');
    return data
}
// ------------------------------------------------------------------
export const LocationsAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/locationsAdd',{Name})
    return data
}
export const LocationsGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/locationsGetAll');
    return data
}
export const LocationsDel = async (id) => {
    console.log(id)
    const {data} = await $host.post( 'api/parameters/locationsDel',{id});
    return data
}
export const LocationsUpdate = async (id, name) => {
    console.log(id)
    const {data} = await $host.post( 'api/parameters/LocationsUpdate',{id, name});
    return data
}
export const LocationsGetAllSearch = async (Name) => {
    console.log(Name)
    const {data} = await $host.get( 'api/parameters/locationsGetAllSearch?Name='+Name);
    return data
}
// ------------------------------------------------------------------
export const GoodstatesAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/goodstatesAdd',{Name})
    return data
}
export const GoodstatesGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/goodstatesGetAll');
    return data
}
// ------------------------------------------------------------------
export const CitiesAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/citiesAdd',{Name})
    return data
}
export const CitiesGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/citiesGetAll');
    return data
}
export const CitiesDel = async (id) => {
    console.log(id)
    const {data} = await $host.post( 'api/parameters/citiesDel',{id});
    return data
}
export const CitiesUpdate = async (id, name) => {
    console.log(id, name)
    const {data} = await $host.post( 'api/parameters/citiesUpdate',{id, name});
    return data
}
export const CitiesGetAllSearch = async (Name) => {
    console.log(Name)
    const {data} = await $host.get( 'api/parameters/citiesGetAllSearch?Name='+Name);
    return data
}
// ------------------------------------------------------------------
export const AvailabilityAdd = async (Name) => {
    const {data} = await $host.post( 'api/parameters/availabilityAdd',{Name})
    return data
}
export const AvailabilityGetAll = async () => {
    const {data} = await $host.get( 'api/parameters/availabilityGetAll');
    return data
}
//----------------------------------------------------------------
export const PhotoAdd = async (ABC) => {
    // console.log(typeof ABC);
    const {data} = await $host.post( 'api/parameters/PhotoAdd',{ABC})
    return data
}
export const PhotoGet = async (Name) => {
    console.log(Name);
    const {data} = await $host.get( 'api/parameters/PhotoGet?Name='+Name)
    // console.log(Name,data)
    return data
}
//----------------------------------------------------------------
export const SearchOwnersGet = async (Name) => {
    const {data} = await $host.get( 'api/parameters/SearchOwnersGet?Name='+Name)
    return data
}
//----------------------------------------------------------------

export const SearchConnectionGet = async (Name) => {
    const {data} = await $host.get( 'api/parameters/SearchConnectionGet?Name='+Name);
    // console.log(data);
    return data
}
export const SearchConnectionForOtherGoodsGet = async (Name) => {
    const {data} = await $host.get( 'api/parameters/SearchConnectionForOtherGoodsGet?Name='+Name);
    // console.log(data);
    return data
}