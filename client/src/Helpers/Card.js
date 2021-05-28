import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
 
const Card = ({id, name}) => (
        <div>
            <ShowImage url= {`product/photo`} productId= {id} />
            <h3>{ name }</h3>
            <Link to={`product/${id}`}> <button className="btn">View Product</button> </Link> 
        </div>
)

export default Card;
