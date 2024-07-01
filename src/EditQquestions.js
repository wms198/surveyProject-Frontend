import useFetch from "./useFetch";
import { useState } from "react";

import logo from "./edit.png";
const EditQquestions = () => {

    const { data : showquestion, isPending, error} = useFetch("http://localhost:8000/questions" );
    const [questionsJson, setquetionsJson] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    
    const saveJson = () => {

        console.log("json string:", questionsJson);
        const newQuestions = JSON.parse(questionsJson);

        console.log(newQuestions);
        setIsSaved(true);
        newQuestions.map(question =>{
            fetch("http://localhost:8000/questions/" + question.id, {
                method: "PATCH",
                body: JSON.stringify(question)
               
            }).then(()=>{
                   
            });
        });
       
    }

    return ( 
        <div className="home">
            {!isPending &&
            <div>
            <textarea onChange={(e)=>{setquetionsJson(e.target.value);setIsSaved(false)}} rows={20} cols={83} defaultValue={JSON.stringify(showquestion, null, 2)}>
            </textarea>
            <button onClick={saveJson}>Save</button>
            </div>}
            { isSaved &&
            <div>
                <span>Saved! </span><a href="/">Go back to Homepage</a>
            </div>
            }
            {!isPending && showquestion.map(thisQuestions => (
                <div className="blog-preview" key={showquestion.id} >
                <h2>{ thisQuestions.id }</h2>
                <p>{ thisQuestions.q }</p>
                {thisQuestions.answers.map(thisAnswer =>(
                    <div>
                    <span>{thisAnswer.value}</span>
                    <input type="checkbox" checked={thisAnswer.is_correct}/>
                    </div>
                ))}

                </div>
            ))}
        </div>
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