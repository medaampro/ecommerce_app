import { useState, useEffect } from 'react';
import DropIn from "braintree-web-drop-in-react";
import { getToken, createTransaction } from '../API/Payment/payment';
import { postOrder } from '../API/Order/postOrder';
import { emptyCart } from '../Actions/actions';
import { useDispatch } from 'react-redux';
import toastr from 'toastr'
import 'toastr/build/toastr.css'

const Checkout = ({amount, ProdutsInCart}) => {
    
    const {token, user} = JSON.parse(localStorage.getItem('JWT_INFO'));
    const dispatch = useDispatch();

    const [data, setData] = useState({
        paymentToken: null,
        instance: {},
        address: ''
    })

    useEffect(() => {
        getToken(user._id, token)
            .then(res => setData({...data, paymentToken: res}))
            .catch(err => {
                toastr.error( err.message, 'Invalid Token !', {
                    positionClass: "toast-bottom-left"
                })
            })
        }, []);
        
    const buy = () => {
        data.instance.requestPaymentMethod()
            .then( res => {
                toastr.success('Valid Info', 'Thank You !', {
                    positionClass: "toast-bottom-left"
                })
                createTransaction(user._id, token, amount, res.nonce)
                    .then(info => {
                            toastr.success('Successfull Transaction', 'Thank You !', {
                                positionClass: "toast-bottom-left"
                            })
                            let OrdredProducts = [];
                            for(let i=0; i < ProdutsInCart.length; i++ ) {
                                OrdredProducts = [...OrdredProducts, {
                                    product: ProdutsInCart[i]._id, 
                                    name: ProdutsInCart[i].name, 
                                    price: ProdutsInCart[i].price,
                                    count: ProdutsInCart[i].count                                        
                                }]
                            }
                            let order = {
                                transaction_id: info.transaction.id,
                                amount: amount,
                                address: data.address,
                                products: OrdredProducts
                            } 
                            postOrder(user._id, token, order)
                                .then( orderInfo => {
                                    toastr.success(`Order Of ${orderInfo.amount}$ Done Successfully`, `Thank You ${orderInfo.user.name} !`, {
                                        positionClass: "toast-bottom-left"
                                    })
                                    dispatch(emptyCart());
                                })
                                .catch(err => {
                                    toastr.error(err.message, 'Failed Order !',  {
                                        positionClass: "toast-bottom-left"
                                    })
                                })
                        
                    })
                    .catch(err => {
                        toastr.error( err.message, 'Failed Transaction !', {
                            positionClass: "toast-bottom-left"
                        })
                    })
            })
            .catch(err => {
                toastr.error( err.message, 'Invalid Info !', {
                    positionClass: "toast-bottom-left"
                })
            })
    }
/*  }} */

    if(!data.paymentToken) {
        return (
            <div className="DropIn" >
                <h3>Loading...</h3>
            </div>
        );
      } else {
        return (
            <>
                <form>
                        <div>
                            <input type="text" placeholder="Address" onChange= { e => setData({...data, address: e.target.value}) } required />
                        </div>
                </form>
                <div className="DropIn" >
                    <DropIn options={{ authorization: data.paymentToken, paypal: { flow: "vault" } }}  onInstance={(instance) => (data.instance = instance)} />
                    <button className="btn" onClick={ () => buy() } >Checkout</button>
                </div>
            </>

        );
      }
}
     
export default Checkout;
