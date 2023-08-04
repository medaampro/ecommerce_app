import { API_URL } from '../../Helpers/config';

export const getCategories = () => (
    fetch(`${API_URL}/category`)
        .then(res => res.json())
        .then(data => data)
        .catch(error => console.error(error))
)