import { API_URL } from '../../Helpers/config';

export const postOrder = (userId, token, order) => {
    

    return(
        fetch(`${API_URL}/order/add/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(order),
          })
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.error(error))
    )
}