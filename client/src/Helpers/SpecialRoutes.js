import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './isAuthenticated';

export const PrivateRoute = ({component: Component, ...Rest}) => <Route {...Rest} render= {props => isAuthenticated() ? <Component {...props} /> : <Redirect to={{pathname: "/signin"}} /> } />
export const AdminRoute = ({component: Component, ...Rest}) => <Route {...Rest} render= {props => (isAuthenticated() && isAuthenticated().user.role === 1) ? <Component {...props} /> : <Redirect to={{pathname: "/signin"}} /> } />