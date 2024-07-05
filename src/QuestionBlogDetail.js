import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const QuestionBlogDetail = () => {
    const { id } = useParams();
    const { data: questionDetail, error, isPending } = useFetch('http://localhost:8080/api/v1/questions/' + id);
    console.log(id);
    
    return ( 
        <div className="questionBlogDetail">
            { isPending && <div>Load...</div>}
            { error && <div>{ error }</div>}
            { questionDetail && (
                <article>
                    <h2>{ questionDetail.questionContent}</h2>
                    { questionDetail.options.map(thisAnswer =>(
                        <div>
                            <span>{ thisAnswer.value }</span>
                            <input type="checkbox" checked={thisAnswer.isCorrect}/>
                        </div>

                    ))}
                </article>
            )}
        </div>

     );
}
 
export default QuestionBlogDetail;