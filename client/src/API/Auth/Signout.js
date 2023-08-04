import { API_URL } from '../../Helpers/config';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export const Signout = () => (

        fetch(`${API_URL}/signout`)
          .then(() => {
                toastr.success('Sign Out Successfully', 'Good By', {"positionClass": "toast-bottom-left"});
                localStorage.removeItem('JWT_INFO');
              }
          )
          .catch(error => {
                toastr.error(error, 'Server Error', {"positionClass": "toast-bottom-left"});
          })

)
