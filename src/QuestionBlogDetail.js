import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import { hover } from "@testing-library/user-event/dist/hover";
import back from "./back.png";

const QuestionBlogDetail = () => {
    const { id } = useParams();
    const { data: questionDetail, error, isPending } = useFetch('http://localhost:8080/api/v1/questions/' + id);
    const [addNewoption, setaddNewoption] = useState("");
    const back = require('./back.png');
    const history = useHistory();

    const onSubmit = (e)=>{
        console.log(e);
        e.preventDefault();
        _onSubmit(e.currentTarget);
    }

    const _onSubmit = (target)=>{
        const data = new FormData(target);
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
            credentials: "include",
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestion)
        });

    }
    
    const addOption =(e) =>{
        fetch("http://localhost:8080/api/v1/options",{
            credentials: "include",
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

    const deleteOption = (e, id) =>{
        e.preventDefault();
        fetch("http://localhost:8080/api/v1/options/" + id,{
            method : "DELETE",
            credentials: "include",
        })
        .then(resp => {
            window.location.reload();
        })
      
    }

    const saveExit = (e) =>{
        e.preventDefault();
        _onSubmit(e.target.parentElement);
        history.push('/');
    }
    useEffect(()=>{
        if(error === "redirect")
            history.push('/create');
    });

    return ( 
        <div className="questionBlogDetail goback">
            <Link className="pic" to="/editQuestions">
                <span class="material-symbols-outlined">arrow_back</span>
            </Link>
            { isPending && <div>Load...</div>}
            { error && <div>{ error }</div>}
            { questionDetail && (
                <article>
                    <form onSubmit={onSubmit}>
                        <div className="blog-preview">
                            <label> Question:</label>
                            
                            <input
                                name="content"
                                type="text"
                                required
                                defaultValue={ questionDetail.questionContent }
                            />
                        </div>
                        <div className="blog-preview">
                            <label>Options:</label>
                                <ol>
                                    { questionDetail.options.map((thisOption, i) => (
                                        <li key={thisOption.id}>
                                            <input type="hidden" defaultValue={thisOption.id} name="option_id"/>
                                            <input
                                                defaultValue={thisOption.value}
                                                name="option" 
                                            />
                                            <span className="material-symbols-outlined pull-right addMarginTop" onClick = { (e)=>{deleteOption(e, thisOption.id)} }>
                                                delete
                                            </span>       
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
                                </div>
                        
                        <div className="blog-preview">
                            <input value = {addNewoption} onChange={(e)=>{setaddNewoption(e.target.value)}}/>
                            <button className="addMarginLeft" onClick={addOption}>Add</button>
                        </div>
                        <button className="pull-left">Save</button>
                        <button className="pull-right" onClick={saveExit}>Save and exit</button>
                    </form>
                </article>
            )}
        </div>

     );
}
 
export default QuestionBlogDetail;