import AcceptingBooks from "./pages/AcceptingBooks"
import { AcceptingBooks_Route } from "./utils/consts"
import Home from "./pages/Home"
import { Home_Route } from "./utils/consts"
import Analytics from "./pagesConsultant/Analytics"
import Books from "./pagesConsultant/accounting/Books"
import { Analytics_Route } from "./utils/consts"
export const authRoutes=[
]

export const publicRoutes=[
    {
        path:Home_Route,
        Component: Home
    },   

    {
        path:"/Analytics",
        Component: Analytics
    },
     {
        path:"/AcceptingBooks",
        Component: AcceptingBooks
    },

    {
        path:"/Books",
        Component: Books
    }
]