import { useHistory } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import { useContext, useEffect, useState } from 'react';
import { UserContext, QuizContext } from './App';
import useFetch from "./useFetch";

const AddidPage = () => {
    const { user, setUser } = useContext(UserContext);
    const { quiz, setQuiz } = useContext(QuizContext);
    const [ fetchedUser, setFetchedUser] = useState(null);


    const { data :questions, isPending, error } = useFetch("http://localhost:8080/api/v1/questions")
    useEffect(()=>{
        console.log("questions: ", questions, !isPending);
        if(!isPending)
            setQuiz(questions);
    }, [questions]);

    const start = () =>{ 
        if(user && quiz && !fetchedUser){
            history.push("quiz/1");
        }
    }
    const checkUser = (identifier) => {
        console.log(identifier);
        setUser(identifier);
        fetch("http://localhost:8080/api/v1/user/" + identifier).then((resp)=>{
            if(resp.ok)
                setFetchedUser(resp.clone().json());
            else
                setFetchedUser("");
        }).catch(()=>{
            console.log("error to fetch user");
            setFetchedUser("");
        })
    }

    const history = useHistory();
    return( 
        <div className="addidPage">
            <h2>Enter your name</h2>
            <input 
                required
                class={(!fetchedUser && user) && "okay" || fetchedUser && "notOkay"}
                value={ user || "" }
                onChange = { (e) => checkUser(e.target.value)}
            />
            <button  className="addMarginLeft" onClick={start}>START</button>
            {fetchedUser && <p>Sorry you already took the test, { user }!</p>}
            <p style={{display: 'none'}}> { JSON.stringify(quiz) } </p>
        </div>
    );
}
export default AddidPage;