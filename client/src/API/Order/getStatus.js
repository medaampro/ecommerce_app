import { API_URL } from '../../Helpers/config';

export const getStatus = (token, user) => (
    fetch(`${API_URL}/order/status/${user._id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.error(error))
)