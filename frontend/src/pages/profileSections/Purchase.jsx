import './../Pages1.css';
import Navbar from '../../components/navbar/Navbar';
import { GenreGetAll, CategoriesGetAll, AgerestrictionGetAll, AuthorsGetAll, BindingtypeGetAll} from '../../http/parametersApi';
import { useEffect, useState } from 'react';
import Profile from '../Profile';
import PageTitle from '../../components/pageTitle/PageTitle';
import InputSelectMultiple from '../../components/allInput/InputSelectMultiple';
import InputSelect from '../../components/allInput/InputSelect';
import InputStr from '../../components/allInput/InputStr';
import InputStrMini from '../../components/allInput/InputStrMini';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import moment from 'moment';
import Modal from '../../components/modalWindow/Modal';
import {FaCheckCircle } from "react-icons/fa";
import { ReceivingMethodGetAll, PaymentMethodGetAll, PurchaseClientsAdd } from '../../http/purchaseApi';
import { personalInfo } from '../../http/userApi';
const SelectionBooks = (props) => {
    const [modalActive, setModalActive]=useState(false);
    const [Receipt, setReceipt]=useState([]);
    const [selReceipt, setSelReceipt] = useState([]);
    const [Name, setName]=useState('');
    const [LastName, setLastName]=useState('');
    const [MiddleName, setMiddleName]=useState('');
    const [Mail, setMail]=useState('');
    const [Phone, setPhone]=useState('');
    const [DeliveryAddress, setDeliveryAddress]=useState('');
    const [Index, setIndex]=useState('');
    const [Location, setLocation]=useState('');
    const [PaymentMethod, setPaymentMethod]=useState({value: '0', label: 'на сайте'});
    const [RequestDate, setRequestDate]=useState(moment().format('YYYY-MM-DD HH:mm:ss'))
    const [SelPaymentMethod, setSelPaymentMethod]=useState('');
    const [ErrorINP, setErrorINP]=useState(false)
    function createDictionary1(array) {
        return array.map((item, index) => ({
            value: (item.Id).toString(),
            label: item.Name
        }));
        }
    function addSelection(){
        // setModalActive(true);
        console.log(Receipt.value)
        console.log(Receipt.length)
    }
    const selectData = async()=>{
        const data = await ReceivingMethodGetAll();
        setSelReceipt(createDictionary1(data.ReceivingMethodData))
        console.log(data);
        const data2 = await PaymentMethodGetAll();
        console.log(data2);
        setSelPaymentMethod(createDictionary1(data2.PaymentMethodData))
        const data3 = await personalInfo();
        console.log(data3.data);
        setName(data3.data.Name);
        setLastName(data3.data.LastName);
        setMiddleName(data3.data.MiddleName);
        setMail(data3.data.Mail);
        setPhone(data3.data.Phone);
    };
    const add = async()=>{
        try{console.log(typeof LastName)
            if ((Name==''||LastName==''||LastName==null||Name==null)&&Receipt.value!=1){
                setErrorINP('необходимо указать полное ФИО');
                return
            }
        const data = await PurchaseClientsAdd(RequestDate, PaymentMethod, Receipt, DeliveryAddress, Index)
        console.log(data)
        }catch(e){
        console.log(e)
        }
    };
    useEffect (()=>{
        selectData();
        
    },[])
    return(
    <>
    {/* <div className={style.mainUnitMarg}> */}
    <Navbar/>
        <div className="mainUnit">
            <PageTitle textTitle="профиль"/>
            <div className="ProfileSections">
                <Profile ProfeleMenu='5'/>
                <div className="SelectionParams">
                    <p className="titleText">оформления заказа</p> 
                    <label>
                        <p className="RequiredInp">способ получения:</p> 
                        <InputSelect className="selects" val={selReceipt}                            selectedValue= {Receipt} setSelectedValue={setReceipt}/>
                    </label>
                    {
                        Receipt!=''?
                        <>
                        {
                            Receipt.value==1?
                            <>
                                <p className="AdrText">адрес магазина: ул. Карла Либкнехта, 72, г. Иркутск</p>
                                <p className="AdrText"> контактный телефон: +7 (964) 118-26-55</p>
                                <p className="AdrText">режим работы:</p>
                                <p className="AdrText">пн-вт: закрыто</p>
                                <p className="AdrText">ср-вс: 11:00-20:00</p>
                                <label>
                                    <p className="RequiredInp">способ оплаты:</p> 
                                    <InputSelect className="selects" val={SelPaymentMethod}                            selectedValue= {PaymentMethod} setSelectedValue={setPaymentMethod}/>
                                </label>
                            </>
                            :
                            <></>
                        }
                        {
                            Receipt.value==2?
                            <>
                            <label>
                                <p>адрес доставки:</p>
                                <InputStrMini type="text" className = "inpName" value={Location} onClick={e =>  setLocation(e.target.value)} setCompanyName = {setLocation}/>
                            </label>
                            </>
                            :
                            <></>
                        }
                        {
                            Receipt.value==0?
                            <>
                            <label>
                                <p>адрес доставки:</p>
                                <InputStrMini type="text" className = "inpName" value={DeliveryAddress} onClick={e =>  setDeliveryAddress(e.target.value)} setCompanyName = {setDeliveryAddress}/>
                            </label>
                            <label>
                                <p>индекс:</p>
                                <InputStrMini type="text" className = "inpName" value={Index} onClick={e =>  setIndex(e.target.value)} setCompanyName = {setIndex}/>
                            </label>
                            {/* <label>
                                <p>предполагаемая стоимость доставки:</p>
                                <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
                            </label> */}
                            </>
                            :
                            <></>
                        }
                        </>
                        :
                        <></>
                    }
                    <label>
                        <p>получатель:</p> 
                        <div>
                            <label>
                                <p className="RequiredInp">фамилия</p>
                                <InputStrMini type="text" className = "inpName" value={LastName} onClick={e =>  setName(e.target.value)} setCompanyName = {setLastName}/>
                            </label>
                            <label>
                                <p className="RequiredInp">имя</p>
                                <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
                            </label>
                            <label>
                                <p>отчество</p>
                                <InputStrMini type="text" className = "inpName" value={MiddleName} onClick={e =>  setName(e.target.value)} setCompanyName = {setMiddleName}/>
                            </label>
                            <label>
                                <p className="RequiredInp">e-mail</p>
                                <InputStrMini type="text" className = "inpName" value={Mail} onClick={e =>  setMail(e.target.value)} setCompanyName = {setMail}/>
                            </label>
                        </div>
                        
                        
                    </label>
                    {/* <p className='RequiredMes'>Необходимо ввести обязательные поля</p> setModalActive(true)*/}
                    <p>красным выделены поля, обязательные для заполнения</p>
                    {
                        ErrorINP?
                        <p className='RequiredMes'>{ErrorINP}</p>
                        :
                        <></>
                    }
                    {
                        PaymentMethod.value==0&&Receipt.value==1?
                        <div className="SelectionBut">
                        
                            <ActionButton dataTooltip='после с Вами свяжется консультант для уточнения суммы доставки' text='оплатить' Click={()=>add()}/>
                        </div>
                        :
                        <div className="SelectionBut">
                        
                            <ActionButton dataTooltip='после с Вами свяжется консультант для уточнения суммы доставки' text='забронировать' Click={()=>add()}/>
                        </div>
                        

                    }
                    
                </div>
                
            </div>
            
        </div>
        
        <Modal active={modalActive} setActive={setModalActive}>     
            <div className='modalBookDel'>
                    <div>
                        <p >Вы успешно забронировали товар. В течении суток с Вами свяжется консультант и уточнит своимость доставки</p>  
                    </div>
                    <div>
                        <p  className='modalBookDelTrue'><FaCheckCircle /></p>
                    </div>
                </div>   
        </Modal>
    </>
    )
}
export default SelectionBooks