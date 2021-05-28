import { API_URL } from '../../Helpers/config';


export const getProduct = (id) => {
    
    return(
        fetch(`${API_URL}/product/${id}`)
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.error(error))
    )
}
