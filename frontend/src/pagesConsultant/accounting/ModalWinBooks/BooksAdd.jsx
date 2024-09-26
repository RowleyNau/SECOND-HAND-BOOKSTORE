import '../../Pages.css';
import './ModalWinBook.css';
import {customQuote} from './1.js';
import moment from 'moment';
import InputDate from '../../../components/allInput/InputDate.jsx';
import { useEffect, useState } from 'react';
import ActionButton from '../../../components/allButtons/actionButton/ActionButton';
import FunctionButton from '../../../components/allButtons/functionButton/FunctionButton';
import InputStrMini from '../../../components/allInput/InputStrMini';
import InputNum from '../../../components/allInput/InputNum';
import React from "react";  
import ReactDOM from 'react-dom';   
import InputSelect from '../../../components/allInput/InputSelect';
import InputSelectMultiple from '../../../components/allInput/InputSelectMultiple';
import InputPhoto from '../../../components/allInput/InputPhoto';
import InputStr from '../../../components/allInput/InputStr';
import { BookAdd } from '../../../http/bookManagementApi.js';
import Search from '../../../components/searchInput2/Search.jsx';
import {FaTrashAlt} from "react-icons/fa";
import { PhotoGet, PhotoAdd, GenreAdd, GenreGetAll, AuthorsAdd, AuthorsGetAll, CategoriesAdd, CategoriesGetAll, PublishersAdd, PublishersGetAll, BindingtypeAdd, BindingtypeGetAll, AgerestrictionAdd, AgerestrictionGetAll, LocationsAdd, LocationsGetAll, GoodstatesAdd, GoodstatesGetAll, CitiesAdd, CitiesGetAll, AvailabilityAdd, AvailabilityGetAll, SearchOwnersGet, SearchConnectionGet} from '../../../http/parametersApi.js'; 
import { Context } from '../../../index.js';
import BookParamStore from '../../../store/BookParamStore.js';
import {observer} from "mobx-react-lite";
import { RxCross2 } from "react-icons/rx";
const BooksAddStr = observer( (props) => {
    const { idBook, id,setActive, active, ...inputProps } = props;

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

    const [modalBookAdd, setModalBookAdd]=useState(false);

    const [BookParam]=useState(Context);
    const [Name, setName]=useState('');
    const [NumberOfPages, setNumberOfPages]=useState('');
    const [Price, setPrice]=useState('');
    const [OZON, setOZON]=useState('');
    const [VK, setVK]=useState('');
    const [Instagram, setInstagram]=useState('');
    const [Amount, setAmount]=useState('');
    const [ReceiptDate, setReceiptDate]=useState(moment().format('YYYY-MM-DD'));

    const [Features, setFeatures]=useState('');
    const [Notes, setNotes]=useState('');
    const [ISBN, setISBN]=useState('');
    const [Description, setDescription]=useState('');
    const [Photo, setPhoto]=useState([])
    const [MainPhoto, setMainPhoto]=useState([])


    // const [Publishers, setPublishers]=useState('');

    const [Genre, setGenre]=useState([]);
    const [NewGenre, setNewGenre]=useState([]);
    const [ButNewGenre, setButNewGenre]=useState(false);
    const [selGenre, setSelGenre] = useState({genre:['','']});
    const addGenre = async()=>{
        let data;
        data = await GenreAdd(NewGenre);
        data = await GenreGetAll();
        setSelGenre(createDictionary1(data.genre))
    }
    const [Author, setAuthor]=useState('');
    const [NewAuthorLastName, setNewAuthorLastName]=useState(null);
    const [NewAuthorName, setNewAuthorName]=useState(null);
    const [NewAuthorMiddleName, setNewAuthorMiddleName]=useState(null);
    const [ButNewAuthor, setButNewAuthor]=useState(false);
    const [selAuthor, setSelAuthor] = useState({authors:['','']});
    const addAuthor = async()=>{
        let data;
        data = await AuthorsAdd(NewAuthorLastName, NewAuthorName, NewAuthorMiddleName);
        data = await AuthorsGetAll();
        setSelAuthor(createDictionaryAuthor(data.authors))
    } 
 
    const [Category, setCategory]=useState([]);
    const [NewCategory, setNewCategory]=useState([]);
    const [ButNewCategory, setButNewCategory]=useState(false);
    const [selCategory, setSelCategory] = useState({categories:['','']});
    const addCategory = async()=>{
        let data;
        data = await CategoriesAdd(NewCategory);
        data = await CategoriesGetAll();
        setSelCategory(createDictionary1(data.categories))
    } 


    const [Condition, setCondition]=useState('');
    const [selCondition, setSelCondition] = useState({goodstates:['','']}); 

    const [selCities, setSelCities]=useState({cities:['','']}); 
    const [Cities, setCities]=useState('');
// ['идеальное', 'с изъянами']
    // const selPublishers = [
    //     { value: '1', label: 'Твердый переплет' },
    //     { value: '2', label: 'Мягкий переплет' },
    //     { value: '3', label: 'Супер обложка' }
    // ];
    const [Publishers, setPublishers]=useState('');
    const [selPublishers, setSelPublishers] = useState({categories:['','']});
    const [NewPublishers, setNewPublishers]=useState([]);
    const [ButNewPublishers, setButNewPublishers]=useState(false);
    const addPublishers = async()=>{
        let data;
        data = await PublishersAdd(NewPublishers);
        data = await PublishersGetAll();
        setSelPublishers(createDictionary1(data.publishers))
    }
    


    const [selBindingType, setSelBindingType] = useState({bindingtype:['','']});
    const [BindingType, setBindingType]=useState('');

    const [Availability, setAvailability]=useState('');
    const [selAvailability, setSelAvailability] = useState({availability:['','']});  
        // const selAvailability = createDictionary(['в наличии', 'выкуплен', 'забронирован']);
        
    const [AgeRestriction, setAgeRestriction]=useState('');
    const [selAgeRestriction, setSelAgeRestriction] = useState({agerestriction:['','']});  

    const [selLocation, setSelLocation] = useState({locations:['','']}); 
    const [Location, setLocation]=useState('');   
    const [NewLocation, setNewLocation]=useState([]);
    const [ButNewLocation, setButNewLocation]=useState(false);
    const addLocation = async()=>{
        let data;
        console.log(typeof NewLocation, NewLocation)
        data = await LocationsAdd(NewLocation);
        data = await LocationsGetAll();
        setSelLocation(createDictionary1(data.locations))
    };
    const selectData = async()=>{
        let data = await GenreGetAll();
        setSelGenre(createDictionary1(data.genre))
        data = await AuthorsGetAll();
        setSelAuthor(createDictionaryAuthor(data.authors))
        data = await CitiesGetAll();
        setSelCities(createDictionary1(data.cities))
        data = await LocationsGetAll();
        setSelLocation(createDictionary1(data.locations))
        data = await PublishersGetAll();
        setSelPublishers(createDictionary1(data.publishers))
        data = await BindingtypeGetAll();
        setSelBindingType(createDictionary1(data.bindingtype))
        data = await GoodstatesGetAll(); 
        setSelCondition(createDictionary1(data.goodstates))
        data = await CategoriesGetAll();
        setSelCategory(createDictionary1(data.categories))
        data = await AgerestrictionGetAll(); 
        setSelAgeRestriction(createDictionary1(data.agerestriction))  
        // console.log(data)
        // data = await AvailabilityGetAll();
        // setSelAvailability(createDictionary1(data.availability))
        // console.log(data.availability);
        read2();
    };
    

    useEffect (()=>{
        selectData();
        
    },[])
    //можно будет удалить
    const [q, setq]=useState([]);
    const read = async()=>{
        // var file_data = MainPhoto; 
        // console.log(MainPhoto, typeof MainPhoto)
        // var form_data = new FormData();      
        // form_data.append('file', file_data);

        // console.log(typeof MainPhoto, MainPhoto);
        // let data;
        // data = await PhotoAdd(MainPhoto);
        // if(Connection.length>0)
        // console.log(Connection, Connection[0][0].IdConnections);
        // else{
        // console.log(Connection);
            setActive(false);
        // }
        
        };
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
    function createMatrixFromRepeats(arr) {
        const repeats = {};
        arr = flattenData(arr);
        console.log(arr);
        arr.map((item, index) => {

          repeats[item.IdConnections]? 
            repeats[item.IdConnections].push(item)            
          :
            repeats[item.IdConnections] = [item]}    
         );
         console.log(repeats);
        // Преобразуем объект повторений в массив (матрицу)
        const matrix = Object.values(repeats);
        const mappedResult = matrix.map(row => {console.log(row)});
        // console.log(mappedResult);
        return matrix;
      }
    function flattenData(data) {
        return data.map(item => ({
          IdBookList: item.IdBookList,
          Name: item.Name,
          IdGoods: item.IdGoods,
          IdConnections: item.good.IdConnections
        }));
      }
    async function SearchConnectionFun() {
        if (SearchConnectionInput!=''){
            let data = await SearchConnectionGet(SearchConnectionInput); 
            console.log(await createMatrixFromRepeats(data.data)) ;
            setSearchConnection( await createMatrixFromRepeats(data.data));
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
        var CitiesV= (typeof Cities.value!= 'undefined')?Cities.value:'' ,  ConditionV=(typeof Condition.value!= 'undefined')?Condition.value:'', LocationV=(typeof Location.value!= 'undefined')?Location.value:'', ConnectionV=(typeof Connection[0]!= 'undefined')?Connection[0][0].IdConnections:'', BindingTypeV=(typeof BindingType.value!= 'undefined')?BindingType.value:'', AgeRestrictionV=(typeof AgeRestriction.value!= 'undefined')?AgeRestriction.value:'', PublishersV=(typeof Publishers.value!= 'undefined')?Publishers.value:'';
        console.log(CitiesV, ConditionV,LocationV,ConnectionV, BindingTypeV, AgeRestrictionV,PublishersV);
        try{
        var CitiesV= (typeof Cities.value!= 'undefined')?Cities.value:'' ,  ConditionV=(typeof Condition.value!= 'undefined')?Condition.value:'', ConnectionV=(typeof Connection[0]!= 'undefined')?Connection[0][0].IdConnections:'', BindingTypeV=(typeof BindingType.value!= 'undefined')?BindingType.value:'', AgeRestrictionV=(typeof AgeRestriction.value!= 'undefined')?AgeRestriction.value:'', PublishersV=(typeof Publishers.value!= 'undefined')?Publishers.value:'';
        
        var data = await BookAdd(CitiesV, Price, OZON, VK, Instagram, ConditionV, Weight, Amount, LocationsGoods, 1, ReceiptDate, ConnectionV, Name, YearPublishing,NumberOfPages, BindingTypeV, ISBN,  AgeRestrictionV, Description, Notes, PublishersV, Author, Category, Genre, Parametr1, Parametr2, Parametr3, USOwners, MainPhoto, Photo);
        await setErrorINP('Книга успешно добавлена');
        console.log(data.error)
        }
        catch (e){
            console.log(e.response)
            // alert(e.response.data.message)
            setErrorINP(e.response.data.message)
            // setMActive()
        }
        console.log('!!!')
    }
    
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
            <>
                {/* <img src={MainPhoto[0]} alt={`Uploaded ${0}`} style={{ maxWidth: "70px" }} />
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Uploaded ${index}`} style={{ maxWidth: "70px" }} />
                    </div>
                ))} */}
            
            </>
            <label>
                <p className="RequiredInp">автор:</p> 
                <div>
                    <InputSelectMultiple className="selects" val={selAuthor}
                        selectedValue= {Author} setSelectedValue={setAuthor}/>
                    {
                        ButNewAuthor? 
                        <> 
                        <FunctionButton text='убрать добавление' Click={()=>setButNewAuthor(false)}/>                      
                        <div className="AddElement">
                            <p>фамилия</p>
                            <InputStrMini type="text" className = "inpName" pattern="/[^\d]/g, ''" value={NewAuthorLastName} onClick={e =>  setNewAuthorLastName(e.target.value)} setCompanyName = {setNewAuthorLastName}/>
                            <p>имя</p>
                            <InputStrMini type="text" className = "inpName" pattern="/[^\d]/g, ''" value={NewAuthorName} onClick={e =>  setNewAuthorName(e.target.value)} setCompanyName = {setNewAuthorName}/>
                            <p>отчество</p>
                            <InputStrMini type="text" className = "inpName" pattern="/[^\d]/g, ''" value={NewAuthorMiddleName} onClick={e =>  setNewAuthorMiddleName(e.target.value)} setCompanyName = {setNewAuthorMiddleName}/>
                            <ActionButton text='добавить' Click={()=>addAuthor()}/>
                        </div>
                        </>
                        :
                        <><FunctionButton text='добавить новый' Click={()=>setButNewAuthor(true)}/></>
                    }
                </div>
            </label>
            <label>
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

            <label>
                <p className="RequiredInp">жанр:</p> 
                <div>
                    <InputSelectMultiple className="selects" val={selGenre}
                        selectedValue= {Genre} setSelectedValue={setGenre}/>
                    {/* <FunctionButton text='добавить новый' Click={()=>setButNewGenre(true)}/> */}
                    {
                        ButNewGenre? 
                        <> 
                        <FunctionButton text='убрать добавление' Click={()=>setButNewGenre(false)}/>                      
                        <div className="AddElement">
                            <InputStrMini type="text" className = "inpName" pattern="/[^\d]/g, ''" value={NewGenre} onClick={e =>  setNewGenre(e.target.value)} setCompanyName = {setNewGenre}/>
                            <ActionButton text='добавить' Click={()=>addGenre()}/>
                        </div>
                        </>
                        :
                        <><FunctionButton text='добавить новый' Click={()=>setButNewGenre(true)}/></>
                    }
                </div>
            </label>
            <label>
                <p className="RequiredInp">издательство:</p> 
                <div>
                    <InputSelect className="selects" val={selPublishers}
                        selectedValue= {Publishers} setSelectedValue={setPublishers}/>

                    {
                        ButNewPublishers? 
                        <> 
                        <FunctionButton text='убрать добавление' Click={()=>setButNewPublishers(false)}/>                      
                        <div className="AddElement">
                            <InputStrMini type="text" className = "inpName" pattern="/[^\d]/g, ''" value={NewPublishers} onClick={e =>  setNewPublishers(e.target.value)} setCompanyName = {setNewPublishers}/>
                            <ActionButton text='добавить' Click={()=>addPublishers()}/>
                        </div>
                        </>
                        :
                        <><FunctionButton text='добавить новый' Click={()=>setButNewPublishers(true)}/>
                        </>
                    }
                </div>
            </label>
            <label>
                <p className="RequiredInp">количество страниц:</p> 
                <div>
                <InputNum val={NumberOfPages} setVal={setNumberOfPages} min='0'/>
                </div>
            </label>
            <label>
                <p className="RequiredInp">год издания:</p>
                <InputNum val={YearPublishing} setVal={setYearPublishing} min='0'/>
            </label>
            <label className="RequiredInp">
                <p>тип переплета:</p>
                <InputSelect className="selects" val={selBindingType}
                selectedValue= {BindingType} setSelectedValue={setBindingType}/>
            </label>
            <label>
                <p>ISBN:</p> 
                <InputStrMini type="number" className = "inpName" pattern="/[^\d]/g, ''" value={ISBN} onClick={e =>  setISBN(e.target.value)} setCompanyName = {setISBN}/>
            </label>
            <label>
                <p className="RequiredInp">Главное фото:</p> 
                <InputPhoto val = {MainPhoto} setVal = {setMainPhoto}  severalPhotos = {false}/>
            </label>
            <label>
                <p>фото:</p> 
                <InputPhoto val = {Photo} setVal = {setPhoto} severalPhotos = {true}/>
            </label>
            <label className="RequiredInp">
                <p>описание:</p> 
                <InputStr val = {Description} setVal = {setDescription}/>
            </label>
            <label className="RequiredInp">
                <p>возрастные ограничения:</p>
                <InputSelect className="selects" val={selAgeRestriction}
                selectedValue= {AgeRestriction} setSelectedValue={setAgeRestriction}/>
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
                <p>наличие:</p> 
                <InputSelect className="selects" val={selAvailability}
                selectedValue= {Availability} setSelectedValue={setAvailability}/>
            </label> */}
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
                            {SearchConnection.slice(0, 5).map(row => {
                                return (
                                    <tr>
                                        <td>
                                            {row.map((good) => {
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
                    { Connection.map((value)=>
                        {return(                          
                            <div className='owner'>
                                <div>
                                {value.map((good) => {
                                    return (
                                        <p>{good.Name}</p>
                                    );
                                })}
                                </div>
                                <div>
                                    <button onClick={()=>ButDelConnection(value.id)}><FaTrashAlt/></button>
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
                <p>количество:</p>
                <InputNum val={Amount} setVal={setAmount} min='1'/>
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
       
        
        <p>красным выделены поля, обязательные для заполнения</p>
        <div className='controlBut'>
            <ActionButton text='добавить' Click={()=>addGood()}/>
            {/* <ActionButton  dataTooltip='данные будут сохранены и можно будет продолжить добавление похожего товара без заполнения аналогичных полей' text='изменитьи продолжить добавление' Click={()=>addGood()}/>  */}
             {/* <FunctionButton text='фильтр'/> */}
        </div>


    </div>

    </>
    )
})
export default BooksAddStr