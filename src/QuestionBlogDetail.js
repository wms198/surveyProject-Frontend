import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import { useState } from "react";

const QuestionBlogDetail = () => {
    const { id } = useParams();
    const { data: questionDetail, error, isPending } = useFetch('http://localhost:8080/api/v1/questions/' + id);

   
    const [addNewoption, setaddNewoption] = useState("");
   
    const history = useHistory();


    const onSubmit = (e)=>{
        console.log(e);
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log(data);
        let newQuestion = {
            questionContent: "",
            id: questionDetail.id,
            options: []
        };
        const optionDefault = {
            isCorrect: false,
            id: 0,
            value: ""
        };
        let option = structuredClone(optionDefault);
        data.forEach((value, key)=>{
            console.log(key, value);
            if(key == "content")
                newQuestion.questionContent = value;
            else if(key == "isCorrect")
                option.isCorrect = true;
            else if(key == "option_id")
                option.id = parseInt(value);
            else if(key == "option")
                option.value = value;
            else if(key == "separator"){
                newQuestion.options.push(option);
                option = structuredClone(optionDefault);
            }
        });
        console.log(newQuestion);
        fetch("http://localhost:8080/api/v1/questions/" + questionDetail.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestion)
        });

    }
    
    const addOption =(e) =>{
        fetch("http://localhost:8080/api/v1/options",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "question" : questionDetail.id,
                "value" : addNewoption})
        }) 
        .then(resp => {
            return resp.json();
        })
        .then(addNewoptionBody =>{
            console.log(questionDetail);
            window.location.reload();
        });
    }

    const deleteQuestion=(e) =>{
        fetch("http://localhost:8080/api/v1/questions/" + questionDetail.id,{
            method: 'DELETE'
        })
        .then(
            history.push("/editQquestions")
        );
    }

    const deleteOption = (e, id) =>{
        e.preventDefault();
        fetch("http://localhost:8080/api/v1/options/" + id,{
            method : "DELETE"
        })
        .then(resp => {
            window.location.reload();
        })
      
    }


    return ( 
        <div className="questionBlogDetail">
            <Link to="/editQquestions/">Back</Link>
            { isPending && <div>Load...</div>}
            { error && <div>{ error }</div>}
            { questionDetail && (
                <article>
                    <form onSubmit={onSubmit}>
                        <label> Question:</label>
                        <button onClick={deleteQuestion}>Delete</button>
                        <input
                            name="content"
                            type="text"
                            required
                            defaultValue={ questionDetail.questionContent }
                        />
                        
                        <label>Options:</label>
                        
                        <ol>
                            { questionDetail.options.map((thisOption, i) => (
                                <li key={thisOption.id}>
                                    <input type="hidden" defaultValue={thisOption.id} name="option_id"/>
                                    <input
                                        defaultValue={thisOption.value}
                                        name="option" 
                                    />
                                    <button onClick={(e)=>{deleteOption(e, thisOption.id)}}>Delete</button>
                                   
                                    <div>
                                        <span>Is correct?</span>
                                        <input
                                            class="checkmark"
                                            type="radio"
                                            name="isCorrect"
                                            value={thisOption.id}
                                            defaultChecked={thisOption.isCorrect}
                                        />
                                    </div>

                                    <input type="hidden" name="separator" value="foo"/>
                                </li>
                            ))}    
                        </ol>

                        <div>
                            <input value = {addNewoption} onChange={(e)=>{setaddNewoption(e.target.value)}}/>
                            <button onClick={addOption}>Add</button>
                        </div>
                        <button>Save</button>
                    </form>
                </article>
            )}
        </div>

     );
}
 
export default QuestionBlogDetail;