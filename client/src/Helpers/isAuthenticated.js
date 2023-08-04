export const isAuthenticated = () => {
    let JWT_INFO = localStorage.getItem("JWT_INFO");
    if(JWT_INFO){
        return JSON.parse(JWT_INFO);
    }else{
        return '';
    }
}