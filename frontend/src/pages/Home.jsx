import './Pages1.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";
import CardProduct from '../components/cardProduct/CardProduct';
import PageTitle from '../components/pageTitle/PageTitle';
import FunctionButton from '../components/allButtons/functionButton/FunctionButton';
import ActionButton from '../components/allButtons/actionButton/ActionButton';
import LikeButton from '../components/allButtons/likeButton/LikeButton';
import Navbar from '../components/navbar/Navbar';
import 'swiper/css';
import { useEffect, useState } from 'react';
import CustomScroll from '../components/customScroll/CustomScroll';
import { BookCharacteristicsGetAll } from '../http/bookManagementApi';
// import FunctionButton from '../components/allButtons/functionButton/FunctionButton';
const Home = () => {
    const [AutographedBooks,setAutographedBooks] = useState(false);
    const [Antiques, setAntiques]= useState(false);
    const [RareAndGiftEditions,setRareAndGiftEditions]= useState([
        <CardProduct/>,
        <CardProduct/>,
        <CardProduct/>,
        <CardProduct/>,
        <CardProduct/>,
        <CardProduct/>,
        <CardProduct/>]);

        const SelData = async()=>{
            var data = await BookCharacteristicsGetAll(6);
            // var a=[]
            // setAutographedBooks(a);
            setAutographedBooks(                 
                data.good.map((one)=>{
                    return(<CardProduct Name = {one.Name} Price={one.good.Price} Photo={one.good.photoGoods[0].Photo} href='' IdGoods = {one.good.IdGoods}/>)                     
                        })
            );
            data = await BookCharacteristicsGetAll(9);
            setAntiques(
                data.good.map((one)=>{
                    return(<CardProduct Name = {one.Name} Price={one.good.Price} Photo={one.good.photoGoods[0].Photo} href='' IdGoods = {one.good.IdGoods}/>)                     
                        })
            );
            console.log(data.good)
        }
        useEffect (()=>{
            console.log(AutographedBooks)
        },[AutographedBooks])
        useEffect (()=>{
            SelData()
            //             setAntiques([
            //     map.data.good.map((one)=>{
                    
            //     })
            // ])
        },[])
    return(
    <>
    {/* <div className={style.mainUnitMarg}> */}
    <Navbar/>
        <div className="mainUnit">
            <PageTitle textTitle="Запрос на прием товара"/>
            <div className="HomeCategory">
                <div className="HomeCategoryTop">
                    <p>книги с автографами</p>
                    <FunctionButton text='смотреть все'/>
                </div>
                
                {/* <CardProduct Name = {photo.good.othergood==null?photo.good.booklist.Name:photo.good.othergood.Name} Price={photo.good.Price} Photo={photo.good.photoGoods[0].Photo} href='' IdGoods = {photo.IdGoods}/>  */}

                {
                    AutographedBooks?
                    <div className="CategoryGoodsScroll">
                    <CustomScroll slideContent={AutographedBooks}/>
                </div> 
                :
                <></>}
            </div>
            <div className="HomeCategory">
                <div className="HomeCategoryTop">
                    <p>антиквариат</p>
                    <FunctionButton text='смотреть все'/>

                </div>
                {
                    Antiques?
                    <div className="CategoryGoodsScroll">
                    <CustomScroll slideContent={Antiques}/>
                </div> 
                :
                <></>}
            </div>
            {/* <div className="HomeCategory">
                <div className="HomeCategoryTop">
                    <p>редкие и подарочные издания</p>
                    <FunctionButton text='смотреть все'/>
                </div>
                
                <div className="CategoryGoodsScroll">
                    <CustomScroll slideContent={RareAndGiftEditions}/>
                </div> 
            </div> */}
            
         
        </div>
    {/* </div> */}
    </>
    )
}
export default Home