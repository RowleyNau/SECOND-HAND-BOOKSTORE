import './Connection.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const AddedConnection = (props) => {
    const {val, setVal, text, id, min,max, ...inputProps } = props;
    var onChange = (event) => {
        setVal(event.target.value);
    }
    const books = [
        {
            id: 0,
            name: 'Немой свидетель',
            author: 'Агата Кристи',
            location: 'основной магазин',
            condition: 'в наличии',
            price: 300,
        },
        {
            id: 1,
            name: 'Океан в конце дороги',
            author: 'Нил Гейман',
            location: 'выкуплен',
            condition: 'выкуплен',
            price: 200,
        },
        {
            id: 2,
            name: 'Вы найдете это в библиотеке',
            author: 'Митико Аояма',
            location: 'склан на ***',
            condition: 'забронирован',
            price: 300,
        }
    ]
    return(
    <>
    <table>
        <tr className='SearchTable'>
            <th colspan="7"><Search/></th>
        </tr>
        <tbody>
                    {
                        books.map((book) => {
                            return(
                                <tr>
                                    <td className='num'>{sum(1, book.id)}</td>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.location}</td>
                                    <td>{book.condition}</td>
                                    <td  className='num'>{book.price} руб.</td>
                                    <td className='event'>
                                    <nav>
                                    <button title="подробнее"><FaRegEye/></button>
                                    <button><FaTrashAlt/></button>
                                    </nav>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
    </table>
    </>
    )
}
export default AddedConnection