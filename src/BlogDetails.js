import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import AddidPage from "./AddidPage";
import { useContext, useEffect } from 'react';
import { UserContext, QuizContext } from './App';


const BlogDetails = () => {
    const startTimer = Date.now();

    const { user } = useContext(UserContext);
    const { quiz } = useContext(QuizContext);
    const { id } = useParams();
    const history = useHistory();


    console.log("quiz :", quiz);
    useEffect(() => {
        console.log(quiz.length < parseInt(id), quiz.length, parseInt(id));
        if(quiz.length < parseInt(id)){
            history.push('/thankyou');
        }
    });
    if(quiz.length < parseInt(id))
        return "...";

    const question = quiz[id - 1];
    const nextClick = (option) => {
        const endTimer = Date.now();
        fetch("http://localhost:8080/api/v1/answer", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user": user,
                //"question": question.id,
                "option": option,
                "duration": endTimer - startTimer                 
            })
        });
        history.push('/quiz/' + (parseInt(id) + 1));
    }


    return ( 
        <div className="blog-details ">
            {/* isPending && <div>Load...</div>}
            { error && <div>{ error }</div>}
            {!isPending && */(
                <article>
                    <div className="container">
                        <div>
                            <h1 style={{color: "black"}}>{ question.questionContent }</h1>
                        </div>
                        <div>
                            {question.options.map((option, i) => (
                                <button className="addMarginLeft" onClick={()=>nextClick(option.id)} key={i}>{option.value}</button>
                            ))}  
                        </div>
                    </div>
                </article>
               
            )}
        </div>
     );
}
 
export default BlogDetails;
