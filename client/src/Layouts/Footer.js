import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <>
            <footer>
                <div className="brandInfos">
                    <h1><Link className="li-a" to="/">MedDev</Link></h1>
                    <p className="li-a">meddev@gmail.com</p>
                    <p className="li-a">0650335570</p>
                </div>
                <div className="lists">
                    <ul>
                        <li><Link className="li-a" to="/">About Us</Link></li>
                        <li><Link className="li-a" to="/">Jobs</Link></li>
                        <li><Link className="li-a" to="/">Press</Link></li>
                        <li><Link className="li-a" to="/">Blog</Link></li>
                    </ul>
                </div>
                <div className="lists">
                    <ul>
                        <li><Link className="li-a" to="/">Contact Us</Link></li>
                        <li><Link className="li-a" to="/">Terms</Link></li>
                        <li><Link className="li-a" to="/">Privacy</Link></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footer;
