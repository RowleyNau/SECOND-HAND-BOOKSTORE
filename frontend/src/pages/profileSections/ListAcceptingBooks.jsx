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
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import FunctionButton from '../../components/allButtons/functionButton/FunctionButton';
import CardProduct from '../../components/cardProduct/CardProduct';
import { AcceptingBooksClientsGetAll } from '../../http/acceptingBooksApi';
import { PhotoGet } from '../../http/parametersApi';
// import { FaCheckCircle } from 'react-icons/fa';
import {FaCheckCircle, FaTimesCircle, FaClock, FaTag } from "react-icons/fa";
import CloseButton from '../../components/allButtons/closeButton/CloseButton';

const ListAcceptingBooks = (props) => {
    const [modalActive, setModalActive]=useState(false);
    const [Notes, setNotes]=useState('');
    const [Genre, setGenre]=useState([]);
    const [selGenre, setSelGenre] = useState({genre:['','']});
    const [Author, setAuthor]=useState('');
    const [selAuthor, setSelAuthor] = useState({authors:['','']});
    const [Category, setCategory]=useState([]);
    const [selCategory, setSelCategory] = useState({categories:['','']});
    const [selBindingType, setSelBindingType] = useState({bindingtype:['','']});
    const [BindingType, setBindingType]=useState('');
    const [AgeRestriction, setAgeRestriction]=useState('');
    const [Photo, setPhoto] = useState([]);  
    const [AcceptingData, setAcceptingData] = useState([]);  

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
    function addSelection(){
        setModalActive(true);
    }
    
    async function  selectData (){
        const data = await AcceptingBooksClientsGetAll();
        console.log(data);
        // setAcceptingData(data.Receptiono);
        const a = [];
        for (const one of data.Receptiono) {
            // console.log(one.photobooksforreceptions.length!=0);
                if(one.photobooksforreceptions.length!=0){
                    // console.log(one.photobooksforreceptions)
                    let dataP = await PhotoGet('static/images/accepting/' + one.IdReceptionOfGoods + '/' + one.photobooksforreceptions[0].Photo);
                    a.push({id:one.IdReceptionOfGoods,Photo:dataP});
                    // console.log(a)
                }
        }
        // setPhoto(a); 
        setAcceptingData(data.Receptiono);
        setPhoto(a);
        console.log(AcceptingData, Photo)
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
                <Profile ProfeleMenu='2'/>
                <div className="SelectionParams">
                    <div className="SelectionRequestInfo">
                        <p className="titleText">прием книг</p> 
                        <a href='/Profile/AcceptingBooks'>
                            <ActionButton text='новый запрос'/>
                        </a>
                        
                    </div>
                    {AcceptingData.map((accepting) => {
                            return (
                    <div className="SelectionRequestOne">
                        <div className="SelectionRequestOneTop">
                            <div className="SelectionRequestInfo">
                                <p>от {accepting.RequestDate.split('T')[0]}</p>

                                {accepting.responsetorequesttoacceptbook==null?
                                
                               <p>в процессе <FaClock className="SelectionRequestResultClock"/></p>
                                :
                                <>
                                {accepting.responsetorequesttoacceptbook.Response=='true'?

                                <p>одобрено <FaCheckCircle className="SelectionRequestResultTrue"/></p> 
                                :
                                <p>отклонено <FaTimesCircle className="SelectionRequestResultFalse"/></p>}
                                
                                {accepting.TransportAssistance=='true'?
                                <p>одобрено <FaTag  className="SelectionRequestResultTrue"/></p> 
                                :
                                <></>}
                                </>
                               }
                            </div>
                            {accepting.responsetorequesttoacceptbook==null?
                                <>
                                <CloseButton/>
                                </>
                               
                                :
                                <>
                                {accepting.responsetorequesttoacceptbook.Response=='true'?

                                <></>
                                :
                                <>                               
                                <CloseButton/></>
                                
                                }
                                </>
                               }
                        </div>
                        <div className="SelectionRequestInfo">
                            {accepting.TransportAssistance?
                            <p>помощь в перевозке: да</p>
                            :
                            <p>помощь в перевозке: нет</p>
                            }
                            
                        </div>
                        {
                            Photo.find(element => element.id === accepting.IdReceptionOfGoods)?
                        <div className="SelectionRequestInfo">
                            <img src={Photo.find(element => element.id === accepting.IdReceptionOfGoods)?.Photo} />
                        </div>
                                :
                                <></>
                        }
                        {
                            accepting.Comment!=null?
                            <div className="SelectionRequestInfo">
                                <p>комментарий: {accepting.Comment}</p>
                            </div>
                            :
                            <div className="SelectionRequestInfo">
                                <p>комментарий: нет</p>
                            </div>
                        }
                        
                    </div>
                            )})}
                   
                
                 
                    
                </div>
                
            </div>
            
        </div>
    </>
    )
}
export default ListAcceptingBooks