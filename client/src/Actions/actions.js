export const AddToCart = (item, counter) => {

    let items = JSON.parse(localStorage.getItem('cart')) || [];

    let Result = items.filter( x => x._id === item._id );

    if(Result.length === 0){
        items = [...items, {...item, count: counter }];
        localStorage.setItem('cart',  JSON.stringify(items) );
    }
    
    return {
        type: 'ADDITEM',
        payload: items
    }

}

export const Incremment = (item, counter, setCounter) => {

    setCounter(counter + 1);

    let items = JSON.parse(localStorage.getItem('cart')) || [];
    items = items.map( x => (x._id === item._id) ? {...x, count : counter + 1 } : x );
    localStorage.setItem('cart', JSON.stringify(items));
    
    return {
        type: 'INC',
        payload: items
    }

}

export const Decremment = (item, counter, setCounter) => {

    setCounter( counter > 1 ?  counter - 1 : counter );

    let items = JSON.parse(localStorage.getItem('cart')) || [];
    items = items.map( x => ( (x._id === item._id) && x.count > 1 ) ? {...x, count : counter - 1 } : x );
    localStorage.setItem('cart', JSON.stringify(items));
    
    return {
        type: 'DEC',
        payload: items
    }

}

export const deleteFromCart = (itemId) => {

    let items = JSON.parse(localStorage.getItem('cart'));
    items = items.filter( x => x._id !== itemId);
    localStorage.setItem('cart', JSON.stringify(items) );

    return {
        type: 'DELETEITEM',
        payload: items
    }

}

export const emptyCart = () => {

    localStorage.removeItem('cart');

    return {
        type: 'EMPTYCART',
        payload: []
    }

}