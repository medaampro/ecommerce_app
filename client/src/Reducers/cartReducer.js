let items = JSON.parse(localStorage.getItem('cart')) || [];

let myState = {
    products: items,
    countProducts: items.reduce( (total, product) => (total = total + product.count) , 0 )
}

const cartReducer = (state = myState, action) => {

    switch(action.type) {

        case 'ADDITEM': {
            return {...state, products: action.payload, countProducts: action.payload.reduce( (S, p) => (S = S + p.count) , 0 )};
        }
        case 'INC': {
            return {...state, products: action.payload, countProducts: action.payload.reduce( (S, p) => (S = S + p.count) , 0 )};
        }
        case 'DEC': {
            return {...state, products: action.payload, countProducts: action.payload.reduce( (S, p) => (S = S + p.count) , 0 )};
        }
        case 'DELETEITEM': {
            return {...state, products: action.payload, countProducts: action.payload.reduce( (S, p) => (S = S + p.count) , 0 )};
        }
        case 'EMPTYCART': {
            return {...state, products: action.payload, countProducts: action.payload.reduce( (S, p) => (S = S + p.count) , 0 )};
        }
        default: {
            return state;
        }
    }
}

export default cartReducer;