import "../Pages.css"
import './RequestsConsultant.css'
import React from "react"; 
import NavbarCon from "../../components/navbarConsultant/NavbarCon.jsx";
import {observer} from "mobx-react-lite"; 
import { useEffect, useState } from 'react';
import '../Pages.css';
import Search from "../../components/searchInput2/Search.jsx";
import { RxCross2 } from "react-icons/rx";
import { GoPaperAirplane, GoPaperclip  } from "react-icons/go";
import { PiLightningLight } from "react-icons/pi";
import ActionButton from "../../components/allButtons/actionButton/ActionButton.jsx";

const RequestConsultation = observer((props) => {
    const { heightCon, setheightCon,...inputProps } = props;
    // console.log(heightCon)
    function updateInnerDivHeight() {
        var element = document.getElementById('myDiv1');
        element.style.height = heightCon + 'px';
        // console.log(element.style.height)
    }
    function myFun() {
        // var element = document.getElementById('myDiv');
        // var rect = element.getBoundingClientRect();
        // var yPosition = rect.top;
        // var newHeight = window.innerHeight - yPosition-80;
        // element.style.height = newHeight + 'px';
    }
    useEffect (()=>{
        updateInnerDivHeight();
        
    },[heightCon])

    const [SearchInput, setSearchInput]=useState('');
    const [ShowMes, setShowMes]=useState(false);
  
    return (
      <>
       {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}
      <div className="ConsultationWindow" id="myDiv1">
        <div>
            <Search ClickBut = {()=>{myFun()}} value={SearchInput} onClick={e =>  setSearchInput(e.target.value)} setValue = {setSearchInput}/>
            <div className="ConsultationWindowClientChoice">
            <div onClick={()=>setShowMes(true)} className="ConsultationWindowDialog">
                <p>Елена</p>
                <div></div>
            </div>
            </div>
        </div>         
        <div className="ConsultationWindowDialogue">
            {
                ShowMes?
                <>
            <p>Елена</p>
            <div className="message">
                <div className="to-user">
                    <p>Здравствуйте! Подскажите, какие книги могут понравится моему другу?</p>
                </div>
                <div className="from-user">
                    <p>Здравствуйте! Вы можете подать оставить заявку на подбор книг<br/>и мы подберем то, что должно понравится Вашему другу!</p>
                </div>
                
                
            </div>
            <div className="ConsultationWindowInputMessage">
                <button><PiLightningLight/></button>
                <input placeholder="Введите сообщение..." type="text"></input>
                <button><GoPaperclip/></button>
                <button><GoPaperAirplane/></button>
            </div>
                </>
                :
                <></>
            }
        </div>       
        <div className="ConsultationWindowInfo">
            {ShowMes?
            <>
            <ActionButton text='запросы на подбор'/>
            <ActionButton text='запросы на прием'/>
            <ActionButton text='покупки'/>
            </>
            :<></>}

        </div>
      </div>
      </>  
    );
  });
export default RequestConsultation