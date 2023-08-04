import { useState } from 'react';
import ShowImage from '../Helpers/ShowImage';
import { useSelector, useDispatch } from 'react-redux';
import { Incremment, Decremment, deleteFromCart } from '../Actions/actions';
import Checkout from '../Helpers/Checkout';

const Cart = () => {
    
    const ProdutsInCart = useSelector(state => state.cart.products);
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(1);
    const amount = ProdutsInCart.reduce( (S, x) => (S = S + x.count * x.price), 0 );

    return (
        <>
            <div className="cart" >
                <div className="cart-infos">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            { ProdutsInCart.map( x => {

                                return(
                                <tr key = { x._id } >
                                    <td className="img-item" ><ShowImage url= {`product/${x._id}/photo`} photoNum={1} /></td>
                                    <td>{x.name}</td>
                                    <td>
                                        <div className="show-quantity">
                                            <button className="Del" onClick={ () => { dispatch(Decremment(x, x.count, setCounter)) } }  ><span>--</span></button>
                                            <input type="number" value={ x.count } readOnly />
                                            <button className="Add" onClick={ () => { dispatch(Incremment(x, x.count, setCounter)) } } >+</button>
                                        </div>
                                    </td>
                                    <td>${x.price}</td>
                                    <td>${x.count * x.price}</td>
                                    <td><span onClick= { () => dispatch(deleteFromCart(x._id)) } className="icon-trash" /></td>
                                </tr>
                                )

                            })}
                        </tbody>
                    </table>
                    <h3>Totale: ${amount}</h3>
                </div>
                <div className="client-infos">
                    { amount > 0 && <Checkout amount={amount} ProdutsInCart={ProdutsInCart} /> }
                </div>
            </div>
        </>
    )
}

export default Cart;