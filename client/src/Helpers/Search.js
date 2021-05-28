import { useState, useEffect } from 'react';
import { getCategories } from '../API/Category/getCategories';
import { getProducts } from '../API/Product/getProducts';
import Card from '../Helpers/Card';


const Search = () => {

    const [Categories, setCategories] = useState([]);
    const [show, setShow] = useState('hide');
    const showCategories = () => show === 'hide' ?  setShow('show') : setShow('hide');

    useEffect( () => {
        getCategories()
            .then( data => setCategories(data) )
            .catch(err => console.error(err))
    }, [] )

    let [selectedCategory, setSelectedCategory] = useState('All');
    let [idOfselectedCategory, setIdOfselectedCategory] = useState('');
    let [selectedName, setSelectedName] = useState('');

    let [produtcsByCategoryResult, setProdutcsByCategoryResult] = useState([]);
    let [produtcsByNameResult, setProdutcsByNameResult] = useState([]);


    const produtcsByName = () => {
        setSelectedCategory('All');
        setIdOfselectedCategory('');

        getProducts({name: selectedName})
            .then( data => setProdutcsByNameResult(data) )
            .catch(err => console.error(err))

    };

    const produtcsByCategory = (e) => {
        setSelectedCategory(e.target.innerText);
        setIdOfselectedCategory(e.target.id);

        getProducts({category: e.target.id})
            .then( data => setProdutcsByCategoryResult(data) )
            .catch(err => console.error(err))

    };


    return (
        <>

                <div className="search">
                    <div className="thinkss" >
                        <div className="by-category" >
                            <button onClick={ () => showCategories() } >{selectedCategory} <span className="icon-caret-down" /></button>
                        </div>
                        <div className="by-title">
                            <input onChange= { e => setSelectedName(e.target.value) } type="text" placeholder="Find a Product" />
                            <button onClick = { () => produtcsByName() } ><span className="icon-search" /></button>
                        </div>
                    </div>
                    <ul  className={ show } >
                        <li onClick= { e => produtcsByCategory(e) } id='' className="li-a" >All</li>
                        { Categories.map( cat =>  <li onClick= { e => produtcsByCategory(e) } id={cat._id} key={cat._id} className="li-a" > {cat.name} </li> ) }
                    </ul>
                </div>






            {
                ( (produtcsByNameResult.length >= 1) && (selectedName.length > 0) ) &&
                <>
                    <h2>{produtcsByNameResult.length} Products Founded  :</h2>
                    <div className="Products">
                        { produtcsByNameResult.map( (pro, i) => <Card key={i} id={ pro._id } name={ pro.name } /> ) }
                    </div>
                </>
            }            


            {
                ( (produtcsByCategoryResult.length > 0) && (idOfselectedCategory.length > 0 ) ) &&
                <>
                    <h2>{selectedCategory} :</h2>
                    <div className="Products">
                        { produtcsByCategoryResult.map( (pro, i) => <Card key={i} id={ pro._id } name={ pro.name } /> ) }
                    </div>
                </>
            }            
        </>
    )
}

export default Search;