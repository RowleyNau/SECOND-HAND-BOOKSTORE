import React from "react"; 
import NavbarCon from "../../components/navbarConsultant/NavbarCon.jsx";
import {observer} from "mobx-react-lite"; 
import { useEffect, useState } from 'react';
import '../Pages.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import FunctionButton from "../../components/allButtons/functionButton/FunctionButton.jsx";
import Search from '../../components/searchInput2/Search';
import Modal from '../../components/modalWindow/Modal';
// import BooksAddStr from './ModalWinBooks/BooksAdd';
import UsersInfo from "./ModalWinUsers/UsersInfo.jsx";
import UsersAddStr from "./ModalWinUsers/UsersAddStr.jsx";
import BookInfo from './ModalWinBooks/BookInfo';
import SalesInfo from "./ModalWinSales/SalesInfo.jsx";
import { BookGetAll, BookDel, BookGet, BookSearchGetAll } from '../../http/bookManagementApi.js';   
import {FaRegEye ,FaTrashAlt, FaAngleLeft, FaAngleRight, FaCheckCircle, FaExclamation} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { PurchaseGetAll, PurchaseAdd } from "../../http/purchaseApi.js";

const Sales = observer(() => {
    const [modalPurchaseInfo, setModalPurchaseInfo]=useState(false);
    const [modalPurchaseAdd, setModalPurchaseAdd]=useState(false);
    const [modalPurchaseDel, setModalPurchaseDel]=useState(false);
    const [IdPurchaseDel, setIdPurchaseDel]=useState(false);
    const [PurchaseInfoId, setPurchaseInfoId]=useState(false);
    const [Purchases, setPurchases]=useState([]);//
    const [PurchasesCount, setPurchasesCount]=useState([]);
    const [PurchasesPage, setPurchasesPage]=useState(1);
    const [SearchStatus, setSearchStatus]=useState(false);
    const [SearchInput, setSearchInput]=useState('');

    const PurchaseShow = async(Search)=>{
        let data;
        // console.log()
        // if  (Search & SearchInput!=''){Search, SearchInput
            // setSearchStatus(true);
            // /data = await PurchaseSearchGetAll(50, PurchasesPage, SearchInput);
        // }
        // else {
            setSearchStatus(false);
            data = await PurchaseGetAll(50, PurchasesPage);
            console.log(data)
        // }
        setPurchases(data.groupedArray)
        setPurchasesCount(data.amount);
    };
    const PurchaseDelFun = async(Purchase)=>{        
        let data;
    // try{
    //     data = await PurchaseDel(Purchase);
    //     PurchaseShow(false);
    //     console.log(data.error)
    //     setIdPurchaseDel(false)
    // }
    // catch (e){
    //     console.log(e)
    //     console.log(e.response.data.message)
    // }
    };
    const СhoicePurchaseDel = async(Purchase)=>{        
        // let data;
        setModalPurchaseDel(true)
        setIdPurchaseDel(Purchase);
        console.log(Purchase);
        // data = await PurchaseDel(Purchase);
        // PurchaseShow();
    };
    const PurchaseInfoFun = async(Purchase)=>{
        let data;
        // data = await PurchaseGetOne(Purchase);
        setPurchaseInfoId(Purchase);
        setModalPurchaseInfo(true);
    };
    const PageBut = () => {
        const buttons = [];
        if (PurchasesPage>1){
            buttons.push(<button  className='ButPageNoSel' onClick={() => PageNew(PurchasesPage-1)}><FaAngleLeft/></button>);
        }
        for (let i = 1; i < PurchasesCount + 1; i += 49) {
            console.log(i);
            if(PurchasesPage==Math.floor(i / 50) + 1){
                buttons.push(<button key={i} className='ButPageSel' onClick={() => PageNew(Math.floor(i / 50) + 1)}>{Math.floor(i / 50) + 1}</button>);
            }
            else{
                buttons.push(<button key={i} className='ButPageNoSel' onClick={() => PageNew(Math.floor(i / 50) + 1)}>{Math.floor(i / 50) + 1}</button>);
            }
        }
        if (PurchasesCount>PurchasesPage*50){
            buttons.push(<button  className='ButPageNoSel' onClick={() => PageNew(PurchasesPage+1)}><FaAngleRight/></button>);
        }
        console.log(PurchasesPage);
        return buttons;
    };
    
    const PageNew = (num)=>{
        setPurchasesPage(num);
        let data;
        data = PurchaseShow(false);
    };
    useEffect (()=>{
        PurchaseShow(false);
        
    },[])

    useEffect (()=>{
        PurchaseShow(false);
        
    },[modalPurchaseInfo, modalPurchaseAdd])
    return(
    <>
    <NavbarCon/> 
    <div className="mainUnit">
        <PageTitle textTitle="учёт продаж"/>
        <div className='controlBut'>
            <ActionButton text='добавить' Click={()=>setModalPurchaseAdd(true)}/>
            {/* <FunctionButton text='фильтр'/> */}
            <div className='ButPage'>
                {
                    PageBut()
                }
            </div>
        </div>
        
        <div className="outerTab">
            <table class="table">
                    <tr className='SearchTable'>
                        {
                            SearchStatus? 
                        <>
                        <th colspan="6"><Search ClickBut = {()=>{PurchaseShow(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                        <th colspan="1"><button className='SearchCross' onClick={()=>{PurchaseShow(false)}}><RxCross2/></button></th>
                        </>
                            :
                        <th colspan="7"><Search ClickBut = {()=>{PurchaseShow(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                        }
                    </tr>
                    <tr>
                        <th>дата</th>
                        <th>способ оплаты</th>
                        <th>статус оплаты</th>
                        <th>способ получения</th>
                        <th>статус получения</th>
                        <th>внимание</th>
                        <th></th>
                    </tr>
                <tbody>
                    {
                        Purchases ? (
                            Purchases.map((Purchase) => {
                                {console.log(Purchase)}
                                return (
                                    <tr >
                                        <td className='num'>{Purchase.DatePurchase.split('T')[0]}</td>
                                        <td>{Purchase.paymentmethod.Name}</td>
                                        <td>{Purchase.paymentstate.Name}</td>
                                        <td>{Purchase.receivingmethod.Name}</td>
                                        <td>{Purchase.receivingstate.Name}</td>
                                        <td className='num'>{(Purchase.IdReceivingMethod!==1&&Purchase.IdPaymentState==3)||(Purchase.IdReceivingMethod!==1&&Purchase.IdPaymentState==2==1&&Purchase.IdReceivingState==2)||Purchase.TransferOwner==null?
                                        <><FaExclamation  className='CheckBad'/></>
                                        :
                                        <><FaCheckCircle  className='CheckGood'/></>}</td>
                                        
                                        <td className='event'>
                                            <nav>
                                                <button title="подробнее"  onClick={() => PurchaseInfoFun(Purchase)}><FaRegEye/></button>                                                
                                                <button onClick={() => {СhoicePurchaseDel(Purchase.IdClients)}} ><FaTrashAlt/></button>
                                            </nav>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7">Нет данных для отображения</td>
                            </tr>
                        )
                    } 
                </tbody>
            </table>
        </div>
    </div>


     { modalPurchaseAdd?
        <Modal active={modalPurchaseAdd} setActive={setModalPurchaseAdd}>
            {/* <PurchasesAddStr active={modalPurchaseInfo} setActive={setModalPurchaseInfo}/> */}
        </Modal>
        :
        <></>
    }     
    { modalPurchaseInfo?
        <Modal active={modalPurchaseInfo} setActive={setModalPurchaseInfo}>
            <SalesInfo dataInfo={PurchaseInfoId}/> 
        </Modal>
        :
        <></>
    }   
      
    { modalPurchaseDel?
        <Modal active={modalPurchaseDel} setActive={setModalPurchaseDel}>
            {/* <PurchaseInfo IdGoodInfo={PurchaseInfoId}/>  */}
            {
                IdPurchaseDel?
                <div className='modalPurchaseDel'>
                   
                    <div>
                        <p>Вы уверены, что хотите удалить данные о покупке?</p>
                    </div>
                    <div className='modalPurchaseDelQ'>
                        <ActionButton text='да' Click={()=>PurchaseDelFun(IdPurchaseDel)}/>
                        <FunctionButton text='нет' Click={()=>setModalPurchaseDel(false)}/>
                    </div>
                </div>  
                :
                <div className='modalPurchaseDel'>
                    <div>
                        <p>Данные книги удалены</p>
                    </div>
                    <div>
                        <p  className='modalPurchaseDelTrue'><FaCheckCircle /></p>
                    </div>
                </div>  
            }
        </Modal>
        :
        <></>
    }  
    </>
    )
})
export default Sales