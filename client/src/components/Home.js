import { useState, useEffect } from 'react';
import Search from '../Helpers/Search';
import Card from '../Helpers/Card';
import { getProducts } from '../API/Product/getProducts';

const Home = () => {

    const [bestSelledProducts, setBestSelledProducts] = useState([]);
    const [arrivallProducts, setArrivallProducts] = useState([]);

    useEffect( () => {
        bestSelled()
        arrivall()
    }, [] )
    
    const bestSelled = () => {        
        getProducts({sortBy: 'sold', order: 'desc', limit: 3})
            .then( data => setBestSelledProducts(data) )
            .catch(err => console.error(err))
    }

    const arrivall = () => {        
        getProducts({sortBy: 'createdAt', order: 'desc', limit: 3})
            .then( data => setArrivallProducts(data) )
            .catch(err => console.error(err))
    }
        
    return(
        <>

            <Search />

            <h2>Best Selled :</h2>
            <div className="Products">
                { bestSelledProducts.map( (pro, i) => <Card key={i} id={ pro._id } name={ pro.name } /> ) }
            </div>
            <h2>Arrivall Products :</h2>
            <div className="Products">
                { arrivallProducts.map( (pro, i) => <Card key={i} id={ pro._id } name={ pro.name } /> ) }
            </div>

        </>
    )
}
    
export default Home;