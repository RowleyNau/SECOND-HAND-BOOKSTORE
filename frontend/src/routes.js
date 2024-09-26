// import AcceptingBooks from "./pages/AcceptingBooks";
import Home from "./pages/Home";
import Analytics from "./pagesConsultant/Analytics";
import Books from "./pagesConsultant/accounting/Books";
import OtherGoods from "./pagesConsultant/accounting/OtherGoods";
import Characteristics from "./pagesConsultant/accounting/Characteristics.jsx";
import Entrance from "./pagesConsultant/Entrance.jsx";
// import Profile from "./pages/Profile.jsx";
// import SelectionBooks from "./pages/profileSections/SelectionBooks.jsx";
import { Analytics_Route } from "./utils/consts";
import { Home_Route } from "./utils/consts";
import { AcceptingBooks_Route } from "./utils/consts";
import SelectionBooks from "./pages/profileSections/SelectionBooks.jsx";
import AcceptingBooksP from "./pages/profileSections/AcceptingBooks.jsx";
// import Purchase from "./pages/profileSections/Purchase.jsx";
import Purchase from "./pages/profileSections/Purchase.jsx";
import ListPurchase from "./pages/profileSections/ListPurchase.jsx";
import RequestsConsultant from "./pagesConsultant/requests/RequestsConsultant.jsx";
import PurchaseHistory from "./pages/profileSections/PurchaseHistory.jsx";
import PersonalData from "./pages/profileSections/PersonalData.jsx";
import ListSelectionBooks from "./pages/profileSections/ListSelectionBooks.jsx";
import ListAcceptingBooks from "./pages/profileSections/ListAcceptingBooks.jsx";
import PersonalDataCon from "./pagesConsultant/profileSections/PersonalDataCon.jsx";
import Users from "./pagesConsultant/accounting/Users.jsx";
import Sales from "./pagesConsultant/accounting/Sales.jsx";
export const authRoutes=[ 
    {
        path:"/Profile/AcceptingBooks",
        Component: AcceptingBooksP
    },  
    {
        path:"/Profile/PersonalData",
        Component: PersonalData
    }, 
    {
        path:"/Profile/ListSelectionBooks",
        Component: ListSelectionBooks
    }, 
    {
        path:"/Profile/ListAcceptingBooks",
        Component: ListAcceptingBooks
    }, 
    {
        path:"/Profile/PurchaseHistory",
        Component: PurchaseHistory
    }, 
    {
        path:"/Profile/ListPurchase",
        Component: ListPurchase
    },   
    {
        path:"/Profile/SelectionBooks",
        Component: SelectionBooks
    }, 
    {
        path:"/Profile/Purchase",
        Component: Purchase
    },  
    {
        path:"/Profile/PurchaseHistory",
        Component: PurchaseHistory
    },   
    {
        path:"/Analytics",
        Component: Home
    },
    {
        path:"/Books",
        Component: Home
    },
    {
        path:"/OtherGoods",
        Component: Home
    },
    {
        path:"/Characteristics",
        Component: Home
    },  
    {
        path:"/Profile/PurchaseHistory",
        Component: PurchaseHistory
    }, 
]
export const conRoutes=[
    {
        path:"/Profile/AcceptingBooks",
        Component: AcceptingBooksP
    },  

    {
        path:"/Profile/PersonalData",
        Component: PersonalData
    }, 

    {
        path:"/Profile/ListSelectionBooks",
        Component: ListSelectionBooks
    }, 

    {
        path:"/Profile/ListAcceptingBooks",
        Component: ListAcceptingBooks
    }, 

    {
        path:"/Profile/PurchaseHistory",
        Component: PurchaseHistory
    }, 

    {
        path:"/Profile/ListPurchase",
        Component: ListPurchase
    },  

    {
        path:"/Profile/SelectionBooks",
        Component: SelectionBooks
    }, 

    {
        path:"/Profile/Purchase",
        Component: Purchase
    },  

    {
        path:"/Profile/PurchaseHistory",
        Component: PurchaseHistory
    },    

    {
        path:"/control/Analytics",
        Component: Analytics
    },

    {
        path:"/control/Books",
        Component: Books
    },

    {
        path:"/control/Users",
        Component: Users
    },

    {
        path:"/control/OtherGoods",
        Component: OtherGoods
    },

    {
        path:"/control/Characteristics",
        Component: Characteristics
    },

    {
        path:"/control/Sales",
        Component: Sales
    },

    {
        path:"/control/RequestConsultation",
        Component: RequestsConsultant
    },

    {
        path:"/control/Profile/PersonalData",
        Component: PersonalDataCon
    }
]
export const publicRoutes=[
    {
        path:'/Home',
        Component: Home
    }
]
export const restrictionsRoutes=[ 
    {
        path:"/Analytics",
        Component: Entrance
    },

    {
        path:"/Books",
        Component: Entrance
    },

    {
        path:"/OtherGoods",
        Component: Entrance
    },

    {
        path:"/Characteristics",
        Component: Entrance
    }   
]
