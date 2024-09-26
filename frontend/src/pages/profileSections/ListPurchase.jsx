import './../Pages1.css';
import Navbar from '../../components/navbar/Navbar';
import { GenreGetAll, CategoriesGetAll, AgerestrictionGetAll, AuthorsGetAll, BindingtypeGetAll} from '../../http/parametersApi';
// import { useEffect, useState } from 'react';
import Profile from '../Profile';
import PageTitle from '../../components/pageTitle/PageTitle';
import InputSelectMultiple from '../../components/allInput/InputSelectMultiple';
import InputSelect from '../../components/allInput/InputSelect';
import InputStr from '../../components/allInput/InputStr';
import Modal from '../../components/modalWindow/Modal';
import AcceptingBooks from '../AcceptingBooks';
import InputCheckbox from '../../components/allInput/InputCheckbox';
import React, { useEffect,useContext, useState } from 'react';
import InputPhoto from '../../components/allInput/InputPhoto';
import moment from 'moment'
import {FaTrashAlt } from "react-icons/fa";
import LikeButton from '../../components/allButtons/likeButton/LikeButton';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import { ShoppingcartGetAll } from '../../http/purchaseApi';
import { PhotoGet } from '../../http/parametersApi';
import DelButton from '../../components/allButtons/delButton/DelButton';
import InputNum from '../../components/allInput/InputNum';
const ListPurchase = (props) => {
    const [Phone, setPhone]=useState([])
    const [Photo, setPhoto] = useState([]);  
    const [AcceptingData, setAcceptingData] = useState([]);  
    const [modalActive, setModalActive]=useState(false)
    const [ErrorINP, setErrorINP]=useState(true)
    const [NumberGoods, setNumberGoods]=useState(1)

    const [GoodsList, setGoodsList]=useState([]);

    const [totalSum,SettotalSum]=useState('');

    const add = async() => {
        const data = await ShoppingcartGetAll();
        console.log(data);
        const a = [];
        for (const one of data.ShoppingCartData) {
            console.log(one.good.photoGoods);
                if(one.good.photoGoods.length!=0){
                    
                    let dataP = await PhotoGet('static/images/goods/' + one.IdGoods + '/' + one.good.photoGoods[0].Photo);
                    a.push({id:one.IdGoods, Photo:dataP});
                    console.log(a)
                }
        }
        // setPhoto(a); 
        setGoodsList(data.ShoppingCartData);
        setPhoto(a);
        console.log(GoodsList, Photo)
        }
    useEffect (()=>{
        // selectData();
        console.log();
        SettotalSum(GoodsList.reduce((acc, item) => acc + item.good.Price, 0));
    },[GoodsList])
    useEffect (async()=>{
        const data = await add();

        // selectData();
        // SettotalSum(GoodsList.reduce((acc, item) => acc + item.Prise, 0));
        
    },[])
    return(
    <>
    {/* <div className={style.mainUnitMarg}> */}
    <Navbar/>
        <div className="mainUnit">
            <PageTitle textTitle="профиль"/>
            

            <div className="ProfileSections">
                <Profile ProfeleMenu='5'/>
                <div className="ListPurchaseWin">
                    <div className="ListGoods">
                        {GoodsList?
                        GoodsList.map((onegood) => {
                            return (
                                <div className="ListGoodsOne">
                                    <div className="PhotoName">
                                        <img src={Photo.find(element => element.id === onegood.IdGoods)?.Photo}></img>
                                        {
                                            onegood.good.booklist.Name==null?
                                            <p>{onegood.good.othergood.Name}</p>
                                            :
                                            <p>{onegood.good.booklist.Name}</p>
                                        }
                                    </div>
                                    
                                    <div className="ListGoodsOneInfo">  
                                        <div style={{display:"flex", alignItems: "center"}}><InputNum val={NumberGoods} setVal={setNumberGoods} min='0'/> шт.</div> 
                                        <p>{onegood.good.Price} pуб.</p> 
                                        <div>   
                                            <DelButton/>
                                            <LikeButton/>
                                        </div> 
                                    </div>    

                                </div>
                            );
                        })
                        :
                        <></>}
                    </div>
                    <div className="ListGoodsPlacing">
                    <div>
                        <p>итого</p>
                        <p>{totalSum} р</p>
                    </div>
                    <a href='/Profile/Purchase'>
                        <ActionButton text='оформить'/>  
                    </a>
                      
                    </div>
                
                </div>
                
            </div>
            
        </div>
    </>
    )
}
export default ListPurchase