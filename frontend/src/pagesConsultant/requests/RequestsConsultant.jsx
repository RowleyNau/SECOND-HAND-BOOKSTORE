import "../Pages.css"
import './RequestsConsultant.css'
import React from "react"; 
import NavbarCon from "../../components/navbarConsultant/NavbarCon.jsx";
import {observer} from "mobx-react-lite"; 
import { useEffect, useState } from 'react';
import '../Pages.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import RequestConsultation from "./RequestConsultation.jsx";
import RequestSelection from "./RequestSelection.jsx";
import {FaRegEye ,FaTrashAlt, FaAngleLeft, FaAngleRight, FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import RequestReception from "./RequestReception.jsx";
const RequestsConsultant = observer(() => {
      
    function updateInnerDivHeight() {
        var element = document.getElementById('myDiv');
        var rect = element.getBoundingClientRect();
        var yPosition = rect.top;
        var newHeight = window.innerHeight - yPosition-80;
        // element.style.height = newHeight + 'px';
        setMyPosition(newHeight);
    }
    useEffect (()=>{
        updateInnerDivHeight();

        
    },[])
    const [activeTab, setActiveTab] = useState(0);
    const [MyPosition, setMyPosition] = useState();

    const tabs = [
      { title: 'консультация', content: <RequestConsultation heightCon={MyPosition} setheightCon={setMyPosition}/> },
      { title: 'подбор', content: <RequestSelection heightCon={MyPosition} setheightCon={setMyPosition}/> },
      { title: 'прием', content: <RequestReception heightCon={MyPosition} setheightCon={setMyPosition}/>  },
    ];
  
    return (
      <>
      <NavbarCon/> 
      <div className="mainUnit">
      <PageTitle textTitle="запросы"/>
      <div className="Tabs">
        <div className="TabList">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`Tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </div>
          ))}
        <div className="TabListHelp">
            
        </div>
        </div>
        <div className="TabContentContainer" id="myDiv">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`TabContent ${activeTab === index ? 'active' : ''}`}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
      </div>
      </>  
    );
  });
export default RequestsConsultant