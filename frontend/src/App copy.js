import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import AcceptingBooks from './pages/AcceptingBooks';
import Analytics from './pagesConsultant/Analytics';
import './index.css';
import NavbarCon from './components/navbarConsultant/NavbarCon';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter';


function App() {
  return (
    <BrowserRouter>
    
    <div class="bg"></div>
    <div className='mainCon'>
      {/* <Navbar/> */}
      <AppRouter/>
      {/* <NavbarCon/> */}
      {/* <AcceptingBooks/> */}
      <Analytics/>

    </div>
    </BrowserRouter>
  );
}

export default App;