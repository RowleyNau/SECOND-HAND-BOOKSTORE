import '../../Pages.css';
import './ModalWinBook.css'
import { useState } from 'react';
import ActionButton from '../../../components/allButtons/actionButton/ActionButton';
import FunctionButton from '../../../components/allButtons/functionButton/FunctionButton';
import InputStrMini from '../../../components/allInput/InputStrMini';
import InputNum from '../../../components/allInput/InputNum';
import React, { Component } from "react";     
import InputSelect from '../../../components/allInput/InputSelect';
import InputSelectMultiple from '../../../components/allInput/InputSelectMultiple';
import InputPhoto from '../../../components/allInput/InputPhoto';
import InputStr from '../../../components/allInput/InputStr';
const BooksAdd = (props) => {
    const { idBook, id, ...inputProps } = props;

    // const [modalBookInfo, setModalBookInfo]=useState(false);
    const [modalBookAdd, setModalBookAdd]=useState(false);
    // const [modalFilter, setmodalFilter]=useState(false);
    // const [modalDel, setmodalDel]=useState(false);

    const [Name, setName]=useState('');
    const [Author, setAuthor]=useState('');
    const [Publishers, setPublishers]=useState('');
    const [Condition, setCondition]=useState('');
    const [Price, setPrice]=useState('');
    const [Cities, setCities]=useState('Иркутск');
    const [OZONE, setOZONE]=useState('');
    const [VK, setVK]=useState('');
    const [Instagram, setInstagram]=useState('');
    const [Amount, setAmount]=useState('');
    const [ReceiptDate, setReceiptDate]=useState('');
    const [Location, setLocation]=useState('');
    const [Availability, setAvailability]=useState('');

    const [Features, setFeatures]=useState('');
    const [AgeRestriction, setAgeRestriction]=useState('');
    const [Notes, setNotes]=useState('');
    const [ISBN, setISBN]=useState('');
    const [BindingType, setBindingType]=useState('');
    const [Description, setDescription]=useState('');
    const [Photo, setPhoto]=useState([])
    const [Category, setCategory]=useState([]);
    const [Genre, setGenre]=useState([]);
    const [YearPublishing, setYearPublishing]=useState([]);
    const [Parametr1, setParametr1]=useState();
    const [Parametr2, setParametr2]=useState();
    const [Parametr3, setParametr3]=useState();
    const [Weight, setWeight]=useState();
    const [Quality, setQuality]=useState();
    

    const books = 
        {
            id: 0,
            name: 'Немой свидетель',
            author: ['Агата Кристи'],
            publishers: 'Эксмо',
            location: 'основной магазин',
            condition: 'в наличии',
            price: 300,
            cities: 'Иркутск',
            OZONE:'',
            VK:'',
            instagram:'',
            midstates:'что это!?',
            weight:'',
            amount:',',
            receiptDate:'',
            features:'',
            ageRestriction:'',
            notes:'',
            ISBN:'',
            bindingType:'', 
            description:'',
            photo:[],
            category:[], 
            genre:[],

        }
    function createDictionary(array) {
        return array.map((item, index) => ({
            value: (index + 1).toString(),
            label: item
        }));
        }
    const [selectedValue, setSelectedValue] = useState({value: '1', label: 'Cумма'});
    const selDimension = [
        { value: '1', label: 'Cумма' },
        { value: '2', label: 'Количество' }
      ];
    const selBindingType = createDictionary(['твердый переплет', 'мягкий переплет', 'супер обложка']);    
    const selAuthor = [
        { value: '1', label: 'Твердый переплет' },
        { value: '2', label: 'Мягкий переплет' },
        { value: '3', label: 'Супер обложка' }
      ]; 
    const selPublishers = [
        { value: '1', label: 'Твердый переплет' },
        { value: '2', label: 'Мягкий переплет' },
        { value: '3', label: 'Супер обложка' }
    ];
    const selCategory = [
        { value: '1', label: 'Какая-то категория' },
        { value: '2', label: 'Мягкий переплет' },
        { value: '3', label: 'Супер обложка' }
      ];   
    const selGenre = [
        { value: '1', label: 'Твердый переплет' },
        { value: '2', label: 'Мягкий переплет' },
        { value: '3', label: 'Супер обложка' }
      ];
    const selAgeRestriction = createDictionary(['+18', '+16', '+12', '+0']);  
    const selCondition = createDictionary(['идеальное', 'с изъянами']);  
    const selLocation = createDictionary(['магазин', 'склад']); 
    const selAvailability = createDictionary(['в наличии', 'выкуплен', 'забронирован']); 
    const selCities = createDictionary(['Иркутск', 'Ангарск', 'Улан-Удэ']); 
    return(
    <>
    <div className="Main">
        <div className="BasicData">       
            
            <label>
                <p>название:</p>
                <InputStrMini type="text" className = "inpName" value={Name} onClick={e =>  setName(e.target.value)} setCompanyName = {setName}/>
            </label>
            <label>
                <p>автор:</p> 
                <div>
                    <InputSelect className="selects" val={selAuthor}
                        selectedValue= {Author} setSelectedValue={setAuthor}/>
                    <FunctionButton text='добавить новый'/>
                </div>
            </label>
            <label>
                <p>категория:</p> 
                <div>
                    <InputSelectMultiple className="selects" val={selCategory}
                        selectedValue= {Category} setSelectedValue={setCategory}/>
                    <FunctionButton text='добавить новый'/>
                </div>
            </label>

            <label>
                <p>жанр:</p> 
                <div>
                    <InputSelectMultiple className="selects" val={selGenre}
                        selectedValue= {Genre} setSelectedValue={setGenre}/>
                    <FunctionButton text='добавить новый'/>
                </div>
            </label>
            <label>
                <p>издательство:</p> 
                <div>
                    <InputSelect className="selects" val={selPublishers}
                        selectedValue= {Publishers} setSelectedValue={setPublishers}/>
                    <FunctionButton text='добавить новый'/>
                </div>
            </label>
            
            <label>
                <p>год издания:</p>
                <InputNum val={YearPublishing} setVal={setYearPublishing} min='0'/>
            </label>
            <label>
                <p>тип переплета:</p>
                <InputSelect className="selects" val={selBindingType}
                selectedValue= {BindingType} setSelectedValue={setBindingType}/>
            </label>
            <label>
                <p>ISBN:</p> 
                <InputStrMini type="number" className = "inpName" pattern="/[^\d]/g, ''" value={ISBN} onClick={e =>  setISBN(e.target.value)} setCompanyName = {setISBN}/>
            </label>
            <label>
                <p>фото:</p> 
                <InputPhoto val = {Photo} setVal = {setPhoto}/>
            </label>
            <label>
                <p>описание:</p> 
                <InputStr val = {Description} setVal = {setDescription}/>
            </label>
            <label>
                <p>возрастные ограничения:</p>
                <InputSelect className="selects" val={selAgeRestriction}
                selectedValue= {AgeRestriction} setSelectedValue={setAgeRestriction}/>
            </label>
        </div>
        <div className="BasicData Parameters">
            <label>
                <p>размер в мм.:</p> 
                <div className="Dimensions">
                    <div>
                        <p>высота:</p>
                        <InputNum val={Parametr1} setVal={setParametr1} min='0'/>
                    </div>
                    <div>
                        <p>ширина:</p>
                        <InputNum val={Parametr2} setVal={setParametr2} min='0'/>
                    </div>
                    <div>
                        <p>глубина:</p>
                        <InputNum val={Parametr3} setVal={setParametr3} min='0'/>
                    </div> 
                </div>
            </label>
            <label>
                <p>вес в г.:</p>
                <InputNum val={Weight} setVal={setWeight} min='0'/>
            </label>
            <label>
                <p>качество:</p>
                <InputSelect className="selects" val={selCondition}
                selectedValue= {Condition} setSelectedValue={setCondition}/>
            </label>
        </div>
        <div className="BasicData Parameters">
            <label>
                <p>положение:</p> 
                <InputSelect className="selects" val={selLocation} selectedValue= {Location} setSelectedValue={setLocation}/>
            </label>
            <label> 
                <p>наличие:</p> 
                <InputSelect className="selects" val={selAvailability}
                selectedValue= {Availability} setSelectedValue={setAvailability}/>
            </label>
            <label>
                <p>город:</p> 
                <InputSelect className="selects" val={selCities}
                selectedValue= {Cities} setSelectedValue={setCities}/>
            </label>
        </div>
        <div className="BasicData">
            <label>
                <p>OZONE:</p> 
                <InputStrMini type="text" className = "inpName" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={OZONE} onClick={e =>  setName(e.target.value)} setCompanyName = {setOZONE}/>
            </label>
            <label> 
                <p>VK:</p> 
                <InputStrMini type="text" className = "inpName" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={VK} onClick={e =>  setName(e.target.value)} setCompanyName = {setVK}/>
            </label>
            <label> 
                <p>instagram:</p> 
                <InputStrMini type="text" className = "inpName" pattern="[А-Яа-я]*?\s[А-Яа-я]*?\s[А-Яа-я]*" value={Instagram} onClick={e =>  setName(e.target.value)} setCompanyName = {setInstagram}/>
            </label>
        </div>
        <div className="итоговые">
            <label><p>связанные книги:</p>  </label>
            <label>цена: </label>
            <label>владелец: </label>
            <label>количество: </label>
            <label>дата поступления: </label>
            <label>заметки: </label>
        </div>
        
        
        <div className='controlBut'>
            <ActionButton text='добавить' Click={()=>setModalBookAdd(true)}/>
            {/* <FunctionButton text='фильтр'/> */}
        </div>


    </div>

    </>
    )
}
export default BooksAdd