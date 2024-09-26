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
// import InputSelect from '../../../components/allInput/InputSelect.jsx';
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
import InputSelect from '../../../components/allInput/InputSelect.jsx';
// import ActionButton from '../../../components/allButtons/actionButton/ActionButton.jsx';
import DelButton from '../../../components/allButtons/delButton/DelButton.jsx';
import { PaymentMethodGetAll, PaymentStateGetAll, ReceivingStateGetAll, ReceivingMethodGetAll } from '../../../http/purchaseApi.js';

const SalesInfo = observer( (props) => {
    const { dataInfo, idBook, id,setActive, active, ...inputProps } = props;
    function createDictionary1(array) {
        return array.map((item, index) => ({
            value: (item.Id).toString(),
            label: item.Name
        }));
    }
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


    const [PaymentMethod, setPaymentMethod]=useState('');
    const [PaymentState, setPaymentState]=useState('');
    const [ReceivingState, setReceivingState]=useState('');
    const [ReceivingMethod, setReceivingMethod]=useState('');

    const [SelPaymentMethod, setSelPaymentMethod]=useState('');
    const [SelPaymentState, setSelPaymentState]=useState('');
    const [SelReceivingState, setSelReceivingState]=useState('');
    const [SelReceivingMethod, setSelReceivingMethod]=useState(''); 

    const [DeliveryAddress, setDeliveryAddress]=useState('');
    const [Index, setIndex]=useState('');
    const [DeliveryPrice, setDeliveryPrice]=useState('');
    const [TransferOwner, setTransferOwner]=useState('');
    const selectData = async()=>{
        let data;
        data = await PaymentMethodGetAll();
        console.log(data)
        setSelPaymentMethod(createDictionary1(data.PaymentMethodData));
        data = await PaymentStateGetAll();
        console.log(data)
        setSelPaymentState(createDictionary1(data.PaymentStateData));
        data = await ReceivingStateGetAll();
        console.log(data)
        setSelReceivingState(createDictionary1(data.ReceivingStateData));
        data = await ReceivingMethodGetAll();
        console.log(data)
        setSelReceivingMethod(createDictionary1(data.ReceivingMethodData));

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
        console.log(dataInfo);
        setAnswerBook(dataInfo.data);
        setReceivingMethod({value:dataInfo.IdReceivingMethod, label:dataInfo.receivingmethod.Name})
        setReceivingState({value:dataInfo.IdReceivingState, label:dataInfo.receivingstate.Name})
        setPaymentState({value:dataInfo.IdPaymentState, label:dataInfo.paymentstate.Name})
        setPaymentMethod({value:dataInfo.IdPaymentMethod, label:dataInfo.paymentmethod.Name})
        // setTransferOwner(dataInfo.)
        // if (dataInfo!=''|| dataInfo!='null'){
        //     setName(dataInfo.Name); 
        //     setMiddleName(dataInfo.MiddleName); 
        //     setLastName(dataInfo.LastName); 
        //     setMail(dataInfo.Mail); 
        //     setPhone(dataInfo.Phone); 
        //     console.log(dataInfo.consultant==null)
        //     if(dataInfo.consultant==null){
        //         setRoleUser(false); 
        //     }
        //     else{
        //         setRoleUser(true); 
        //     }setRoleUser(true); 
        //     // 
        // }
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
    const [AnswerBook, setAnswerBook]=useState([]);
    const [ModalActive, setModalActive]=useState(false);
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


    const AnswerBookAdd = async(id, name)=>{
        var a = [...AnswerBook]
        // console.log(AnswerBook)
        // {IdGoods:122, Name:'Название книги'}
        if (!a.some(C => C.IdGoods === id)){
            a.push({IdGoods:id, Name: name})
            setAnswerBook(a);
        }
    };
    const AnswerBookDel = async(id)=>{
        setAnswerBook(books => 
            books.filter(C => C.IdGoods !== id));
    
    };

        const [showText, setShowText] = useState(false);

        const handleClick = () => {
          setShowText(!showText);
        };
 
    return(
    <>
    <div className="Main">  
        {(dataInfo.IdReceivingMethod!==1&&dataInfo.IdPaymentState==3)?
            <><div className="ButtonConsultation">
            <p>Внимание! Необходимо указать стоимость доставки. </p>
            </div> </>
            :
            <></>}  
        {(dataInfo.IdReceivingMethod!==1&&dataInfo.IdPaymentState==2==1&&dataInfo.IdReceivingState==2)?
            <><div className="ButtonConsultation">
            <p>Внимание! Необходимо передать товар в доставку.</p>
            </div> </>
            :
            <></>} 
        {(dataInfo.TransferOwner==null)?
            <><div className="ButtonConsultation">
            <p>Внимание! Необходимо проверить оплату владельцам</p>
            </div> </>
            :
            <></>} 
         
        <div className="ConsultationWindowSelectionAdd">
                    <p>рекомендуемые книги:</p>
                    <FunctionButton text='добавить' Click={()=>setModalActive(true)}/>
                </div>
                    {AnswerBook.length!==0?<>
                <div className="table-containerSelection">
                    <div className="tableSelection">
                        
                        {AnswerBook.map((row, rowIndex) => (
                            <>
                            <div className="cellSelection">
                                <p>{rowIndex+1}</p>
                            </div>
                            <div className="cellSelection">
                                <p>{row.Name}</p>
                            </div>
                            <div className="cellSelection">
                                <p>{row.Prise} руб.</p>
                            </div>
                            <div className="cellSelection">

                                <p>{row.Amount} шт.</p>
                            </div>
                            <div className="cellSelection">
                               <ActionButton text='владелец'/>
                            </div>
                            <div className="cellSelection">
                                <div onClick={()=>AnswerBookDel(row.IdGoods)}><DelButton/></div>
                            </div>
                            </>
                        ))}
                    </div>
                    
                </div>
                </>
                  :
                  <></>}
         <div className="BasicData">
            <label>
                <p className="RequiredInp">способ получения:</p>
                <InputSelect className="selects" val={SelReceivingMethod}
                selectedValue= {ReceivingMethod} setSelectedValue={setReceivingMethod}/>
            </label>  
            {
                            ReceivingMethod.value==2?
                            <>
                            <label>
                                <p>адрес доставки:</p>
                                <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
                            </label>
                            </>
                            :
                            <></>
                        }
                        {
                            ReceivingMethod.value==0?
                            <>
                            <label>
                                <p>адрес доставки:</p>
                                <InputStrMini type="text" className = "inpName" value={DeliveryAddress} onClick={e =>  setDeliveryAddress(e.target.value)} setCompanyName = {setDeliveryAddress}/>
                            </label>
                            <label>
                                <p>индекс:</p>
                                <InputStrMini type="text" className = "inpName" value={Index} onClick={e =>  setIndex(e.target.value)} setCompanyName = {setIndex}/>
                            </label>
                            <label>
                                <p>стоимость доставки:</p>
                                <InputStrMini type="text" className = "inpName" value={DeliveryPrice} onClick={e =>  setDeliveryPrice(e.target.value)} setCompanyName = {setDeliveryPrice}/>
                            </label>
                            {/* <label>
                                <p>предполагаемая стоимость доставки:</p>
                                <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
                            </label> */}
                            </>
                            :
                            <></>
                        }  
            <label>
                <p className="RequiredInp">статус получения:</p>
                <InputSelect className="selects" val={SelReceivingState}
                selectedValue= {ReceivingState} setSelectedValue={setReceivingState}/>
            </label>   
            <label>
                <p className="RequiredInp">способ оплаты:</p>
                <InputSelect className="selects" val={SelPaymentMethod}
                selectedValue= {PaymentMethod} setSelectedValue={setPaymentMethod}/>
            </label> 
            <label>
                <p className="RequiredInp">статус оплаты:</p>
                <InputSelect className="selects" val={SelPaymentState}
                selectedValue= {PaymentState} setSelectedValue={setPaymentState}/>
            </label> 
            <label>
                <p className="RequiredInp">итог:</p>
                <p>{AnswerBook.reduce((acc, item) => acc + item.Prise, 0)} руб.</p>
            </label> 
            
                          
                       
            {/* <label>
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
            </label>    */}
            
          
        </div>
       {/* <div  className='actionHistory'>
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
        </div> */}

       
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
export default SalesInfo