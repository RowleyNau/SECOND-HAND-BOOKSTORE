import {makeAutoObservable} from "mobx";

export default class UserStore {
     _isAuth = false
     _isCon = false
     _user = {}
    constructor() {
       
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setIsCon(bool) {
        this._isCon = bool
    }

    get isAuth() {
        return this._isAuth
    }
    get isCon() {
        return this._isCon
    }
    get user() {
        return this._user
    }
}
