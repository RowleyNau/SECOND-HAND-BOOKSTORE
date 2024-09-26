import '../../Pages.css';
import './ModalWinUsers.css';
// import {customQuote} from './1.js';
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
import {UserGetOne } from '../../../http/userApi.js';
import InputCheckbox from '../../../components/allInput/InputCheckbox.jsx';
import { FaAngleDown } from "react-icons/fa";
const UsersInfo = observer( (props) => {
    const { IdUserInfo, idBook, id,setActive, active, ...inputProps } = props;

//     function createDictionary(array) {
//         return array.map((item, index) => ({
//             value: (index + 1).toString(),
//             label: item
//         }));
//         }
//     function createDictionary1(array) {
//         return array.map((item, index) => ({
//             value: (item.Id).toString(),
//             label: item.Name
//         }));
//         }
// function createDictionaryAuthor(array) {
//     return array.map((item, index) => {
//         let label = item.Name;
//         if (item.LastName !== null) {
//             label += ' '+item.LastName;
//         }
//         if (item.MiddleName !== null) {
//             label += ' '+item.MiddleName;
//         }
//         return {
//             value: (item.Id).toString(),
//             label: label
//         };
//     });
// }
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

    const [Phone, setPhone]=useState('')
    const [Mail, setMail]=useState('')
    const [Password, setPassword]=useState('')
    const [LastName, setLastName]=useState('')
    const [Name, setName]=useState('')
    const [MiddleName, setMiddleName]=useState('')
    const [Price, setPrice]=useState('');
    const [RoleUser, setRoleUser]=useState('');
    const [VK, setVK]=useState('');
    const [Instagram, setInstagram]=useState('');
    const [Amount, setAmount]=useState('');
    const [AmountPurchased, setAmountPurchased]=useState('');
    const [AmountReserved, setAmountReserved]=useState('');
    const [ReceiptDate, setReceiptDate]=useState(moment().format('YYYY-MM-DD'));


    const selectData = async()=>{
        let data ;
        // data = await CitiesGetAll();
        // setSelCities(createDictionary1(data.cities))
        // data = await LocationsGetAll();
        // setSelLocation(createDictionary1(data.locations))
        // data = await GoodstatesGetAll(); 
        // setSelCondition(createDictionary1(data.goodstates))
        // data = await CategoriesOtherGoodsGetAll();
        // setSelCategory(createDictionary1(data.Categories))
        // data = await AvailabilityGetAll();
        // setSelAvailability(createDictionary1(data.availability))
    };
    

    useEffect (()=>{
        console.log(IdUserInfo);
        if (IdUserInfo!=''|| IdUserInfo!='null'){
            setName(IdUserInfo.Name); 
            setMiddleName(IdUserInfo.MiddleName); 
            setLastName(IdUserInfo.LastName); 
            setMail(IdUserInfo.Mail); 
            setPhone(IdUserInfo.Phone); 
            console.log(IdUserInfo.consultant==null)
            if(IdUserInfo.consultant==null){
                setRoleUser(false); 
            }
            else{
                setRoleUser(true); 
            }setRoleUser(true); 
            // 
        }
        // {

        //     if (IdGoodInfo.good.Price !== '' && IdGoodInfo.good.Price !== 'null' && IdGoodInfo.good.Price) {
        //         setPrice(IdGoodInfo.good.Price);
        //     }
        
        //     if (IdGoodInfo.good.Amount !== '' && IdGoodInfo.good.Amount !== 'null' && IdGoodInfo.good.Amount) {
        //         setAmount(IdGoodInfo.good.Amount);
        //     }
        //     if (IdGoodInfo.good.AmountReserved !== '' && IdGoodInfo.good.AmountReserved !== 'null' ) {
        //         setAmountReserved(IdGoodInfo.good.AmountReserved);
        //     }
        //     if (IdGoodInfo.good.AmountPurchased !== '' && IdGoodInfo.good.AmountPurchased !== 'null' ) {
        //         setAmountPurchased(IdGoodInfo.good.AmountPurchased);
        //     }



        // }






        selectData();
        
    },[])
    




    
    const [ErrorINP, setErrorINP] = useState('');

    const read = async()=>{
        // console.log(USOwners);
        // let data;
        // console.log(Connection[0]);


        try{
        
        }
        catch (e){
            console.log(e)
            // alert(e.response.data.message)
            setErrorINP(e.response.data.message)
            // setMActive()
        }
        
        };


        const [showText, setShowText] = useState(false);

        const handleClick = () => {
          setShowText(!showText);
        };
 
    return(
    <>
    <div className="Main">   
            <div className="ButtonConsultation">
                <ActionButton text='перейти в консультацию'/>
            </div>    
        <div className="BasicData">
            <label>
                <p className="RequiredInp">имя:</p>
                <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
            </label>     
            <label>
                <p>фамилия:</p>
                <InputStrMini type="text" className = "inpName" value={LastName} onClick={e =>  setLastName(e.target.value)} setCompanyName = {setName}/>
            </label>     
            <label>
                <p>отчество:</p>
                <InputStrMini type="text" className = "inpName" value={MiddleName} onClick={e =>  setMiddleName(e.target.value)} setCompanyName = {setMiddleName}/>
            </label>       
            <label>
                <p className="RequiredInp">роль:</p>
                <InputCheckbox val = {RoleUser} setVal = {setRoleUser}/>
            </label>
            <label>
                <p>телефон:</p>
                <InputStrMini type="text" className = "inpName" value={Phone} onClick={e =>  setPhone(e.target.value)} setCompanyName = {setPhone}/>
            </label>     
            <label>
                <p className="RequiredInp">почта:</p>
                <InputStrMini type="text" className = "inpName" value={Mail} onClick={e =>  setMail(e.target.value)} setCompanyName = {setMail}/>
            </label>   
            {/* <label>
                <div>
                    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                        <span>запросы на подбор книг</span>
                        <span style={{ marginLeft: '8px', transform: showText ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <FaAngleDown/>
                        </span>
                    </div>
                    {showText && <div style={{ marginTop: '10px' }}>Появился текст!</div>}
                </div>
            </label>  
            <label>
                <div>
                    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                        <span>запросы на прием книг</span>
                        <span style={{ marginLeft: '8px', transform: showText ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <FaAngleDown/>
                        </span>
                    </div>
                    {showText && <div style={{ marginTop: '10px' }}>Появился текст!</div>}
                </div>
            </label>  
            <label>
                <div>
                    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                        <span>история покупок</span>
                        <span style={{ marginLeft: '8px', transform: showText ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <FaAngleDown/>
                        </span>
                    </div>
                    {showText && <div style={{ marginTop: '10px' }}>Появился текст!</div>}
                </div>
            </label>   */}
          
        </div>
        <div  className='actionHistory'>
            <label>
                    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                        <span>запросы на подбор книг</span>
                        <span style={{ marginLeft: '8px', transform: showText ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <FaAngleDown/>
                        </span>
                    </div>
                    {showText && <div style={{ marginTop: '10px' }}>Появился текст!</div>}
            </label>  
            <label>
                    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                        <span>запросы на прием книг</span>
                        <span style={{ marginLeft: '8px', transform: showText ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <FaAngleDown/>
                        </span>
                    </div>
                    {showText && <div style={{ marginTop: '10px' }}>Появился текст!</div>}
            </label>  
            <label>
                    <div onClick={handleClick} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                        <span>история покупок</span>
                        <span style={{ marginLeft: '8px', transform: showText ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <FaAngleDown/>
                        </span>
                    </div>
                    {showText && <div style={{ marginTop: '10px' }}>Появился текст!</div>}
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
export default UsersInfo