import { API_URL } from '../Helpers/config';

const ShowImage = ({url, photoNum}) => <img src={ `${API_URL}/${url}?num=${photoNum}` } alt={'Not Downloaded'} />

export default ShowImage;