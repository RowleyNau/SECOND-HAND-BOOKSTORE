import '../../Pages.css';
import './ModalWinBook.css';
import {customQuote} from './1.js';
import moment from 'moment';
import InputDate from '../../../components/allInput/InputDate.jsx';
import { useEffect, useState } from 'react';
import ActionButton from '../../../components/allButtons/actionButton/ActionButton.jsx';
import FunctionButton from '../../../components/allButtons/functionButton/FunctionButton.jsx';
import InputStrMini from '../../../components/allInput/InputStrMini.jsx';
import InputNum from '../../../components/allInput/InputNum.jsx';
import React from "react";  
import ReactDOM from 'react-dom';   
import InputSelect from '../../../components/allInput/InputSelect.jsx';
import InputSelectMultiple from '../../../components/allInput/InputSelectMultiple.jsx';
import InputPhoto from '../../../components/allInput/InputPhoto.jsx';
import InputStr from '../../../components/allInput/InputStr.jsx';
import { BookAdd } from '../../../http/bookManagementApi.js';
import { OtherGoodsAdd, OtherGoodsUpdate } from '../../../http/otherGoodsManagementApi.js';
import Search from '../../../components/searchInput2/Search.jsx';
import {FaTrashAlt} from "react-icons/fa";
import { RxCross2 } from 'react-icons/rx';
import {CategoriesOtherGoodsAdd, CategoriesOtherGoodsGetAll, PhotoGet, PhotoAdd, GenreAdd, GenreGetAll, AuthorsAdd, AuthorsGetAll, CategoriesAdd, CategoriesGetAll, PublishersAdd, PublishersGetAll, BindingtypeAdd, BindingtypeGetAll, AgerestrictionAdd, AgerestrictionGetAll, LocationsAdd, LocationsGetAll, GoodstatesAdd, GoodstatesGetAll, CitiesAdd, CitiesGetAll, AvailabilityAdd, AvailabilityGetAll, SearchOwnersGet, SearchConnectionForOtherGoodsGet} from '../../../http/parametersApi.js'; 
import { Context } from '../../../index.js';
import BookParamStore from '../../../store/BookParamStore.js';
import {observer} from "mobx-react-lite";
const OtherGoodsInfo = observer( (props) => {
    const { IdGoodInfo, idBook, id,setActive, active, ...inputProps } = props;

    function createDictionary(array) {
        return array.map((item, index) => ({
            value: (index + 1).toString(),
            label: item
        }));
        }
    function createDictionary1(array) {
        return array.map((item, index) => ({
            value: (item.Id).toString(),
            label: item.Name
        }));
        }
function createDictionaryAuthor(array) {
    return array.map((item, index) => {
        let label = item.Name;
        if (item.LastName !== null) {
            label += ' '+item.LastName;
        }
        if (item.MiddleName !== null) {
            label += ' '+item.MiddleName;
        }
        return {
            value: (item.Id).toString(),
            label: label
        };
    });
}
const PhotoMainInpStart = async(str)=>{

    let data = await PhotoGet(str)
    setMainPhoto([data]);
};
const PhotoInpStart = async(str)=>{
    let data = await PhotoGet(str)
    const a = [...Photo];
    a.push(data);
    setPhoto(a);
    console.log(a)
};

    const [Name, setName]=useState('');
    const [Price, setPrice]=useState('');
    const [OZON, setOZON]=useState('');
    const [VK, setVK]=useState('');
    const [Instagram, setInstagram]=useState('');
    const [Amount, setAmount]=useState('');
    const [AmountPurchased, setAmountPurchased]=useState('');
    const [AmountReserved, setAmountReserved]=useState('');
    const [ReceiptDate, setReceiptDate]=useState(moment().format('YYYY-MM-DD'));

    const [Notes, setNotes]=useState('');
    const [Description, setDescription]=useState('');
    const [Photo, setPhoto]=useState([])
    const [MainPhoto, setMainPhoto]=useState([])
    const [Category, setCategory]=useState([]);
    const [NewCategory, setNewCategory]=useState([]);
    const [ButNewCategory, setButNewCategory]=useState(false);
    const [selCategory, setSelCategory] = useState({categories:['','']});
    const addCategory = async()=>{
        let data;
        data = await CategoriesOtherGoodsAdd(NewCategory);
        data = await CategoriesOtherGoodsGetAll();
        setSelCategory(createDictionary1(data.Categories))
    } 


    const [Condition, setCondition]=useState('');
    const [selCondition, setSelCondition] = useState({goodstates:['','']}); 

    const [selCities, setSelCities]=useState({cities:['','']}); 
    const [Cities, setCities]=useState('');
    const [Availability, setAvailability]=useState('');
    const [selAvailability, setSelAvailability] = useState({availability:['','']});    

    const [selLocation, setSelLocation] = useState({locations:['','']}); 
    const [Location, setLocation]=useState('');   
    const [NewLocation, setNewLocation]=useState([]);
    const [ButNewLocation, setButNewLocation]=useState(false);
    const addLocation = async()=>{
        let data;
        // console.log(typeof NewLocation, NewLocation)
        data = await LocationsAdd(NewLocation);
        data = await LocationsGetAll();
        setSelLocation(createDictionary1(data.locations))
    };
    const selectData = async()=>{
        let data ;
        data = await CitiesGetAll();
        setSelCities(createDictionary1(data.cities))
        data = await LocationsGetAll();
        setSelLocation(createDictionary1(data.locations))
        data = await GoodstatesGetAll(); 
        setSelCondition(createDictionary1(data.goodstates))
        data = await CategoriesOtherGoodsGetAll();
        setSelCategory(createDictionary1(data.Categories))
        data = await AvailabilityGetAll();
        setSelAvailability(createDictionary1(data.availability))
    };
    

    useEffect (()=>{
        // console.log(IdGoodInfo);
        if (IdGoodInfo!=''|| IdGoodInfo!='null'){
            
            if (IdGoodInfo.good.photoGoods.length>0){
                // console.log(typeof IdGoodInfo.good.photoGoods[0].Cover)
                // const Id = good.IdGoods
                (async () => {
                    const a = [];
                    for (const photo of IdGoodInfo.good.photoGoods) {
                        // const a = [...Author];
                        if (photo.Cover) {
                            PhotoMainInpStart('static/images/goods/' + IdGoodInfo.good.IdGoods + '/' + photo.Photo);;
                        } else {
                            // PhotoInpStart('static/images/goods/' + IdGoodInfo.good.IdGoods + '/' + photo.Photo);
                            let data = await PhotoGet('static/images/goods/' + IdGoodInfo.good.IdGoods + '/' + photo.Photo)
                            a.push(data);
                            
                            console.log(a)
                        }
                    }
                    setPhoto(a);
                })();
            }
            if (IdGoodInfo.good.Price !== '' && IdGoodInfo.good.Price !== 'null' && IdGoodInfo.good.Price) {
                setPrice(IdGoodInfo.good.Price);
            }
        
            if (IdGoodInfo.good.Amount !== '' && IdGoodInfo.good.Amount !== 'null' && IdGoodInfo.good.Amount) {
                setAmount(IdGoodInfo.good.Amount);
            }
            if (IdGoodInfo.good.AmountReserved !== '' && IdGoodInfo.good.AmountReserved !== 'null' ) {
                setAmountReserved(IdGoodInfo.good.AmountReserved);
            }
            if (IdGoodInfo.good.AmountPurchased !== '' && IdGoodInfo.good.AmountPurchased !== 'null' ) {
                setAmountPurchased(IdGoodInfo.good.AmountPurchased);
            }
            if (IdGoodInfo.good.Instagram !== '' && IdGoodInfo.good.Instagram !== 'null' && IdGoodInfo.good.Instagram) {
                setInstagram(IdGoodInfo.good.Instagram);
            }
            
            if (IdGoodInfo.good.OZON !== '' && IdGoodInfo.good.OZON !== 'null' && IdGoodInfo.good.OZON) {
                setOZON(IdGoodInfo.good.OZON);
            }
            
            if (IdGoodInfo.good.VK !== '' && IdGoodInfo.good.VK !== 'null' && IdGoodInfo.good.VK) {
                setVK(IdGoodInfo.good.VK);
            }
            
            if (IdGoodInfo.good.ReceiptDate !== '' && IdGoodInfo.good.ReceiptDate !== 'null' && IdGoodInfo.good.ReceiptDate) {
                setReceiptDate(IdGoodInfo.good.ReceiptDate);
            }
            
            if (IdGoodInfo.good.Weight !== '' && IdGoodInfo.good.Weight !== 'null'&& IdGoodInfo.good.Weight) {
                setWeight(IdGoodInfo.good.Weight);
            }

            if (IdGoodInfo.good.IdAvailability !== '' && IdGoodInfo.good.IdAvailability !== 'null' && IdGoodInfo.good.availability.length!=0 && IdGoodInfo.good.availability) {
                setAvailability([{value: IdGoodInfo.good.IdAvailability, label: IdGoodInfo.good.availability.Name}]);
            }
            
            if (IdGoodInfo.good.IdCities !== '' && IdGoodInfo.good.IdCities !== 'null' && IdGoodInfo.good.IdCities) {
                setCities({value: (IdGoodInfo.good.IdCities).toString(), label: IdGoodInfo.good.city.Name});
            }
            
            if (IdGoodInfo.good.IdLocations !== '' && IdGoodInfo.good.IdLocations !== 'null' && IdGoodInfo.good.IdLocations) {
                setLocation([{value: IdGoodInfo.good.IdLocations, label: IdGoodInfo.good.location.Name}]);
            }

            if (IdGoodInfo.good.othergood.Name !== '' && IdGoodInfo.good.othergood.Name !== 'null' && IdGoodInfo.good.othergood.Name) {
                setName(IdGoodInfo.good.othergood.Name);
            }
                    // console.log(IdGoodInfo.good.othergood.categoriesothergood)
            if (IdGoodInfo.good.othergood.categoriesothergood) {
                    let a=[]
                    a.push({value: IdGoodInfo.good.othergood.categoriesothergood.Id, label: IdGoodInfo.good.othergood.categoriesothergood.Name});
                    setCategory(a);
               
            }
            if (IdGoodInfo.good.goodslocations) {
                setLocationsGoods('');
                console.log('!!!')
                var a = [...LocationsGoods];
                {IdGoodInfo.good.goodslocations.map((good) => {
            //     // Добавьте новый элемент в копию массива
                    a.push({ id: good.location.Id, Name: good.location.Name, Amount: good.Amount });
                    console.log(a)
                })}
                setLocationsGoods(a);
                
            }
            if (IdGoodInfo.good.goodstate&& IdGoodInfo.good.IdStates!== '' && IdGoodInfo.good.IdStates !== 'null') {
                setCondition([{value: IdGoodInfo.good.IdStates, label: IdGoodInfo.good.goodstate.Name}]);
            }
            if (IdGoodInfo.good.othergood.Description!= '' && IdGoodInfo.good.othergood.Description != 'null') {
                setDescription(IdGoodInfo.good.othergood.Description);
            }

            if(IdGoodInfo.good.goodssize!=null){
                // console.log(IdGoodInfo.good.goodssize)
                if (IdGoodInfo.good.goodssize.Parameter1!= '' && IdGoodInfo.good.goodssize.Parameter1!= 'null') {
                    setParametr1(IdGoodInfo.good.goodssize.Parameter1);
                }
                if (IdGoodInfo.good.goodssize.Parameter2!= '' && IdGoodInfo.good.goodssize.Parameter2!= 'null') {
                    setParametr2(IdGoodInfo.good.goodssize.Parameter2);
                }
                if (IdGoodInfo.good.goodssize.Parameter3!= '' && IdGoodInfo.good.goodssize.Parameter3!= 'null') {
                    setParametr3(IdGoodInfo.good.goodssize.Parameter3);
                } 
            }
            if(IdGoodInfo.good.connection!=null){
                // console.log(IdGoodInfo.good.connection.goods)
                let a=[];
                // console.log([{id: IdGoodInfo.good.IdConnections, value: 2}])
                {IdGoodInfo.good.connection.goods.map((good) => {
                    a.push({IdOtherGoods: good.othergood.IdOtherGoods, Name: good.othergood.Name, IdGoods: good.IdGoods, IdConnections: IdGoodInfo.good.IdConnections});
                })}
                // console.log([{id: IdGoodInfo.good.IdConnections, value: a}])
                setConnection([{id: IdGoodInfo.good.IdConnections, value: a}]);
            }
    
            if(IdGoodInfo.good.owners.length>0 && IdGoodInfo.good.owners!=null){
                ButSetOwners( IdGoodInfo.good.owners[0].IdClient, IdGoodInfo.good.owners[0].client.Name, IdGoodInfo.good.owners[0].client.Mail)
            }
           
            // const PhotoMainInpStart = async(str)=>{

            //     let data = await PhotoGet(str)
            //     setMainPhoto([data]);
            // };
            // const PhotoInpStart = async(str)=>{
            
            //     let data = await PhotoGet(str)
            //     const a = [...Photo];
            //     a.push(data);
            //     setPhoto(a);
            //     console.log(a)
            // };


        }






        selectData();
        
    },[])
    
// useEffect (()=>{
//     // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", Photo)
// },[Photo])
    //можно будет удалить
    const [q, setq]=useState([]);

    const read2 = async()=>{

        // let data = await PhotoGet();
        // setImages([data])
        // console.log(typeof images, images);
        // console.log(images);
        // let data = await SearchOwnersGet(Name);
        // console.log(data);
    };
    // useEffect(()=>{console.log(BookParam)},[BookParam]);

    const [YearPublishing, setYearPublishing]=useState([]);
    const [Parametr1, setParametr1]=useState('');
    const [Parametr2, setParametr2]=useState('');
    const [Parametr3, setParametr3]=useState('');
    const [Weight, setWeight]=useState('');
    const [Quality, setQuality]=useState();

    


  

    // const selCategory = [
    //     { value: '1', label: 'Какая-то категория' },
    //     { value: '2', label: 'Мягкий переплет' },
    //     { value: '3', label: 'Супер обложка' }
    //   ];   

    const [Connection, setConnection] = useState([]);
    const [SearchConnection, setSearchConnection] = useState([]);//проверить как в бд{Goods:[{IdGoods:'1', Name:'AAA'},{IdGoods:'2', Name:'BBB'}],IdConnection:'1'}, {Goods:[{IdGoods:'3', Name:'CCC'}],Id:'2'}
  
    
    const [USOwners, setUSOwners]=useState([]);
    const [SearchOwners, setSearchOwners] = useState([]);//проверить как в бд     
    const ButSetOwners = ( idINP, NameINP, MailINP)=> {

        if (!USOwners.some(USOwner => USOwner.id === idINP))
        {
            // let Owners = USOwners;
            // Owners.push({id:idINP,Name:NameINP,Phone:PhoneINP});
            // setUSOwners(Owners);
            // console.log(USOwners);
            const updatedOwners = [...USOwners];
            // Добавьте новый элемент в копию массива
            updatedOwners.push({ id: idINP, Name: NameINP, Mail: MailINP });
            // Установите новую копию массива в качестве состояния
            setUSOwners(updatedOwners);
        }
    }   
    const ButDelOwners = (id)=> {
        var Owners = [...USOwners];
        Owners = Owners.filter(Owner => Owner.id !== id);
        setUSOwners(Owners);
    } 

    const [SearchOwnersInput, SetSearchOwnersInput] = useState('');
    async function SearchOwnersFun() {
        if (SearchOwnersInput!=''){
            let data = await SearchOwnersGet(SearchOwnersInput);
            console.log(data.GetClient);
            setSearchOwners(data.GetClient);
        }
        // data.GetClient.map((item, index) => ({
        //     value: (item.Id).toString(),
        //     label: item.Name
        // }));
    }

    const ButDelConnection = (id)=> {
        var Con = [...Connection];
        Con = Con.filter(C => C.id !== id);
        setConnection(Con);
    } 

    const [SearchConnectionInput, SetSearchConnectionInput] = useState('');

    async function createMatrixFromRepeats(arr) {
        const repeats = [];
        
        // console.log(arr);
        arr = flattenData(arr);
        // console.log(arr);
        // console.log(arr);
        arr.map((item, index) => {

          repeats[item.IdConnections]? 
            repeats[item.IdConnections].push(item)            
          :
            repeats[item.IdConnections] = [item]}    
         );
        //  console.log(repeats);
         let matrix=[];
         repeats.map((item, index) => {
            // console.log( index);
            matrix.push({id:index, value:item})  
            }    
         );
        //  console.log(matrix);
        return matrix;
      }
    function flattenData(data) {
        return data.map(item => ({
          IdOtherGoods: item.IdOtherGoods,
          Name: item.Name,
          IdGoods: item.IdGoods,
          IdConnections: item.good.IdConnections
        }));
      }
    async function SearchConnectionFun() {
        if (SearchConnectionInput!=''){
            let data = await SearchConnectionForOtherGoodsGet(SearchConnectionInput); 
            // console.log(data)
            let f = await createMatrixFromRepeats(data.data)
            
            // console.log(f) ;
            setSearchConnection( f);
        }
    }

    function checkNull(a){
        if (a==''){
            return false
        }
        else {
            return true
        }
    }

    function tttt(a){
        if (a==''){
            return false
        }
        else {
            return true
        }
    }
    const [images, setImages] = useState([]);

    
    const [ErrorINP, setErrorINP] = useState('');
    const [SaveINP, setSaveINP] = useState('');
    const addGood = async()=>{
        setErrorINP('!');
        var CitiesV= (typeof Cities.value!= 'undefined')?Cities.value:'' ,  
        ConditionV=(typeof Condition.value!= 'undefined')?Condition.value:'', 
        LocationV=(typeof Location.value!= 'undefined')?Location.value:'', 
        ConnectionV=(typeof Connection[0]!= 'undefined')?Connection[0][0].IdConnections:'';
        // console.log(CitiesV, ConditionV,LocationV,ConnectionV);
        try{
        // console.log( Category[0])
        var data = await OtherGoodsAdd(CitiesV, Price, OZON, VK, Instagram, ConditionV, Weight, Amount, LocationV, 1, ReceiptDate, ConnectionV, Name, Description, Notes, Category[0], Parametr1, Parametr2, Parametr3, USOwners, MainPhoto, Photo);
        await setErrorINP('Товар успешно добавлен');
        // console.log(data.error)
        }
        catch (e){
            console.log(e)
            // alert(e.response.data.message)
            setErrorINP(e.response.data.message)
            // setMActive()
        }
        // console.log('!!!')
    }
    const read = async()=>{
        // console.log(USOwners);
        // let data;
        // console.log(Connection[0]);
        var CitiesV= (typeof Cities.value!= 'undefined')?Cities.value:'' ,  ConditionV=(typeof Condition[0].value!= 'undefined')?Condition[0].value:'', ConnectionV=(typeof Connection[0]!= 'undefined')?Connection[0].id:'', CategoryV=(typeof Category[0].value!= 'undefined')?Category[0].value:'', USOwnersV=(USOwners.length>0)?USOwners:'';
        // 
        // console.log();
        // console.log((typeof BindingType[0].value!= 'undefined')?BindingType[0].value:'');
        // CitiesV, ConditionV,LocationV,ConnectionV, BindingTypeV, AgeRestrictionV,PublishersV
        // Cities, Condition,Location,Connection, BindingType, AgeRestriction,Publishers
        try{
        console.log(IdGoodInfo.good.IdGoods,CitiesV, Price, OZON, VK, Instagram, ConditionV, Weight, Amount, LocationsGoods, Availability[0].value, ReceiptDate, ConnectionV, Name, Description, Notes, CategoryV, Parametr1, Parametr2, Parametr3, USOwnersV)

        var data = await OtherGoodsUpdate(IdGoodInfo.good.IdGoods,CitiesV, Price, OZON, VK, Instagram, ConditionV, Weight, Amount, AmountPurchased, AmountReserved, LocationsGoods, Availability[0].value, ReceiptDate, ConnectionV, Name, Description, Notes, CategoryV, Parametr1, Parametr2, Parametr3, USOwnersV, MainPhoto, Photo);
        await setErrorINP('Данные товара успешно изменены');
        // console.log(data.error)
        }
        catch (e){
            console.log(e)
            // alert(e.response.data.message)
            setErrorINP(e.response.data.message)
            // setMActive()
        }
        
        };
        const [LocationsGoods, setLocationsGoods]=useState([]);

    const LocationGoodsAdd = async(idLoc,nameLoc)=>{
        console.log(idLoc,nameLoc);
        const LocationData = [...LocationsGoods];
        if (!LocationData.some(C => C.id === idLoc) && idLoc && nameLoc){
            LocationData.push({ id: idLoc, Name: nameLoc, Amount: 0 })
            setLocationsGoods(LocationData);
        }
        console.log(LocationsGoods)        
    }
    const LocationGoodsDel = async(idLoc)=>{
        setLocationsGoods(prevLocationsGoods => 
            prevLocationsGoods.filter(C => C.id !== idLoc)
        );
    }
    const updateAmount = (id, newAmount) => {
        setLocationsGoods(prevLocationsGoods => 
            prevLocationsGoods.map(loc => 
                loc.id === id ? { ...loc, Amount: newAmount } : loc
            )
        );
    };
    return(
    <>
    <div className="Main">
        <div className="BasicData">       
            <label>
                <p className="RequiredInp">название:</p>
                <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
            </label>
            <label className="RequiredInp">
                <p>категория:</p> 
                <div>
                    <InputSelectMultiple className="selects" val={selCategory}
                        selectedValue= {Category} setSelectedValue={setCategory}/>
                    {
                        ButNewCategory? 
                        <> 
                        <FunctionButton text='убрать добавление' Click={()=>setButNewCategory(false)}/>                      
                        <div className="AddElement">
                            <InputStrMini type="text" className = "inpName" pattern="/[^\d]/g, ''" value={NewCategory} onClick={e =>  setNewCategory(e.target.value)} setCompanyName = {setNewCategory}/>
                            <ActionButton text='добавить' Click={()=>addCategory()}/>
                        </div>
                        </>
                        :
                        <><FunctionButton text='добавить новый' Click={()=>setButNewCategory(true)}/></>
                    }
                </div>
            </label>
            <label className="RequiredInp">
                <p>описание:</p> 
                <InputStr val = {Description} setVal = {setDescription}/>
            </label>
            <label>
                <p className="RequiredInp">главное фото:</p> 
                <InputPhoto val = {MainPhoto} setVal = {setMainPhoto}  severalPhotos = {false}/>
            </label>
            <label>
                <p>фото:</p> 
                <InputPhoto val = {Photo} setVal = {setPhoto} severalPhotos = {true}/>
            </label>
        </div>
        <div className="BasicData Parameters">
            <label>
                <p className="RequiredInp">размер в мм.:</p> 
                <div className="Dimensions">
                    <div>
                        <p>высота:</p>
                        <InputNum val={Parametr1} setVal={setParametr1} min='0'/>
                    </div>
                    <div>
                        <p>ширина:</p>
                        <InputNum val={Parametr2} setVal={setParametr2} min='0'/>
                    </div>
                    <div>
                        <p>глубина:</p>
                        <InputNum val={Parametr3} setVal={setParametr3} min='0'/>
                    </div> 
                </div>
            </label>
            <label>
                <p>вес в г.:</p>
                <InputNum val={Weight} setVal={setWeight} min='0'/>
            </label>
            <label>
                <p className="RequiredInp">качество:</p>
                <InputSelect className="selects" val={selCondition}
                selectedValue= {Condition} setSelectedValue={setCondition}/>
            </label>
        </div>
        <div className="BasicData Parameters">
            {/* <label>
                <p className="RequiredInp">положение:</p> 
                <div>
                    <InputSelect className="selects" val={selLocation} selectedValue= {Location} setSelectedValue={setLocation}/>
                    {
                        ButNewLocation? 
                        <> 
                        <FunctionButton text='убрать добавление' Click={()=>setButNewLocation(false)}/>                      
                        <div className="AddElement">
                            <InputStrMini type="text" className = "inpName" pattern="/[^\d]/g, ''" value={NewLocation} onClick={e =>  setNewLocation(e.target.value)} setCompanyName = {setNewLocation}/>
                            <ActionButton text='добавить' Click={()=>addLocation()}/>
                        </div>
                        </>
                        :
                        <><FunctionButton text='добавить новый' Click={()=>setButNewLocation(true)}/>
                        </>
                    }
                </div>
            </label> */}
            <label> 
                <p>наличие:</p> 
                <InputSelect className="selects" val={selAvailability}
                selectedValue= {Availability} setSelectedValue={setAvailability}/>
            </label>
            <label>
                <p>город:</p> 
                <InputSelect className="selects" val={selCities}
                selectedValue= {Cities} setSelectedValue={setCities}/>
            </label>
        </div>
        <div className="BasicData">
            <label>
                <p>OZON:</p> 
                <InputStrMini type="text" className = "inpName" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={OZON} onClick={e =>  setName(e.target.value)} setCompanyName = {setOZON}/>
            </label>
            <label> 
                <p>VK:</p> 
                <InputStrMini type="text" className = "inpName" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={VK} onClick={e =>  setName(e.target.value)} setCompanyName = {setVK}/>
            </label>
            <label> 
                <p>instagram:</p> 
                <InputStrMini type="text" className = "inpName" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={Instagram} onClick={e =>  setName(e.target.value)} setCompanyName = {setInstagram}/>
            </label>
        </div>
        <div className="BasicData">{/*итоговые */}
            <label>
                <p>связанные товары:</p>  
                <div>
                    <div className='MiniTable'>
                        <div className='SearchTable'>
                            <Search ClickBut = {()=>SearchConnectionFun()} value={SearchConnectionInput} onClick={e =>  SetSearchConnectionInput(e.target.value)} setValue = {SetSearchConnectionInput}/>
                        </div>
                        <table>
                            <tr>
                                <th>связи товаров</th>
                                <th></th>
                            </tr>
                            {/* .map(row => {console.log(row)}) */}
                            {/* {console.log(SearchConnection)} */}
                            {SearchConnection.slice(0, 5).map(row => {
                                
                                return (
                                    <tr>
                                        <td>
                                            {row.value.map((good) => {
                                                return (
                                                    <p>{good.Name}</p>
                                                );
                                            })}
                                        </td>
                                        <td>
                                            <div className='SearchTableBut'>
                                                <FunctionButton text='+' Click={() => setConnection(Array(row))} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                    { Connection.map((val)=>
                        {return(                          
                            <div className='owner'>
                                <div>
                                {val.value.map((good) => {
                                    return (
                                        <p>{good.Name}</p>
                                    );
                                })}
                                </div>
                                <div>
                                    <button onClick={()=>ButDelConnection(val.id)}><FaTrashAlt/></button>
                                </div>
                            </div>
                        )}
                    )}

                </div>
            </label>
            <label>
                <p className="RequiredInp">цена:</p>
                <div className="Dimensions">
                    <div>
                        <InputNum val={Price} setVal={setPrice} min='0'/>
                    </div>
                    <div className="priсe">
                        <p>р.</p>
                    </div>
                    { checkNull(Name)?
                    <div className="imgA" >
                        <a target="_blank" href = {"https://www.findbook.ru/search/d0?s=1&pvalue="+customQuote(Name)+"&ptype=1"}>
                        <img src="https://www.findbook.ru/images/FBOOK4.gif" alt="findbook"/>
                            </a>
                    </div>
                    :
                    <></>
                    }
                </div>
            </label>
                
            <label>
                <p>владельцы:</p>
                <div>
                    <div className='MiniTable'>
                        <div className='SearchTable'>
                            <Search ClickBut = {()=>SearchOwnersFun()} value={SearchOwnersInput} onClick={e =>  SetSearchOwnersInput(e.target.value)} setValue = {SetSearchOwnersInput}/>
                        </div>
                        <table>
                            <tr>
                                <th>имя</th>
                                <th>телефон/<br/>почта</th>
                                <th></th>
                            </tr>
                            {SearchOwners.map((SOwner)=>
                            {return(
                                <tr>
                                    <td><p>{SOwner.Name}</p></td>
                                    <td><p>{SOwner.Mail}</p></td>
                                    <td>
                                        <div className='SearchTableBut'>
                                            <FunctionButton text='+' Click={()=>ButSetOwners(SOwner.IdClients, SOwner.Name, SOwner.Mail)}/>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            )}
                        </table>
                    </div>
                     { USOwners.map((value)=>
                        {return(
                            <div className='owner'>
                                <div>
                                    <p>{value.Name}<br/>{value.Mail}</p>
                                </div>
                                <div>
                                    <button onClick={()=>ButDelOwners(value.id)}><FaTrashAlt/></button>
                                </div>
                            </div>

                        )}
                    )}
                       
                </div>
                
            </label>
            <label className="RequiredInp">
                <p>количество в наличии:</p>
                <InputNum val={Amount} setVal={setAmount} min='1'/>
            </label>
            <label className="RequiredInp">
                <p>количество забронированных:</p>
                <InputNum val={AmountReserved} setVal={setAmountReserved} min='1'/>
            </label>
            <label className="RequiredInp">
                <p>количество купленных:</p>
                <InputNum val={AmountPurchased} setVal={setAmountPurchased} min='1'/>
            </label>
            <label>
            <p className="RequiredInp">положение:</p> 
                <div>
                    <div className="choiceLoc">
                        <InputSelect className="selects" val={selLocation} selectedValue= {Location} setSelectedValue={setLocation}/>
                        <FunctionButton text='+' Click={()=>LocationGoodsAdd(Location.value, Location.label)}/>
                    </div>
                    <div className="newLoc">
                        {LocationsGoods.map((oneLocation) => {
                            return (
                                <>
                                {/* <div className="newLocList"></div> */}
                                <div>
                                    <button onClick={() =>LocationGoodsDel(oneLocation.id)}>
                                    <RxCross2/>
                                    </button>
                                    <p>{oneLocation.Name}</p>
                                </div>
                                
                                <InputNum 
                                    val={oneLocation.Amount} 
                                    setVal={(newAmount) => updateAmount(oneLocation.id, newAmount)} 
                                    min="0" 
                                />
                                
                                </>
                            )})

                        }
                    </div>
                </div>
            </label>
            <label>
                <p className="RequiredInp">дата поступления:</p>   
                <InputDate  val={ReceiptDate} setVal = {setReceiptDate} max = {moment().format('YYYY-MM-DD')}/>
            </label>
            <label>
                <p>заметки:</p>
                {/* <InputStr val = {Notes} setVal = {setNotes}/> */}
                <InputStr val = {Notes} setVal = {setNotes}/>
            </label>
        </div>

       
        { ErrorINP?
             <p className='RequiredMes'>{ErrorINP}</p>
             :
             <></>
        }
       
        
        <p>Красным выделены поля, обязательные для заполнения</p>
        <div className='controlBut'>
            <ActionButton text='изменить' Click={()=>read()}/>
            {/* <ActionButton  dataTooltip='данные будут сохранены и можно будет продолжить добавление похожего товара без заполнения аналогичных полей' text='изменитьи продолжить добавление' Click={()=>addGood()}/>  */}
             {/* <FunctionButton text='фильтр'/> */}
        </div>


    </div>

    </>
    )
})
export default OtherGoodsInfo