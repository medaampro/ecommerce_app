import { useState, useEffect } from 'react';
import { API_URL } from '../../Helpers/config';
import { getStatus } from '../Order/getStatus';
import { updateStatus } from '../Order/updateStatus';


const GetOrders = () => {
    const [orders, setOrders] = useState([]);
    const [allStatus, setAllStatus] = useState([]);
    const { token, user } = JSON.parse( localStorage.getItem('JWT_INFO') );

    useEffect(() => {
        const { token, user } = JSON.parse( localStorage.getItem('JWT_INFO') );

        getStatus(token, user)
            .then(res => setAllStatus(res))

        fetch(`${API_URL}/order/${user._id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(error => console.error(error))
            
        }, [] )
        
        const setStatus = (order, newStatus) => {    
            updateStatus(token, user, order, newStatus)

        }

    return (
        <div className="orders">
            <table>
                <tbody>
                    <tr>
                        <th>Transaction_id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                    { orders.map( x => (
                        <tr key={x._id} >
                            <td>{x.transaction_id}</td>
                            <td>{x.user.name}</td>
                            <td>{x.user.email}</td>
                            <td>
                                <select>
                                    <option>View</option>
                                    { x.products.map( pro => <option key={pro._id} disabled >{pro.name}</option> ) }
                                </select>
                            </td>
                            <td>${x.amount}</td>
                            <td>{x.address}</td>
                            <td>
                                <select onChange = { e  => setStatus(x, e.target.value) } >
                                    <option>{x.status}</option>
                                    { allStatus.map( (st, i) => {
                                        if(st !== x.status) {
                                            return <option key={i} >{st}</option>
                                        }
                                    }) }
                                </select>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default GetOrders;