import { API_URL } from '../../Helpers/config';

export const getToken = (id, token) => (

    fetch(`${API_URL}/payment/getToken/${id}` , {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.error(error))
)


export const createTransaction = (id, token, amount, paymentMethodNonce) => (

    fetch(`${API_URL}/payment/checkout/${id}` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({amount, paymentMethodNonce}),
        })
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.error(error))
)
