import { useHistory } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import { useContext, useEffect } from 'react';
import { UserContext, QuizContext } from './App';
import useFetch from "./useFetch";

const AddidPage = () => {
    const { user, setUser } = useContext(UserContext);
    const { quiz, setQuiz } = useContext(QuizContext);

    const { data :questions, isPending, error } = useFetch("http://localhost:8080/api/v1/questions")
    useEffect(()=>{
        console.log("questions: ", questions, !isPending);
        if(!isPending)
            setQuiz(questions);
    }, [questions]);

    const start = () =>{ 
        let path = `quiz/1`;
        if(user && quiz){
            history.push(path);
        }
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
            <p style={{display: 'none'}}> { JSON.stringify(quiz) } </p>
        </div>
    );
}
export default AddidPage;