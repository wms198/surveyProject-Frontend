import { useHistory } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import { useContext } from 'react';
import { UserContext } from './App';

const AddidPage = () => {
    const { user, setUser } = useContext(UserContext);

    const start = () =>{ 
        let path = `quiz/1`;
        if(user)
            history.push(path);    
    }

    const history = useHistory();
    return( 
        <div className="addidPage">
            <h2>Add your id here</h2>
            <input 
                required
                value={ user || "" }
                onChange = { (e) => setUser(e.target.value)}
            />
            <button onClick={start}>START</button>
            <p>{ user }</p>
        </div>
    );
}
export default AddidPage;