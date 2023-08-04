import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute, AdminRoute } from '../src/Helpers/SpecialRoutes';
import Navbar from '../src/Layouts/Navbar';
import Home from '../src/components/Home';
import Shop from '../src/components/Shop';
import Product from '../src/components/Product';
import Cart from '../src/components/Cart';
import Footer from '../src/Layouts/Footer';
import Signup from '../src/API/Auth/Signup';
import Signin from '../src/API/Auth/Signin';
import Dashboard from '../src/components/Dashboard';
import PostProduct from '../src/API/Product/PostProduct';
import PostCategory from '../src/API/Category/PostCategory';
import GetOrders from './API/Order/GetOrders';
import UpdateLogo from './API/App/UpdateLogo';

const Routes = () => (

      <>
            <Router>

                  <Navbar />
                  <Switch>
                        <Route path="/signup" component={ Signup }/>
                        <Route path="/signin" component={ Signin }/>
                        <PrivateRoute path="/dashboard" component={ Dashboard }/>
                        <PrivateRoute path="/" exact component={ Home }/>
                        <PrivateRoute path="/shop" component={ Shop }/>
                        <PrivateRoute path="/product/:productId" exact component={ Product }/>
                        <PrivateRoute path="/cart" component={ Cart }/>
                        <AdminRoute path="/product/add/:userId" component={ PostProduct }/>
                        <AdminRoute path="/category/add/:userId" component={ PostCategory }/>
                        <AdminRoute path="/order/:userId" component={ GetOrders }/>
                        <AdminRoute path="/app/updateLogo/:userId" component={ UpdateLogo }/>
                  </Switch>
                  <Footer />

            </Router>
      </>

)


export default Routes;