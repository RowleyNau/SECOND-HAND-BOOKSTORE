import './Pages1.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";
import CardProduct from '../components/cardProduct/CardProduct';
import PageTitle from '../components/pageTitle/PageTitle';
import FunctionButton from '../components/allButtons/functionButton/FunctionButton';
import ActionButton from '../components/allButtons/actionButton/ActionButton';
import LikeButton from '../components/allButtons/likeButton/LikeButton';


const Home = () => {
    return(
    <>
    {/* <div className={style.mainUnitMarg}> */}
        <div className="mainUnit">
            <PageTitle textTitle="Запрос на прием товара"/>
            {/* <br style={{width:"100%"}}/> */}
            <CardProduct/>
            <LikeButton/>
        </div>
    {/* </div> */}
    </>
    )
}
export default Home