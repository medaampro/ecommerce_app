import { API_URL } from '../Helpers/config';

const ShowImage = ({url, photoNum, className}) => <img className={ className } src={ `${API_URL}/${url}?num=${photoNum}` } alt={'Not Downloaded'} />

export default ShowImage;