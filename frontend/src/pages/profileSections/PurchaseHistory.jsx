import './../Pages1.css';
import Navbar from '../../components/navbar/Navbar';
import { GenreGetAll, CategoriesGetAll, AgerestrictionGetAll, AuthorsGetAll, BindingtypeGetAll} from '../../http/parametersApi';
import { useEffect, useState, useRef } from 'react';
import Profile from '../Profile';
import PageTitle from '../../components/pageTitle/PageTitle';
import InputSelectMultiple from '../../components/allInput/InputSelectMultiple';
import InputSelect from '../../components/allInput/InputSelect';
import InputStr from '../../components/allInput/InputStr';
import InputStrMini from '../../components/allInput/InputStrMini';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import Modal from '../../components/modalWindow/Modal';
import {FaCheckCircle } from "react-icons/fa";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { PurchaseClientsGetAll } from '../../http/purchaseApi';
import { PhotoGet } from '../../http/parametersApi';
import FunctionButton from '../../components/allButtons/functionButton/FunctionButton';
const PurchaseHistory = (props) => {
    const [modalActive, setModalActive]=useState(false);
    const [Receipt, setReceipt]=useState([]);
    const [selReceipt, setSelReceipt] = useState([{label:'самовывоз', value:'0'}, {label:'курьер', value:'1'}, {label:'почта России', value:'2'}]);
    const [Name, setName]=useState('');
    const [LastName, setLastName]=useState('');
    const [MiddleName, setMiddleName]=useState('');
    const [DeliveryAddress, setDeliveryAddress]=useState('');
    const [PurchaseClients, setPurchaseClients]=useState('');
    const [Photo, setPhoto]=useState('');
    // var swiper = new Swiper(".mySwiper", {
    //     watchSlidesProgress: true,
    //     slidesPerView: 3,
    //   });
    function addSelection(){
        // setModalActive(true);
        console.log(Receipt.value)
        console.log(Receipt.length)
    }
    const selectData = async()=>{
        let data = await PurchaseClientsGetAll();
        console.log(data);
        const a = [];
        for (const one of data.groupedArray) {
            // console.log(one.data);
            var b = [];
            for (const onephoto of one.data) {
                if(onephoto.photoGoods.length!=0){
                    let dataP = await PhotoGet('static/images/goods/' + onephoto.IdGoods + '/' + onephoto.photoGoods[0].Photo);
                    if (!a[one.IdPurchase]){
                        a[one.IdPurchase]={
                            IdPurchase:one.IdPurchase,
                            photo:[]
                        };
                    }
                    a[one.IdPurchase].photo.push({Photo:dataP});
                    // console.log(a)
                }
            }
                
        }
        // setPhoto(a); 
        setPhoto(a);
        console.log(data)
        setPurchaseClients(data.groupedArray) 
    };

    useEffect (()=>{
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        selectData();
        
    },[])
    
    return(
    <>
    {/* <div className={style.mainUnitMarg}> */}
    <Navbar/>
        <div className="mainUnit">
            <PageTitle textTitle="профиль"/>
            <div className="ProfileSections">
                <Profile ProfeleMenu='1'/>
                <div className="SelectionParams">
                    {
                        PurchaseClients? PurchaseClients.map((select) => {
                            return (
                                <>
                                {console.log(Photo)}
                            <div className="OnePurchase">
                                <div className="OnePurchaseInfo">
                                    <div className="OnePurchaseDatePaymentAddress">
                                        <p>от {select.DatePurchase.split('T')[0]}</p>
                                        <p>оплата: {select.paymentmethod.Name}</p>
                                        <p>куда: {select.receivingmethod.Name} {select.ReceivingLocation} {select.Index}</p>
                                    </div>
                                    <div className="OnePurchaseInfoBotton">
                                        {select.IdPaymentMethod==0&&select.IdPaymentState==1?
                                        <ActionButton text ='оплатить'/>
                                        :
                                        <></>
                                        }
                                        {(select.IdPaymentState==1||select.IdPaymentState==3)&&(select.IdReceivingState==2||select.IdReceivingState==3||(select.IdReceivingState==0&&select.IdPaymentMethod==1))?
                                            <FunctionButton text = "отмена"/>
                                        :
                                        <></>
                                        }
                                        <p>общая цена: {select.price.reduce((total, item) => total + item, 0)} руб.</p>
                                        {
                                            select.IdReceivingMethod!==1?

                                            <p>доставка: {select.DeliveryPrice==null? "формируется": select.DeliveryPrice} руб.</p>
                                            : 
                                            <p>доставка: 0 руб.</p>
                                        }
                                        
                                        <p>итог: {select.price.reduce((total, item) => total + item, 0) + select.DeliveryPrice} руб.</p>
                                    </div>
                                </div>
                                                    
                                    {
                                         Photo.map((item, index) => {
                                            console.log(item.IdPurchase === select.IdPurchase)
                                            if (item.IdPurchase === select.IdPurchase) { return(
                                                item.photo.map((photoItem, photoIndex) => {
                                                    return(
                                                    <div  className='OnePurchasePhoto'>
                                                        {console.log(photoItem)}
                                                        <img src={photoItem.Photo} />
                                                    </div>)
                                            })
                                            )}
                                        })
                                    }
                                
                                
                                
                            </div> 
                                </>
                            )})
                        :
                        <></>
                    }
                    {/* <div className="OnePurchase">
                        <div className="OnePurchaseInfo">
                            <div className="OnePurchaseDatePaymentAddress">
                                <p>от 20.12.2024</p>
                                <p>оплата: оплачен</p>
                                <p>куда: адрес</p>
                            </div>
                            <div className="OnePurchaseInfoBotton">
                                <ActionButton text ='оплатить'/>
                                <p>1000р</p>
                            </div>
                        </div>
                                                   
                        <div className='OnePurchasePhoto'>
                                <img src='https://content.img-gorod.ru/pim/products/images/04/30/018fb023-6cd1-7e3a-9b69-7b973cf20430.jpg?width=240&height=346&fit=bounds'></img>
                                <img src='https://content.img-gorod.ru/pim/products/images/04/30/018fb023-6cd1-7e3a-9b69-7b973cf20430.jpg?width=240&height=346&fit=bounds'></img>
                                <img src='https://content.img-gorod.ru/pim/products/images/04/30/018fb023-6cd1-7e3a-9b69-7b973cf20430.jpg?width=240&height=346&fit=bounds'></img>
                                <img src='https://content.img-gorod.ru/pim/products/images/04/30/018fb023-6cd1-7e3a-9b69-7b973cf20430.jpg?width=240&height=346&fit=bounds'></img>
                                <img src='https://content.img-gorod.ru/pim/products/images/04/30/018fb023-6cd1-7e3a-9b69-7b973cf20430.jpg?width=240&height=346&fit=bounds'></img>
                        </div>
                        
                          
                    </div>  */}
                        
                </div>
            </div>
            
        </div>
            
        {/* </div> */}
        
        <Modal active={modalActive} setActive={setModalActive}>    
        </Modal>
    </>
    )
}
export default PurchaseHistory