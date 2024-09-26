import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { authRoutes, publicRoutes, conRoutes, restrictionsRoutes } from '../routes';
import { Context } from '../index';
const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user.isAuth && user.isCon)
    return (
        
        <Switch>            
            {user.isAuth && user.isCon && conRoutes.map(({path , Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {user.isAuth && !user.isCon && authRoutes.map(({path , Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {!user.isAuth && !user.isCon && restrictionsRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={'/Home'}/> 
        </Switch>
    );
};
export default AppRouter;