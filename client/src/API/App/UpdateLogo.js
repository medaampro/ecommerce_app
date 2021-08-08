import { useState } from 'react';
import { API_URL } from '../../Helpers/config';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const UpdateLogo = (props) => {

    const { token, user } =  JSON.parse(localStorage.getItem('JWT_INFO'));
    let [formData, setFormData] = useState(new FormData());
    
const submitData = e => {
    e.preventDefault();

    fetch(`${API_URL}/app/updateLogo/${user._id}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if(data.errors){
                toastr.warning(data.errors, "Can't Update Logo", {"positionClass": "toast-bottom-left"});
            }else{
                toastr.success('Logo Updated Successfully', 'Thank You', {"positionClass": "toast-bottom-left"});
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
            <form onSubmit= { e => submitData(e) } style={{padding: '40px auto' }} >
                <div>
                    <input id="file-upload" onChange={ e => formData.set('logo', e.target.files[0])  } type="file" className='photo-upload' required/>
                </div>
                <div>
                    <button className="btn" type="submit" >Update Logo</button>
                </div>
            </form>
        </>
    )
}

export default UpdateLogo;