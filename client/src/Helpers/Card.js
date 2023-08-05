import { Link, BrowserRouter } from 'react-router-dom';
import ShowImage from './ShowImage';
 
const Card = ({id, name}) => (
        <div>
            <ShowImage url= {`product/${id}/photo`} photoNum={1}/>
            <h3>{ name }</h3>

            <BrowserRouter forceRefresh={true}>
                <Link to={`/product/${id}`}>
                    <button className="btn">View Product</button> 
                </Link> 
            </BrowserRouter>
        </div> 
)

export default Card;
