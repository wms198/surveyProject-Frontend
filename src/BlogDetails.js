import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import AddidPage from "./AddidPage";
import { useContext, useEffect } from 'react';
import { UserContext, QuizContext } from './App';


const BlogDetails = () => {
    const startTimer = Date.now();

    const { user, setUser } = useContext(UserContext);
    const { quiz } = useContext(QuizContext);
    const { id } = useParams();
    //const { data :blog, isPending, error } = useFetch("http://localhost:8000/questions/" + id);
    //const { data :question, isPending, error } = useFetch("http://localhost:8080/api/v1/questions/" + id)
    const history = useHistory();


    console.log("quiz :", quiz);
    useEffect(() => {
        if(quiz.lenght === parseInt(id)){
            history.push('/thankyou');
        }
    }, []);
    if(quiz.lenght === parseInt(id))
        return
    const question = quiz[id - 1];
    const nextClick = (option) => {
        const endTimer = Date.now();
        fetch("http://localhost:8000/answers", {
            method: 'POST',
            body: JSON.stringify({
                "user": user,
                //"question": question.id,
                "answer": option,
                "duration": endTimer - startTimer                 
            })
        });
        history.push('/quiz/' + (parseInt(id) + 1));
    }


    return ( 
        <div className="blog-details">
            {/* isPending && <div>Load...</div>}
            { error && <div>{ error }</div>}
            {!isPending && */(
                <article>
                    <div>{ startTimer }</div>
                    <h2>{ question.questionContent }</h2>
                    {question.options.map((option, i) => (
                        <button onClick={()=>nextClick(option.id)} key={i}>{option.value}</button>
                    ))}  
                    <h1>hello</h1>
                    <p>{user}</p>
                </article>
               
            )}
        </div>
     );
}
 
export default BlogDetails;
