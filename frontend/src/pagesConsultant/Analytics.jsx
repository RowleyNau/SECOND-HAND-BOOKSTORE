import './Pages.css';
import { useEffect, useState } from 'react';
import moment from 'moment'
import NavbarCon from '../components/navbarConsultant/NavbarCon';
// import {FaMagnifyingGlass } from "react-icons/fa6";
import CardProduct from '../components/cardProduct/CardProduct';
import PageTitle from '../components/pageTitle/PageTitle';
import FunctionButton from '../components/allButtons/functionButton/FunctionButton';
import ActionButton from '../components/allButtons/actionButton/ActionButton';
import SettingsButton from '../components/allButtons/settingsButton/SettingsButton';
import InputNum from '../components/allInput/InputNum';
import InputSelect from '../components/allInput/InputSelect';
import InputDate from '../components/allInput/InputDate';

import InputPhoto from '../components/allInput/InputPhoto';
import InputStr from '../components/allInput/InputStr';

import InputCheckbox from '../components/allInput/InputCheckbox';
import InputStrMini from '../components/allInput/InputStrMini';
// import PureComponent from '../components/'
import React, { Component } from "react";
import Chart from "../components/chart/Example";
import { GoodsTimeGet } from '../http/goodsApi';
// import {BooksList} from '../store/BookStore';       
// console.log({BooksList})
const Analytics = () => {

    const selDimension = [
        { value: '1', label: 'Cумма' },
        { value: '2', label: 'Количество' }
      ]
    const selType = [
        { value: '1', label: 'Поступления' },
        { value: '2', label: 'Продажи' }             
      ]

    // var valueDate1="";
    // var valueDate2="";
    const daySettingWeek= () => {
        setvalueDate1(moment().subtract(7, 'days').format('YYYY-MM-DD'));
        setvalueDate2(moment().format('YYYY-MM-DD'));
 
    };
    const daySettingMonth= () => {
        setvalueDate1(moment().subtract(1, 'month').format('YYYY-MM-DD'));
        setvalueDate2(moment().format('YYYY-MM-DD'));
    };
    const daySetting6Month= () => {
        setvalueDate1(moment().subtract(6, 'month').format('YYYY-MM-DD'));
        setvalueDate2(moment().format('YYYY-MM-DD'));
    };
    const daySettingYear= () => {
        setvalueDate1(moment().subtract(1, 'year').format('YYYY-MM-DD'));
        setvalueDate2(moment().format('YYYY-MM-DD'));
    };

    const [chartData, setchartData]=useState()
    const [valueDate1, setvalueDate1]=useState(moment().subtract(6, 'month').format('YYYY-MM-DD'))
    const [ListBooks, setListBooks]=useState()
    const [valueDate2, setvalueDate2]=useState(moment().format('YYYY-MM-DD'))
    const [visual, setvisual]=useState(false)
    const [selectedValue, setSelectedValue] = useState({value: '1', label: 'Cумма'});
    const [selectedValue2, setSelectedValue2] = useState({value: '1', label: 'Поступления'});

    

    const calculateMonthlySummary = (books) => {
        // const filteredData = books.map((book) => ({
        //   ...book,
        //   ReceiptDate: new Date(book.ReceiptDate),
        // }));

        // const filteredData = formattedData.filter((book) => {
        //     return book.ReceiptDate >= startDate && book.ReceiptDate <= endDate;
        //   });
        const groupedData = books.reduce((acc, book) => {
            const date = new Date(book.ReceiptDate);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
            if (!acc[monthYear]) {
              acc[monthYear] = { totalAmount: 0, totalPrice: 0, books: [] };
            }
            acc[monthYear].books.push(book);
            acc[monthYear].totalAmount += 1;
            acc[monthYear].totalPrice += book.Price;
            return acc;
          }, {});
          
          const result = Object.keys(groupedData).map((monthYear) => ({
            monthYear,
            totalAmount: groupedData[monthYear].totalAmount,
            totalPrice: groupedData[monthYear].totalPrice,
            // books: groupedData[monthYear].books,
          }));
          
        return result;
        }
     
      
      const createChartData = (monthlySummary) => {
        if (selectedValue["label"]=="Количество"){
            const chartData = monthlySummary.map((month) => ({
                    name: month.monthYear,
                    // "Сумма": month.totalPrice,
                    "Количество": month.totalAmount,
                    amt: month.totalAmount, // Вы можете изменить это поле в соответствии с вашими потребностями
                    }));
                
                    return chartData;
      }
        else{
            const chartData2 = monthlySummary.map((month) => ({
                name: month.monthYear,
                "Сумма": month.totalPrice,
                // "Количество": month.totalAmount,
                amt: month.totalAmount, // Вы можете изменить это поле в соответствии с вашими потребностями
                }));
            
                return chartData2;
        }
        
      };
      
      const [BooksList, setBooksList]=useState('');

      const VisualChart = async() => {
        var data = await GoodsTimeGet(valueDate1, valueDate2);
        console.log(data)
        setBooksList(data.all)
        console.log(visual, valueDate1)
   
        // const startDate = new Date(valueDate1);
        // const endDate = new Date(valueDate2);
    
    }


    useEffect (()=>{
        if(BooksList!=''){
               var res=calculateMonthlySummary(BooksList)
        var res2 = createChartData(res)
        console.log(res2)     
        setchartData(res2);
        console.log(selectedValue["label"])
        setvisual(true) 
        }
        
    },[BooksList])
    
    return(
    <>
    <NavbarCon/> 
    <div className="mainUnit">
        <PageTitle textTitle="аналитика"/>
        <p className="titleText">Фильтр</p> 
        <div className="filterContent">                
            <div className="element">
                <label>
                    от:  
                    <InputDate val={valueDate1} setVal = {setvalueDate1} max = {moment().format('YYYY-MM-DD')} selectedValue= {valueDate1} setSelectedValue={setvalueDate1}/>
                </label>
                <label>
                    до:  
                    <InputDate  val={valueDate2} setVal = {setvalueDate2} max = {moment().format('YYYY-MM-DD')}/>
                </label>
                {/* <p className="basicText">до: </p>
                <InputDate/> */}
            </div>
            <div className="element">
                <SettingsButton text="пол года" 
                    onClick={daySetting6Month}/>
                <SettingsButton text="год" 
                    onClick={daySettingYear}/>
            </div>
            <div className="questionnaireContent">
                    <label>Величина измерения:</label>  
                        <InputSelect className="selects" val={selDimension}
                        selectedValue= {selectedValue} setSelectedValue={setSelectedValue}/>
                
                    <label>Предмет анализа: </label> 
                        <InputSelect className="selects" val={selType} selectedValue= {selectedValue2} setSelectedValue={setSelectedValue2}/>
                <FunctionButton text="вывести" Click={()=>VisualChart()}/>
            </div>
            
        </div>
            <div className="withoutchart">   
        { visual?
            <div className="filterContent ">   
                    <Chart chartData={chartData}/>
            </div>
            :
                <></>    
            
        }</div>
{/*  */}
    </div>
    </>
    )
}
export default Analytics