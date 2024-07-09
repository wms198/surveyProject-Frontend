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

    const login = (targetPage) => {
        const formData = new FormData();
        formData.append("username", "teacher");
        formData.append("password", password);
        fetch("http://localhost:8080/login", {
            credentials: "include",
            method: "POST",
            body: formData,
        }).then((resp)=>{
            console.log(resp);
            console.log(resp.url);
            const redirectLocation = String(resp.url);
            if(!redirectLocation.endsWith("error"))
                history.push(targetPage)
            else
                setisPasswordCorrect(false);
        }).catch((resp)=>{

            console.log(resp);
        });

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
                        <button className="pull-left" onClick={()=>{login("/results")}}>Results</button>
                    </div>
                    <div>
                        <button className="pull-right" onClick={()=>{login("/editQuestions")}}>Edit Questions</button>  
                    </div>    
                </div>
                <div className="clear">
                    {!isPasswordCorrect && <span>Password is wrong!</span>}
                </div>
        </div>
     );
}
 
export default Create;  
