import { Link } from 'react-router-dom';

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem('JWT_INFO')).user;

    return (
        <div className="dashboard">
            <div className="links">
                <h3>{user.role === 1 ? 'ADMIN': 'USER'} LINKS</h3>
                <hr />
                { user.role === 0 && 
                    <>
                        <p><Link to='/cart' className="li-a" >My Cart</Link></p>
                        <p><Link to='/history' className="li-a" >Purchase History</Link></p>
                        <p><Link to='/profile' className="li-a" >My Profile</Link></p>
                    </>
                }
                { user.role === 1 && 
                    <>
                        <p><Link to={`/category/add/${user._id}`} className="li-a" >Create Cateory</Link></p>
                        <p><Link to={`/product/add/${user._id}`} className="li-a" >Create Product</Link></p>
                        <p><Link to={`/order/${user._id}`} className="li-a" >View Orders</Link></p>
                    </>
                }
            </div>
            <div className="pers-infos">
                <h3>PERSONAL INFORMATIONS</h3>
                <hr />
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.role === 1 ? 'Admin': 'User'}</p>
            </div>
        </div>
    )
}

export default Dashboard;
