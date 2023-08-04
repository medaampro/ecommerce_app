import { API_URL } from '../../Helpers/config';
import queryString from 'query-string';

export const filterProducts = (params, filters) => {

    let query =  queryString.stringify(params);
    
    return(
        fetch(`${API_URL}/product/filters?${query}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({filters}),
          })
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.error(error))
    )
}