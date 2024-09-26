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
import { BookGetAll, BookDel, BookGet, BookSearchGetAll } from '../../http/bookManagementApi.js';   
import {FaRegEye ,FaTrashAlt, FaAngleLeft, FaAngleRight, FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { UserGetAll, UserSearchGetAll, personalInfo, UserDel, UserGetOne} from "../../http/userApi.js";
const Users = observer(() => {
    const [modalUserInfo, setModalUserInfo]=useState(false);
    const [modalUserAdd, setModalUserAdd]=useState(false);
    const [modalUserDel, setModalUserDel]=useState(false);
    const [IdUserDel, setIdUserDel]=useState(false);
    const [UserInfoId, setUserInfoId]=useState(false);
    const [users, setUsers]=useState([]);//
    const [usersCount, setUsersCount]=useState([]);
    const [usersPage, setUsersPage]=useState(1);
    const [SearchStatus, setSearchStatus]=useState(false);
    const [SearchInput, setSearchInput]=useState('');
    const UserShow = async(Search)=>{
        let data;
        console.log(Search, SearchInput)
        if  (Search & SearchInput!=''){
            setSearchStatus(true);
            data = await UserSearchGetAll(50, usersPage, SearchInput);
        }
        else {
            setSearchStatus(false);
            data = await UserGetAll(50, usersPage);
            console.log(data)
        }
        setUsers(data.clients)
        setUsersCount(data.amount);
    };
    const UserDelFun = async(user)=>{        
        let data;
        // setModalUserDel(true)
        // setIdUserDel(user);
        // console.log(user);
    try{
        data = await UserDel(user);
        UserShow(false);
        console.log(data.error)
        setIdUserDel(false)
    }
    catch (e){
        console.log(e)
        // alert(e.response.data.message)
        console.log(e.response.data.message)
        // setMActive()
    }
    };
    const СhoiceUserDel = async(user)=>{        
        // let data;
        setModalUserDel(true)
        setIdUserDel(user);
        console.log(user);
        // data = await UserDel(user);
        // UserShow();
    };
    const UserInfoFun = async(user)=>{
        let data;
        data = await UserGetOne(user);
        setUserInfoId(data);
        setModalUserInfo(true);
    };
    const PageBut = () => {
        const buttons = [];
        if (usersPage>1){
            buttons.push(<button  className='ButPageNoSel' onClick={() => PageNew(usersPage-1)}><FaAngleLeft/></button>);
        }
        for (let i = 1; i < usersCount + 1; i += 49) {
            console.log(i);
            if(usersPage==Math.floor(i / 50) + 1){
                buttons.push(<button key={i} className='ButPageSel' onClick={() => PageNew(Math.floor(i / 50) + 1)}>{Math.floor(i / 50) + 1}</button>);
            }
            else{
                buttons.push(<button key={i} className='ButPageNoSel' onClick={() => PageNew(Math.floor(i / 50) + 1)}>{Math.floor(i / 50) + 1}</button>);
            }
        }
        if (usersCount>usersPage*50){
            buttons.push(<button  className='ButPageNoSel' onClick={() => PageNew(usersPage+1)}><FaAngleRight/></button>);
        }
        console.log(usersPage);
        return buttons;
    };
    
    const PageNew = (num)=>{
        setUsersPage(num);
        let data;
        data = UserShow(false);
    };
    useEffect (()=>{
        UserShow(false);
        
    },[])

    useEffect (()=>{
        UserShow(false);
        
    },[modalUserInfo, modalUserAdd])
    return(
    <>
    <NavbarCon/> 
    <div className="mainUnit">
        <PageTitle textTitle="учёт пользователей"/>
        <div className='controlBut'>
            <ActionButton text='добавить' Click={()=>setModalUserAdd(true)}/>
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
                        <th colspan="4"><Search ClickBut = {()=>{UserShow(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                        <th colspan="1"><button className='SearchCross' onClick={()=>{UserShow(false)}}><RxCross2/></button></th>
                        </>
                            :
                        <th colspan="5"><Search ClickBut = {()=>{UserShow(true)}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/></th>
                        }
                    </tr>
                    <tr>
                        <th>id</th>
                        <th>ФИО</th>
                        <th>почта</th>
                        <th>роль</th>
                        <th></th>
                    </tr>
                <tbody>
                    {
                        users ? (
                            users.map((user) => {
                                return (
                                    <tr key={user.IdClients}>
                                        <td className='num'>{user.IdClients}</td>
                                        <td>{user ? 
                                        ''+
                                        (user.LastName!==null?user.LastName+' ':'')+
                                        (user.Name!==null?user.Name+' ':'')+
                                        (user.MiddleName!==null?user.MiddleName+' ':'')
                                        : 
                                        'нет данных'}</td>
                                        <td>{user ? user.Mail : 'нет данных'}</td>
                                        {/* <td>{user.good.location ? user.good.location.Name : 'Нет данных'}</td> */}
                                        <td>{user.consultant!==null ? 'консультант' : 'покупатель'}</td>
                                        <td className='event'>
                                            <nav>
                                                <button title="подробнее"  onClick={() => UserInfoFun(user.IdClients)}><FaRegEye/></button>                                                
                                                <button onClick={() => {СhoiceUserDel(user.IdClients)}} ><FaTrashAlt/></button>
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


     { modalUserAdd?
        <Modal active={modalUserAdd} setActive={setModalUserAdd}>
            <UsersAddStr active={modalUserInfo} setActive={setModalUserInfo}/>
        </Modal>
        :
        <></>
    }     
    { modalUserInfo?
        <Modal active={modalUserInfo} setActive={setModalUserInfo}>
            <UsersInfo IdUserInfo={UserInfoId}/> 
        </Modal>
        :
        <></>
    }   
      
    { modalUserDel?
        <Modal active={modalUserDel} setActive={setModalUserDel}>
            {/* <UserInfo IdGoodInfo={UserInfoId}/>  */}
            {
                IdUserDel?
                <div className='modalUserDel'>
                   
                    <div>
                        <p>Вы уверены, что хотите удалить данные человека?</p>
                    </div>
                    <div className='modalUserDelQ'>
                        <ActionButton text='да' Click={()=>UserDelFun(IdUserDel)}/>
                        <FunctionButton text='нет' Click={()=>setModalUserDel(false)}/>
                    </div>
                </div>  
                :
                <div className='modalUserDel'>
                    <div>
                        <p>Данные книги удалены</p>
                    </div>
                    <div>
                        <p  className='modalUserDelTrue'><FaCheckCircle /></p>
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
export default Users