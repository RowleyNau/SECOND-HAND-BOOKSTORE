import './../Pages1.css';
import Navbar from '../../components/navbar/Navbar';
import { GenreGetAll, CategoriesGetAll, AgerestrictionGetAll, AuthorsGetAll, BindingtypeGetAll} from '../../http/parametersApi';
import { useEffect, useState } from 'react';
import Profile from '../Profile';
import PageTitle from '../../components/pageTitle/PageTitle';
import InputSelectMultiple from '../../components/allInput/InputSelectMultiple';
import InputSelect from '../../components/allInput/InputSelect';
import InputStr from '../../components/allInput/InputStr';
// import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import Modal from '../../components/modalWindow/Modal';
import {FaCheckCircle, FaTimesCircle, FaClock} from "react-icons/fa";
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import FunctionButton from '../../components/allButtons/functionButton/FunctionButton';
import CardProduct from '../../components/cardProduct/CardProduct';
import { IndividualSelectionClientsGetAll } from '../../http/individualSelectionApi';
import CloseButton from '../../components/allButtons/closeButton/CloseButton';
const ListSelectionBooks = (props) => {
    // const [modalActive, setModalActive]=useState(false);
    const [Notes, setNotes]=useState('');
    const [Genre, setGenre]=useState([]);
    const [selGenre, setSelGenre] = useState({genre:['','']});
    const [Author, setAuthor]=useState('');
    const [selAuthor, setSelAuthor] = useState({authors:['','']});
    const [Category, setCategory]=useState([]);
    const [selCategory, setSelCategory] = useState({categories:['','']});
    const [selBindingType, setSelBindingType] = useState({bindingtype:['','']});
    const [SelectData, setSelectData] = useState();

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
    // function addSelection(){
    //     setModalActive(true);
    // }
    const selectData = async()=>{
        const data = await IndividualSelectionClientsGetAll();
        setSelectData(data.Individual);
        console.log(data, data.Individual);
        // let data = await GenreGetAll();
        // setSelGenre(createDictionary1(data.genre))
        // data = await AuthorsGetAll();
        // setSelAuthor(createDictionaryAuthor(data.authors))
        // data = await BindingtypeGetAll();
        // setSelBindingType(createDictionary1(data.bindingtype))
        // data = await CategoriesGetAll();
        // setSelCategory(createDictionary1(data.categories))
        // data = await AgerestrictionGetAll(); 
        // setSelAgeRestriction(createDictionary1(data.agerestriction))  
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
                <Profile ProfeleMenu='3'/>
                <div className="SelectionParams">
                    <div className="SelectionRequestInfo">
                        <p className="titleText">подбор книг</p> 
                        <a href='/Profile/SelectionBooks'>
                            <ActionButton text='новый запрос'/>
                        </a>
                        
                    </div>
                    {
                        SelectData? 
                        SelectData.map((select) => {
                            console.log(select)
                        })
                        :
                        <></>
                    }
                    {SelectData? SelectData.map((select) => {
                            return (
                    <div className="SelectionRequestOne">
                        <div className="SelectionRequestOneTop">
                        <div className="SelectionRequestInfo">
                            <p>от {select.RequestDate}</p>
                            {
                                select.resultbyselectionofGoods.length>0?
                                    
                                    <><p>выполнен <FaCheckCircle className="SelectionRequestResultTrue"/></p></>
                                :
                                    <p>выполнен <FaClock className="SelectionRequestResultClock"/></p>
                            }
                             
                        </div>
                            <CloseButton/>
                        </div>
                        {
                            select.genresforselections.length!=0? 
                            <div className="SelectionRequestInfo">
                                <p>жанры: | 
                                {select.genresforselections.map((Ch) => {
                                    return(' '+ Ch.genre.Name+' |')
                                })}
                            </p></div>
                            :
                            <></>
                        }
                        {
                            select.authorsforselections.length!=0? 
                            <div className="SelectionRequestInfo">
                                <p>авторы: | 
                                {select.authorsforselections.map((Ch) => {
                                    return(' '+Ch.author.Name+' '+Ch.author.LastName+' |')
                                })}
                            </p></div>
                            :
                            <></>
                        }
                        {
                            select.categoriesforselections.length!=0? 
                            <div className="SelectionRequestInfo">
                                <p>категория: | 
                                {select.categoriesforselections.map((Ch) => {
                                    return(' '+Ch.category.Name+' |')
                                })}
                            </p></div>
                            :
                            <></>
                        }
                        {
                            select.Interests!=''? 
                        <div className="SelectionRequestInfo">
                            <p>комментарий: {select.Interests}</p>
                        </div>
                            :
                            <></>
                        }
                        <div>
                            {
                                select.resultbyselectionofGoods.length>0? 
                                <><div className="SelectionRequestGoods">   
                                
                                {select.resultbyselectionofGoods.map((photo) => {
                                    console.log()
                                    return (<>
                                    <div>
                                        <CardProduct Name = {photo.good.othergood==null?photo.good.booklist.Name:photo.good.othergood.Name} Price={photo.good.Price} Photo={photo.good.photoGoods[0].Photo} href='' IdGoods = {photo.IdGoods}/>                           
                                        <>
                                        </>
                                    </div>  
                                    </>)})}
                                </div> 
                                {
                                    select.resultbyselectionofGoods[0].Comment==''?<>
                                     <p>
                                        комментарий ответа jncencndetn
                                    </p>
                                    </>:
                                    <p>
                                        комментарий: {select.resultbyselectionofGoods[0].Comment}
                                    </p>
                                }
                                
                                </> 
                                    :
                                <></>
                            }

                        </div>
                                      
                            
                                    
                            
                         
                        
                    </div>
                    )}):
                        <></>
                    }
                
                 
                    
                </div>
                
            </div>
            
        </div>
    </>
    )
}
export default ListSelectionBooks