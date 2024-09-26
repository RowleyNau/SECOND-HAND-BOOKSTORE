import {makeAutoObservable} from "mobx";

export default class BookParamStore {
    constructor(){
        this._genre = []
        this._сategories = []
        this._publishers = []
        this._authors = []
        this._bindingtype = []
        this._agerestriction = []
        this._locations = []

        this._goodstates = []
        this._cities = []
        this._availability = []
        makeAutoObservable(this)
    }

    setGenres(genre) {
        this._genre = genre
    }
    get genre(){
        return this._genre
    }
    //-------------------------------------------------------------
    setAuthors(authors) {
        this.authors = authors
    }
    get authors(){
        return this._authors
    }
    //-------------------------------------------------------------
    setCategories(сategories) {
        this.сategories = сategories
    }
    get сategories(){
        return this._сategories
    }
    //-------------------------------------------------------------
    setPublishers(publishers) {
        this.publishers = publishers
    }
    get publishers(){
        return this._publishers
    }
    //-------------------------------------------------------------
    setBindingtypeGetAll(bindingtype) {
        this.bindingtype = bindingtype
    }
    get bindingtype(){
        return this._bindingtype
    }
    //-------------------------------------------------------------
    setAgerestriction(agerestriction) {
        this.agerestriction = agerestriction
    }
    get agerestriction(){
        return this._agerestriction
    }
    //-------------------------------------------------------------
    setLocations(locations) {
        this.locations = locations
    }
    get locations(){
        return this._locations
    }
    //-------------------------------------------------------------
    setCities(cities) {
        this.cities = cities
    }
    get cities(){
        return this._cities
    }

    //-------------------------------------------------------------
    setAvailability(availability) {
        this.availability = availability
    }
    get availability(){
        return this._availability
    }












    // get user(){
    //     return this._user
    // }
}
