import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../Helpers/isAuthenticated';
import  ShowImage  from '../Helpers/ShowImage';
import { Signout } from '../API/Auth/Signout';

 
const Navbar = () => {

    const [show, setShow] = useState('hide');
    const [showOne, setShowOne] = useState('showOne');
    const [showTwo, setShowTwo] = useState('showTwo');
    const [showThree, setShowThree] = useState('showThree');

    const showInfos = () => {

        if(show === 'hide'){
            setShow('show');
            setShowOne('hideOne');
            setShowTwo('hideTwo');
            setShowThree('hideThree');
        }else{
            setShow('hide');
            setShowOne('showOne');
            setShowTwo('showTwo');
            setShowThree('showThree');
        }

    }


    const countProducts = useSelector(state => state.cart.countProducts);

    return(
        <>
            <nav>
                <div className="thinks">
                    <div onClick= { () => showInfos() }  className="burger">
                        <div className= { showOne } />
                        <div className= { showTwo } />
                        <div className= { showThree } />
                    </div>
                    <div className="logoNav">

                        <Link to="/"> 
                            <ShowImage className="logoImage" url= {`app/readLogo`} />
                        </Link>

                    </div>
                    <div className="cartt">
                        <Link className="li-a"  to="/cart"><span className="icon-shopping-cart" productsnumber={countProducts} /></Link>
                    </div>
                </div>
                <ul className={ show } >
                    <li><Link className="li-a" to="/">Home</Link></li>
                    <li><Link className="li-a" to="/shop">Shop</Link></li>
                    <li><Link className="li-a" to="/">About Us</Link></li>
                    <li><Link className="li-a" to="/">Contact Us</Link></li>
                    { !isAuthenticated() && 
                            <>
                                <li><Link className="li-a" to="/signin">Sign In</Link></li>
                                <li><Link className="li-a" to="/signup">Sign Up</Link></li>
                            </>
                    }
                    { isAuthenticated() && 
                            <>
                                <li><Link className="li-a"  to="/dashboard">Dashboard</Link></li>
                                <li onClick = { () => Signout() } ><Link className="li-a" to="/signin">Sign Out</Link></li>
                            </>
                    }
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
