import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const [isPasswordCorrect, setisPasswordCorrect] =useState(true);
    const checkPassword = () => {
        return password === "hunter7";
    }
    const onAny = () => {
        setisPasswordCorrect(checkPassword());
    }
    const onResults = () => {
        if(checkPassword())
            history.push('/results')
    }
    const onQuestions = () => {
        if(checkPassword())
            history.push('/editQquestions')
    }
    
    return ( 
        <div className="create">
            <h1>Teacher System</h1>
                <label htmlFor = "pass" >Enter password:</label>

                <input
                 id = "pass"
                 required
                 className={ isPasswordCorrect ? "" : "wrongPassword"}
                 type = { 
                    showPassword ? "text" : "password"
                 }
                 value ={ password }
                 onChange={ (e) => {
                    setisPasswordCorrect(true);
                    setPassword(e.target.value);
                 }}
                 />
                <label htmlFor="check">Show Password</label>
                <input 
                    id = "check"
                    type= "checkbox"
                    value = {showPassword}
                    onChange={() =>
                        setShowPassword((prev) => !prev)
                     }/>
                <div>
                    <div>
                        <button className="pull-left" onClick={()=>{onAny();onResults()}}>Results</button>
                    </div>
                    <div>
                        <button className="pull-right" onClick={()=>{onAny();onQuestions()}}>Edit Questions</button>  
                    </div>    
                </div>
                <div className="clear">
                    {!isPasswordCorrect && <span>Password is wrong!</span>}
                </div>
        </div>
     );
}
 
export default Create;  
