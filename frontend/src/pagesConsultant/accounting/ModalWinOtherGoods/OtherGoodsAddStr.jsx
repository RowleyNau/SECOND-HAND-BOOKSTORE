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
import { OtherGoodsAdd } from '../../../http/otherGoodsManagementApi.js';
import Search from '../../../components/searchInput2/Search.jsx';
import {FaTrashAlt} from "react-icons/fa";
import { RxCross2 } from 'react-icons/rx';
import {CategoriesOtherGoodsAdd, CategoriesOtherGoodsGetAll, PhotoGet, PhotoAdd, GenreAdd, GenreGetAll, AuthorsAdd, AuthorsGetAll, CategoriesAdd, CategoriesGetAll, PublishersAdd, PublishersGetAll, BindingtypeAdd, BindingtypeGetAll, AgerestrictionAdd, AgerestrictionGetAll, LocationsAdd, LocationsGetAll, GoodstatesAdd, GoodstatesGetAll, CitiesAdd, CitiesGetAll, AvailabilityAdd, AvailabilityGetAll, SearchOwnersGet, SearchConnectionForOtherGoodsGet} from '../../../http/parametersApi.js'; 
import { Context } from '../../../index.js';
import BookParamStore from '../../../store/BookParamStore.js';
import {observer} from "mobx-react-lite";
const OtherGoodsAddStr = observer( (props) => {
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

    // const [BookParam]=useState(Context);
    const [Name, setName]=useState('');
    // const [NumberOfPages, setNumberOfPages]=useState('');
    const [Price, setPrice]=useState('');
    const [OZON, setOZON]=useState('');
    const [VK, setVK]=useState('');
    const [Instagram, setInstagram]=useState('');
    const [Amount, setAmount]=useState('');
    const [ReceiptDate, setReceiptDate]=useState(moment().format('YYYY-MM-DD'));

    // const [Features, setFeatures]=useState('');
    const [Notes, setNotes]=useState('');
    // const [ISBN, setISBN]=useState('');
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
        let data ;
        data = await CitiesGetAll();
        setSelCities(createDictionary1(data.cities))
        data = await LocationsGetAll();
        setSelLocation(createDictionary1(data.locations))
        data = await GoodstatesGetAll(); 
        setSelCondition(createDictionary1(data.goodstates))
        data = await CategoriesOtherGoodsGetAll();
        // console.log(data);
        setSelCategory(createDictionary1(data.Categories))

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

    // const [YearPublishing, setYearPublishing]=useState([]);
    const [Parametr1, setParametr1]=useState('');
    const [Parametr2, setParametr2]=useState('');
    const [Parametr3, setParametr3]=useState('');
    const [Weight, setWeight]=useState('');
    // const [Quality, setQuality]=useState();

    


  

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
            let data = await SearchConnectionForOtherGoodsGet(SearchConnectionInput); 
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
        var CitiesV= (typeof Cities.value!= 'undefined')?Cities.value:'' ,  
        ConditionV=(typeof Condition.value!= 'undefined')?Condition.value:'', 
        // LocationV=(typeof Location.value!= 'undefined')?Location.value:'', 
        ConnectionV=(typeof Connection[0]!= 'undefined')?Connection[0][0].IdConnections:'';
        console.log(CitiesV, ConditionV,ConnectionV);
        try{
        console.log( Photo)
        var data = 'a'
        var data = await OtherGoodsAdd(CitiesV, Price, OZON, VK, Instagram, ConditionV, Weight, Amount, LocationsGoods, 1, ReceiptDate, ConnectionV, Name, Description, Notes, Category, Parametr1, Parametr2, Parametr3, USOwners, MainPhoto, Photo);
        await setErrorINP('Товар успешно добавлен');
        console.log(data)
        }
        catch (e){
            console.log(e)
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
            <label className="RequiredInp">
                <p>категория:</p> 
                <div>
                    <InputSelect className="selects" val={selCategory}
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
                    {/* {
                        ButNewLocation? 
                        <> 
                        <FunctionButton text='убрать добавление' Click={()=>setButNewLocation(false)}/>                      
                        <div className="AddElement">
                            <InputStrMini type="text" className = "inpName" pattern="/[^\d]/g, ''" value={NewLocation} onClick={e =>  setNewLocation(e.target.value)} setCompanyName = {setNewLocation}/>
                            <ActionButton text='добавить' Click={()=>addLocation()}/>
                        </div>
                        </>
                        :
                        <>
                        </>
                    } */}
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
            <ActionButton text='добавить' Click={()=>addGood()}/>
            {/* <ActionButton  dataTooltip='данные будут сохранены и можно будет продолжить добавление похожего товара без заполнения аналогичных полей' text='изменитьи продолжить добавление' Click={()=>addGood()}/>  */}
             {/* <FunctionButton text='фильтр'/> */}
        </div>


    </div>

    </>
    )
})
export default OtherGoodsAddStr