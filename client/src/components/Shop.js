import React, { useState, useEffect } from 'react';
import { filterProducts } from '../API/Product/filterProducts';
import Filters from '../Helpers/Filters';
import Card from '../Helpers/Card';

const Shop = () => {

    const [filters, setFilters] = useState({});
    const sortBy = 'createdAt';
    const limit = 3;
    const orderBy = 'asc';
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filtredProducts, setFiltredProducts] = useState([]);

    useEffect( () => {
        filterProducts({sortBy, limit, orderBy, skip}, filters)
            .then( data => {
                setFiltredProducts(data);
                setSize(data.length);
                setSkip(0);
            } )
            .catch(err => console.error(err))
    }, [filters] )



    const loadbutton = () => {
        return (
            size > 0 && 
            size >= limit &&
            (                
                <div className="loadbutton">
                    <button onClick= { 
                        () => {
                        const toSkip = skip + limit;
                        filterProducts({skip: toSkip, limit}, filters)
                            .then(res => {
                                setFiltredProducts([...filtredProducts , ...res])
                                setSize(res.length)
                                setSkip(toSkip)
                            })
                            .catch(err => console.error(err))
                    }}  
                    className="btn">Load More</button>
                </div>
            )
        )
    }


    return (
        <>
            <div className="shop">

                <Filters filters= { filters } setFilters= { setFilters }  />

                <div className="Products">
                    { filtredProducts.map( (pro, i) => <Card key={i} id={ pro._id } name={ pro.name } /> ) }
                </div>

                { loadbutton() }
                
            </div>
        </>
    )
}

export default Shop;
