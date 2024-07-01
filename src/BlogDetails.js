import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import AddidPage from "./AddidPage";
import { useContext, useEffect } from 'react';
import { UserContext } from './App';


const BlogDetails = () => {
    const startTimer = Date.now();
    const { user, setUser } = useContext(UserContext);
    const { id } = useParams();
    const { data :blog, isPending, error } = useFetch("http://localhost:8000/questions/" + id);
    const history = useHistory();

    useEffect(() => {
        if(error){
            console.log(error);
            history.push('/thankyou');
        }
    }, [error]);
    
    const nextClick = () => {
        const endTimer = Date.now();
        fetch("http://localhost:8000/answer", {
            method: 'POST',
            body: JSON.stringify({
                "user": user,
                "question": 1,
                "answer": 2,
                "duration": endTimer - startTimer                 
            })
        });
        history.push('/quiz/' + (parseInt(blog.id) + 1));
    }
    
    
    
    return ( 
        <div className="blog-details">
            { isPending && <div>Load...</div>}
            { error && <div>{ error }</div>}
            {blog && (
                <article>
                    <div>{ startTimer }</div>
                    <h2>{ blog.q }</h2>
                    {blog.answers.map((answer, i) => (
                        <button onClick={nextClick} key={i}>{answer.value}</button>
                    ))}  
                    <h1>hello</h1>
                    <p>{user}</p>
                </article>
               
            )}
        </div>
     );
}
 
export default BlogDetails;
