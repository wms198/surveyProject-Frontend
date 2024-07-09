import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

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
            credentials: "include",
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

    const deleteQuestion=(e, id) =>{
        fetch("http://localhost:8080/api/v1/questions/" + id,{
            method: 'DELETE',
            credentials: "include",
        })
        .then(resp => {
            window.location.reload();
        });
    }
    useEffect(()=>{
        if(error === "redirect")
            history.push('/create');

    });

    return ( 
        <form className="">
            {(!isPending && !error) && showquestion.map((thisQuestions, i) => (
                <div className="blog-preview" key={thisQuestions.id} >
                    <Link to ={`/questionBlogDetail/${thisQuestions.id}`}>
                    <h2>{ i + 1 }</h2>
                    <p>{ thisQuestions.questionContent }</p>
                    <ol>
                    {thisQuestions.options.map(thisAnswer =>(
                        <li key={"option_" + thisAnswer.id}>
                            {thisAnswer.value}
                            <input 
                                className="checkmark"
                                defaultChecked={thisAnswer.isCorrect}
                                type="radio"
                            />
                            </li>
                    ))}
                    </ol>
                    </Link>
                    <span className="material-symbols-outlined pull-right" onClick = { (e)=>{deleteQuestion(e, thisQuestions.id)} }>
                    delete
                    </span>
                    <p className="clear"></p>
                </div>

            ))}

            
            <div className="blog-preview thankyou" key="0" >
                <h2>New Question</h2>
                <input value={newQuestion} onChange={(e)=>{setNewQuestion(e.target.value)}}/>
                <button className="addMarginLeft" onClick={addNewQuewstion}>Add</button>
              
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
