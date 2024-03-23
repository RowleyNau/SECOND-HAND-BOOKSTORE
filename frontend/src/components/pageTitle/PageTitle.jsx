import './PageTitle.css';
// import {FaMagnifyingGlass } from "react-icons/fa6";

const PageTitle = (props) => {
    const { textTitle, id, ...inputProps } = props;
    return(
    <>
    <div className="formTitle">
            <p>{textTitle}</p>        
    </div>
    </>
    )
}
export default PageTitle