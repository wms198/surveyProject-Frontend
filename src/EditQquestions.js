import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import { useState } from "react";

import logo from "./edit.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

const EditQquestions = () => {

    const { data : showquestion, isPending, error} = useFetch("http://localhost:8080/api/v1/questions" );
    const [newQuestion, setNewQuestion] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const history = useHistory();

    const addNewQuewstion = (e)=>{
        
        e.preventDefault();
        fetch("http://localhost:8080/api/v1/questions", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"questionContent": newQuestion})
        })
        .then(resp => {
            return resp.json();
        })
        .then(newQuestionBody =>{
            history.push("/questionBlogDetail/" + newQuestionBody.id); 
        });

    }

    return ( 
        <form className="">
            {!isPending && showquestion.map(thisQuestions => (
                <div className="blog-preview" key={showquestion.id} >
                    <Link to ={`/questionBlogDetail/${thisQuestions.id}`}>
                    <h2>{ thisQuestions.id }</h2>
                    <p>{ thisQuestions.questionContent }</p>
                    <ol>
                    {thisQuestions.options.map(thisAnswer =>(
                        <li class="">
                            {thisAnswer.value}
                            <input 
                                class="checkmark"
                                defaultChecked={thisAnswer.isCorrect}
                                type="radio"
                            />
                            </li>
                    ))}
                    </ol>
                    </Link>
                </div>
            ))}
            
            <div className="blog-preview" key="0" >
                <h2>New Question</h2>
                <input value={newQuestion} onChange={(e)=>{setNewQuestion(e.target.value)}}/>
                <button onClick={addNewQuewstion}>Add</button>
              
            </div>
        </form>
        );
}
export default EditQquestions;

{/*<table className="tableQuestion">
                <tr>
                    <td >{ d.id }</td>
                    <td>
                        <input type="text" 
                        value={ d.q }
                        size={50}
                        onChange={ (e) => {
                            setIsTextBeChanged(true);
                            setEditInfo(e.target.value);
                    }}/></td>
                    <td onClick={ editText }><img src = { logo } height="15" width="20"/></td>
               </tr>
            </table>*/}   