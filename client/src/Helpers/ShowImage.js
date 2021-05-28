import { API_URL } from '../Helpers/config';

const ShowImage = ({url, productId}) => <img src={ `${API_URL}/${url}/${productId}` } alt={'Not Downloaded'} />

export default ShowImage;