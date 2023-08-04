import React, { useState, useEffect } from 'react';
import { getCategories } from '../API/Category/getCategories';

const Filters = ({filters, setFilters}) => {

    const [Categories, setCategories] = useState([]);

    useEffect( () => {
        getCategories()
            .then( data => setCategories(data) )
            .catch(err => console.error(err))
    }, [] )


    return (
        <>
            <div className="Filters">
                <div className="first">
                    <h3>Filter By Category :</h3>
                    <div className="by-category">
                        { Categories.map( cat => (
                            <div key={cat._id} >
                                <input type="checkbox" id={cat._id} onClick = { () => {

                                    if(filters.category){                                        
                                        if( !(filters.category.includes(cat._id)) ){
                                            setFilters({...filters, category: [...filters.category, cat._id] });
                                        }else{
                                            if(filters.category.length > 1){
                                                setFilters({...filters, category: filters.category.filter( x => x !== cat._id) });
                                            }else{
                                                delete filters.category;
                                                setFilters({...filters});
                                            }
                                        }
                                    }else{
                                        setFilters({...filters, category: [cat._id]})
                                    }

                                } } />     
                                <label htmlFor={cat._id}>{cat.name}</label>
                            </div>
                        )) }
                    </div>
                </div>
                <div className="second">
                    <h3>Filter By Price :</h3>
                    <div className="by-price">
                        <div>
                            <input type="radio" id="1price" name="price" onClick = { () => setFilters({...filters, price: [0, 99999] })} defaultChecked/>
                            <label htmlFor="1price">Any</label>
                        </div>
                        <div>
                            <input type="radio" id="2price" name="price" onClick = { () => setFilters({...filters, price: [0, 39] })} />
                            <label htmlFor="2price">0$ to 39$</label>
                        </div>
                        <div>
                            <input type="radio" id="3price" name="price" onClick = { () => setFilters({...filters, price: [40, 99] })} />
                            <label htmlFor="3price">39$ to 99$</label>
                        </div>
                        <div>
                            <input type="radio" id="4price" name="price" onClick = { () => setFilters({...filters, price: [100, 99999] })} />
                            <label htmlFor="4price">More</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filters;
