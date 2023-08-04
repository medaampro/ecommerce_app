import { useState } from 'react';
import { API_URL } from '../../Helpers/config';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const  Signup = (props) => {

    const [User, setUser] = useState({});
    const handleData = e => setUser({ ...User, [e.target.placeholder.toLowerCase() ]: e.target.value });
    
    const submitData = (e) => {
        e.preventDefault();

        fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(User),
        })
        .then(res => res.json())
        .then(data => {
            if(data.errors){
                toastr.warning(data.errors, 'Please Check form !!!', {"positionClass": "toast-bottom-left"})
            }else{
                toastr.success('Account Created Successfully', 'Welcome', {"positionClass": "toast-bottom-left"})
                props.history.push('/signin');
            }
        })
        .catch((error) => {
                toastr.error(error, 'Server Error', {"positionClass": "toast-bottom-left"})
        });

    }
    
    return(
            <>
                <form onSubmit= { e => submitData(e) } >
                    <div>
                        <input onChange = { e =>  handleData(e)  } type="text" placeholder="Name" required />
                    </div>
                    <div>
                        <input onChange = { e =>  handleData(e)  } type="email" placeholder="Email" required />
                    </div>
                    <div>
                        <input onChange = { e =>  handleData(e)  } type="password" placeholder="Password" required />
                    </div>
                    <div>
                        <button className="btn" >Sign up</button>
                    </div>
                </form>
            </>
    )
}


export default Signup;
