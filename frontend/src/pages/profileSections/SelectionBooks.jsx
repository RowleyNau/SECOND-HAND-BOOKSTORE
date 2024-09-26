import './../Pages1.css';
import Navbar from '../../components/navbar/Navbar';
import { GenreGetAll, CategoriesGetAll, AgerestrictionGetAll, AuthorsGetAll, BindingtypeGetAll} from '../../http/parametersApi';
import { useEffect, useState } from 'react';
import Profile from '../Profile';
import PageTitle from '../../components/pageTitle/PageTitle';
import InputSelectMultiple from '../../components/allInput/InputSelectMultiple';
import InputSelect from '../../components/allInput/InputSelect';
import InputStr from '../../components/allInput/InputStr';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import Modal from '../../components/modalWindow/Modal';
import moment from 'moment';
import { IndividualSelectionAdd } from '../../http/individualSelectionApi';
import {FaCheckCircle } from "react-icons/fa";
const SelectionBooks = (props) => {
    const [modalActive, setModalActive]=useState(false);
    const [Notes, setNotes]=useState('');
    const [Genre, setGenre]=useState([]);
    const [selGenre, setSelGenre] = useState({genre:['','']});
    const [Author, setAuthor]=useState([]);
    const [selAuthor, setSelAuthor] = useState({authors:['','']});
    const [Category, setCategory]=useState([]);
    const [selCategory, setSelCategory] = useState({categories:['','']});
    const [RequestDate, setRequestDate]=useState(moment().format('YYYY-MM-DD'))
    const [MesAdd, setMesAdd]=useState(false);
    const [ErrorINP, setErrorINP]=useState(false);
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
    //     // setModalActive(true);
    //     data = await IndividualSelectionAdd
    // }

    const add = async() => {
        console.log(Notes, Author, Category, Genre, RequestDate)
        // var now = new Date();
        try{
            var data = await IndividualSelectionAdd(Author, Category, Genre, Notes, RequestDate);
            console.log(data);
            setErrorINP('заявка успешно отправлена');
            setMesAdd(true);
            console.log(ErrorINP)
        }
        catch(e){
            console.log(e)
            setMesAdd(false);
            setErrorINP(e.response.data.message);
        }
        
    }

    const selectData = async()=>{
        let data = await GenreGetAll();
        setSelGenre(createDictionary1(data.genre))
        data = await AuthorsGetAll();
        setSelAuthor(createDictionaryAuthor(data.authors))
        data = await CategoriesGetAll();
        setSelCategory(createDictionary1(data.categories))
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
                <p className="titleText">заявка на подбор книг</p> 
                    <label>
                        <p>жанр:</p> 
                        <InputSelectMultiple className="selects" val={selGenre}                            selectedValue= {Genre} setSelectedValue={setGenre}/>
                    </label>
                    <label>
                        <p>автор:</p> 
                        <InputSelectMultiple className="selects" val={selAuthor}                        selectedValue= {Author} setSelectedValue={setAuthor}/>
                    </label>
                    <label>
                        <p>категория:</p> 
                        <InputSelectMultiple className="selects" val={selCategory}                        selectedValue= {Category} setSelectedValue={setCategory}/>
                    </label>
                    <label>
                        <p>заметки:</p>
                    <InputStr val = {Notes} setVal = {setNotes}/>
                    </label>
                    {
                        ErrorINP?
                        <p className='RequiredMes'>{ErrorINP}</p>
                        :
                        <></>
                    }
                    {/* <p>красным выделены поля, обязательные для заполнения</p> */}
                    <div className="SelectionBut">
                        {
                            MesAdd? 
                            <a href='/Profile/ListAcceptingBooks'>
                                <ActionButton text="перейти к списку заявок" />
                            </a>
                            :
                            <ActionButton text="Отправить" Click={add}/>
                        }
                        
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        <Modal active={modalActive} setActive={setModalActive}>
            <p >заявка отправлена</p>   
            <div className='modalBookDel'>
                    <div>
                        <p>Данные книги удалены</p>
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