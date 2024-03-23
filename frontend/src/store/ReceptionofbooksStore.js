import {makeAutoObservable} from "mobx";

export default class ReceptionofbooksStore {
    constructor(){
        this._receptionofbooks = [
            {IdReceptionOfBooks: 1, IdClients: 1, Comment:"fff", TransportAssistance: true, RequestDate: "20.10.2002"},
            {IdReceptionOfBooks: 2, IdClients: 1, Comment:"fff", TransportAssistance: true, RequestDate: "20.10.2002"},
            {IdReceptionOfBooks: 3, IdClients: 1, Comment:"fff", TransportAssistance: true, RequestDate: "20.10.2002"}
        ]
        this._photobooksforreception =[
            {IdPhotoBooksForReception: 1, Photo: "fff", IdReceptionOfBooks:1},
            {IdPhotoBooksForReception: 2, Photo: "fff", IdReceptionOfBooks:2},
            {IdPhotoBooksForReception: 3, Photo: "fff", IdReceptionOfBooks:3}
        ]
        makeAutoObservable(this)
    }

    setIsAuth(receptionofbooks) {
        this._receptionofbooks = receptionofbooks
    }
    setUser(photobooksforreception) {
        this._photobooksforreception = photobooksforreception
    }

    get receptionofbooks(){
        return this._receptionofbooks
    }
    get photobooksforreception(){
        return this._photobooksforreception
    }
}
