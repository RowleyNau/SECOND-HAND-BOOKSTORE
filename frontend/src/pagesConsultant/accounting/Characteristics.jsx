import React from "react"; 
import NavbarCon from "../../components/navbarConsultant/NavbarCon.jsx";
import {observer} from "mobx-react-lite"; 
import { useEffect, useState } from 'react';
import '../Pages.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import ActionButton from '../../components/allButtons/actionButton/ActionButton';
import FunctionButton from "../../components/allButtons/functionButton/FunctionButton.jsx";
import InputStrMini from "../../components/allInput/InputStrMini.jsx";
import Search from '../../components/searchInput2/Search';
import Modal from '../../components/modalWindow/Modal';
import BooksAddStr from './ModalWinBooks/BooksAdd';
import BookInfo from './ModalWinBooks/BookInfo'; 
import {FaRegEye ,FaTrashAlt, FaAngleLeft, FaAngleRight, FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { 
    CategoriesOtherGoodsAdd, CategoriesOtherGoodsGetAll, CategoriesOtherGoodsDel, CategoriesOtherGoodsUpdate, CategoriesOtherGoodsGetAllSearch,
    GenreAdd, GenreGetAll, GenreUpdate, GenreDel, GenreGetAllSearch,
    AuthorsAdd, AuthorsGetAll, AuthorsDel, AuthorsUpdate, AuthorsGetAllSearch,
    CategoriesAdd, CategoriesGetAll, CategoriesDel, CategoriesUpdate, CategoriesGetAllSearch,
    PublishersAdd, PublishersGetAll, PublishersDel, PublishersUpdate, PublishersGetAllSearch,
    BindingtypeAdd, BindingtypeGetAll, BindingtypeDel, BindingtypeUpdate, BindingtypeGetAllSearch,
    AgerestrictionAdd, AgerestrictionGetAll, 
    LocationsAdd, LocationsGetAll, LocationsDel, LocationsUpdate, LocationsGetAllSearch,
    GoodstatesAdd, GoodstatesGetAll, 
    CitiesAdd, CitiesGetAll, CitiesDel, CitiesUpdate, CitiesGetAllSearch,
    AvailabilityAdd, AvailabilityGetAll } from "../../http/parametersApi.js";

import InputSelect from "../../components/allInput/InputSelect.jsx";

const Characteristics = observer(() => {
      
    const [SelCharact, setSelCharact] = useState([
        {value: 0, label: "категории иных товаров"},
        {value: 1, label: "категории книг"},
        {value: 2, label: "авторы"},
        {value: 3, label: "жанры"},
        {value: 4, label: "издательства"},
        {value: 5, label: "книжный переплет"},
        {value: 6, label: "положение"},
        {value: 7, label: "город"}])
    const [Charact, setCharact] = useState([]);   
    const [CharactAdd, setCharactAdd] = useState(false);   
    const [CharactTable, setCharactTable] = useState(false);    
    const [CharactTableData, setCharactTableData] = useState([]);  
    const [Name, setName] = useState('');
    const [LastName, setLastName] = useState('');
    const [MiddleName, setMiddleName] = useState('');
    // const [Name, setName] = useState('');
    // const [LastName, setLastName] = useState('');
    // const [MiddleName, setMiddleName] = useState('');
    const [Message, setMessage] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [IdDel, setIdDel]=useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [IdUpdate, setIdUpdate]=useState(false);
    const [SearchStatus, setSearchStatus]=useState(false);
    const [SearchInput, setSearchInput]=useState('');
    const ChoiceDel = async(id)=>{        
        // let data;
        setModalDel(true)
        setIdDel(id);
        console.log(IdDel);
        // data = await BookDel(book);
        // BookShow();
    }; 
    const ChoiceUpdate = async(id, name)=>{        
        // let data;
        setModalUpdate(true)
        setIdUpdate(id);
        console.log(name);
        if (Charact.value==2){
            setLastName(name.LastName);
            setName(name.Name);
            setMiddleName(name.MiddleName);
        }
        else{
            setName(name);
        }
        
        console.log(IdUpdate);
        // data = await BookDel(book);
        // BookShow();
    };
    const CharactAddFun = async()=>{

        console.log(Charact.value)
        if (Name!='')
        {        
            switch (Charact.value) {
            case 0:
                try{
                    let data = await CategoriesOtherGoodsAdd(Name);
                    setMessage('Успешно добавлено');
                  } catch (e) {
                    // инструкции для обработки ошибок
                    setMessage(e); // передать объект исключения обработчику ошибок
                  }
              break;
            case 1:
                try{
                    let data = await CategoriesAdd(Name);
                    setMessage('Успешно добавлено');
                  } catch (e) {
                    // инструкции для обработки ошибок
                    setMessage(e); // передать объект исключения обработчику ошибок
                  }
              
              break;
            case 2:
                try{
                    let data = await AuthorsAdd(LastName, Name, MiddleName);
                    setMessage('Успешно добавлено');
                  } catch (e) {
                    // инструкции для обработки ошибок
                    setMessage(e); // передать объект исключения обработчику ошибок
                  }
              
              break;
            case 3:
                try{
                    let data = await GenreAdd(Name);
                    setMessage('Успешно добавлено');
                  } catch (e) {
                    // инструкции для обработки ошибок
                    setMessage(e); // передать объект исключения обработчику ошибок
                  }
              break;
            case 4:
                try{
                    let data = await PublishersAdd(Name);
                    setMessage('Успешно добавлено');
                  } catch (e) {
                    // инструкции для обработки ошибок
                    setMessage(e); // передать объект исключения обработчику ошибок
                  }
              
              break;
            case 5: 
                try{
                    let data = await BindingtypeAdd(Name);
                    setMessage('Успешно добавлено');
                  } catch (e) {
                    // инструкции для обработки ошибок
                    setMessage(e); // передать объект исключения обработчику ошибок
                  }             
              break;
            case 6:
              try{
                let data = await LocationsAdd(Name);
                setMessage('Успешно добавлено');
              } catch (e) {
                // инструкции для обработки ошибок
                setMessage(e); // передать объект исключения обработчику ошибок
              }
              
              break;
            case 7:
              try{
                let data = await CitiesAdd(Name);
                setMessage('Успешно добавлено');
              } catch (e) {
                // инструкции для обработки ошибок
                setMessage(e); // передать объект исключения обработчику ошибок
              }
              
              break;
            default:
                setMessage( "Нет таких значений" );
            }
            if (CharactTable){
                CharactGetAllFun();
            }
        }
        else{
            setMessage( "Не все обязательные значения введены" );
        }
    }
    const CharactDelFun = async(id)=>{  
        switch (Charact.value) {
        case 0:
            try{
                let response = await CategoriesOtherGoodsDel(id);
                setMessage("Характеристики успешно удалена");
                setIdDel(false);
                } catch (e) {
                    setMessage(e.response.data.error);
                    console.log(e.response.data.error)
                    setIdDel(false);
                }
            break;
        case 1:
            try{
                let response = await CategoriesDel(id);
                setMessage("Характеристики успешно удалена");
                setIdDel(false);
                } catch (e) {
                    setMessage(e.response.data.error);
                    console.log(e.response.data.error)
                    setIdDel(false);
                }
            
            break;
        case 2:
            try{
                console.log(id)
                let response = await AuthorsDel(id);
                setMessage("Характеристики успешно удалена");
                setIdDel(false);
                } catch (e) {
                    setMessage(e.response.data.error);
                    console.log(e.response.data.error)
                    setIdDel(false);
                }
            
            break;
        case 3:
            try{
                let response = await GenreDel(id);
                setMessage("Характеристики успешно удалена");
                setIdDel(false);
                } catch (e) {
                    setMessage(e.response.data.error);
                    console.log(e.response.data.error)
                    setIdDel(false);
                }
            break;
        case 4:
            try{
                let response = await PublishersDel(id);
                setMessage("Характеристики успешно удалена");
                setIdDel(false);
                } catch (e) {
                    setMessage(e.response.data.error);
                    console.log(e.response.data.error)
                    setIdDel(false);
                }
            break;
        case 5:
            try{
                let response = await BindingtypeDel(id);
                setMessage("Характеристики успешно удалена");
                setIdDel(false);
                } catch (e) {
                    setMessage(e.response.data.error);
                    console.log(e.response.data.error)
                    setIdDel(false);
                }         
            break;
        case 6:
            try{
                let response = await LocationsDel(id);
                setMessage("Характеристики успешно удалена");
                setIdDel(false);
                } catch (e) {
                    setMessage(e.response.data.error);
                    console.log(e.response.data.error)
                    setIdDel(false);
                }
            break;
        case 7:
            try{
                let response = await CitiesDel(id);
                setMessage("Характеристики успешно удалена");
                setIdDel(false);
                } catch (e) {
                    setMessage(e.response.data.error);
                    console.log(e.response.data.error)
                    setIdDel(false);
                }  
            break;
        default:
            setMessage( "Нет таких значений" );
        }
        if (CharactTable){
            CharactGetAllFun();
        }
        
    }
    const CharactUpdateFun = async(id)=>{  
        switch (Charact.value) {
        case 0:
            try{
                let data = await CategoriesOtherGoodsUpdate(id, Name);
                setMessage('Успешно изменено');
                setIdUpdate(false);
                console.log(IdDel)
            } catch (e) {
                setMessage(e);
            }
            break;
        case 1:  
            try{
                let data = await CategoriesUpdate(id, Name);
                setMessage('Успешно изменено');
                setIdUpdate(false);
                console.log(IdDel)
            } catch (e) {
                setMessage(e);
            }          
            break;
        case 2: 
            try{
                let data = await AuthorsUpdate(id, LastName, Name, MiddleName);
                setMessage('Успешно изменено');
                setIdUpdate(false);
                console.log(IdDel)
            } catch (e) {
                setMessage(e);
            } 
            break;
        case 3:
            try{
                let data = await GenreUpdate(id, Name);
                setMessage('Успешно изменено');
                setIdUpdate(false);
                console.log(IdDel)
            } catch (e) {
                setMessage(e);
            }
            break;
        case 4:
            try{
                let data = await PublishersUpdate(id, Name);
                setMessage('Успешно изменено');
                setIdUpdate(false);
                console.log(IdDel)
            } catch (e) {
                setMessage(e);
            }    
            break;
        case 5:   
            try{
                let data = await BindingtypeUpdate(id, Name);
                setMessage('Успешно изменено');
                setIdUpdate(false);
                console.log(IdDel)
            } catch (e) {
                setMessage(e);
            }      
            break;
        case 6:
            try{
                let data = await LocationsUpdate(id, Name);
                setMessage('Успешно изменено');
                setIdUpdate(false);
                console.log(IdDel)
            } catch (e) {
                setMessage(e);
            }     
            break;
        case 7:
            try{
                let data = await CitiesUpdate(id, Name);
                setMessage('Успешно изменено');
                setIdUpdate(false);
                console.log(IdDel)
            } catch (e) {
                setMessage(e);
            }     
            break;
        default:
            setMessage( "Нет таких значений" );
        }
        if (CharactTable){
            CharactGetAllFun();
        }
        
    }
    function createDictionaryAuthor(array) {
        return array.map((item, index) => {
            let Name = item.Name;
            if (item.LastName !== null) {
                Name += ' '+item.LastName;
            }
            if (item.MiddleName !== null) {
                Name += ' '+item.MiddleName;
            }
            return {
                Id: item.Id,
                Name: Name
            };
        });
    }
    const CharactGetAllFun = async(Search)=>{
        let data;
        if  (Search & SearchInput!=''){
            setSearchStatus(true);
            switch (Charact.value) {
                case 0:
                    data = await CategoriesOtherGoodsGetAllSearch(SearchInput)
                    console.log(data);
                    setCharactTableData(data.categories);
                    setCharactTable(true);
                    break;
                case 1:
                    data = await CategoriesGetAllSearch(SearchInput)
                    console.log(data);
                    setCharactTableData(data.categories);
                    setCharactTable(true);
                    break;
                case 2:
                    data = await AuthorsGetAllSearch(SearchInput)
                    // let data2 = createDictionaryAuthor(data.authors)
                    console.log(data.authors);
                    setCharactTableData(data.authors);
                    setCharactTable(true);            
                    break;
                case 3:
                    data = await GenreGetAllSearch(SearchInput)
                    console.log(data);
                    setCharactTableData(data.genre);
                    setCharactTable(true);
                    break;
                case 4:
                    data = await PublishersGetAllSearch(SearchInput)
                    console.log(data);
                    setCharactTableData(data.publishers);
                    setCharactTable(true);
                    break;
                case 5:
                    data = await BindingtypeGetAllSearch(SearchInput)
                    console.log(data);
                    setCharactTableData(data.bindingtype);
                    setCharactTable(true);
                    break;
                case 6:
                    data = await LocationsGetAllSearch(SearchInput)
                    console.log(data);
                    setCharactTableData(data.locations);
                    setCharactTable(true);
                    break;
                case 7:
                    data = await CitiesGetAllSearch(SearchInput)
                    console.log(data);
                    setCharactTableData(data.cities);
                    setCharactTable(true);
                    break;
                default:
                    alert( "Нет таких значений" );
                }
        }
        else {
            setSearchStatus(false);
            switch (Charact.value) {
        case 0:
            data = await CategoriesOtherGoodsGetAll()
            console.log(data);
            setCharactTableData(data.Categories);
            setCharactTable(true);
            break;
        case 1:
            data = await CategoriesGetAll()
            console.log(data);
            setCharactTableData(data.categories);
            setCharactTable(true);
            break;
        case 2:
            data = await AuthorsGetAll()
            // let data2 = createDictionaryAuthor(data.authors)
            console.log(data.authors);
            setCharactTableData(data.authors);
            setCharactTable(true);            
            break;
        case 3:
            data = await GenreGetAll()
            setCharactTableData(data.genre);
            console.log(CharactTableData);
            setCharactTable(true);
            break;
        case 4:
            data = await PublishersGetAll()
            console.log(data);
            setCharactTableData(data.publishers);
            setCharactTable(true);
            break;
        case 5:
            data = await BindingtypeGetAll()
            console.log(data);
            setCharactTableData(data.bindingtype);
            setCharactTable(true);
            break;
        case 6:
            data = await LocationsGetAll()
            console.log(data);
            setCharactTableData(data.locations);
            setCharactTable(true);
            break;
        case 7:
            data = await CitiesGetAll()
            console.log(data);
            setCharactTableData(data.cities);
            setCharactTable(true);
            break;
        default:
            alert( "Нет таких значений" );
        }
        }
        
    }
    useEffect (()=>{
        if (modalUpdate == false){
        setMiddleName('');
        setLastName('');
        setName('');
        setMessage('');}

    },[modalUpdate])
    useEffect (()=>{
        if (CharactAdd == false){
        setMiddleName('');
        setLastName('');
        setName('');
        setMessage('');}

    },[CharactAdd])
    useEffect (()=>{
        if (modalDel == false){
        setMiddleName('');
        setLastName('');
        setName('');
        setMessage('');}

    },[modalDel])
    useEffect (()=>{
        
        Charact.value>=0?
        CharactGetAllFun()
        :
        setCharactTable(false)

    },[Charact])

    return(
    <>
    <NavbarCon/> 
    <div className="mainUnit">
        <PageTitle textTitle="учёт характеристик"/>

        <div className="charactControl">
            <label>
                <p>выберите характеристику:</p>
                <InputSelect className="selects" val={SelCharact} selectedValue= {Charact} setSelectedValue={setCharact}/>
            </label>
        </div>
        {
            Charact.value>=0?
            <div className="butCharactControl">
                <ActionButton text='добавить' Click={()=>setCharactAdd(true)}/>
                {/* <FunctionButton text='вывести' Click={()=>CharactGetAllFun()}/>/ */}
            </div>
            :
            <></>
        }

        {
            CharactTable?
            <div className="outerTab">
                <table class="table">
                        <tr className='SearchTable'>
                            {
                                SearchStatus? 
                            <>
                            <th colspan="2"><Search ClickBut = {()=>{CharactGetAllFun(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                            <th colspan="1"><button className='SearchCross' onClick={()=>{CharactGetAllFun(false)}}><RxCross2/></button></th>
                            </>
                                :
                            <th colspan="3"><Search ClickBut = {()=>{CharactGetAllFun(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                            }
                        </tr>
                        <tr>
                            <th>id</th>
                            <th>Название</th>
                            <th></th>
                        </tr>
                    <tbody>
                        {
                            CharactTableData ? (
                                CharactTableData.map((ch) => {
                                    return (
                                        <tr key={ch.Id}>
                                            <td>{ch.Id}</td>
                                            {
                                                Charact.value==2?
                                                <>
                                                    {/* {
                                                        ch.LastName
                                                    } */}
                                                    <td>{(ch.LastName!==null? ch.LastName: '') + " " + ch.Name + " " + (ch.MiddleName!==null? ch.MiddleName: '')}</td>
                                                    <td className='event'>
                                                        <nav>
                                                            <button title="подробнее"  onClick={() => ChoiceUpdate(ch.Id, {LastName: ch.LastName, Name: ch.Name, MiddleName:ch.MiddleName})}><FaRegEye/></button>                                                
                                                            <button onClick={() => {ChoiceDel(ch.Id)}} ><FaTrashAlt/></button>
                                                        </nav>
                                                    </td>
                                                </>
                                                :
                                                <>
                                                    <td>{ch.Name}</td>
                                                    <td className='event'>
                                                        <nav>
                                                            <button title="подробнее"  onClick={() => ChoiceUpdate(ch.Id, ch.Name)}><FaRegEye/></button>                                                
                                                            <button onClick={() => {ChoiceDel(ch.Id)}} ><FaTrashAlt/></button>
                                                        </nav>
                                                    </td>
                                                </>
                                            }
                                            
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
            :
            <></>
        }

    </div>
    <Modal active={modalUpdate} setActive={setModalUpdate}>
        <div className="ParamCharact">     
            {
                Charact.value==2?
                <>
                <label>
                    <p className="RequiredInp">имя:</p>
                    <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
                </label>                
                <label>
                    <p>фамилия:</p>
                    <InputStrMini type="text" className = "inpName" value={LastName} onClick={e =>  setLastName(e.target.value)} setCompanyName = {setLastName}/>
                </label>
                <label>
                    <p>отчество:</p>
                    <InputStrMini type="text" className = "inpName" value={MiddleName} onClick={e =>  setMiddleName(e.target.value)} setCompanyName = {setMiddleName}/>
                </label>
                </>
                :
                <label>
                    <p className="RequiredInp">название:</p>
                    <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
                </label>
            } 
             <p>Красным выделены поля, обязательные для заполнения</p>
            {
                Message?
                <p className='RequiredMes'>{Message}</p>
                :
                <></>
            }
            <div className='controlBut'>
                <ActionButton text='изменить' Click={()=>CharactUpdateFun(IdUpdate)}/>
            </div>
            
        </div>  
    </Modal>

    
    <Modal active={CharactAdd} setActive={setCharactAdd}>
        <div className="ParamCharact">     
            {
                Charact.value==2?
                <>
                <label>
                    <p className="RequiredInp">имя:</p>
                    <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
                </label>                
                <label>
                    <p>фамилия:</p>
                    <InputStrMini type="text" className = "inpName" value={LastName} onClick={e =>  setLastName(e.target.value)} setCompanyName = {setLastName}/>
                </label>
                <label>
                    <p>отчество:</p>
                    <InputStrMini type="text" className = "inpName" value={MiddleName} onClick={e =>  setMiddleName(e.target.value)} setCompanyName = {setMiddleName}/>
                </label>
                </>
                :
                <label>
                    <p className="RequiredInp">название:</p>
                    <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
                </label>
            } 
             <p>Красным выделены поля, обязательные для заполнения</p>
            {
                Message?
                <p className='RequiredMes'>{Message}</p>
                :
                <></>
            }
            <div className='controlBut'>
                <ActionButton text='добавить' Click={()=>CharactAddFun()}/>
            </div>
            
        </div>  
    </Modal>
    <Modal active={modalDel} setActive={setModalDel}>
            {/* <BookInfo IdGoodInfo={BookInfoId}/>  */}
            {
                IdDel!==false?
                <div className='modalBookDel'>
                   
                    <div>
                        <p>Вы уверены, что хотите удалить данные?</p>
                    </div>
                    <div className='modalBookDelQ'>
                        <ActionButton text='да' Click={()=>CharactDelFun(IdDel)}/>
                        <FunctionButton text='нет' Click={()=>setModalDel(false)}/>
                    </div>
                </div>  
                :
                <div className='modalBookDel'>
                    <div>
                        <p>{Message}</p>
                    </div>
                    {/* <div>
                        <p  className='modalBookDelTrue'><FaCheckCircle /></p>
                    </div> */}
                </div>  
            }
        </Modal>
 
    </>
    )
})
export default Characteristics