import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShowImage from '../Helpers/ShowImage';
import { getProduct } from '../API/Product/getProduct';
import { useDispatch } from 'react-redux';
import { AddToCart, Incremment, Decremment } from '../Actions/actions';

const Product = (props) => {

    const dispatch = useDispatch();

    const [product, setProduct] = useState({});
    const [url, setUrl] = useState("product/photo");
    const [counter, setCounter] = useState(1);

    
    useEffect(() => {
        getProduct(props.match.params.productId)
            .then( res => setProduct(res) )
            .catch(err => console.error(err))
    }, [])

    const AddToCartBtn = () => {
        if(product.quantity > 0){
            return <Link to={`/cart`}  ><button className="btn" onClick= { () => dispatch(AddToCart(product, counter)) } >ADD TO CART</button> </Link>  
        }else{
            return <Link to={`/product/${props.match.params.productId}`}  ><button className="btn" style={{'backgroundColor': '#f2a49e'}} >Out Of Stock</button> </Link>  
        }
    }

    return (
        <>
            <div className="product-card">

                <div className="show-image">
                    <ShowImage url= {url} productId= { props.match.params.productId } />
                </div>
                <div className="hideen-images">
                    <div>
                        <input type="radio" name="price" onClick= { () => { setUrl("product/photo") } } defaultChecked/>
                    </div>
                    <div>
                        <input type="radio" name="price" onClick= { () => { setUrl("product/photo/1") } } />
                    </div>
                    <div>
                        <input type="radio" name="price" onClick= { () => { setUrl("product/photo/2") } } />
                    </div>
                    <div>
                        <input type="radio" name="price" onClick= { () => { setUrl("product/photo/3") } } />
                    </div>
                    <div>
                        <input type="radio" name="price" onClick= { () => { setUrl("product/photo/4") } } />
                    </div>
                </div>
                <div className="show-title">
                    <h1>{product.name}</h1>
                    <p>${product.price}</p>
                </div>
                <div className="show-quantity">
                    <button className="Del" onClick={ () => dispatch(Decremment(product, counter, setCounter)) } ><span>--</span></button>
                    <input type="number" value = { counter } readOnly />
                    <button className="Add" onClick={ () => dispatch(Incremment(product, counter, setCounter)) } >+</button>
                </div>
                <div className="add-cart">
                    { AddToCartBtn() }
                </div>
                <div className="show-info">
                    <p>{product.description}</p>
                </div>

            </div>
        </>
    )
    
}


export default Product;