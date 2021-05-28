import { useState } from 'react';
import { API_URL } from '../../Helpers/config';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const PostCategory = (props) => {

    const [Category, setCategory] = useState({});
    const submitData = (e) => {
        e.preventDefault();
        const { token, user } =  JSON.parse(localStorage.getItem('JWT_INFO'));

        fetch(`${API_URL}/category/add/${user._id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(Category) 
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
                toastr.success('Category Posted Successfully', 'Thank You !', {"positionClass": "toast-bottom-left"});
                setCategory({});
                props.history.push('/');
            }
        })
        .catch((error) => {
                toastr.error(error, 'Server Error', {"positionClass": "toast-bottom-left"})
        });


    }

    return (
        <>
            <form onSubmit= { e => submitData(e) } style={{padding: '40px auto' }} >
                <div>
                    <input onChange = { e => setCategory({name: e.target.value}) } type="text" placeholder="Name" required />
                </div>
                <div>
                    <button className="btn" type="submit" >Add Category</button>
                </div>
            </form>
        </>
    )
}

export default PostCategory;
