import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import AcceptingBooks from './pages/AcceptingBooks';
import Analytics from './pagesConsultant/Analytics';
import './index.css';
import NavbarCon from './components/navbarConsultant/NavbarCon';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter';
import { useContext, useEffect } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { check } from './http/userApi';
// import { truncate } from '../../server/db';

const App = observer(() => {
  const {user} = useContext(Context)
  // const [loading, setLoading] = useContext(true)
  if (localStorage.getItem('token')&&localStorage.getItem('token')!="undefined")
  {    
    console.log(localStorage.getItem('token'))
    user.setUser(true)
    user.setIsAuth(true)
  }
    else{
      user.setUser(false)
      user.setIsAuth(false)
    }

  return (
    
    <>
    <div class="bg"></div>
    <div className='mainCon'>
      <BrowserRouter>
        {/* <Navbar /> */}
        <NavbarCon/>
        <AppRouter/>
      </BrowserRouter>
      {/* <NavbarCon/> */}
      {/* <AcceptingBooks/> */}
      {/* <Analytics/> */}


    </div>
    </>
  );
})

export default App;