import { useState, useEffect } from 'react';
import { API_URL } from '../../Helpers/config';
import { getCategories } from '../Category/getCategories';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const PostProduct = (props) => {
        
    const { token, user } =  JSON.parse(localStorage.getItem('JWT_INFO'));
    const [Categories, setCategories] = useState([]);
    useEffect( () => {
        getCategories()
            .then( data => setCategories(data) )
            .catch(err => console.error(err))
    }, [] )
    
    const [formData , setFormData] = useState(new FormData());
    const submitData = (e) => {
        e.preventDefault();

        fetch(`${API_URL}/product/add/${user._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.errors){
                if(data.errors === "Please Change Name !!" ){
                    toastr.warning("Please Change Name !!", 'Please Check form !!!', {"positionClass": "toast-bottom-left"})
                }else{
                    for(let i in data.errors){
                        toastr.warning(data.errors[i], 'Please Check form !!!', {"positionClass": "toast-bottom-left"})
                    }
                }   
            }else{
                toastr.success('Product Posted Successfully', 'Welcome', {"positionClass": "toast-bottom-left"});
                setFormData(new FormData());
                props.history.push('/');
            }
        })
        .catch((error) => {
                toastr.error(error, 'Server Error', {"positionClass": "toast-bottom-left"})
        });

    }

    return (
        <>
            <form onSubmit= { e => submitData(e) } >
                <div>
                    <input id="file-upload" onChange={ e => formData.set('photo', e.target.files[0])  } type="file" className='photo-upload' />
                </div>
                <div>
                    <input onChange={ e => formData.set('name', e.target.value) } type="text" placeholder="Name" required/>
                </div>
                <div>
                    <select onChange={ e => formData.set('category', e.target.value) } required>
                        <option value="" >Select Category: </option>
                        { Categories.map( x => <option key={x._id} value={x._id} >{x.name}</option> ) }
                    </select>
                </div>
                <div>
                    <input onChange={ e => formData.set('quantity', e.target.value) } min={1} type="number" placeholder="Quantity" required/>
                </div>
                <div>
                    <input onChange={ e => formData.set('price', e.target.value) } min={0} type="number" placeholder="Price" required/>
                </div>
                <div>
                    <input onChange={ e => formData.set('description', e.target.value) } type="text" placeholder="Description" required/>
                </div>
                <div>
                    <select onChange={ e => formData.set('shipping', e.target.value) } required>
                        <option value="" >Select Shipping: </option>
                        <option value={true} >True</option>
                        <option value={false} >False</option>
                    </select>
                </div>
                <div>
                    <button className="btn" type="submit" >Add Product</button>
                </div>
            </form>
        </>
    )
}

export default PostProduct;