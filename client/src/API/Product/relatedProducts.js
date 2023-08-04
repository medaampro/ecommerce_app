import { API_URL } from '../../Helpers/config';
import queryString from 'query-string';


export const relatedProducts = (id, params) => {

    let query =  queryString.stringify(params);

    return(
        fetch(`${API_URL}/product/related/${id}?${query}`)
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.error(error))
    )

}

export default relatedProducts;