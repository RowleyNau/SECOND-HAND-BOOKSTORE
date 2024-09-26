// import Navbar from './components/navbar/Navbar';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { check } from './http/userApi';
import {Spinner} from "react-bootstrap";
import ClientChat from './components/chat/ClientChat';

const App = observer(() => {
  const {user} = useContext(Context)
  const user1 = {isAuth: true, isCon: true,}
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    check().then(data =>{
      // if(data!==false){
      console.log(data.Con)
      if (data){
        user.setUser(data.user);
        user.setIsAuth(true);
        
        user.setIsCon(data.Con);
      }
console.log(user.isCon)
    }).finally(()=>setLoading(false))
  })

  if (loading) {
    return <Spinner animation={"grow"}/>
}

  return (
    
    <>
    <div class="bg"></div>
    <div className='mainCon'>
      <BrowserRouter>
        {/* {user && user.isCon ?<></> : <ClientChat/>   } */}
        <AppRouter/>
      </BrowserRouter>
    </div>
    </>
  );
})

export default App;





        {/* <Navbar /> */}
        {/* <NavbarCon/> */}
      {/* <NavbarCon/> */}
      {/* <AcceptingBooks/> */}
      {/* <Analytics/> */}