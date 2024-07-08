import { useHistory } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from './App';

const ThankyouPage = () => {

    const { user, setUser } = useContext(UserContext);    
    const history = useHistory();
    const backToHomepage = () =>{
        let path = `/`;
        history.push(path);
    }
    useEffect(() => {    
        setUser(null);
    }, []);
    return (  
        <div className="thankyou container">
            <h1>Thank you for your time.</h1>
            <button onClick = { backToHomepage }>Back to Homepage</button>
        </div>
    );
}
 
export default ThankyouPage;