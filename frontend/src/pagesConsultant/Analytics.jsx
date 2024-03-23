import './Pages.css';
import { useState } from 'react';
import moment from 'moment'
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
import {BooksList} from '../store/BookStore';       
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

    //     // Преобразуем даты в объекты Date для сравнения
    //     // const start = new Date(valueDate1);
    //     // const end = new Date(valueDate2);
      
    //     // Фильтруем BooksList по датам
    // var chartData = [];
    // const filterBooksByDate = () => {
    //     console.log('asdfghjklkjhgf')
    //    let receiptDates
    //    let receiptPrice 
    //     const filteredBooks = BooksList.filter(book => {
    //         const bookDate = new Date(book.ReceiptDate);
    //         setListBooks( bookDate >= valueDate1 && bookDate <= valueDate2);
    //         receiptDates = ListBooks.map(book => book.ReceiptDate);
    //         receiptPrice = ListBooks.map(book => book.Price);
    //     //   chartData.push()
    //         alert(ListBooks)
    //     });
       
    //     for (let i= 0; i++; i<ListBooks.length){
    //         chartData[i].push({name: receiptDates[i],  pv: receiptPrice[i]})
    //     }
          
       
    //     // console.log()
    //     return (chartData)
        
    // }
    const [chartData, setchartData]=useState()
    const [valueDate1, setvalueDate1]=useState(moment().subtract(6, 'month').format('YYYY-MM-DD'))
    const [ListBooks, setListBooks]=useState()
    const [valueDate2, setvalueDate2]=useState(moment().format('YYYY-MM-DD'))
    const [visual, setvisual]=useState(false)
    const [selectedValue, setSelectedValue] = useState({value: '1', label: 'Cумма'});

    

    const calculateMonthlySummary = (books, startDate, endDate) => {
        const formattedData = books.map((book) => ({
          ...book,
          ReceiptDate: new Date(book.ReceiptDate),
        }));

        const filteredData = formattedData.filter((book) => {
            return book.ReceiptDate >= startDate && book.ReceiptDate <= endDate;
          });
      
        const groupedData = filteredData .reduce((acc, book) => {
          const monthYear = `${book.ReceiptDate.getMonth() + 1}-${book.ReceiptDate.getFullYear()}`;
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
        //   books: groupedData[monthYear].books,
        }));
      
        return result;
      };
      
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
      

      const VisualChart = () => {
        setvisual(true)
        console.log(visual, valueDate1)
   
        const startDate = new Date(valueDate1);
        const endDate = new Date(valueDate2);
        var res=calculateMonthlySummary(BooksList, startDate, endDate)
        var res2 = createChartData(res)
        console.log(res2)     
        setchartData(res2);
        console.log(selectedValue["label"])
    }
    return(
    <>
    <div className="mainUnit">
        <PageTitle textTitle="Аналитика"/>
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
                {/* <SettingsButton text="неделя" 
                    onClick={daySettingWeek}
                    
                    />
                <SettingsButton text="месяц" 
                    onClick={daySettingMonth}/> */}
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
                        <InputSelect className="selects" val={selType}/>
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