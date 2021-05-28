import { API_URL } from '../../Helpers/config';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export const updateStatus = (token, user, order, newStatus) => (
    fetch(`${API_URL}/order/${order._id}/status/update/${user._id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({status: newStatus}) 
    })
    .then(res => res.json())
    .then(data => {
        toastr.success('Status Updated', 'Thank You !', {"positionClass": "toast-bottom-left"});
    })
    .catch(error => console.error(error))
)